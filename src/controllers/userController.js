const User = require('../models/user');
const bcrypt = require('bcrypt');

exports.register = async (req, res) => {
  try {
    const newUser = new User({ username: req.body.username });

    await User.register(newUser, req.body.password);

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
