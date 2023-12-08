const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.post('/products', productController.createProduct);
router.get('/products', productController.displayProducts);
router.get('/allproducts', productController.displayAllProduct);
router.put('/products/:id', productController.updateProduct);
router.delete('/products/:id', productController.removeProduct);
router.get('/products/:category', productController.displayAllProductsBySub);
// router.get('/SubcatwithPro', productController.getSubCategoriesWithProducts);

module.exports = router;
