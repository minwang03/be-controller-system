const companyService = require('../services/companyService');

const getAllCompanies = async (req, res) => {
  try {
    const companies = await companyService.fetchCompanies();
    res.status(200).json({ data: companies });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getCompanyById = async (req, res) => {
  const { id } = req.params;
  try {
    const company = await companyService.findCompanyById(id);
    res.status(200).json({ data: company });
  } catch (err) {
    console.error("Lỗi khi tìm công ty theo ID:", err);
  }
};

const searchCompanies = async (req, res) => {
  const { name } = req.query;
  try {
    const companies = await companyService.searchCompanies(name);
    res.status(200).json({ data: companies });
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const createCompany = (req, res) => {
  const newCompany = req.body;
  companyService.addCompany(newCompany);
  res.status(201).json({ message: 'Công ty đã được thêm' });
};

const removeCompany = (req, res) => {
  const success = companyService.deleteCompany(req.params.id);
  if (success) {
    res.json({ message: 'Công ty đã được xóa' });
  } else {
    res.status(404).json({ message: 'Công ty không tồn tại' });
  }
};

const editCompany = (req, res) => {
  const updatedData = req.body;
  const success = companyService.updateCompany(req.params.id, updatedData);
  if (success) {
    res.json({ message: 'Công ty đã được cập nhật' });
  } else {
    res.status(404).json({ message: 'Công ty không tồn tại' });
  }
};

module.exports = { getAllCompanies, getCompanyById, searchCompanies, createCompany, removeCompany, editCompany };
