let companies = require('../database/Company');

const fetchCompanies = async () => {
  return companies;
};

module.exports = {
  fetchCompanies,
};
