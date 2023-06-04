const Movie = require('../models/movie');
const {
  OK, NOT_FOUND, FORBIDDEN, NO_CONTENT,
} = require('../utils/statuses');
const ForbiddenError = require('../errors/forbidden-error');
const NotFoundError = require('../errors/not-found-error');

module.exports.getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => res.status(OK.code).send(movies))
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const {
    country, director, duration, year, description, image,
    trailerLink, nameRU, nameEN, thumbnail, movieId,
  } = req.body;
  // console.log('movieId =', parseInt(movieId, 16), ' type =', typeof(parseInt(movieId, 16)));
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner: req.user._id,
  })
    .then((movie) => res.status(OK.code).send(movie))
    .catch(next);
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError(NOT_FOUND.message);
      }
      if (movie.owner.toString() !== req.user._id) {
        throw new ForbiddenError(FORBIDDEN.message);
      }
      movie.deleteOne()
        .then(() => res.status(NO_CONTENT.code)
          .send({ message: NO_CONTENT.message }))
        .catch(next);
    })
    .catch(next);
};
