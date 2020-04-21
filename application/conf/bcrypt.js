const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = {
    hash: (password) => {
        return new Promise((resolve, reject) => {
            bcrypt.hash(password, saltRounds, (err, hash) => {
                if(err) reject('Error occurred while generating a password hash.');
                resolve(hash);
            });
        });
    },
    compare: (hash, password) => {
        return new Promise((resolve, reject) => {
            bcrypt.compare(password, hash, (err, result) => {
                if(err) reject('Error occurred while comparing password/hash.');
                resolve(result);
            });
        });
    }
}