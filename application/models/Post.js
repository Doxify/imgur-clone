'use strict';

const db        = require('../conf/database');
const sharp     = require('sharp');
const debug         = require('../helpers/debug/debugHelpers');


class Post {
    constructor(title, description, photoPath, thumbnailPath, fk_userid) {
        this.title = title;
        this.description = description;
        this.photoPath = photoPath;
        this.thumbnailPath = thumbnailPath;
        this.authorID = fk_userid;
    }

    generateThumbnail() {
        sharp(this.photoPath)
            .resize(200)
            .toFile(this.thumbnailPath);
    }

    saveToDatabase() {
        return new Promise((resolve, reject) => {
            let baseSQL = 'INSERT INTO posts (title, description, photopath, thumbnail, created, fk_userid) VALUE (?, ?, ?, ?, now(), ?)';
            
            db.query(baseSQL, [this.title, this.description, this.photoPath, this.thumbnailPath, this.authorID])
                .then(([result, fields]) => {
                    if(result && result.affectedRows > 0) {
                        // Uploade Success
                        resolve();
                    } else {
                        // Upload Failed
                        reject('Post was not created');
                    }
                })
                .catch((err) => { reject(err); })
        })
    }

    getPost(postFileName) {
        return new Promise((resolve, reject) => {
            let baseSQL = "SELECT * FROM posts WHERE photopath LIKE CONCAT('%', ?, '%')";

            db.query(baseSQL, [postFileName])
                .then(([result, fields]) => {
                    if(result && result.length == 0) {
                        reject(new Error('Photo not found.'));
                    }

                    let data = result[0];
                    this.authorID = data.fk_userid;

                    resolve(data);
                })
                .catch((err) => { reject(err); });
        });
    }

    getAuthor(postID) {
        return new Promise((resolve, reject) => {
            let baseSQL = "SELECT username FROM users WHERE id=?";

            db.query(baseSQL, [postID])
                .then(([result, fields]) => {
                    if(result && result.length == 1) {
                        let data = result[0];
                        resolve(data);
                    } else {
                        debug.errorPrint('Could not find a user with that id.');
                        reject(new Error('User does not exist.'));
                    }
                })
                .catch((err) => { reject(err); });
        });
    }

    incrementViews(postID) {
        return new Promise((resolve, reject) => {
            let baseSQL = "UPDATE posts SET views = views + 1 WHERE id=?";
            let getViewCountSQL = "SELECT views FROM posts WHERE id=?";

            db.query(baseSQL, [postID])
                .then(([result, fields]) => {
                    if(result && result.affectedRows > 0) {
                        return db.query(getViewCountSQL, [postID]);
                    } else {
                        reject(new Error('failed to increment view counter.'));
                    }
                })
                .then(([result, fields]) => {
                    resolve(result[0].views);
                }).catch((err) => { reject(err); });
        })

    }
};

module.exports = Post;
