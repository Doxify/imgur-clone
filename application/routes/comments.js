const express       = require('express');
const router        = express.Router();
const db            = require('../conf/database');
const debug         = require('../helpers/debug/debugHelpers');
const Comment       = require('../models/Comment');

router.post('/add', (req, res, next) => {
    let fk_postid = req.body.fk_postid;
    let fk_userid = req.session.userID;
    let text = req.body.text;
    let comment = new Comment();

    comment.addComment(fk_postid, fk_userid, text)
        .then(() => {
            res.status(200).json({
                status: 'OK',
                message: 'Comment was successfully posted.'
            });
        })
        .catch((err) => {
            console.log(err.message);
            next(err);
        });
});

router.get('/get/:postID', (req, res, next) => {
    let postID = req.params.postID;
    let comment = new Comment();

    comment.getPostComments(postID)
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((err) => {
            console.log(err.message);
            next(err);
        });
});

module.exports = router;