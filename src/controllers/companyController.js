const companyService = require('../services/companyService');

const getPartner = async (req, res) => {
    try {
        const company = await companyService.getPartner();
        res.status(200).json(company);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Không thể lấy danh sách đối tác' });
    }
};
const createPartner = async (req, res) => {
    try {
        console.log(req.body);
        const newCompany = await companyService.createPartner(req.body);
        console.log(newCompany);
        res.status(201).json(newCompany);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Không thể tạo đối tác' });
    }
}
const deletePartner = async (req, res) => {
    try {
        const { id } = req.params; // Lấy `id` từ tham số đường dẫn (URL params)
        console.log(id);
        
        // Gọi service để xoá đối tác dựa trên `id`
        const deletedPartner = await companyService.deletePartnerById(id);

        if (!deletedPartner) {
            // Trường hợp không tìm thấy đối tác
            return res.status(404).json({ message: 'Đối tác không tồn tại' });
        }

        // Trả về phản hồi thành công
        res.status(200).json({ message: 'Xoá đối tác thành công', deletedPartner });
    } catch (error) {
        console.error('Lỗi khi xoá đối tác:', error);

        // Trả về phản hồi lỗi
        res.status(500).json({ message: 'Không thể xoá đối tác' });
    }
};


module.exports = { getPartner, createPartner, deletePartner };