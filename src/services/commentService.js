const { pool } = require('../config/db');

// Thêm bình luận mới
const addComment = async (commentData) => {
    const { user_id, product_id, rating, comment } = commentData;
    try {
        const [result] = await pool.query(
            'INSERT INTO comments (user_id, product_id, rating, comment, created_at) VALUES (?, ?, ?, ?, NOW())',
            [user_id, product_id, rating, comment]
        );
        return result;
    } catch (error) {
        throw new Error('Không thể thêm bình luận: ' + error.message);
    }
};

// Lấy bình luận theo product_id
const getCommentsByProduct = async (product_id) => {
    try {
        const [rows] = await pool.query(
            'SELECT c.*, u.name AS user_name FROM comments c JOIN users u ON c.user_id = u.user_id WHERE c.product_id = ? ORDER BY c.created_at DESC',
            [product_id]
        );
        return rows;
    } catch (error) {
        throw new Error('Không thể lấy bình luận: ' + error.message);
    }
};

// Xóa bình luận theo comment_id
const deleteComment = async (comment_id) => {
    try {
        const [result] = await pool.query(
            'DELETE FROM comments WHERE comment_id = ?',
            [comment_id]
        );
        return result;
    } catch (error) {
        throw new Error('Không thể xóa bình luận: ' + error.message);
    }
};

module.exports = {
    addComment,
    getCommentsByProduct,
    deleteComment
};
