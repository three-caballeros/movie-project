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
    




// TODO:
//  On page load:
//      Display a "loading..." message
//      Make an AJAX request to get a listing of all the movies
//      When the initial AJAX request comes back, remove the "loading..." message and replace it with HTML generated from the json response your code receives
//  Allow users to add new movies
//      Create a form for adding a new movie that has fields for the movie's title and rating
//      When the form is submitted, the page should not reload / refresh, instead, your javascript should make a POST request to /movies with the information the user put into the form
//  Allow users to edit existing movies
//      Give users the option to edit an existing movie
//      A form should be pre-populated with the selected movie's details
//      Like creating a movie, this should not involve any page reloads, instead your javascript code should make an ajax request when the form is submitted.
//  Delete movies
//      Each movie should have a "delete" button
//      When this button is clicked, your javascript should send a DELETE request