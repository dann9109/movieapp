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

// // Function to show the search history modal
// function showSearchHistoryModal() {
//     // Retrieve the search history from local storage
//     var movieHistory = getMovieHistoryFromLocalStorage();
  
//     // Get reference to the modal container
//     var modalContainer = document.getElementById("modal-container");
  
//     // Get reference to the modal content
//     var modalContent = document.getElementById("modal-content");
  
//     // Clear the modal content
//     modalContent.innerHTML = "";
  
//     // Create a heading for the modal
//     var heading = document.createElement("h2");
//     heading.textContent = "Search History";
  
//     // Create a list to display the search history
//     var list = document.createElement("ul");
  
//     // Loop through the search history and create list items for each movie title
//     movieHistory.forEach(function (movieTitle) {
//       var listItem = document.createElement("li");
//       listItem.textContent = movieTitle;
//       list.appendChild(listItem);
//     });
  
//     // Append the heading and list to the modal content
//     modalContent.appendChild(heading);
//     modalContent.appendChild(list);
  
//     // Set the display style of the modal container to "block" to make it visible
//     modalContainer.style.display = "block";
//   }
  
//   // Add event listener to the button in the footer
//   var searchHistoryButton = document.getElementById("search-history-button");
//   searchHistoryButton.addEventListener("click", showSearchHistoryModal);

// Get the search history button element
const searchHistoryButton = document.getElementById('popup-button');

// Add a click event listener to the search history button
searchHistoryButton.addEventListener('click', showSearchHistory);

var searchHistory = JSON.parse(localStorage.getItem('searchHistory'));

// Function to display the search history pop-up modal
function showSearchHistory() {
  // Retrieve search history data from localStorage
  const searchHistory = JSON.parse(localStorage.getItem('searchHistory'));

  // Create the modal container element
  const modalContainer = document.createElement('div');
  modalContainer.classList.add('modal-container');

  // Create the modal content element
  const modalContent = document.createElement('div');
  modalContent.classList.add('modal-content');

  // Create the heading element for the search history
  const heading = document.createElement('h2');
  heading.textContent = 'Search History';

  // Create the list element for the search history
  const searchHistoryList = document.createElement('ul');
  searchHistoryList.id = 'search-history-list';

  // Iterate over search history and create list items
  searchHistory.forEach((item) => {
    const listItem = document.createElement('li');
    listItem.textContent = item;
    searchHistoryList.appendChild(listItem);
  });

  // Append the heading and search history list to the modal content
  modalContent.appendChild(heading);
  modalContent.appendChild(searchHistoryList);

  // Append the modal content to the modal container
  modalContainer.appendChild(modalContent);

  // Append the modal container to the body of the document
  document.body.appendChild(modalContainer);

  // Add event listener to close the modal when clicking outside of it
  modalContainer.addEventListener('click', (event) => {
    if (event.target === modalContainer) {
      modalContainer.remove();
    }
  });
}