'use strict';
const db            = require('../conf/database');
const bcrypt        = require('../conf/bcrypt');
const UserError     = require('../helpers/errors/UserError');

class User {
    save() {
        
    }

    // Authenticates a user, 'displayName' can be either an email or a username.
    authenticate(displayName, password) {
        return new Promise((resolve, reject) => {
            let baseSQL = `
                SELECT id,email,username,password 
                FROM users 
                WHERE email=? OR username=?
            `;
            const data = {};

            db.query(baseSQL, [displayName, displayName])
                .then(([result, fields]) => {
                    if(result && result.length == 0) {
                        // Email/Username not found in the database.
                        reject(new UserError('User cold not be authenticated', '/login', 200));
                    }

                    let hash = result[0].password;
                    
                    data.userID = result[0].id;
                    data.email = result[0].email;
                    data.username = result[0].username;

                    return bcrypt.compare(hash, password);
                })
                .then((result) => {
                    if(!result) {
                        reject(new UserError('User could not be authenticated', '/login', 200));
                    }
                    
                    // User successfully authenticated.
                    resolve(data);
                })
                .catch((err) => {
                    reject(err);
                })
        })
    }
}

module.exports = User;