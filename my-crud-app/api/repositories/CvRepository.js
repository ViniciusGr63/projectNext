const prisma = require('../../prismaClient');

class CvRepository {
  async create(data) {
    return prisma.curriculo.create({
      data: {
        name: data.name,
        phone: data.phone,
        loc: data.loc,
        email: data.email,
        formacoes: {
          create: data.formacoes || [],
        },
        objetivos: {
          create: data.objetivos || [],
        },
        competencias: {
          create: data.competencias || [],
        },
        linguagens: {
          create: data.linguagens || [],
        },
        projetos: {
          create: data.projetos || [],
        }
      },
      include: {
        formacoes: true,
        objetivos: true,
        competencias: true,
        linguagens: true,
        projetos: true,
      }
    });
  }

  async findAll() {
    return prisma.curriculo.findMany({
      include: {
        formacoes: true,
        objetivos: true,
        competencias: true,
        linguagens: true,
        projetos: true,
      }
    });
  }

  async findById(id) {
    return prisma.curriculo.findUnique({
      where: { id },
      include: {
        formacoes: true,
        objetivos: true,
        competencias: true,
        linguagens: true,
        projetos: true,
      }
    });
  }

  async update(id, data) {
    // Para atualizar relações com Prisma, normalmente você precisa fazer desconectar/reconectar, 
    // mas aqui farei um update simples apenas no curriculo e para os relacionamentos vou substituir via "set"

    return prisma.curriculo.update({
      where: { id },
      data: {
        name: data.name,
        phone: data.phone,
        loc: data.loc,
        email: data.email,
        formacoes: {
          deleteMany: {},   // deleta todas as formações antigas
          create: data.formacoes || [],
        },
        objetivos: {
          deleteMany: {},
          create: data.objetivos || [],
        },
        competencias: {
          deleteMany: {},
          create: data.competencias || [],
        },
        linguagens: {
          deleteMany: {},
          create: data.linguagens || [],
        },
        projetos: {
          deleteMany: {},
          create: data.projetos || [],
        }
      },
      include: {
        formacoes: true,
        objetivos: true,
        competencias: true,
        linguagens: true,
        projetos: true,
      }
    });
  }

  async delete(id) {
    return prisma.curriculo.delete({ where: { id } });
  }
}

module.exports = new CvRepository();
