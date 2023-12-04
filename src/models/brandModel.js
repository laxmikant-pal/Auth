
const mongoose = require("mongoose");
const validator = require("validator");
const { ObjectId } = mongoose.Schema.Types;
const brandSchema = new mongoose.Schema(
  {
    // for title
    title: {
      type: String,
      required: [true, "Please, provide a valid brand name"],
      trim: true,
      uppercase: true,
      unique: [true, "Same brand already exists"],
      maxLength: [50, "Brand name would be at most 50 characters"],
    },
    store: {
      type: ObjectId,
      ref: "Store",
      required: [false, "Please, provide a product store"],
    },

    description: {
      type: String,
      required: [true, "Please, provide brand description"],
      trim: true,
      maxLength: [500, "Brand description would be at most 500 characters"],
    },

    // for logo
    logo: {
      url: {
        type: String,
        validate: [validator.isURL, "Please provide a valid thumbnail URL"],
        default: "",
      },
      public_id: {
        type: String,
        default: "",
      },
    },

    // for category  time stamps
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Brand = mongoose.model("Brand", brandSchema);

module.exports = Brand;
