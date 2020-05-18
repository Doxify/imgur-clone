// Returns profile information for the given username
function getUserInformation(username) {
    return axios.get(`/users/getProfile/${username}`)
        .then((response) => {
            let data = response.data[0];
            
            if(data) {
                let _pageTitle = document.getElementById('head-profile-username');
                let _profileContainer = document.getElementById('profile-container');
                let _profileUsername = document.getElementById('profile-username');
                let _profileRegisterDate = document.getElementById('profile-register-date');
                let _postUploads = document.getElementById('post-uploads');
                let _postViews = document.getElementById('post-views');

                _pageTitle.innerText = `Imgur - ${data.username}`;
                _profileUsername.innerText = data.username;
                _profileRegisterDate.innerText = moment(new Date(data.created)).fromNow();
                _postUploads.innerText = data.uploads;
                _postViews.innerText = data.views;
                _profileContainer.removeAttribute('hidden');
            } else {
                location.replace('/error?m=User does not exist');
            }
        })
        .catch((err) => {
            location.replace('/error?m=Internal server error.');
        });
}

// Searches for all posts made by the given username
function getUserPosts(username) {
    return axios.get(`/posts/getUserPosts/${username}`)
        .then((response) => {
            const results = response.data;
            let _imageContainer = document.getElementById('image-card-container');

            // Only displaying posts if they exists.
            if(!$.isEmptyObject(results)) {
                // Results were found, displaying them.
                let _queryResultsHTML = '';
                results.forEach((post) => {
                    _queryResultsHTML += createImageCard(post);
                });

                _imageContainer.innerHTML = _queryResultsHTML;
                _imageContainer.removeAttribute('hidden');
            }
        })
        .catch((err) => {
            location.replace('/error?m=Internal server error.');
        });
}