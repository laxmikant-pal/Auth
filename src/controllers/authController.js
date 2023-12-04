const passport = require('passport');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user')

// Function to generate JWT token
function generateToken(user) {
  const { _id, username } = user; 
  const token = jwt.sign({ user: { _id, username } }, process.env.JWT_SECRET);
  return token;
}

exports.login = (req, res, next) => {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    req.login(user, { session: false }, (loginError) => {
      if (loginError) {
        console.error('Login error:', loginError);
        return res.status(500).json({ message: 'Internal server error' });
      }

      const token = generateToken(user);
      return res.json({
        user: {
          _id: user._id,
          username: user.username,
        },
        token,
      });
    });
  })(req, res, next);
};
exports.googleLogin = passport.authenticate('google', {
  scope: ['profile', 'email'],
});

exports.googleCallback = (req, res, next) => {
  passport.authenticate('google',{ scope: ['profile', 'email'] , failureRedirect: '/login' }, (err, user) => {
    if (err) {
      console.error('Google authentication error:', err);
      return res.redirect('/login');
    }
    console.log('Google authentication success. User:', user);
    const token = generateToken(user);
    res.json({ user, token });
  })(req, res, next);
};

exports.facebookLogin = passport.authenticate('facebook', {
  scope: ['email'],
});

exports.facebookCallback = (req, res, next) => {
  passport.authenticate('facebook', { failureRedirect: '/login' }, (err, user) => {
    if (err) {
      // Handle error
      return res.redirect('/login');
    }

    const token = generateToken(user);
    res.json({ user, token });
  })(req, res, next);
};

// exports.emailLogin = (req, res, next) => {
//   // Your email login logic here
//   // For example, validate the email and password, and generate JWT token
//   const email = req.body.email;
//   const password = req.body.password;

//   // Replace the following with your actual email login logic
//   if (email === 'example@email.com' && password === 'password') {
//     const user = { username: 'exampleuser', email: 'example@email.com' };
//     const token = generateToken(user);
//     return res.json({ user, token });
//   } else {
//     return res.status(400).json({ message: 'Invalid credentials' });
//   }
// };
