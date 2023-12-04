const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: { 
    type: String,
     required: true
     },

  description: { 
    type: String, 
    required: true
 },

  sizes: [String],

  colors: [String],

  price_per_unit: { 
    type: Number,
     required: true 
    },

  weight: { 
    type: Number, 
    required: true 
},

image: { 
  type: String
},

  availability: { 
    type: String, 
    enum: ["InStock", "Soldout"], 
    required: true 
},
  available_Qty: {
     type: Number, 
     required: [true, "Please provide available quantity"] 
},

  subcategory: { 
    type: mongoose.Schema.Types.ObjectId, 
   ref: "Subcategory",
  required: [true, "Please provide a product subcategory"] 
},

  category: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Category", 
    required: [true, "Please provide a product category"] 
},

  review: { 
    type: String
    
 },
  rating: { 
    type: Number
 },
  createdAt: { 
    type: Date, default: 
    Date.now 
},
  updatedAt: { 
    type: Date, 
    default: Date.now
 },
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
