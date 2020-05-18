var express   = require('express');
var router    = express.Router();

// Middleware
var { isAuthenticated, isNotAuthenticated, isValidImageLink, isValidProfileLink, isValidSearchLink } = require('../middleware/routeProtectors');

router.get('/', (req, res, next) => {
  res.sendFile('/index.html', { root: 'public/html' });
});

router.get('/error', (req, res, next) => {
  res.sendFile('/error.html', { root: 'public/html' });
})

router.get('/login', isNotAuthenticated, (req, res, next) => {
  res.sendFile('/login.html', { root: 'public/html' });
});

router.get('/register', isNotAuthenticated, (req, res, next) => {
  res.sendFile('/register.html', { root: 'public/html' });
});

router.get('/search', isValidSearchLink, (req, res, next) => {
  res.sendFile('/search.html', { root: 'public/html' });
});

router.get('/image', isValidImageLink, (req, res, next) => {
  res.sendFile('/image.html', { root: 'public/html' });
});

router.get('/profile', isValidProfileLink, (req, res, next) => {
  res.sendFile('/profile.html', { root: 'public/html' })
});

router.get('/terms', (req, res, next) => {
  res.sendFile('/terms.html', { root: 'public/html' })
})

router.get('/postImage', isAuthenticated, (req, res, next) => {
  res.sendFile('/postImage.html', { root: 'public/html' });
});

module.exports = router;
