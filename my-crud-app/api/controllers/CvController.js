
const CvService = require('../services/CvServise');

class CvController {
  async create(req, res) {
    try {
      const cv = await CvService.createCv(req.body);
      res.status(201).json(cv);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao criar o currículo' });
    }
  }

  async getAll(req, res) {
    try {
      const cvs = await CvService.getAllCvs();
      res.status(200).json(cvs);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar currículos' });
    }
  }

  async getById(req, res) {
    try {
      const cv = await CvService.getCvById(Number(req.params.id));
      if (cv) {
        res.status(200).json(cv);
      } else {
        res.status(404).json({ error: 'Currículo não encontrado' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar o currículo' });
    }
  }

  async update(req, res) {
    try {
      const cv = await CvService.updateCv(Number(req.params.id), req.body);
      if (cv) {
        res.status(200).json(cv);
      } else {
        res.status(404).json({ error: 'Currículo não encontrado' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Erro ao atualizar o currículo' });
    }
  }

  async delete(req, res) {
    try {
      const cv = await CvService.deleteCv(Number(req.params.id));
      if (cv) {
        res.status(200).json({ message: 'Currículo deletado com sucesso' });
      } else {
        res.status(404).json({ error: 'Currículo não encontrado' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Erro ao deletar o currículo' });
    }
  }
}

module.exports = new CvController();
