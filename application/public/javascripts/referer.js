let _redirectInput = document.getElementById('redirect-input');
var referer = document.referrer;

// We only care about this if the user was not redirected from login or the registration page.
if(referer.toLowerCase().includes('register') || referer.toLocaleLowerCase().includes('login')) {
    _redirectInput.value = null;
} else {
    _redirectInput.value = referer;
}