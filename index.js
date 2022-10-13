const apiURL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=7e3fb35ea021dbf6b9e04db8d4ecf745'
const imgURL = 'https://image.tmdb.org/t/p/w500'
const searchURL = 'https://api.themoviedb.org/3/search/movie?api_key=7e3fb35ea021dbf6b9e04db8d4ecf745'

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');
let lastUrl = '';

getMovies(apiURL);

function getMovies(url) {
    lastUrl = url;
    fetch(url).then(res => res.json()).then(data => {
        showMovies(data.results);
    })
}

function showMovies(data) {
    main.innerHTML = '';
    let nameMonth = new Array("Jan", "Feb", "Mar", 
    "Apr", "May", "Jun", "Jul", "Aug", "Sep", 
    "Oct", "Nov", "Dec");

    data.forEach(movie => {
        const {title, poster_path, vote_average, release_date} = movie;
        const d = new Date(release_date)
        let days = d.getDate();
        let months = d.getMonth();
        let years = d.getFullYear();
        let date = nameMonth[months]+" "+days+", "+years
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');
        movieEl.innerHTML = 
        `
            <img src="${poster_path? imgURL+poster_path: "http://via.placeholder.com/1080x1580" }" alt="${title}">
            <div class="movie-info">
                <h5>${title}</h5>
                <span>${vote_average}</span>
            </div>
            <div class="date">
                <p id="date">${date}</p>
            </div>
            
        `
        main.appendChild(movieEl);
    })
}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const searchTerm = search.value;

    if(searchTerm){
        getMovies(searchURL+'&query='+searchTerm)
    }else{
        getMovies(apiURL)
    }
})