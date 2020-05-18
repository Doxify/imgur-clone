let _errorContainer = document.getElementById('error-container');
let _errorMessage = document.getElementById('error-message');

function uploadImage() {
    _errorContainer.setAttribute('hidden', true);
    let _form = document.getElementById('post-image');
    let formData = new FormData(_form);

    axios.post('/posts/create', formData)
        .then((response) => {
            let data = response.data;
            if(data.status === 'OK') {
                location.replace(data.redirect);
            } else {
                _errorMessage.innerText = data.message;
                _errorContainer.removeAttribute('hidden');
            }
        })
        .catch((err) => {
            console.log(err);
        })
}