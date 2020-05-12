const routeProtectors = {};

routeProtectors.isAuthenticated = (req, res, next) => {
    if(!req.session.username) {
        // User is not logged in.
        res.redirect('/login');
    } else {
        // User is logged in.
        next();
    }
};

module.exports = routeProtectors;