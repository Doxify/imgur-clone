const db            = require('../conf/database');
const bcrypt        = require('../conf/bcrypt');
const UserError     = require('../helpers/errors/UserError');

const UserModel = {
    // Creates a user and saves it to the database
    create: function(username, email, password) {
        let baseSQL = `
            INSERT INTO users (username, email, password, created) 
            VALUES (?, ?, ?, now())
        `;
        return bcrypt.hash(password)
            .then((passwordHash) => {
                return db.query(baseSQL, [username, email, passwordHash])
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
            });
    },
    // Authenticates a user, 'userIdentifier' can be either an email or a username.
    authenticate: function(userIdentifier, password) {
        let baseSQL = `
            SELECT id,email,username,password 
            FROM users 
            WHERE email=? OR username=?
        `;
        const data = {};
        return db.query(baseSQL, [userIdentifier, userIdentifier])
            .then(([result, fields]) => {
                if(result && result.length == 1) {
                    data.userID = result[0].id;
                    data.email = result[0].email;
                    data.username = result[0].username;
                    return bcrypt.compare(result[0].password, password);
                } else {
                    throw new UserError('Invalid username and/or password.', '/login', 200);
                }
            })
            .then((hashMatch) => {
                if(hashMatch) {
                    return Promise.resolve(data);
                } else {
                    return Promise.resolve(false);
                }
            })
            .catch((err) => {
                throw err;
            });
    },
    // Returns a users's profile data
    getProfile: function(username) {
        let baseSQL = `
            SELECT u.username, u.created, 
            (SELECT COUNT(*) FROM posts p WHERE p.fk_userid=u.id) uploads,
            (SELECT COALESCE(SUM(views), 0) FROM posts p WHERE p.fk_userid=u.id) views
            FROM users u
            WHERE u.username=?
        `;
        return db.query(baseSQL, [username])
            .then(([result, fields]) => {
                return Promise.resolve(result);
            })
            .catch((err) => {
                throw err;
            });
    },
    // Checking for username presence in the database.
    usernameExists: function(username) {
        let baseSQL = `
            SELECT * 
            FROM users 
            WHERE username=?
        `;
        return db.query(baseSQL, [username])
            .then(([result, fields]) => {
                return Promise.resolve(result && result.length == 0);
            })
            .catch((err) => {
                throw err;
            });
    },
    // Checking for email presence in the database.
    emailExists: function(email) {
        let baseSQL = `
            SELECT * 
            FROM users 
            WHERE email=?
        `;
        return db.query(baseSQL, [email])
            .then(([result, fields]) => {
                return Promise.resolve(result && result.length == 0);
            })
            .catch((err) => {
                throw err;
            });
    }
}

module.exports = UserModel;