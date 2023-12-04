const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  googleId: String,
  facebookId: String,
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
