const db        = require('../conf/database');
const sharp     = require('sharp');

const PostModel = {
    // Creates a new post and saves it to the database. Returns the id of the created post.
    create: function(title, description, photoPath, thumbnailPath, fk_userid) {
        let baseSQL = `
            INSERT
            INTO posts (title, description, photopath, thumbnail, created, fk_userid) 
            VALUE (?, ?, ?, ?, now(), ?)
        `;

        return sharp(photoPath)
            .resize(200)
            .toFile(thumbnailPath)
            .then(() => {
                return db.query(baseSQL, [title, description, photoPath, thumbnailPath, fk_userid])
            })
            .then(([result, fields]) => {
                if(result && result.affectedRows) {
                    return Promise.resolve(result.insertId);
                } else {
                    return Promise.resolve(false);
                }
            })
            .catch((err) => {
                throw err;
            })
    },
    // Returns the post with the given id.
    findOne: function(id) {
        let baseSQL = `
            SELECT p.id, p.title, p.description, p.photopath, p.created, p.views, u.username,
            (SELECT COUNT(*) FROM comments c WHERE c.fk_postid=p.id) comments
            FROM posts p JOIN users u ON p.fk_userid=u.id
            WHERE p.id=?
        `;

        return db.query(baseSQL, [id])
            .then(([result, fields]) => {
                if(result && result.length > 0) {
                    return Promise.resolve(result[0]);
                } else {
                    return Promise.resolve(false);
                }
            })
            .catch((err) => {
                throw err;
            });
    },
    // Returns posts that contain keyword in their titles.
    findMany: function(keyword) {
        let baseSQL = `
            SELECT p.id, p.title, p.description, p.thumbnail, p.created, p.views, u.username,
            (SELECT COUNT(*) FROM comments c WHERE c.fk_postid=p.id) comments
            FROM posts p JOIN users u on p.fk_userid=u.id
            WHERE title LIKE CONCAT('%', ?, '%')
            ORDER BY p.created DESC
        `;

        return db.query(baseSQL, [keyword])
            .then(([result, fields]) => {
                if(result && result.length > 0) {
                    return Promise.resolve(result);
                } else {
                    return Promise.resolve(false);
                }
            })
            .catch((err) => {
                throw err;
            });
    },
    // Returns posts made by the given username
    findUserPosts: function(username) {
        let baseSQL = `
            SELECT p.id, p.title, p.description, p.thumbnail, p.created, p.views, u.username,
            (SELECT COUNT(*) FROM comments c WHERE c.fk_postid=p.id) comments
            FROM posts p JOIN users u on p.fk_userid=u.id
            WHERE u.username=?
            ORDER BY p.created DESC
        `;

        return db.query(baseSQL, [username])
            .then(([result, fields]) => {
                if(result && result.length > 0) {
                    return Promise.resolve(result);
                } else {
                    return Promise.resolve(false);
                }
            })
            .catch((err) => {
                throw err;
            });
    },
    // Returns the x most recent posts uploaded to the database.
    getMostRecent: function(x) {
        let baseSQL = `
            SELECT p.id, p.title, p.description, p.thumbnail, p.created, p.views, u.username,
            (SELECT COUNT(*) FROM comments c WHERE c.fk_postid=p.id) comments
            FROM posts p JOIN users u on p.fk_userid=u.id
            ORDER BY created DESC LIMIT ?
        `;

        return db.query(baseSQL, [x])
            .then(([result, fields]) => {
                if(result && result.length > 0) {
                    return Promise.resolve(result);
                } else {
                    return Promise.resolve(false);
                }
            })
            .catch((err) => {
                throw err;
            });
    },
    // Increases the view count on the given post
    incrementViews: function(id) {
        let baseSQL = "UPDATE posts SET views = views + 1 WHERE id=?";

        return db.query(baseSQL, [id])
            .then(([result, fields]) => {
                return Promise.resolve();
            })
            .catch((err) => {
                throw err;
            })
    },
    // Checks if a post with the given id exists
    postExists: function(id) {
        let baseSQL = `
            SELECT * 
            FROM posts 
            WHERE id=?
        `;
        return db.query(baseSQL, [id])
            .then(([result, fields]) => {
                return Promise.resolve(result && result.length == 1);
            })
            .catch((err) => {
                throw err;
            });
    }
};

module.exports = PostModel;
