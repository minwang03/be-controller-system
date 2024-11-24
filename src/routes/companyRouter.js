const express = require('express');
const companyController = require('../controllers/companyController');

const router = express.Router();

router.get('/company/getAllCompany', companyController.getAllCompanies);

module.exports = router;
