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
  const maxId = Math.max(0, ...companies.companiesData.map((company) => company.id));
  const today = new Date().toISOString().split('T')[0];
  const fullNewCompany = {
    employees: 0,
    drivers: 0,
    vehicles: 0,
    trips: 0,
    ticketsSold: 0,
    revenue: Array(12).fill(0),
    vehicleTrips: [],
    status: 'Active',
    ...newCompany,
    id: maxId + 1,
    createdAt: today,
  };
  companies.companiesData.push(fullNewCompany);
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
