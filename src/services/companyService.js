let companies = require('../database/Company');

const fetchCompanies = () => {
  return companies;
};

const findCompanyById = (id) => {
    const company = companies.companiesData.find(company => company.id === parseInt(id)); 
    return company;
};

module.exports = {
  fetchCompanies, findCompanyById
};
