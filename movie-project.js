
setTimeout(() => {
    $(".loader").css("display", "none");
    
},1600);

setTimeout(() => {
    element = document.querySelector(".container");
    element.style.visibility = 'visible';
 },1600);

$.get(`https://rune-antique-telephone.glitch.me/movies`).done(function(data) {
        console.log(data);
});

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
    fetch('https://rune-antique-telephone.glitch.me/movies', options)
        .then( console.log("post successful") ) /* review was created successfully */
        .catch( console.log('post UNsuccessful') ); /* handle errors */
    let newMovieTable = $.get(`https://rune-antique-telephone.glitch.me/movies`).done(function(data) {
            console.log(data);
    makeTable(newMovieTable);
    });
});

function makeTable(response) {
    for (var i = 0; i < 10 ; i++) {
        let html = '<th scope="row">' + response[i].id + '</th>';
        html += '<td>' + response[i].poster + '</td>';
        // html += '<ul class="list-group list-group-flush">';
        // html += '<li class="list-group-item text-center"><div>' + maxTempArr[i]+ 'F / ' + minTempArr[i] + 'F ' + '</div><img src="http://openweathermap.org/img/w/' + wxIconArr[i] +'.png"></li>'; //max temp
        // html += '<li class="list-group-item text-center">' + wxDescArr[i] +  '</li>'; // cloud cond
        // html += '<li class="list-group-item text-center">' + cloudArr[i] +  '</li>'; // cloud cond
        // html += '<li class="list-group-item text-center">' + 'Humidity: ' + maxHumidityArr[i] + '%'+'</li>'; //humidity
        // html += '<li class="list-group-item text-center">' + 'Wind: ' + maxWind[i] + 'mph'+'</li>'; //wind
        // html += '<li class="list-group-item text-center">' + 'Pressure: ' + maxPressureArr[i] +'bar'+'</li>'; //pressure
        // html += '</ul>';
        // html += '</div>';
        $('tbody').html(html);
    };
};


// TODO:

//  On page load:
//      Display a "loading..." message
//      Make an AJAX request to get a listing of all the movies
//      When the initial AJAX request comes back, remove the "loading..." message and replace it with HTML generated from the json response your code receives
//  TODO: Allow users to add new movies
//      Create a form for adding a new movie that has fields for the movie's title and rating
//      When the form is submitted, the page should not reload / refresh, instead, your javascript should make a POST request to /movies with the information the user put into the form
//  Allow users to edit existing movies
//      Give users the option to edit an existing movie
//      A form should be pre-populated with the selected movie's details
//      Like creating a movie, this should not involve any page reloads, instead your javascript code should make an ajax request when the form is submitted.
//  Delete movies
//      Each movie should have a "delete" button
//      When this button is clicked, your javascript should send a DELETE request