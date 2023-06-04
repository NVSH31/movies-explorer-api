const mongoose = require('mongoose');
const isURL = require('validator/lib/isURL');
const { FIELD_REQUIRE, FIELD_URL } = require('../utils/const');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: [true, FIELD_REQUIRE],
  },
  director: {
    type: String,
    required: [true, FIELD_REQUIRE],
  },
  duration: {
    type: Number,
    required: [true, FIELD_REQUIRE],
  },
  year: {
    type: String,
    required: [true, FIELD_REQUIRE],
  },
  description: {
    type: String,
    required: [true, FIELD_REQUIRE],
  },
  image: {
    type: String,
    required: [true, FIELD_REQUIRE],
    validate: [isURL, FIELD_URL],
  },
  trailerLink: {
    type: String,
    required: [true, FIELD_REQUIRE],
    validate: [isURL, FIELD_URL],
  },
  thumbnail: {
    type: String,
    required: [true, FIELD_REQUIRE],
    validate: [isURL, FIELD_URL],
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: [true, FIELD_REQUIRE],
  },
  movieId: {
    type: Number,
    required: [true, FIELD_REQUIRE],
  },
  nameRU: {
    type: String,
    required: [true, FIELD_REQUIRE],
  },
  nameEN: {
    type: String,
    required: [true, FIELD_REQUIRE],
  },
});

module.exports = mongoose.model('movie', movieSchema);
