const routeProtectors = {};

// Used to protect routes that require a user to be logged in.
routeProtectors.isAuthenticated = (req, res, next) => {
    if(!req.session.username) {
        // User is not logged in.
        res.redirect('/login');
    } else {
        // User is logged in.
        next();
    }
};

// Used to protect routes that require a user to NOT be logged in.
routeProtectors.isNotAuthenticated = (req, res, next) => {
    if(req.session.username) {
        // User is logged in.
        let redirectURL = req.header('Referer') || '/';
        res.redirect(redirectURL);
    } else {
        // User is not logged in.
        next();
    }
}

// Used to protect the image page from bad url queries.
routeProtectors.isValidImageLink = (req, res, next) => {
    if(req.query['id'] === undefined) {
        // No image id provided, redirect to index.
        res.redirect('/');
    } else {
        next();
    }
}

module.exports = routeProtectors;