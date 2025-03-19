const express = require('express');
const productController = require('../controllers/productController');

const router = express.Router();

router.get('/products', productController.getProducts);

router.get('/products/search', productController.searchProductByName);

router.get('/products/:id', productController.getProductId);

router.post('/products', productController.createNewProduct); 

router.put('/products/:id', productController.updateProductById);

module.exports = router;
