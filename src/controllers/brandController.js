const mongoose = require("mongoose");
const Brand = require("../models/brandModel");


/* insert new brand */
exports.createBrand = async (req, res, next) => {
  try {
    const result = await Brand.create(req.body);

    res.status(201).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

/* display all brands */
exports.displayBrands = async (req, res, next) => {
  try {
    const result = await Brand.find({})
      .skip((Number(req.query.page) - 1) * req.query.limit)
      .limit(req.query.limit)
      .sort("-updatedAt");

    const count = await Brand.estimatedDocumentCount();

    res.status(200).json({
      data: result,
      count: count,
      totalData: result.length,
    });
  } catch (error) {
    next(error);
  }
};


/* update specific brand */
exports.updateBrand = async (req, res, next) => {
  try {
    const result = await Brand.findByIdAndUpdate(req.params.id, req.body, {
      runValidators: true,
      returnOriginal: false,
    });

    res.status(202).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

/* remove specific brand */
exports.removeBrand = async (req, res, next) => {
  try {
    const result = await Brand.findByIdAndDelete(req.params.id);
    res.status(202).json({
      description: "Successfully remove specific brand credentials",
    });
  } catch (error) {
    next(error);
  }
};
