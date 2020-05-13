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
                        debug.successPrint('post was created.')
                        resolve();
                    } else {
                        // Upload Failed
                        debug.errorPrint('post was not created.')
                        reject('Post was not created');
                    }
                })
                .catch((err) => { reject(err); })
        })
    }

    getPost(fileName) {
        return new Promise((resolve, reject) => {
            let baseSQL = "SELECT * FROM posts WHERE photopath LIKE CONCAT('%', ?, '%')";
            db.query(baseSQL, [fileName])
                .then(([result, fields]) => {
                    if(result && result.length == 0) {
                        debug.errorPrint('Could not find a post with that name.');
                        reject(new Error('Photo not found.'));
                    }

                    let data = result[0];
                    this.authorID = data.fk_userid;

                    resolve(data);
                })
                .catch((err) => { reject(err); });
        });
    }

    getAuthor() {
        return new Promise((resolve, reject) => {
            if(!this.authorID) {
                reject(new Error('Author data was retrieved before post data, retrieve post first.'));
            }

            let baseSQL = "SELECT username FROM users WHERE id=?";
            db.query(baseSQL, [this.authorID])
                .then(([result, fields]) => {
                    if(result && result.length == 0) {
                        debug.errorPrint('Could not find a user with that id.');
                        reject(new Error('User does not exist.'));
                    }

                    let data = result[0];
                    resolve(data);
                })
                .catch((err) => { reject(err); });
        });
    }
};

module.exports = Post;
