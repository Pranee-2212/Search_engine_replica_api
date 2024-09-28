document.addEventListener('DOMContentLoaded', () => {
    const searchForm = document.getElementById('searchForm');
    const queryInput = document.getElementById('query');
    const resultsDiv = document.getElementById('results');

    if (searchForm) {
        searchForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const query = queryInput.value;
            localStorage.setItem('searchQuery', query);
            window.location.href = 'results.html';
        });
    }

    if (resultsDiv) {
        const query = localStorage.getItem('searchQuery');
        if (query) {
            queryInput.value = query;
            fetchSearchResults(query).then(results => displayResults(results));
        }

        searchForm.addEventListener('submit', async function(event) {
            event.preventDefault();
            const query = queryInput.value;
            localStorage.setItem('searchQuery', query);
            const results = await fetchSearchResults(query);
            displayResults(results);
        });
    }
});

const fetchSearchResults = async (query) => {
    const url = `https://google-search72.p.rapidapi.com/search?q=${encodeURIComponent(query)}&lr=en-US&num=50`;
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '2cc59ffa6dmsh35d6bdc6d91ba8ap1bb1b1jsnfbef6cf124d7',
            'x-rapidapi-host': 'google-search72.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        return result.items.map(item => ({
            title: item.title,
            link: item.link,
            snippet: item.snippet
        }));
    } catch (error) {
        console.error('Error:', error);
    }
};

const displayResults = (results) => {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';
    results.forEach(result => {
        const resultElement = document.createElement('div');
        resultElement.innerHTML = `
            <h2><a href="${result.link}" target="_blank" class="heading">${result.title}</a></h2>
            <p  class="desc">${result.snippet}</p>
        `;
        resultsDiv.appendChild(resultElement);
    });
};
