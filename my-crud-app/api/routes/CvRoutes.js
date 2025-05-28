
const express = require('express');
const CvController = require('../controllers/CvController');

const router = express.Router();

router.post('/cvs', CvController.create);
router.get('/cvs', CvController.getAll);
router.get('/cvs/:id', CvController.getById);
router.put('/cvs/:id', CvController.update);
router.delete('/cvs/:id', CvController.delete);

module.exports = router;
