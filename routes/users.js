const { celebrate, Joi } = require('celebrate');

const router = require('express').Router();

const {
  validateName, validateEmail,
} = require('../validators/validators');
const {
  updateMe, getMe,
} = require('../controllers/users');
const { auth } = require('../middlewares/auth');

router.get('/me', auth, getMe);

router.patch('/me', auth, celebrate({
  body: Joi.object().keys({
    name: validateName,
    email: validateEmail,
  }),
}), updateMe);

module.exports = router;
