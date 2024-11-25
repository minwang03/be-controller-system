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


module.exports = { getAllCompanies, getCompanyById, searchCompanies };
