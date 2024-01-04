
var searchInput = $('#search-input');
var searchButton = $('#search-button');
var apiKey = '84c76c81';

// Function to save movie title to local storage
function saveMovieToLocalStorage(movieTitle) {
    // Check if local storage is available
    if (typeof (Storage) !== "undefined") {
        // Retrieve existing movie history from local storage
        let movieHistory = JSON.parse(localStorage.getItem("movieHistory")) || [];

        // Add the new movie title to the array
        movieHistory.push(movieTitle);

        // Save the updated movie history to local storage
        localStorage.setItem("movieHistory", JSON.stringify(movieHistory));
    }
}

// Function to retrieve movie history from local storage
function getMovieHistoryFromLocalStorage() {
    // Check if local storage is available
    if (typeof (Storage) !== "undefined") {
        // Retrieve movie history from local storage
        let movieHistory = JSON.parse(localStorage.getItem("movieHistory")) || [];

        // Get reference to the search history list
        var searchHistoryList = document.getElementById("search-history-list");

        // Clear the search history list
        searchHistoryList.innerHTML = "";

        // Loop through the movie history and create list items for each movie title
        movieHistory.forEach(function (movieTitle) {
            // Create a new list item
            var listItem = document.createElement("li");
            listItem.textContent = movieTitle;

            // Append the list item to the search history list
            searchHistoryList.appendChild(listItem);
        });

        return movieHistory;
    }

    return [];
}

// Function to fetch movie data from the OMDB API
function fetchMovieData(movieTitle) {
    // Construct the URL for the OMDB API
    var apiUrl = `http://www.omdbapi.com/?t=${movieTitle}&apikey=${apiKey}`;

    // Make a GET request to the OMDB API
    fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Error: ' + response.statusText);
            }
        })
        .then(function (data) {
            // Display the movie data on the page
            displayMovieData(data);
        })
        .catch(function (error) {
            console.log('Error:', error);
        });
}

// Function to display the movie data on the page
function displayMovieData(data) {
    // Get references to the elements where you want to display the movie data
    var movieTitleElement = document.getElementById('movie-title');
    var moviePosterElement = document.getElementById('movie-poster');
    var moviePlotElement = document.getElementById('movie-plot');

    // Update the elements with the movie data
    movieTitleElement.textContent = data.Title;
    moviePosterElement.src = data.Poster;
    moviePlotElement.textContent = data.Plot;
}

// Add event listener to the search button
searchButton.on('click', function () {
    var movieTitle = searchInput.val();

    // Save the movie title to local storage
    saveMovieToLocalStorage(movieTitle);

    // Fetch the movie data from the OMDB API
    fetchMovieData(movieTitle);
});

// Call getMovieHistoryFromLocalStorage() when the page loads
$(document).ready(function () {
    getMovieHistoryFromLocalStorage();
});