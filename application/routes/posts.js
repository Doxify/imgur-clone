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
// uploader.array

router.post('/create', uploader.single('uploadImage'), (req, res, next) => {
    console.log(req.body);
    console.log(req.file);
    res.send('file uploaded');
});

module.exports = router;