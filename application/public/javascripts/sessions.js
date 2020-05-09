var authLinks = document.getElementById('auth-links');
var userLinks = document.getElementById('user-links');

function logOutClick(event) {
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
            console.log(data);
            location.replace('/login');
        })
        .catch((err) => {
            location.reload();
        });

};

if(document.cookie.includes('csid')) {
    // Session has been found, display user links.
    console.log('found a session');
    var logoutButton = document.getElementById('logout-button');

    logoutButton.onclick = logOutClick;
    userLinks.removeAttribute('hidden');
} else {
    // Session has not been found, display auth links.
    console.log('no session found!');
    authLinks.removeAttribute('hidden');
}