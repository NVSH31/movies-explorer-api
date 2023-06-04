const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { JWT_SECRET_DEV } = require('../utils/const');
const {
  OK, CREATE, NOT_FOUND,
} = require('../utils/statuses');
const NotFoundError = require('../errors/not-found-error');

const { SECRET_KEY = JWT_SECRET_DEV } = process.env;

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password, next)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        SECRET_KEY,
        { expiresIn: '7d' },
      );
      res
        .status(OK.code)
        .send({ token });
    })
    .catch(next);
};

module.exports.getMe = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (user) {
        return res.status(OK.code).send(user);
      }
      throw new NotFoundError(NOT_FOUND.message);
    })
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const {
    email, password, name,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      email, password: hash, name,
    }))
    .then((user) => {
      res.status(CREATE.code).send({
        email: user.email,
        name: user.name,
      });
    })
    .catch(next);
};

module.exports.updateMe = (req, res, next) => {
  const body = { name: req.body.name, email: req.body.email };
  User.findByIdAndUpdate(
    req.user._id,
    body,
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (user) {
        return res.status(OK.code).send(user);
      }
      throw new NotFoundError(NOT_FOUND.message);
    })
    .catch(next);
};
