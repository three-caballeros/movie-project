
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

fetch(url).then(response => { response.json()
        .then( result => {
            console.log("json object: ", result);
            makeTable(result);
        })
    })
    .catch(error => console.error(error));

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
    fetch(url, options)
        .then( success => console.log("post successful: ", success))
        // .then(
        //     fetch(url).then(response => { response.json()
        //         .then( result => {
        //             console.log("update table: ", result);
        //             makeTable(result);
        //         })
        //     }))
    setTimeout(() => {
            fetch(url).then(response => { response.json()
                .then( result => {
                    console.log("update table: ", result);
                    makeTable(result);
                })
            })
    },1600);
        });

function makeTable(response) {
    let html = "<tr>";
    for (var i = 0; i < response.length; i++) {
        html += '<th scope="row">' + response[i].id + '</th>';
        // html += `<td><img src=${response[i].poster}></td>`;
        html += '<td>' + response[i].title + '</td>">';
        html += '<td>' + response[i].genre + '</td>">';
        html += '<td>' + response[i].year + '</td>">';
        html += '<td>' + response[i].rating + '</td>">';
        html += '<td>' + response[i].plot + '</td>">';
        html += "</tr>";
    };
    $('tbody').html(html); //innerHTML change
};


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