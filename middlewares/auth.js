const jwt = require('jsonwebtoken');

const { JWT_KEY = 'secret' } = process.env;
const UnauthorizedError = require('../errors/unauthorized-err');

function auth(req, res, next) {
  const authorization = req.headers.authorization;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorizedError('Необходима авторизация')
  }

  const token = authorization.replace('Bearer ', '')

  let payload;

  try {
    payload = jwt.verify(token, JWT_KEY);
  } catch {
    throw new UnauthorizedError('Необходима авторизация')
  }

  req.user = payload;

  next();
}

module.exports = { auth };