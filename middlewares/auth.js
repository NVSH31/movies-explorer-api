const jwt = require('jsonwebtoken');
const { UNAUTHORIZED } = require('../utils/statuses');
const { JWT_SECRET_DEV } = require('../utils/const');

const { SECRET_KEY = JWT_SECRET_DEV } = process.env;

module.exports.auth = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res
      .status(UNAUTHORIZED.code)
      .send({ message: UNAUTHORIZED.message });
  }

  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, SECRET_KEY);
  } catch (err) {
    return res
      .status(UNAUTHORIZED.code)
      .send({ message: UNAUTHORIZED.message });
  }

  req.user = payload;

  return next();
};
