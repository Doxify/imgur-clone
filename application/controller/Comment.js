const CommentModel  = require('../models/Comment');
const PostModel     = require('../models/Post');

const CommentController = {
    addCommentToPost: function(req, res, next) {
        let fk_postid = req.body.fk_postid;
        let fk_userid = req.session.userID;
        let text = req.body.text;

        // Validating presence of inputs
        if(!fk_postid || !fk_userid || !text) {
            return res.status(200).json({
                status: 'ERROR',
                message: 'Form is incomplete.'
            });
        }

        PostModel.postExists(fk_postid)
            .then((postExists) => {
                if(postExists) {
                    return CommentModel.addPostComment(fk_postid, fk_userid, text);
                } else {
                    res.status(200).json({
                        status: 'ERROR',
                        message: "A post with that ID doesn't exist"
                    });
                }
            })
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
            .catch((err) => {
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