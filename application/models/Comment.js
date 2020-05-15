'use strict';

const db        = require('../conf/database');
const debug         = require('../helpers/debug/debugHelpers');

class Comment {

    getPostComments(postID) {
        return new Promise((resolve, reject) => {
            let baseSQL = `
                SELECT c.text, c.created, u.username
                FROM comments c JOIN users u ON c.fk_userid=u.id
                WHERE c.fk_postid=?
                ORDER BY created DESC
            `;

            db.query(baseSQL, [postID])
                .then(([result, fields]) => {
                    resolve(result);
                })
                .catch((err) => {
                    reject(err);
                })
        })
    }
    
    addComment(postID, userID, comment) {
        return new Promise((resolve, reject) => {
            let baseSQL = `
                INSERT INTO comments (fk_postid, fk_userid, text, created)
                VALUE (?, ?, ?, now())
            `;

            db.query(baseSQL, [postID, userID, comment])
                .then(([result, fields]) => {
                    if(result && result.affectedRows == 1) {
                        resolve();
                    } else {
                        reject(new Error('Error while adding comment to the database.'));
                    }
                }).catch((err) => {
                    reject(err);
                })
        })
    }
}

module.exports = Comment;