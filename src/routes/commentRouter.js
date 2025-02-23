const express = require('express');
const commentController = require('../controllers/commentController');

const router = express.Router();

// Thêm bình luận
router.post('/comments', commentController.addCommentController);

// Lấy bình luận theo product_id
router.get('/comments/product/:product_id', commentController.getCommentsByProductController);

// Xóa bình luận theo comment_id
router.delete('/comments/:comment_id', commentController.deleteCommentController);

module.exports = router;
