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

routeProtectors.isValidImageLink = (req, res, next) => {
    if(req.query['id'] === undefined) {
        // No image id provided, redirect to index.
        res.redirect('/');
    } else {
        next();
    }
}

module.exports = routeProtectors;