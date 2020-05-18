const express        = require('express');
const router         = express.Router();
const PostController = require('../controller/Post');

router.post('/create', (req, res, next) => {
    PostController.createPost(req, res, next);
});

router.get('/search/:keyword', (req, res, next) => {
    PostController.queryPosts(req, res, next);
});

router.get('/get/:id', (req, res, next) => {
    PostController.getPost(req, res, next);
});

router.get('/getUserPosts/:username', (req, res, next) => {
    PostController.getUserPosts(req, res, next);
});

router.get('/getRecentPosts', (req, res, next) => {
    PostController.getRecentPosts(req, res, next);
});

module.exports = router;