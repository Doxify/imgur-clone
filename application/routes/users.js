var express   = require('express');
var router    = express.Router();
const db      = require('../conf/database');
const bcrypt  = require('../conf/bcrypt');

/*
    POST - Creates a new user account
*/
router.post('/create', async (req, res, next) => {
    let username = req.body.username;
    let email = req.body.email;
    let password = req.body.password;
    let insertSQL = "INSERT INTO users (username, email, password, created) VALUES (?, ?, ?, now())";
    let validateSQL = "SELECT * FROM users WHERE username=? OR email=?";

    // STEP 1 - Verify data

    // Username must be at least 3 characters but no longer than 64 characters.
    // Email must contain '@' and '.'
    // Password must be at least 8 characters and must contain a lowercase, uppercase, number and symbol
    

    // STEP 2 - POST to database
    db.query(validateSQL, [username, email])
    .then(([result, fields]) => {
        // Username/email is not unique, throwing an error.
        if(result && result.length > 0) {
            throw new Error('Username and/or email is not unique.');
        }

        // Hash the password
        return bcrypt.hash(password);
    })
    .then((hash) => {
        // Pushing user to the database.
        return db.query(insertSQL, [username, email, hash]);
    })
    .then(([result, fields]) => {
        if(result && result.affectedRows) {
            // User successfully created.
            res.redirect('/registration.html?success');
        } else {
            // User was not successfully created.
            let encodedURIComponent = encodeURIComponent("An error occurred, please try again.");
            res.redirect(`/registration.html?error=${encodedURIComponent}`);
        }
    })
    .catch((err) => {
        console.log(err.message);
        next(err);
    });
});

router.post('/login', async (req, res, next) => {
    let email = req.body.email;
    let password = req.body.password;
    let validateSQL = "SELECT * FROM users WHERE email=?";

    db.query(validateSQL, [email])
    .then(([result, fields]) => {
        if(result && result.length == 0) {
            // Email not found in the database, throwing an error.
            throw new Error('Email and/or password is incorrect.');
        }

        let hash = result[0].password;
        return bcrypt.compare(hash, password);
    })
    .then((result) => {
        if(result) {
            res.redirect('/index.html');
        } else {
            let encodedURIComponent = encodeURIComponent("Email and/or password is incorrect.");
            res.redirect(`/login.html?error=${encodedURIComponent}`);
        }
    })
    .catch((err) => {
        console.log(err.message);
        next(err);
    })
});

module.exports = router;
