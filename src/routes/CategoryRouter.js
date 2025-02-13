const express = require('express');
const categoryController = require('../controllers/categoryController');

const router = express.Router();

router.get('/category', categoryController.getCategory);

module.exports = router;
