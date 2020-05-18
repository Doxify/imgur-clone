if(!document.cookie.includes('csid')) {
    // User is not logged in, disabling comment form.
    let _commentInput = document.getElementById('comment-text');
    let _commentSubmitButton = document.getElementById('submit-comment-button');
    let _commentNoUserAlert = document.getElementById('comment-no-user-alert');

    _commentInput.remove();
    _commentSubmitButton.remove();
    _commentNoUserAlert.removeAttribute('hidden');
}

function createCommentItem(data) {
    return `
        <div class="list-group-item list-group-item-action bg-dark text-white flex-column align-items-start">
            <div class="d-flex w-100 justify-content-between">
                <a href="profile?u=${data.username}"><strong>${data.username}</strong></a>
                <small class="text-muted">${moment(new Date(data.created)).fromNow()}</small>
            </div>
            <p class="mb-1">${data.text}</p>
        </div>
    `;
};

// Returns all comments for a post.
function getComments(photoID) {
    let _commentsContainer = document.getElementById('comments-container');
    let _commentList = document.getElementById('comment-list');
    let _commentCount = document.getElementById('post-comments');

    axios.get(`/comments/get/${photoID}`)
        .then((response) => {
            let comments = response.data;
            let commentsHTML = '';
            
            comments.forEach((comment) => {
                commentsHTML += createCommentItem(comment);
            });

            _commentList.innerHTML = commentsHTML;
            _commentCount.innerText = comments.length;
            
            if(_commentsContainer.hasAttribute('hidden')) {
                _commentsContainer.removeAttribute('hidden');
            }

        })
        .catch((err) => {
            console.log(err);
        })
};

// Makes the request that adds comments to the database.
function addComment(photoID) {
    return new Promise((resolve, reject) => {
        const _body = {};
        let _commentText = document.getElementById('comment-text');

        _body.text = _commentText.value;
        _body.fk_postid = photoID;

        axios.post('/comments/add', _body)
        .then((response) => {
            let data = response.data;
            if(data.status === 'OK') {
                _commentText.value = '';
                getComments(photoID);
            }
        })
        .catch((err) => {
            console.log(err);
        })
    })
    
}