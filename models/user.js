const mongoose = require('mongoose');
const isEmail = require('validator/lib/isEmail');
const bcrypt = require('bcryptjs');
const BadRequestError = require('../errors/bad-request-error');
const UnauthorizedError = require('../errors/unauthorized-error');
const { UNAUTHORIZED, BAD_REQUEST } = require('../utils/statuses');
const {
  FIELD_REQUIRE, FIELD_EMAIL,
  FIELD_MIN_2, FIELD_MIN_6, FIELD_MAX_30,
} = require('../utils/const');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, FIELD_REQUIRE],
    unique: true,
    validate: [isEmail, FIELD_EMAIL],
  },
  password: {
    type: String,
    required: [true, FIELD_REQUIRE],
    minlength: [6, FIELD_MIN_6],
    select: false,
  },
  name: {
    type: String,
    required: [true, FIELD_REQUIRE],
    minlength: [2, FIELD_MIN_2],
    maxlength: [30, FIELD_MAX_30],
  },
});

userSchema.statics.findUserByCredentials = function (email, password, next) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError(UNAUTHORIZED.message);
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new BadRequestError(BAD_REQUEST.message);
          }
          return user;
        });
    })
    .catch(next);
};

module.exports = mongoose.model('user', userSchema);
