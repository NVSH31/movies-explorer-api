const { celebrate, Joi } = require('celebrate');
const router = require('express').Router();
const userRouter = require('./users');
const movieRouter = require('./movies');
const {
  validateName, validateEmail, validatePassword,
} = require('../validators/validators');
const { createUser, login } = require('../controllers/users');
const NotFoundError = require('../errors/not-found-error');
const { NOT_FOUND } = require('../utils/statuses');

router.post('/signup', celebrate({
  body: Joi.object().keys({
    email: validateEmail,
    password: validatePassword,
    name: validateName,
  }),
}), createUser);
router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: validateEmail,
    password: validatePassword,
  }),
}), login);

router.use('/users', userRouter);
router.use('/movies', movieRouter);
router.use('*', (req, res, next) => {
  next(new NotFoundError(NOT_FOUND.message));
});

module.exports = router;
