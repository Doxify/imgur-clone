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

const validMimeTypes = [
    'image/gif',
    'image/jpeg',
    'image/png'
];

const uploader = multer({ 
    storage: storage,
    fileFilter: function(req, file, cb) {
        if(!validMimeTypes.includes(file.mimetype)) {
            return cb(new Error('Only image files are allowed!'), false);
        }
        cb(null, true);
    }
});

const PostController = {
    createPost: function(req, res, next) {
        uploader.single('uploadImage')(req, res, (err) => {
            if(err) {
                res.status(200).json({
                    status: 'ERROR',
                    message: 'Only images/gifs are allowed.',
                    redirect: '/postImage'
                });
            } else {
                let title = req.body.title;
                let description = req.body.description;
                let fk_userid = req.session.userID;
                let fileUploaded = req.file.path;
                let fileAsThumbnail = `thumbnail-${req.file.filename}`;
                let thumbnailDestination = `${req.file.destination}/${fileAsThumbnail}`;
                
                // Checking for title and description presence.
                if(!title || !description) {
                    return res.status(200).json({
                        status: 'ERROR',
                        message: 'Please include a title and description.',
                        redirect: '/postImage'
                    });
                }

                // Making sure the user is authenticated.
                if(!fk_userid) {
                    return res.status(200).json({
                        status: 'ERROR',
                        message: 'User is not authenticated',
                        redirect: '/login'
                    });
                }

                PostModel.create(title, description, fileUploaded, thumbnailDestination, fk_userid)
                    .then((postID) => {
                        if(postID) {
                            res.status(200).json({
                                status: 'OK',
                                message: 'Post uploaded successfully.',
                                redirect: `/image?id=${postID}`
                            })
                        } else {
                            res.status(200).json({
                                status: 'ERROR',
                                message: 'Post upload failed, try again.',
                                redirect: '/postImage'
                            })
                        }
                    })
                    .catch((err) => {
                        console.log(err.message);
                        next(err);
                    });
            }
        })
    },
    getPost: function(req, res, next) {
        let id = req.params.id;

        PostModel.incrementViews(id)
            .then(() => {
                return PostModel.findOne(id)
            })
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
    }
};

module.exports = PostController;
