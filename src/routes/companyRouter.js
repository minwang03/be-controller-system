const express = require('express');
const companyController = require('../controllers/companyController');

const router = express.Router();

router.get('/getAllCompany', companyController.getAllCompanies);

module.exports = router;
