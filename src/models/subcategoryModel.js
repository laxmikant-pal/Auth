const mongoose = require('mongoose');

const subcategorySchema = new mongoose.Schema({
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
  status: { 
    type: String, 
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

const Subcategory = mongoose.model('Subcategory', subcategorySchema);

module.exports = Subcategory;
