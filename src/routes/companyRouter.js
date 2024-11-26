const express = require('express');
const companyController = require('../controllers/companyController');
const router = express.Router();

router.get('/partners', companyController.getPartner);
router.post('/partners', companyController.createPartner);
router.delete('/partners/:id', companyController.deletePartner);

module.exports = router;