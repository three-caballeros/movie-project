
// TODO: On page load, display loading message. When request comes back, replace loading message with HTML & data.
setTimeout(() => {
    $(".loader").css("display", "none");
    element = document.querySelector("#table-container");
    element.style.visibility = 'visible';
    element = document.querySelector("#header-img");
    element.style.visibility = 'visible';
},1600);

// URL variable used for multiple fetch requests
const url = 'https://lush-atom-arrhinceratops.glitch.me/movies';

// Function executes initial get request for movie database and calls function to render HTML Table
function getMovies() {
    fetch(url).then(response => {response.json()
                        .then(result => {
                            console.log("Render Movies: ", result);
                            makeTable(result);
                        })
                 }) .catch(error => console.error(error));
};

// Calls function to render movies table immediately upon document being ready
$(document).ready(getMovies());

// Function converts array of Objs (w/ movie info) into HTML table
function makeTable(response) {
    let html = "<tr>";
    response.forEach((obj) => {
        html += '<th scope="row">' + obj.id + '</th scope="row">';
        html += `<td></td>`;
        html += '<td>' + obj.title + '</td>">';
        html += '<td>' + obj.genre + '</td>">';
        html += '<td class="text-center">' + obj.year + '</td>">';
        html += '<td class="text-center">' + obj.rating + '</td>">';
        html += '<td>' + obj.plot + '</td>">';
        html += `<td>
                    <button type="button" id="edit-${obj.id}" class="btn btn-primary mb-1 w-100">Edit</button>
                    <button type="button" id="delete-${obj.id}" class="btn btn-danger w-100">Delete</button>
                 </td>`;
        html += "</tr>";
    });
    $('tbody').html(html); //innerHTML change
};

//add a textarea box to each column in the row
//include the existing content in each textarea
// change edit button text to "Submit"

function makeTableEdits(response) {
    let edits = "<tr>";
    response.forEach((obj) => {
        edits += `<th id="${obj.id}" scope="row"><form><textarea style="overflow-wrap: normal" class="form-control" placeholder="${obj.id}"></textarea></form></th>`;
        edits += `<td id="poster-${obj.id}></td>`;
        edits += `<td id="title-${obj.id}" ><form><textarea style="overflow-wrap: normal" class="form-control" placeholder="${obj.title}"></textarea></form></td>`;
        edits += `<td id="genre-${obj.id}" ><form><textarea style="overflow-wrap: normal" class="form-control" placeholder="${obj.genre}"></textarea></form></td>`;
        edits += `<td id="year-${obj.id}" ><form><textarea style="overflow-wrap: normal" class="form-control text-center" placeholder="${obj.year}"></textarea></form></td>`
        edits += `<td id="rating-${obj.id}" ><form><textarea style="overflow-wrap: normal" class="form-control text-center" placeholder="${obj.rating}"></textarea></form></td>`
        edits += `<td id="plot-${obj.id}" ><form><textarea style="overflow-wrap: normal" class="form-control" placeholder="${obj.plot}"></textarea></form></td>`;
        edits += `<td>
                    <button type="button" id="submit-${obj.id}" class="btn btn-primary mb-1 w-100">Submit</button>
                    <button type="button" id="delete-${obj.id}" class="btn btn-danger w-100">Delete</button>
                 </td>`;
        edits += "</tr>";
    });
    $('tbody').html(edits);
};



// TODO: When the form is submitted, the page should not reload / refresh, instead, your javascript
//  should make a POST request to /movies with the information the user put into the form.
// On button click, capture user provided movie info, post in database, and call function to render HTML w/ new input

$('#add-movie').click((e) => {
    e.preventDefault();
    const newMoviePost = {title: $('#movie-title').val(), rating: $('#movie-rating').val()};
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newMoviePost),
    };
    fetch(url, options).then( success => getMovies());
    document.getElementById("new-movie-form").reset();
});


// TODO: Each movie needs a delete button that when clicked, a DELETE request is sent to the database
// Needed to create an event delegation since Delete button was created dynamically
// Upon click, capture the id value from the element, append the id to the url and submit a DELETE fetch request

$(document).on('click', '.btn-danger', function(e){
    e.preventDefault();
    let uniqueID = $(e.target).attr("id");
    const deleteOption = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    };
    let deleteURL = url + "/" + uniqueID.substring(7, uniqueID.length);
    fetch(deleteURL, deleteOption).then( success => getMovies());
});


// =============== REQUIRED ACTION ITEMS REMAINING ==========================
//  TODO: Allow users to edit existing movies
//      Give users the option to edit an existing movie
//      A form should be pre-populated with the selected movie's details
//      Like creating a movie, this should not involve any page reloads, instead your javascript code should make an ajax request when the form is submitted.
// =============== REQUIRED ACTION ITEMS REMAINING ==========================

$(document).on('click', '.btn-primary', function(e){
    e.preventDefault();
    let uniqueID = $(e.target).attr("id");
    // TODO: Need a fn like makeTable that creates text boxes populated with current movie content in the row that the edit button was clicked
    // TODO: Edit button should convert to a Submit button
    // TODO: Capture the data from all of the new forms in each column
    // TODO: Check the PATCH request below to ensure the newly captured data is being sent to the database.
    fetch(url).then(response => {response.json()
        .then(result => {
            console.log("Render Movies: ", result);
            makeTableEdits(result);
        })
    }) .catch(error => console.error(error));
}
    // const patchOption = {
    //     method: 'PATCH',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    // };
    // let patchURL = url + "/" + uniqueID;
    // fetch(patchURL, patchOption).then( success => getMovies());
);