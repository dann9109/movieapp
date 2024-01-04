var searchInput = $('#search-input');
var searchBtn = $('#search-btn');
var apiKey = '84c76c81';
var omdbAPI = 'http://www.omdbapi.com/?i=tt3896198&apikey=84c76c81';
var posterAPI = 'http://img.omdbapi.com/?i=tt3896198&h=600&apikey=84c76c81';

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

        return movieHistory;
    }
    return [];
}

// Remove the existing declaration of the searchInput variable if it exists
// Get reference to the search input
var searchInput = document.getElementById("search-input");

// Get reference to the search button
var searchButton = document.getElementById("search-button");

// Add event listener to the search button
searchButton.addEventListener("click", function () {
    var movieTitle = searchInput.value;

    // Save the movie title to local storage
    saveMovieToLocalStorage(movieTitle);
});