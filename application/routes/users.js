const express       = require('express');
const router        = express.Router();
const db            = require('../conf/database');
const bcrypt        = require('../conf/bcrypt');
const debug         = require('../helpers/debug/debugHelpers');
const UserError     = require('../helpers/errors/UserError');
const User          = require('../models/User');

/*
    POST - Creates a new user account
*/
router.post('/create', async (req, res, next) => {
    let username = req.body.username;
    let email = req.body.email;
    let password = req.body.password;
    let redirect = req.body.redirect;
    let insertSQL = "INSERT INTO users (username, email, password, created) VALUES (?, ?, ?, now())";
    let validateSQL = "SELECT * FROM users WHERE username=? OR email=?";

    // STEP 1 - VALIDATE USER DATA
    // Username must be at least 3 characters but no longer than 64 characters.
    // Email must contain '@' and '.'
    // Password must be at least 8 characters and must contain a lowercase, uppercase, number and symbol

    // STEP 2 - POST to database
    db.query(validateSQL, [username, email])
        .then(([result, fields]) => {
            // Username/email is not unique, throwing an error.
            if(result && result.length > 0) {
                throw new UserError('Username and/or email is not unique.', '/register', 200);
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
                debug.successPrint('User has been created!');
                res.redirect('/login');
            } else {
                // User was not successfully created.
                throw new UserError('Server error, user could not be created.', '/register', 500);
            }
        })
        .catch((err) => {
            if(err instanceof UserError) {
                debug.errorPrint(err.getMessage());
                res.status(err.getStatus());
                res.redirect(err.getRedirectURL());
            } else {
                next(err);
            }
        });
});

router.post('/login', async (req, res, next) => {
    let displayName = req.body.displayName;
    let password = req.body.password;
    let redirect = req.body.redirect;
    let user = new User();

    user.authenticate(displayName, password)
        .then((data) => {
            // Creating the session
            req.session.username = data.username;
            req.session.email = data.email;
            req.session.userID = data.userID;
            
            // Redirecting
            res.redirect(redirect || '/');
        })
        .catch((err) => {
            if(err instanceof UserError) {
                debug.errorPrint(err.getMessage());
                res.status(err.getStatus());
                res.redirect(err.getRedirectURL());
            } else {
                debug.errorPrint(err.message);
                next(err);
            }
        })

    // db.query(validateSQL, [displayName, displayName])
    //     .then(([result, fields]) => {
    //         if(result && result.length == 0) {
    //             // Email/Username not found in the database, throwing an error.
    //             throw new UserError('User cold not be authenticated', '/login', 200);
    //         }

    //         var hash = result[0].password;
            
    //         userID = result[0].id;
    //         email = result[0].email;
    //         username = result[0].username;

    //         return bcrypt.compare(hash, password);
    //     })
    //     .then((result) => {
    //         if(!result) {
    //             throw new UserError('User could not be authenticated', '/login', 200);
    //         }

    //         // Creating the session
    //         req.session.username = username;
    //         req.session.email = email;
    //         req.session.userID = userID;
            
    //         // Redirecting
    //         res.redirect('/');
    //     })
    //     .catch((err) => {
    //         if(err instanceof UserError) {
    //             debug.errorPrint(err.getMessage());
    //             res.status(err.getStatus());
    //             res.redirect(err.getRedirectURL());
    //         } else {
    //             debug.errorPrint(err.message);
    //             next(err);
    //         }
    //     })
});

router.post('/logout', (req, res, next) => {
    req.session.destroy((err) => {
        if(err) {
            debug.errorPrint('Failed to destroy session.');
            next(err);
        } else {
            debug.successPrint('Session successfully destroyed.');
            res.clearCookie('csid');
            res.redirect('/login');
        }
    });
});

module.exports = router;
