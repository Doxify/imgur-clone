const express           = require('express');
const router            = express.Router();
const CommentController = require('../controller/Comment');

router.post('/add', (req, res, next) => {
    CommentController.addCommentToPost(req, res, next);
});

router.get('/get/:postId', (req, res, next) => {
    CommentController.getPostComments(req, res, next);
});

module.exports = router;