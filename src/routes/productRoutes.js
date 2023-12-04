const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.post('/products', productController.createProduct);
router.get('/products', productController.displayProducts);
router.put('/products/:id', productController.updateProduct);
router.delete('/products/:id', productController.removeProduct);

module.exports = router;
