const debug         = require('../helpers/debug/debugHelpers');
const validator     = require('validator');
const UserError     = require('../helpers/errors/UserError');
const UserModel     = require('../models/User');

const UserController = {
    createUser: function(req, res, next) {
        let username = req.body.username;
        let email = req.body.email;
        let password = req.body.password;
        let passwordConfirm = req.body.passwordConfirm;
        let redirect = req.body.redirect;

        // Checking for username, email, and password presence.
        if(!username || !email || !password || !passwordConfirm) {
            return res.status(200).json({
                status: 'ERROR',
                message: 'Form is incomplete.',
                redirect: '/register'
            });
        }

        // Validate username, email, and password
        if(!validator.isLength(username, { min: 3, max: 64 })) {
            return res.status(200).json({
                status: 'ERROR',
                message: 'Username must be between 3 and 64 characters.',
                redirect: '/register'
            });
        }

        if(!validator.isEmail(email)) {
            return res.status(200).json({
                status: 'ERROR',
                message: 'Email field must contain a valid email address.',
                redirect: '/register'
            });
        }

        if(!validator.isLength(password, { min: 8, max: undefined })) {
            return res.status(200).json({
                status: 'ERROR',
                message: 'Password must be at least 8 characters long.',
                redirect: '/register'
            });
        }

        // Making sure password matches passwordConfirm
        if(password !== passwordConfirm) {
            return res.status(200).json({
                status: 'ERROR',
                message: 'Passwords do not match.',
                redirect: '/register'
            });
        }

        // Data is validated, attempting to create the user.
        UserModel.usernameExists(username)
            .then((usernameDoesNotExist) => {
                if(usernameDoesNotExist) {
                    return UserModel.emailExists(email);
                } else {
                    throw new UserError('Username and/or email is not unique.', '/register', 200);
                }
            })
            .then((emailDoesNotExist) => {
                if(emailDoesNotExist) {
                    return UserModel.create(username, email, password);
                } else {
                    throw new UserError('Username and/or email is not unique.', '/register', 200);
                }
            })
            .then((userID) => {
                if(userID) {
                    req.session.username = username;
                    req.session.email = email;
                    req.session.userID = userID;

                    res.status(200).json({
                        status: 'OK',
                        message: 'Account successfully created',
                        redirect: redirect || '/'
                    });
                } else {
                    throw new UserError('Server error, user could not be created.', '/register', 500);
                }
            })
            .catch((err) => {
                if(err instanceof UserError) {
                    res.status(err.getStatus()).json({
                        status: 'ERROR',
                        message: err.getMessage(),
                        redirect: err.getRedirectURL()
                    });
                } else {
                    next(err);
                }
            });
    },

    login: function(req, res, next) {
        let displayName = req.body.displayName;
        let password = req.body.password;
        let redirect = req.body.redirect;

        UserModel.authenticate(displayName, password)
            .then((userData) => {
                if(userData) {
                    req.session.username = userData.username;
                    req.session.email = userData.email;
                    req.session.userID = userData.userID;
                    
                    res.status(200).json({
                        status: 'OK',
                        message: 'Successfully logged in',
                        redirect: redirect || '/',
                    });

                } else {
                    throw new UserError("Invalid username and/or password.", '/login', 200);
                }
            })
            .catch((err) => {
                if(err instanceof UserError) {
                    debug.errorPrint(err.getMessage());
                    res.status(err.getStatus()).json({
                        status: 'ERROR',
                        message: err.getMessage(),
                        redirect: err.getRedirectURL()
                    });
                } else {
                    next(err);
                }
            });
    },

    getProfile: function(req, res, next) {
        let username = req.params.username;
        UserModel.getProfile(username)
            .then((userProfile) => {
                res.status(200).json(userProfile);
            })
            .catch((err) => {
                next(err);
            });
    },

    logout: function(req, res, next) {
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
    },
}

module.exports = UserController;