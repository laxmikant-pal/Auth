const User = require('../models/user');
const bcrypt = require('bcrypt');

exports.register = async (req, res) => {
    try {
      // Create a new user with only the required fields for passport-local-mongoose
      const newUser = new User({ username: req.body.username });
  
      // Use passport-local-mongoose to register the user with the password
      await User.register(newUser, req.body.password);
  
      // Now, update the additional fields
      const user = await User.findOne({ username: req.body.username });
      if (user) {
        user.gender = req.body.gender;
        user.role = req.body.role;
        user.status = req.body.status;
        user.dob = req.body.dob;
        user.cart = req.body.cart;
        user.ShippingAddress = req.body.ShippingAddress;
        user.ShippingDetails = req.body.ShippingDetails;
  
        // Save the updated user
        await user.save();
      }
    res.json({ message: 'Registration successful' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.displayUser = async (req, res) => {
  try {
    const user = await User.find();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.removeUser = async (req, res) => {
  try {
    const userId = req.params.id;
    await User.findByIdAndDelete(userId);

    res.json({ message: 'User removed successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const userId = req.params.id;

    await User.findByIdAndUpdate(userId, { $set: req.body });

    res.json({ message: 'User updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// userController.js
exports.forgotPassword = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ error: 'User not found with this email address' });
    }

    // Set the new password using Passport's setPassword method
    user.setPassword(password, async () => {
      // Save the user with the updated password
      await user.save();

      res.json({ message: 'Password reset successful' });
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
