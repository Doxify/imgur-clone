const express       = require('express');
const router        = express.Router();
const db            = require('../conf/database');
const debug         = require('../helpers/debug/debugHelpers');
const multer        = require('multer');
const sharp         = require('sharp');
const crypto        = require('crypto');


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

    // Resizes the image for thumbnail
    sharp(fileUploaded)
        .resize(200)
        .toFile(thumbnailDestination)
        .then(() => {
            // Uploads into MySQL
            let baseSQL = 'INSERT INTO posts (title, description, photopath, thumbnail, created, fk_userid) VALUE (?, ?, ?, ?, now(), ?)';
            return db.execute(baseSQL, [title, description, fileUploaded, thumbnailDestination, fk_userid]);
        })
        .then(([result, field]) => {
            if(result && result.affectedRows > 0) {
                // Uploade Success
                debug.successPrint('post was created.')
                res.status(200).json({
                    status: "OK",
                    message: 'post was created',
                    redirect: `/image/${req.file.filename.split('.')[0]}`
                })
            } else {
                // Upload Failed
                debug.errorPrint('post was not created.')
                res.status(200).json({
                    status: "OK",
                    message: 'post was not created',
                    redirect: '/postimage'
                })
            }
        })
        .catch((err) => {
            next(err);
        });
    console.log(req.file);
});

module.exports = router;