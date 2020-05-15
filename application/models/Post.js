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
            let baseSQL = `
                INSERT
                INTO posts (title, description, photopath, thumbnail, created, fk_userid) 
                VALUE (?, ?, ?, ?, now(), ?)
            `;
            
            db.query(baseSQL, [this.title, this.description, this.photoPath, this.thumbnailPath, this.authorID])
                .then(([result, fields]) => {
                    if(result && result.affectedRows > 0) {
                        // Uploade Success
                        resolve(result.insertId);
                    } else {
                        // Upload Failed
                        reject('Post was not created');
                    }
                })
                .catch((err) => { reject(err); })
        })
    }

    // Returns a post if it's photoPath contains postFileName.
    findOne(id) {
        return new Promise((resolve, reject) => {
            let baseSQL = `
                SELECT p.id, p.title, p.description, p.photopath, p.created, p.views, u.username
                FROM posts p JOIN users u ON p.fk_userid=u.id
                WHERE p.id=?
            `;
            // let commentsSQL = `
            //     SELECT COUNT(*)
            //     FROM comments c
            //     WHERE c.fk_postid=?
            // `;

            db.query(baseSQL, [id])
                .then(([result, fields]) => {
                    if(result && result.length == 0) {
                        reject(new Error('Photo not found.'));
                    }

                    let data = result[0];
                    resolve(data);
                })
                .catch((err) => { reject(err); });
        });
    }

    // Returns posts that contain keyword in their titles.
    findMany(keyword) {
        return new Promise((resolve, reject) => {
            let baseSQL = `
                SELECT p.id, p.title, p.description, p.thumbnail, p.created, p.views, u.username,
                (SELECT COUNT(*) FROM comments c WHERE c.fk_postid=p.id) comments
                FROM posts p JOIN users u on p.fk_userid=u.id
                WHERE title LIKE CONCAT('%', ?, '%')
            `;

            db.query(baseSQL, [keyword])
                .then(([result, fields]) => {
                    resolve(result);
                })
                .catch((err) => { reject(err); })
        })
    }

    // Returns the 10 latest photos uploaded
    getMostRecent() {
        return new Promise((resolve, reject) => {
            let baseSQL = `
                SELECT p.id, p.title, p.description, p.thumbnail, p.created, p.views, u.username,
                (SELECT COUNT(*) FROM comments c WHERE c.fk_postid=p.id) comments
                FROM posts p JOIN users u on p.fk_userid=u.id
                ORDER BY created DESC LIMIT 15
            `;

            db.query(baseSQL)
                .then(([result, fields]) => {
                    resolve(result);
                })
                .catch((err) => {
                    reject(err);
                })
        })
    }

    incrementViews(id) {
        // TODO: Clean this up
        return new Promise((resolve, reject) => {
            let baseSQL = "UPDATE posts SET views = views + 1 WHERE id=?";
            let getViewCountSQL = "SELECT views FROM posts WHERE id=?";

            db.query(baseSQL, [id])
                .then(([result, fields]) => {
                    if(result && result.affectedRows > 0) {
                        return db.query(getViewCountSQL, [id]);
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
