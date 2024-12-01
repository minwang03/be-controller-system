let companies = require('../database/Company');

const fetchCompanies = () => {
  return companies.companiesData;
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

const addCompany = (newCompany) => {
  const maxId = companies.companiesData.reduce((max, company) => Math.max(max, company.id), 0);
  newCompany.id = maxId + 1;
  const today = new Date();
  newCompany.createdAt = `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}`;
  newCompany.status = 'Active';
  companies.companiesData.push(newCompany);
  saveCompaniesData();
};

const deleteCompany = (id) => {
  const index = companies.companiesData.findIndex(company => company.id === parseInt(id));
  if (index !== -1) {
    companies.companiesData.splice(index, 1);
    saveCompaniesData();
    return true;
  }
  return false;
};

const updateCompany = (id, updatedData) => {
  const index = companies.companiesData.findIndex(company => company.id === parseInt(id));
  if (index !== -1) {
    companies.companiesData[index] = { ...companies.companiesData[index], ...updatedData };
    saveCompaniesData();
    return true;
  }
  return false;
};

const saveCompaniesData = () => {
  const fs = require('fs');
  const path = require('path');
  fs.writeFileSync(path.join(__dirname, '../database/Company.js'),
    `module.exports = { companiesData: ${JSON.stringify(companies.companiesData, null, 2)} };`);
};

module.exports = { fetchCompanies, findCompanyById, searchCompanies, addCompany, deleteCompany, updateCompany };
