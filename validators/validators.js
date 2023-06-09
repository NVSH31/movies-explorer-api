const { Joi } = require('celebrate');
const { url } = require('../utils/const');

const validateName = Joi.string().min(2).max(30);
const validateEmail = Joi.string().required().email();
const validatePassword = Joi.string().required().min(6);

const validateMovieStr = Joi.string().required();
const validateMovieDur = Joi.number().integer().min(0).required();
const validateMovieId = Joi.number().integer().min(0).required();
const validateId = Joi.string().hex().required();
const validateMovieLink = Joi.string().required().regex(url).min(2);

module.exports = {
  validateName,
  validateEmail,
  validatePassword,
  validateMovieStr,
  validateMovieDur,
  validateMovieId,
  validateId,
  validateMovieLink,
};
