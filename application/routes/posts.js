const express       = require('express');
const router        = express.Router();
const db            = require('../conf/database');
const debug         = require('../helpers/debug/debugHelpers');
const multer        = require('multer');
const crypto        = require('crypto');
const Post          = require('../models/Post');


// Configuring Multer
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images/uploads');
    },
    filename: (req, file, cb) => {
        let fileExtention = file.mimetype.split('/')[1];
        let randomName = crypto.randomBytes(22).toString('hex');
        cb(null, `${randomName}.${fileExtention}`);
    }
});

var uploader = multer({ storage: storage });

router.post('/create', uploader.single('uploadImage'), (req, res, next) => {
    let fileUploaded = req.file.path;
    let fileAsThumbnail = `thumbnail-${req.file.filename}`;
    let thumbnailDestination = `${req.file.destination}/${fileAsThumbnail}`;
    let title = req.body.title;
    let description = req.body.description;
    let fk_userid = req.session.userID;
    let post = new Post(title, description, fileUploaded, thumbnailDestination, fk_userid);

    post.generateThumbnail();
    post.saveToDatabase()
        .then(() => {
            res.status(200).json({
                status: "OK",
                message: 'post was created',
                redirect: `/image?id=${req.file.filename.split('.')[0]}`
            })
        })
        .catch((err) => {
            next(err);
        })
});

router.get('/search/:keyword', (req, res, next) => {
    let keyword = req.params.keyword;
    let post = new Post();

    post.findMany(keyword)
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((err) => { 
            next(err); 
        });
});

router.get('/get/:id', (req, res, next) => {
    let id = req.params.id;
    let post = new Post();
    const response = {};

    post.findOne(id)
        .then((data) => {
            response.status = 'OK';
            response.title = data.title;
            response.description = data.description;
            response.location = data.photopath.split('public/')[1];
            response.created = data.created;
            response.id = data.id;
            response.fk_userid = data.fk_userid;
            response.author = data.username;
            
            // Increment the amount of times this post has been viewed.
            return post.incrementViews(id);
        })
        .then((viewCount) => {
            response.views = viewCount;
            return res.status(200).send(response);
        })
        .catch((err) => {
            console.log(err.message);
            next(err);
        });
});

router.get('/getRecentPosts', (req, res, next) => {
    let post = new Post();

    post.getMostRecent()
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((err) => { 
            next(err); 
        });
});

module.exports = router;