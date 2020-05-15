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

// Gets all information regarding a post on the /image page.
function getPostData(postID) {
    axios.get(`/posts/get/${postID}`)
        .then((response) => {
            let data = response.data;
            
            if(data.status === 'OK') {
                // Image data retrieved
                let _headTitle = document.getElementById('head-post-title');
                let _imageContainer = document.getElementById('image-container');
                let _postPhoto = document.getElementById('post-photo');
                let _postTitle = document.getElementById('post-title');
                let _postDescription = document.getElementById('post-description');
                let _postAuthor = document.getElementById('post-author');
                let _postDate = document.getElementById('post-date');
                let _postViews = document.getElementById('post-views');

                _postPhoto.setAttribute('src', data.location);
                _headTitle.innerText = 'Imgur - ' + data.title;
                _postTitle.innerText = data.title;
                _postDescription.innerText = data.description;
                _postAuthor.innerText = data.author;
                _postAuthor.setAttribute('href', `/profile?u=${data.author}`)
                _postDate.innerText = moment(new Date(data.created)).fromNow();
                _postViews.innerText = data.views;

                _imageContainer.removeAttribute('hidden');
            } else {
                // Image data was not retrieved, redirect
                window.location.replace(data.redirect);
            }
        })
        .catch((err) => {
            console.log(err);
        })
}