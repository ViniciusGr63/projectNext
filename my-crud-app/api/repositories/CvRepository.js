const prisma = require('../../prismaClient');

class CvRepository {
  async create(data) {
    return prisma.curriculo.create({ data });
  }

  async findAll() {
    return prisma.curriculo.findMany();
  }

  async findById(id) {
    return prisma.curriculo.findUnique({ where: { id } });
  }

  async update(id, data) {
    return prisma.curriculo.update({
      where: { id },
      data,
    });
  }

  async delete(id) {
    return prisma.curriculo.delete({ where: { id } });
  }
}

module.exports = new CvRepository();
