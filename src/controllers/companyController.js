const companyService = require('../services/companyService');

// Lấy danh sách công ty
const getAllCompanies = async (req, res) => {
  try {
    const companies = await companyService.fetchCompanies();
    res.status(200).json({ success: true, data: companies });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


module.exports = {
  getAllCompanies,
};
