const { celebrate, Joi } = require('celebrate');

const router = require('express').Router();
const {
  validateMovieStr, validateMovieDur,
  validateMovieId, validateMovieLink,
} = require('../validators/validators');
const {
  getMovies, createMovie, deleteMovie,
} = require('../controllers/movies');
const { auth } = require('../middlewares/auth');

router.get('/', auth, getMovies);

router.post('/', celebrate({
  body: Joi.object().keys({
    country: validateMovieStr,
    director: validateMovieStr,
    duration: validateMovieDur,
    year: validateMovieStr,
    description: validateMovieStr,
    image: validateMovieLink,
    trailerLink: validateMovieLink,
    nameRU: validateMovieStr,
    nameEN: validateMovieStr,
    thumbnail: validateMovieLink,
    movieId: validateMovieId,
  }),
}), auth, createMovie);

router.delete('/:movieId', celebrate({
  params: Joi.object().keys({
    movieId: validateMovieId,
  }),
}), auth, deleteMovie);

module.exports = router;
