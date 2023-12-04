const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

router.post('/category', categoryController.createCategory);
router.get('/category', categoryController.displayCategories);
router.put('/category/:id', categoryController.updateCategory);
router.delete('/category/:id', categoryController.deleteCategory);

module.exports = router;