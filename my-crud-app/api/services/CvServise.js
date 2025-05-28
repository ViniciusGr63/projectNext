
const CvRepository = require('../repositories/CvRepository');

class CvService {
  async createCv(data) {
    return CvRepository.create(data);
  }

  async getAllCvs() {
    return CvRepository.findAll();
  }

  async getCvById(id) {
    return CvRepository.findById(id);
  }

  async updateCv(id, data) {
    return CvRepository.update(id, data);
  }

  async deleteCv(id) {
    return CvRepository.delete(id);
  }
}

module.exports = new CvService();
