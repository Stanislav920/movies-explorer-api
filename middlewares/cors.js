const allowedCors = [
  'https://movies360.nomoredomainsicu.ru',
  'http://movies360.nomoredomainsicu.ru',
  'localhost:3000',
  'https://api.movies360.nomoredomainsicu.ru',
  'http://api.movies360.nomoredomainsicu.ru',
];

const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

module.exports = (req, res, next) => {
  const { origin } = req.headers;

  const { method } = req;

  const requestHeaders = req.headers['access-control-request-headers'];

  res.header('Access-Control-Allow-Credentials', true);

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }

  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }

  return next();
};
