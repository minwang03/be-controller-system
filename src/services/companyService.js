const { pool } = require('../config/db');

const getPartner = async () => {
  try {
    const result = await pool.query('SELECT * FROM company');
    return result.rows; 
  } catch (error) {
    throw new Error('Lỗi khi lấy dữ liệu đối tác');
  }
};
const deletePartnerById = async (id) => {
  const query = 'DELETE FROM company WHERE id = $1 RETURNING *';
  const values = [id];

  const result = await pool.query(query, values);

  // Trả về đối tác đã xoá nếu thành công, null nếu không tồn tại
  return result.rowCount > 0 ? result.rows[0] : null;
};

const createPartner = async (partner) => {
  try {
    const query = `
      INSERT INTO company (company_name, phone_number, address, status) 
      VALUES ($1, $2, $3, $4) 
      RETURNING *`;
    const values = [
      partner.company_name, 
      partner.phone_number, 
      partner.address, 
      partner.status
    ];
    
    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      throw new Error('Không thể tạo đối tác');
    }

    return result.rows[0]; // Trả về đối tượng đối tác đã tạo
  } catch (error) {
    console.error('Lỗi khi tạo đối tác:', error.message);
    
    throw new Error('Lỗi khi tạo đối tác');
  }
};


module.exports = { getPartner, createPartner, deletePartnerById };