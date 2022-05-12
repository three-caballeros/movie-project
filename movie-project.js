
setTimeout(() => {
    $(".loader").css("display", "none");
    
},1600);

setTimeout(() => {
    element = document.querySelector(".container");
    element.style.visibility = 'visible';
 },1600);


// const url = 'https://excited-judicious-jacket.glitch.me/movies';
const url = 'https://lush-atom-arrhinceratops.glitch.me/movies';

// $.get(url).done(function(data) {
//         console.log(data);
//         makeTable(data);
// });

//define in a function get all movies
// call it in a document.ready to render on page initially
// call it again after successful post
function getMovies() {
    fetch(url).then(response => {
        response.json()
            .then(result => {
                console.log("Render Movies: ", result);
                makeTable(result);
            })
    })
        .catch(error => console.error(error));
};

function getMoviesObject() {
    fetch(url).then(response => {
        response.json()})
            .then(result)
        .catch(error => console.error(error));
}

$(document).ready(getMovies());

$('button').click(function(e) {
    e.preventDefault();
    let newMovieTitle = $('#movie-title').val();
    let newMovieRating = $('#movie-rating').val();
    const newMoviePost = {title: newMovieTitle, rating: newMovieRating};
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newMoviePost),
    };
    fetch(url, options).then( success => getMovies());
});


 var movieObject = getMoviesObject();
console.log(movieObject);

function makeTable(response) {
    let html = "<tr>";
    for (var i = 0; i < response.length; i++) {
        html += '<th scope="row">' + response[i].id + '</th>';
        html += `<td></td>`;
        html += '<td>' + response[i].title + '</td>">';
        html += '<td>' + response[i].genre + '</td>">';
        html += '<td>' + response[i].year + '</td>">';
        html += '<td>' + response[i].rating + '</td>">';
        html += '<td>' + response[i].plot + '</td>">';
        html += '<td><button type="button" id="delete" class="btn btn-danger btn-floating"><i class="fas fa-magic"></i></button></td>">';
        html += "</tr>";
    };
    $('tbody').html(html); //innerHTML change
};

// $('#delete').click(function(e) {
//     e.preventDefault();
//
//     // const edit = {
//     //     method: 'DELETE',
//     //     headers: {
//     //         'Content-Type': 'application/json',
//     //     },
//     //     body: JSON.stringify(newMoviePost),
//     // };
//     // fetch(url, edit).then( success => getMovies());
//
//     fetch(`url${movieObject}`,{
//         method:'DELETE'
//     }).then(response=>{
//         return response.json()
//     }).then(data=>
// // this is the data we get after putting our data,
//             console.log(data)
//     );
//

//  On page load:
//      Display a "loading..." message
//            started with a div with a loading image
//              changed it to set timeout, using built in HTML (loading) text
//      Make an AJAX request to get a listing of all the movies
//          fetch vs get. decided on fetch (understand there is a small time delay for getting info)
//      When the initial AJAX request comes back, remove the "loading..." message and replace it with HTML generated from the json response your code receives
//  Allow users to add new movies
//      Create a form for adding a new movie that has fields for the movie's title and rating
//      When the form is submitted, the page should not reload / refresh, instead, your javascript should make a POST request to /movies with the information the user put into the form

//  TODO: Allow users to edit existing movies
//      Give users the option to edit an existing movie
//      A form should be pre-populated with the selected movie's details
//      Like creating a movie, this should not involve any page reloads, instead your javascript code should make an ajax request when the form is submitted.
//  Delete movies
//      Each movie should have a "delete" button
//      When this button is clicked, your javascript should send a DELETE request