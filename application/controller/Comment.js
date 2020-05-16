const CommentModel  = require('../models/Comment');

const CommentController = {
    addCommentToPost: function(req, res, next) {
        let fk_postid = req.body.fk_postid;
        let fk_userid = req.session.userID;
        let text = req.body.text;

        CommentModel.addPostComment(fk_postid, fk_userid, text)
            .then((commentWasPosted) => {
                if(commentWasPosted) {
                    res.status(200).json({
                        status: 'OK',
                        message: 'Comment was successfully posted'
                    });
                } else {
                    res.status(200).json({
                        status: 'ERROR',
                        message: 'Comment was not posted'
                    });
                }
            })
            .then((err) => {
                next(err);
            });
    },
    getPostComments: function(req, res, next) {
        let postId = req.params.postId;

        CommentModel.getPostComments(postId)
            .then((data) => {
                res.status(200).json(data);
            })
            .catch((err) => {
                next(err);
            });
    }
};

module.exports = CommentController;