
const Cv = require('../models/CvModels');

class CvRepository {
  async create(data) {
    return Cv.create({ data });
  }

  async findAll() {
    return Cv.findMany();
  }

  async findById(id) {
    return Cv.findUnique({ where: { id } });
  }

  async update(id, data) {
    return Cv.update({ where: { id }, data });
  }

  async delete(id) {
    return Cv.delete({ where: { id } });
  }
}

module.exports = new CvRepository();
