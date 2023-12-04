const express = require("express");
const router = express.Router();
const brandController = require("../controllers/brandController");

router.post("/brands", brandController.createBrand);

router.get("/brands", brandController.displayBrands);

router.put("/brands/:id", brandController.updateBrand);

router.delete("/brands/:id", brandController.removeBrand);

module.exports = router;
