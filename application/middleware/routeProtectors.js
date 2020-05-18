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
        if(!/[^\s]+/.test(req.query['id'])) {
            // Making sure url is valid if it contains a query.
            res.redirect("/error?m=That's an invalid link!");
        } else {
            next();
        }
    }
}

// Used to protect the profile page from bad url queries.
routeProtectors.isValidProfileLink = (req, res, next) => {
    if(req.query['u'] === undefined) {
        // Check for a session, redirect to user's profile.
        if(req.session.username) {
            res.redirect(`/profile?u=${req.session.username}`);
        } else {
            // No profile username provided, redirect to index.
            res.redirect('/');
        }
    } else {
        if(!/[^\s]+/.test(req.query['u'])) {
            // Making sure url is valid if it contains a query.
            res.redirect("/error?m=That's an invalid link!");
        } else {
            next();
        }
    }
}

// Used to protect the search page from bad url queries.
routeProtectors.isValidSearchLink = (req, res, next) => {
    if(req.query['query'] === undefined) {
        // No query provided, redirect to index.
        res.redirect('/');
    } else {
        if(!/[^\s]+/.test(req.query['query'])) {
            // Making sure url is valid if it contains a query.
            res.redirect("/error?m=That's an invalid link!");
        } else {
            next();
        }
    }
}



module.exports = routeProtectors;