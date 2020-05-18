var authLinks = document.getElementById('auth-links');
var userLinks = document.getElementById('user-links');

function logOutClick() {    
    var fetchURL = 'http://localhost:3000/users/logout';
    var fectchOptions = {
        method: 'post',
        body: '',
        headers: {
            'Content-Type': 'application/json'
        }
    };

    fetch(fetchURL, fectchOptions)
        .then((data) => {
            location.replace('/login');
        })
        .catch((err) => {
            location.reload();
        });

};

if(document.cookie.includes('csid')) {
    // Session has been found, display user links.
    var logoutButton = document.getElementById('logout-button');
    logoutButton.onclick = logOutClick;
    userLinks.removeAttribute('hidden');
} else {
    // Session has not been found, display auth links.
    authLinks.removeAttribute('hidden');
}