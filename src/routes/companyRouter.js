const express = require('express');
const companyController = require('../controllers/companyController');
const router = express.Router();

router.get('/all-company', companyController.getAllCompany);

module.exports = router;