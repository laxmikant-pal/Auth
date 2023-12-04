const Product = require('../models/productModel');
const Subcategory = require('../models/subcategoryModel');
const upload = require('../config/multerSetup');
const Brand = require('../models/brandModel');

exports.createProduct = async (req, res) => {
  try {
    upload.single('image')(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ error: err.message });
      }

      const image = req.file ? req.file.path : null;

      const result = await Product.create(req.body, image);

      await Subcategory.findByIdAndUpdate(result.subcategory, {
        $push: { products: result._id },
      });

      await Brand.findByIdAndUpdate(result.brand, {
        $push: { products: result._id },
      });

      res.status(201).json(result);
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.displayProducts = async (req, res) => {
  try {
    const { page, limit, category, subcategory, color, sort, size, priceStart, priceEnd, searchText } = req.query;

    const query = {};
    // if (!admin) query.availability = "InStock";

    if (category) {
      query.category = category;
    }

    if (subcategory) {
      query.subcategory = subcategory;
    }

    if (color) {
      let colors = color.split(',');
      query.colors = { $in: colors };
    }

    if (size) {
      let sizes = size.split(',');
      query.sizes = { $in: sizes };
    }

    if (priceStart && priceEnd) {
      query.price_per_unit = { $gte: priceStart, $lte: priceEnd };
    } else if (priceStart) {
      query.price_per_unit = { $gte: priceStart };
    } else if (priceEnd) {
      query.price_per_unit = { $lte: priceEnd };
    }

    if (searchText) {
      query.$or = [
        { title: { $regex: searchText, $options: 'i' } },
        { description: { $regex: searchText, $options: 'i' } }
      ];
    }

    let sortCriteria = {};

    switch (sort) {
      case "Most-Popular":
        sortCriteria = { rating: -1 };
        break;
      case "Best-Rating":
        sortCriteria = { rating: -1 };
        break;
      case "Newest":
        sortCriteria.updatedAt = -1;
        break;
      case "Price-low-high":
        sortCriteria.price_per_unit = 1;
        break;
      case "Price-high-low":
        sortCriteria.price_per_unit = -1;
        break;
      default:
        sortCriteria.updatedAt = -1;
        break;
    }

    const result = await Product.find(query)
      .skip((Number(page) - 1) * limit)
      .limit(limit)
      .sort(sortCriteria)
      .populate('category')
      .populate('subcategory');

    const totalFilteredProducts = await Product.countDocuments(query);
    res.status(200).json({ products: result, totalFilteredProducts });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.removeProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
