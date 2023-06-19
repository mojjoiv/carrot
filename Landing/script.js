const API_KEY = '23d93ae3'; // Replace with your actual API key
const API_URL = `http://www.omdbapi.com/?s=action&type=movie&apikey=${API_KEY}`;
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const movieId = urlParams.get('movieId');

const movieDetailsContainer = document.getElementById('movie-details-container');
const movieContainer = document.getElementById('movie-card-container');

// Function to fetch movie data from the OMDb API
fetch(API_URL)
  .then(response => response.json())
  .then(data => {
    if (data.Response === 'True') {
      const movies = data.Search;
      movies.forEach(movie => {
        const movieCard = createMovieCard(movie);
        movieContainer.appendChild(movieCard);
      });
    } else {
      console.log('Error: Unable to fetch movie data');
    }
  })
  .catch(error => {
    console.log('Error:', error);
  });

// Function to create a movie card element
function createMovieCard(movie) {
  const movieCard = document.createElement('div');
  movieCard.classList.add('movie-card');

  const movieImage = document.createElement('img');
  movieImage.src = movie.Poster;
  movieImage.alt = movie.Title;
  movieImage.classList.add('movie-image');

  const movieTitle = document.createElement('h3');
  movieTitle.classList.add('movie-title');
  // movieTitle.textContent = movie.Title;

  movieCard.appendChild(movieImage);
  // movieCard.appendChild(movieTitle);

  movieCard.addEventListener('click', () => {
    window.location.href = `single-movie.html?movieId=${movie.imdbID}`;
  });

  return movieCard;
}
function fetchMovieDetails() {
    const API_URL = `http://www.omdbapi.com/?i=${movieId}&apikey=${API_KEY}`;
    fetch(API_URL)
      .then(response => response.json())
      .then(data => {
        if (data.Response === 'True') {
          const movie = data;
          const movieDetails = createMovieDetails(movie);
          movieDetailsContainer.appendChild(movieDetails);
        } else {
          console.log('Error: Unable to fetch movie details');
        }
      })
      .catch(error => {
        console.log('Error:', error);
      });
  }
  function createMovieDetails(movie) {
    const movieDetails = document.createElement('div');
    movieDetails.classList.add('movie-details');

    const movieTitle = document.createElement('h2');
    movieTitle.textContent = movie.Title;

    const moviePoster = document.createElement('img');
    moviePoster.src = movie.Poster;
    moviePoster.alt = movie.Title;

    const movieYear = document.createElement('p');
    movieYear.textContent = `Year: ${movie.Year}`;

    const moviePlot = document.createElement('p');
    moviePlot.textContent = `Plot: ${movie.Plot}`;

    movieDetails.appendChild(movieTitle);
    movieDetails.appendChild(moviePoster);
    movieDetails.appendChild(movieYear);
    movieDetails.appendChild(moviePlot);

    return movieDetails;
  }
  fetchMovieDetails();
