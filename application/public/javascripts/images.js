function createImageCard(data) {
    let thumbnailSrc = data.thumbnail.split('public/')[1];

    return `
        <div class="card bg-dark text-white">
            <a class="card-block stretched-link text-decoration-none" href="/image?id=${data.id}">
                <img src="${thumbnailSrc}" class="card-img-top" alt="Error loading image...">
                <div class="card-body">
                    <h5 class="card-title">${data.title}</h5>
                    <p class="card-text">${data.description}</p>
                    <ul class="list-inline text-muted float-right">
                        <li class="list-inline-item">
                            <i class="fas fa-eye"></i>
                            <span id="post-views">${data.views}</span>
                        </li>
                        <li class="list-inline-item">
                            <i class="fas fa-comment"></i>
                            <span id="post-comments">${data.comments}</span>
                        </li>
                        <li class="list-inline-item">
                            <i class="far fa-clock"></i>
                            <span id="post-views">${moment(new Date(data.created)).fromNow()}</span>
                        </li>
                    </ul>
                </div>
            </a>
        </div>
    `;
};

// Searches for posts that contain 'searchQuery' in their titles.
function runSearch() {
    axios.get(`/posts/search/${searchQuery}`)
        .then((response) => {
            const results = response.data;
            let _imageContainer = document.getElementById('image-card-container');

            // No images found, show an alert.
            if($.isEmptyObject(results)) {
                let _queryAlertContainer = document.getElementById('query-alert');
                let _queryAlertText = document.getElementById('query-alert-text');
                _queryAlertText.innerText = searchQuery;
                _queryAlertContainer.removeAttribute('hidden');
            } else {
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
            console.log(err);
        })
};

// Gets all information regarding a post on the /image page.
function getPostData(postID) {
    axios.get(`/posts/get/${postID}`)
        .then((response) => {
            let data = response.data;

            if(!$.isEmptyObject(data)) {
                // Image data retrieved
                let _headTitle = document.getElementById('head-post-title');
                let _imageContainer = document.getElementById('image-container');
                let _postPhoto = document.getElementById('post-photo');
                let _postTitle = document.getElementById('post-title');
                let _postDescription = document.getElementById('post-description');
                let _postAuthor = document.getElementById('post-author');
                let _postDate = document.getElementById('post-date');
                let _postViews = document.getElementById('post-views');

                _postPhoto.setAttribute('src', data.photopath.split('public/')[1]);
                _headTitle.innerText = 'Imgur - ' + data.title;
                _postTitle.innerText = data.title;
                _postDescription.innerText = data.description;
                _postAuthor.innerText = data.username;
                _postAuthor.setAttribute('href', `/profile?u=${data.username}`)
                _postDate.innerText = moment(new Date(data.created)).fromNow();
                _postViews.innerText = data.views;

                _imageContainer.removeAttribute('hidden');

                // Post exists and was viewed, incrementing the view count.
                return incrementViewCount(postID);
            } else {
                // Image data was not retrieved, redirect
                window.location.replace('/'); // TODO REDIRECT TO IMAGE DOES NOT EXIST PAGE!
            }
        })
        .catch((err) => {
            console.log(err);
        })
}

// Returns profile information for the given username
function getUserInformation(username) {
    axios.get(`/users/getProfile/${username}`)
    .then((response) => {
        let data = response.data[0];
        // console.log(data);
        let _profileUsername = document.getElementById('profile-username');
        let _profileRegisterDate = document.getElementById('profile-register-date');
        let _postUploads = document.getElementById('post-uploads');
        let _postViews = document.getElementById('post-views');

        _profileUsername.innerText = data.username;
        _profileRegisterDate.innerText = moment(new Date(data.created)).fromNow();
        _postUploads.innerText = data.uploads;
        _postViews.innerText = data.views;
    })
    .catch((err) => {
        console.log(err);
    });
}

// Searches for all posts made by the given username
function getUserPosts(username) {
    axios.get(`/posts/getUserPosts/${username}`)
    .then((response) => {
        const results = response.data;
        let _imageContainer = document.getElementById('image-card-container');

        // No images found, show an alert.
        if($.isEmptyObject(results)) {
            // let _queryAlertContainer = document.getElementById('query-alert');
            // let _queryAlertText = document.getElementById('query-alert-text');
            // _queryAlertText.innerText = searchQuery;
            // _queryAlertContainer.removeAttribute('hidden');
        } else {
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
        console.log(err);
    })
}

function incrementViewCount(postID) {
    return axios.post('/posts/incrementViewCount', { id: postID });
}