var express   = require('express');
var router    = express.Router();

// Middleware
var isAuthenticated = require('../middleware/routeProtectors').isAuthenticated;
var isNotAuthenticated = require('../middleware/routeProtectors').isNotAuthenticated;
var isValidImageLink = require('../middleware/routeProtectors').isValidImageLink;

router.get('/', (req, res, next) => {
  res.sendFile('/index.html', { root: 'public/html' });
});

router.get('/login', isNotAuthenticated, (req, res, next) => {
  res.sendFile('/login.html', { root: 'public/html' });
});

router.get('/register', isNotAuthenticated, (req, res, next) => {
  res.sendFile('/register.html', { root: 'public/html' });
});

router.get('/search', (req, res, next) => {
  res.sendFile('/search.html', { root: 'public/html' });
});

router.get('/image', isValidImageLink, (req, res, next) => {
  res.sendFile('/image.html', { root: 'public/html' });
});

router.get('/profile', (req, res, next) => {
  res.sendFile('/profile.html', { root: 'public/html' })
});

router.get('/terms', (req, res, next) => {
  res.sendFile('/terms.html', { root: 'public/html' })
})

router.get('/postImage', isAuthenticated, (req, res, next) => {
  res.sendFile('/postImage.html', { root: 'public/html' });
});

module.exports = router;
