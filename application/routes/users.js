const express        = require('express');
const router         = express.Router();
const UserController = require('../controller/User');

router.post('/create', (req, res, next) => {
    UserController.createUser(req, res, next);
});

router.post('/login', (req, res, next) => {
    UserController.login(req, res, next);
});

router.get('/getProfile/:username', (req, res, next) => {
    UserController.getProfile(req, res, next);
});

router.post('/logout', (req, res, next) => {
    UserController.logout(req, res, next);
});

module.exports = router;
