function loadRandomQuote() {
    let _quoteRow = document.getElementById('quote-container');
    let _quoteText = document.getElementById('quote-text');
    let _quoteAuthor = document.getElementById('quote-author');

    return axios.get('https://api.quotable.io/random')
        .then((response) => {
            let quote = response.data;
            _quoteText.innerText = quote.content;
            _quoteAuthor.innerText = quote.author;
            _quoteRow.removeAttribute('hidden');
        })
        .catch((err) => {
            // Displaying default quote
            _quoteText.innerText = 'Failure is an option here. If things are not failing, you are not innovating enough.';
            _quoteAuthor.innerText = 'Elon Musk';
            _quoteRow.removeAttribute('hidden');
        })
}

function loadRecentPosts() {
    let _imageContainer = document.getElementById('image-card-container');
    return axios.get('/posts/getRecentPosts')
        .then((response) => {
            const results = response.data;
            let _queryResultsHTML = '';
            
            results.forEach((post) => {
                _queryResultsHTML += createImageCard(post);
            });

            _imageContainer.innerHTML = _queryResultsHTML;
            _imageContainer.removeAttribute('hidden');
        })
        .catch((err) => {
            console.log(err);
        })
}