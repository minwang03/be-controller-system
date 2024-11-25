const express = require('express');
const companyController = require('../controllers/companyController');

const router = express.Router();

router.get('/company/getAllCompany', companyController.getAllCompanies);
router.get('/company/getCompanyByID/:id', companyController.getCompanyById);
router.get('/company/search', companyController.searchCompanies);

module.exports = router; 
