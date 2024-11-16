const companyService = require('../services/companyService');

const getAllCompany = async (req, res) => {
    try {
        const company = await companyService.getAllCompany();
        res.status(200).json(company);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Không thể lấy danh sách đối tác' });
    }
};

module.exports = { getAllCompany };