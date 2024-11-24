const companyService = require('../services/companyService');

const getAllCompanies = async (req, res) => {
  try {
    const companies = await companyService.fetchCompanies();
    res.status(200).json({  data: companies });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {getAllCompanies,};
