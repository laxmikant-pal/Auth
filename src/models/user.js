const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const { ObjectId } = mongoose.Schema.Types;

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  googleId: String,
  facebookId: String,
  gender: {
    type: String,
    enum: {
      values: ["male", "female", "other"],
      message: "Gender would be male | female  | other",
    },
  },

  role: {
    type: String,
    default: "customer",
  },

  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "active",
  },

  dob: {
    type: Date,
    required: false,
  },

  cart: [
    {
      product: {
        type: ObjectId,
        ref: "Product",
      },
      quantity: {
        type: Number,
        min: [1, "Quantity won't be less than 1"],
      },
      SelectedSize: {
        type: String
      },
      SelectedColor: {
        type: String,
      },
      cartedAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  
  ShippingAddress:{
    type:{
      phoneNo: {
        type: String,
        required:true
      },
      address: {
        type: String,
        required:true
      },
      city: {
        type: String,
        required:true
      },  
      state: {
        type: String,
        required:true
      },  
        postalcode: {
        type: String,
        required:true
      },
      country: {
        type: String,
        required:true
      },
    }
  },


  ShippingDetails:{
    type:Boolean,
    default:false
  },

 
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },

});

userSchema.plugin(passportLocalMongoose);


userSchema.statics.findOrCreate = function (condition) {
  const self = this;

  return self.findOne(condition)
    .then((user) => {
      if (user) {
        return user;
      } else {
        return self.create(condition);
      }
    })
    .catch((error) => {
      throw error;
    });
};

const User = mongoose.model('User', userSchema);

module.exports = User;
