let companies = require('../database/Company');

const fetchCompanies = () => {
  return companies;
};

const findCompanyById = (id) => {
    const company = companies.companiesData.find(company => company.id === parseInt(id)); 
    return company;
};

const searchCompanies = async (name) => { 
  const query = new RegExp(name, 'i');
  const result = companies.companiesData.filter(company => company.name.match(query));
  return result;
};

module.exports = {fetchCompanies, findCompanyById,searchCompanies};
