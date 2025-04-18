const express = require('express');
const categoryController = require('../controllers/categoryController');

const router = express.Router();

// Get all categories
router.get('/category', categoryController.getCategory);

// Create a new category
router.post('/category', categoryController.createCategory);

// Delete a category by ID
router.delete('/category/:category_id', categoryController.deleteCategory);

// Update a category by ID
router.put('/category/:category_id', categoryController.updateCategory);

module.exports = router;
