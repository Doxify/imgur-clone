const debug         = require('../helpers/debug/debugHelpers');
const UserError     = require('../helpers/errors/UserError');
const multer        = require('multer');
const crypto        = require('crypto');
const PostModel     = require('../models/Post');

// Configuring Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images/uploads');
    },
    filename: (req, file, cb) => {
        let fileExtention = file.mimetype.split('/')[1];
        let randomName = crypto.randomBytes(22).toString('hex');
        cb(null, `${randomName}.${fileExtention}`);
    }
});



const PostController = {
    uploader: multer({ storage: storage }),

    createPost: function(req, res, next) {
        let fileUploaded = req.file.path;
        let fileAsThumbnail = `thumbnail-${req.file.filename}`;
        let thumbnailDestination = `${req.file.destination}/${fileAsThumbnail}`;
        let title = req.body.title;
        let description = req.body.description;
        let fk_userid = req.session.userID;
        
        PostModel.create(title, description, fileUploaded, thumbnailDestination, fk_userid)
            .then((postID) => {
                if(postID) {
                    res.status(200).json({
                        redirect: `/image?id=${postID}`
                    })
                } else {
                    res.status(200).json({
                        redirect: '/postImage'
                    })
                }
            })
            .catch((err) => {
                next(err);
            });
    },
    getPost: function(req, res, next) {
        let id = req.params.id;
        PostModel.findOne(id)
            .then((post) => {
                if(post) {
                    res.status(200).json(post);
                } else {
                    res.status(200).json({});
                }
            })
            .catch((err) => {
                next(err);
            });
    },
    getUserPosts: function(req, res, next) {
        let username = req.params.username;
        PostModel.findUserPosts(username)
            .then((posts) => {
                if(posts) {
                    res.status(200).json(posts);
                } else {
                    res.status(200).json({});
                }
            })
            .catch((err) => {
                next(err);
            });
    },
    queryPosts: function(req, res, next) {
        let keyword = req.params.keyword;
        PostModel.findMany(keyword)
            .then((posts) => {
                if(posts) {
                    res.status(200).json(posts);
                } else {
                    res.status(200).json({});
                }
            })
            .catch((err) => {
                next(err);
            });
    },
    getRecentPosts: function(req, res, next) {
        PostModel.getMostRecent(15)
            .then((posts) => {
                if(posts) {
                    res.status(200).json(posts);
                } else {
                    res.status(200).json({});
                }
            })
            .catch((err) => {
                next(err);
            });
    },
    incrementPostViewCount: function(req, res, next) {
        let id = req.body.id;
        
        PostModel.incrementViews(id)
            .then(() => {
                res.status(200);
            })
            .catch((err) => {
                next(err);
            })

    }
};

module.exports = PostController;
