const jwt = require('jsonwebtoken');

const { JWT_KEY = 'secret' } = process.env;

function auth(req, res) {
  const authorization = req.headers.authorization;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    console.log('Необходима авторизация')
  }

  const token = authorization.replace('Bearer ', '');

  let payload;

  try {
    payload = jwt.verify(token, JWT_KEY);
  } catch {
    console.log('Необходма авторизация')
  }

  req.user = payload;
}

module.exports = { auth };