const validator     = require('validator');
const UserError     = require('../helpers/errors/UserError');
const UserModel     = require('../models/User');

const UserController = {
    validateNewAccountForm: function(username, email, password, passwordConfirm) {
        return new Promise((resolve, reject) => {
            // Checking for username, email, and password presence.
            if(!username || !email || !password || !passwordConfirm) {
                reject(new UserError('Form is incomplete.', '/register', 200));
            }

            // Validate username
            if(!validator.isLength(username, { min: 3, max: 64 })) {
                reject(new UserError('Username must be between 3 and 64 characters.', '/register', 200));
            } else if(!validator.isAlphanumeric(username)) {
                reject(new UserError('Username must only contain letters and numbers. (No spaces, special characters, etc...)', '/register', 200));
            }

            // Validate email
            if(!validator.isEmail(email)) {
                reject(new UserError('Email field must contain a valid email address.', '/register', 200));
            }

            // Validate password
            if(!validator.isLength(password, { min: 8, max: undefined })) {
                reject(new UserError('Password must be at least 8 characters long.', '/register', 200));
            } else if(validator.isAlphanumeric(password)) {
                reject(new UserError('Password must contain at least 1 special character. (!, #, $, %, &, +, /, etc...)', '/register', 200));
            }

            // Making sure password matches passwordConfirm
            if(password !== passwordConfirm) {
                reject(new UserError('Passwords do not match.', '/register', 200));
            }

            // Nothing failed validation.
            resolve();
        });
    },
    createUser: function(req, res, next) {
        let username = req.body.username;
        let email = req.body.email;
        let password = req.body.password;
        let passwordConfirm = req.body.passwordConfirm;
        let redirect = req.body.redirect;

        this.validateNewAccountForm(username, email, password, passwordConfirm)
            .then(() => {
                return UserModel.usernameExists(username);
            })
            .then((usernameDoesNotExist) => {
                if(usernameDoesNotExist) {
                    return UserModel.emailExists(email);
                } else {
                    throw new UserError('An account with that username already exists.', '/register', 200);
                }
            })
            .then((emailDoesNotExist) => {
                if(emailDoesNotExist) {
                    return UserModel.create(username, email, password);
                } else {
                    throw new UserError('An account with that email already exists.', '/register', 200);
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
                next(err);
            } else {
                res.clearCookie('csid');
                res.redirect('/login');
            }
        });
    },
}

module.exports = UserController;