const db        = require('../conf/database');

const CommentModel = {
    // Returns comments for the given post.
    getPostComments: function(postId) {
        let baseSQL = `
            SELECT c.text, c.created, u.username
            FROM comments c JOIN users u ON c.fk_userid=u.id
            WHERE c.fk_postid=?
            ORDER BY created DESC
        `;

        return db.query(baseSQL, [postId])
            .then(([result, fields]) => {
                return Promise.resolve(result);
            })
            .catch((err) => {
                throw err;
            })
    },
    // Adds a comment to the database.
    addPostComment: function(postId, userId, comment) {
        let baseSQL = `
            INSERT INTO comments (fk_postid, fk_userid, text, created)
            VALUE (?, ?, ?, now())
        `;

        return db.query(baseSQL, [postId, userId, comment])
            .then(([result, fields]) => {
                if(result && result.affectedRows == 1) {
                    return Promise.resolve(true);
                } else {
                    return Promise.resolve(false);
                }
            })
            .catch((err) => {
                throw err;
            })
    }
};
module.exports = CommentModel;