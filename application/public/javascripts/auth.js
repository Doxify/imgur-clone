let _errorContainer = document.getElementById('error-container');
let _errorMessage = document.getElementById('error-message');

function login() {
    _errorContainer.setAttribute('hidden', true);
    let _authFormInputs = document.getElementById('login-form').elements;
    let _body = {
        displayName: _authFormInputs['displayName'].value,
        password: _authFormInputs['password'].value,
        redirect: _authFormInputs['redirect'].value
    };

    return axios.post('/users/login', _body)
        .then((result) => {
            let data = result.data;
            if(data.status === 'OK') {
                location.replace(data.redirect);
            } else {
                _errorMessage.innerText = data.message;
                _errorContainer.removeAttribute('hidden');
            }
        })
        .catch((err) => {
            location.replace('/error?m=Internal Server Error')
        });
}

function register() {
    _errorContainer.setAttribute('hidden', true);
    let _registerFormInputs = document.getElementById('register-form').elements;
    let _body = {
        username: _registerFormInputs['username'].value,
        email: _registerFormInputs['email'].value,
        password: _registerFormInputs['password'].value,
        passwordConfirm: _registerFormInputs['passwordConfirm'].value
    };

    return axios.post('/users/create', _body)
        .then((result) => {
            let data = result.data;
            if(data.status === 'OK') {
                location.replace(data.redirect);
            } else {
                _errorMessage.innerText = data.message;
                _errorContainer.removeAttribute('hidden');
            }
        })
        .catch((err) => {
            location.replace('/error?m=Internal Server Error')
        });
};