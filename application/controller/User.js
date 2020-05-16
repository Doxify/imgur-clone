const debug         = require('../helpers/debug/debugHelpers');
const UserError     = require('../helpers/errors/UserError');
const UserModel     = require('../models/User');

const UserController = {
    createUser: function(req, res, next) {
        let username = req.body.username;
        let email = req.body.email;
        let password = req.body.password;
        let redirect = req.body.redirect;

        // TODO:
        // Check for username, email, and password presence
        // Validate username, email, and password

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

                    res.redirect(redirect || '/');
                } else {
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
                    res.redirect(redirect || '/');
                } else {
                    throw new UserError("Login credentials were invalid", '/login', 200);
                }
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
            });
    },

    getProfile: function(req, res, next) {
        let username = req.params.username;
        UserModel.getProfile(username)
            .then((userProfile) => {
                res.status(200).json(userProfile);
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