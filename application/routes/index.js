var express = require('express');
var router = express.Router();

router.get('/', (req, res, next) => {
  res.sendFile('/index.html', { root: 'public/html' });
});

router.get('/login', (req, res, next) => {
  res.sendFile('/login.html', { root: 'public/html' });
});

router.get('/register', (req, res, next) => {
  res.sendFile('/register.html', { root: 'public/html' });
});

router.get('/postImage', (req, res, next) => {
  res.sendFile('/postImage.html', { root: 'public/html' });
});

router.get('/search', (req, res, next) => {
  res.sendFile('/search.html', { root: 'public/html' });
});

module.exports = router;
