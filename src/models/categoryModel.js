const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true 
},

  description: { 
    type: String, 
    required: true
 },

  public_id: { 
    type: String,
     required: true 
},

  status: { type: String, 
    required: true 
},

  createdAt: { 
    type: Date, 
    default: Date.now
 },
  updatedAt: { 
    type: Date, 
    default: Date.now 
},
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
