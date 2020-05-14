function createImageCard(data) {
    let thumbnailSrc = data.thumbnail.split('public/')[1];

    return `
        <div class="card bg-dark text-white">
            <a class="card-block stretched-link text-decoration-none" href="/image?id=${data.id}">
                <img src="${thumbnailSrc}" class="card-img-top" alt="Error loading image...">
                <div class="card-body">
                    <h5 class="card-title">${data.title}</h5>
                    <ul class="list-inline text-muted">
                        <li class="list-inline-item">
                            <i class="fas fa-eye"></i>
                            <span id="post-views">${data.views}</span>
                        </li>
                    </ul>
                    <p class="card-text text-muted">${moment(new Date(data.created)).fromNow()}</p>
                </div>
            </a>
        </div>
    `;
};