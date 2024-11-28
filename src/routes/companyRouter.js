const express = require('express');
const companyController = require('../controllers/companyController');

const router = express.Router();

router.get('/company/getAllCompany', companyController.getAllCompanies);
router.get('/company/getCompanyByID/:id', companyController.getCompanyById);
router.get('/company/search', companyController.searchCompanies);

// Route: Thêm công ty mới
router.post('/company', companyController.createCompany);

// Route: Xóa công ty
router.delete('/company/:id', companyController.removeCompany);

// Route: Cập nhật thông tin công ty
router.put('/company/:id', companyController.editCompany);

module.exports = router; 
