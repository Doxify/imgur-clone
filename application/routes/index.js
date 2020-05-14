var express   = require('express');
var router    = express.Router();

// Middleware
var authMiddleware = require('../middleware/routeProtectors').isAuthenticated;
var validImageMiddleware = require('../middleware/routeProtectors').isValidImageLink;


router.get('/', (req, res, next) => {
  res.sendFile('/index.html', { root: 'public/html' });
});

router.get('/login', (req, res, next) => {
  res.sendFile('/login.html', { root: 'public/html' });
});

router.get('/register', (req, res, next) => {
  res.sendFile('/register.html', { root: 'public/html' });
});

router.get('/search', (req, res, next) => {
  res.sendFile('/search.html', { root: 'public/html' });
});

router.get('/image', validImageMiddleware, (req, res, next) => {
  res.sendFile('/image.html', { root: 'public/html' });
});

router.get('/profile', (req, res, next) => {
  res.sendFile('/profile.html', { root: 'public/html' })
});

router.get('/terms', (req, res, next) => {
  res.sendFile('/terms.html', { root: 'public/html' })
})

router.get('/postImage', authMiddleware, (req, res, next) => {
  res.sendFile('/postImage.html', { root: 'public/html' });
});

module.exports = router;
