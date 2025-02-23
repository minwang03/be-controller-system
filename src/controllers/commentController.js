const commentService = require('../services/commentService');

// Thêm bình luận
const addCommentController = async (req, res) => {
    try {
        const newComment = await commentService.addComment(req.body);
        res.status(201).json({ message: 'Bình luận đã được thêm', data: newComment });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Lấy bình luận theo sản phẩm
const getCommentsByProductController = async (req, res) => {
    const { product_id } = req.params;
    try {
        const comments = await commentService.getCommentsByProduct(product_id);
        res.json({success: true, data: comments});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Xóa bình luận
const deleteCommentController = async (req, res) => {
    const { comment_id } = req.params;
    try {
        await commentService.deleteComment(comment_id);
        res.status(200).json({ message: 'Bình luận đã được xóa' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    addCommentController,
    getCommentsByProductController,
    deleteCommentController
};
