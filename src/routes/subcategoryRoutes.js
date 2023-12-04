const express = require('express');
const router = express.Router();
const subcategoryController = require('../controllers/subcategoryController');

router.post('/subcategory', subcategoryController.createSubcategory);
router.get('/subcategory', subcategoryController.displaySubcategories);
router.put('/subcategory/:id', subcategoryController.updateSubcategory);
router.delete('/subcategory/:id', subcategoryController.deleteSubcategory);

module.exports = router;

