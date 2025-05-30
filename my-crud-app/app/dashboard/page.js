"use client";
import React, { useState, useEffect } from "react";
import "./PaginaCurriculos.css"; // Estilos externos

export default function PaginaCurriculos() {
  const [curriculos, setCurriculos] = useState([]);
  const [modoEdicao, setModoEdicao] = useState(false);
  const [idCurriculoEditando, setIdCurriculoEditando] = useState(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [curriculoSelecionado, setCurriculoSelecionado] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    loc: "",
    email: "",
    formacoes: "",
    objetivos: "",
    competencias: "",
    linguagens: "",
    projetos: "",
  });

  const getAllCurriculos = () => {
    fetch("/api/cvs")
      .then((res) => res.json())
      .then((data) => setCurriculos(data))
      .catch((err) => console.error("Erro ao carregar currículos:", err));
  };

  const getCurriculoById = (id) => {
    fetch(`/api/cvs/${id}`)
      .then((res) => res.json())
      .then((curriculo) => {
        setCurriculoSelecionado(curriculo);
        setMostrarFormulario(false);
      })
      .catch((err) => console.error("Erro ao carregar currículo:", err));
  };

  const deletarCurriculo = (id) => {
    if (window.confirm("Tem certeza que deseja excluir este currículo?")) {
      fetch(`/api/cvs/${id}`, { method: "DELETE" })
        .then((res) => {
          if (res.ok) {
            alert("Currículo excluído com sucesso!");
            setCurriculoSelecionado(null);
            getAllCurriculos();
          } else {
            alert("Erro ao excluir currículo.");
          }
        })
        .catch((err) => console.error("Erro ao excluir currículo:", err));
    }
  };

  const prepararEdicao = () => {
    if (!curriculoSelecionado) return;
    setModoEdicao(true);
    setIdCurriculoEditando(curriculoSelecionado.id);
    setFormData({
      name: curriculoSelecionado.name,
      phone: curriculoSelecionado.phone,
      loc: curriculoSelecionado.loc,
      email: curriculoSelecionado.email,
      formacoes: curriculoSelecionado.formacoes.join(", "),
      objetivos: curriculoSelecionado.objetivos.join(", "),
      competencias: curriculoSelecionado.competencias.join(", "),
      linguagens: curriculoSelecionado.linguagens.join(", "),
      projetos: curriculoSelecionado.projetos.join(", "),
    });
    setMostrarFormulario(true);
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const enviarNovoCurriculo = (e) => {
    e.preventDefault();

    const dados = {
      name: formData.name.trim(),
      phone: formData.phone.trim(),
      loc: formData.loc.trim(),
      email: formData.email.trim(),
      formacoes: formData.formacoes.split(",").map((s) => s.trim()),
      objetivos: formData.objetivos.split(",").map((s) => s.trim()),
      competencias: formData.competencias.split(",").map((s) => s.trim()),
      linguagens: formData.linguagens.split(",").map((s) => s.trim()),
      projetos: formData.projetos.split(",").map((s) => s.trim()),
    };

    if (modoEdicao && idCurriculoEditando !== null) {
      fetch(`/api/cvs/${idCurriculoEditando}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dados),
      })
        .then((res) => {
          if (res.ok) {
            alert("Currículo atualizado com sucesso!");
            resetarFormulario();
          } else {
            alert("Erro ao atualizar currículo.");
          }
        })
        .catch((err) => console.error("Erro ao atualizar currículo:", err));
    } else {
      fetch("/api/cvs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dados),
      })
        .then((res) => res.json())
        .then(() => {
          alert("Currículo adicionado com sucesso!");
          resetarFormulario();
        })
        .catch((err) => {
          console.error("Erro ao adicionar currículo:", err);
          alert("Erro ao adicionar currículo");
        });
    }
  };

  const mostrarFormNovo = () => {
    setModoEdicao(false);
    setIdCurriculoEditando(null);
    setFormData({
      name: "",
      phone: "",
      loc: "",
      email: "",
      formacoes: "",
      objetivos: "",
      competencias: "",
      linguagens: "",
      projetos: "",
    });
    setMostrarFormulario(true);
    setCurriculoSelecionado(null);
  };

  const resetarFormulario = () => {
    setFormData({
      name: "",
      phone: "",
      loc: "",
      email: "",
      formacoes: "",
      objetivos: "",
      competencias: "",
      linguagens: "",
      projetos: "",
    });
    setMostrarFormulario(false);
    setCurriculoSelecionado(null);
    setModoEdicao(false);
    setIdCurriculoEditando(null);
    getAllCurriculos();
  };

  useEffect(() => {
    getAllCurriculos();
  }, []);

  return (
    <>
      <header>
        <h1>Página de Currículos</h1>
      </header>

      <button onClick={mostrarFormNovo}>Adicionar Currículo</button>

      {mostrarFormulario && (
        <div className="novocurriculo">
          <h2>{modoEdicao ? "Editar Currículo" : "Cadastrar Novo Currículo"}</h2>
          <form onSubmit={enviarNovoCurriculo}>
            <input
              type="text"
              id="name"
              placeholder="Nome"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              id="phone"
              placeholder="Telefone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              id="loc"
              placeholder="Localização"
              value={formData.loc}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              id="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <h3>Formações</h3>
            <textarea
              id="formacoes"
              placeholder="Formações (separadas por vírgulas)"
              value={formData.formacoes}
              onChange={handleChange}
              required
            />

            <h3>Objetivos</h3>
            <textarea
              id="objetivos"
              placeholder="Objetivos (separados por vírgulas)"
              value={formData.objetivos}
              onChange={handleChange}
              required
            />

            <h3>Competências</h3>
            <textarea
              id="competencias"
              placeholder="Competências (separadas por vírgulas)"
              value={formData.competencias}
              onChange={handleChange}
              required
            />

            <h3>Linguagens</h3>
            <textarea
              id="linguagens"
              placeholder="Linguagens (separadas por vírgulas)"
              value={formData.linguagens}
              onChange={handleChange}
              required
            />

            <h3>Projetos</h3>
            <textarea
              id="projetos"
              placeholder="Projetos (separados por vírgulas)"
              value={formData.projetos}
              onChange={handleChange}
              required
            />

            <button type="submit">{modoEdicao ? "Atualizar" : "Enviar"}</button>
          </form>
        </div>
      )}

      <div className="itens">
        {curriculos.map((curriculo) => (
          <div
            key={curriculo.id}
            className="curriculo-item"
            onClick={() => getCurriculoById(curriculo.id)}
          >
            {curriculo.name}
          </div>
        ))}
      </div>

      {curriculoSelecionado && !mostrarFormulario && (
        <div className="exibirConteudo">
          <h2>Detalhes do Currículo</h2>
          <p><strong>Nome:</strong> {curriculoSelecionado.name}</p>
          <p><strong>Telefone:</strong> {curriculoSelecionado.phone}</p>
          <p><strong>Localização:</strong> {curriculoSelecionado.loc}</p>
          <p><strong>Email:</strong> {curriculoSelecionado.email}</p>

          <h3>Formações</h3>
          <ul>
            {curriculoSelecionado.formacoes.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>

          <h3>Objetivos</h3>
          <ul>
            {curriculoSelecionado.objetivos.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>

          <h3>Competências</h3>
          <ul>
            {curriculoSelecionado.competencias.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>

          <h3>Linguagens</h3>
          <ul>
            {curriculoSelecionado.linguagens.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>

          <h3>Projetos</h3>
          <ul>
            {curriculoSelecionado.projetos.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>

          <div style={{ marginTop: 20 }}>
            <button className="btn-editar" onClick={prepararEdicao}>Editar Currículo</button>
            <button className="btn-excluir" onClick={() => deletarCurriculo(curriculoSelecionado.id)}>Excluir Currículo</button>
          </div>
        </div>
      )}
    </>
  );
}
