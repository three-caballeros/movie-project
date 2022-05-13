
// TODO: On page load, display loading message. When request comes back, replace loading message with HTML & data.
setTimeout(() => {
    $(".loader").css("display", "none");
    let element1 = document.querySelector("#table-container");
    element1.style.visibility = 'visible';
    let element2 = document.querySelector("#header-img");
    element2.style.visibility = 'visible';
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
    let html = "";
    response.forEach((obj) => {
        console.log(obj);
        html += `<tr id="row-${obj.id}"> `
        html += '<td>' + obj.id + '</td>';
        html += `<td><img src="${obj.poster}"></td>`;
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

function makeTableEdits(response) {
    let edits = "";
    response.forEach((obj) => {
        edits += `<tr id="row-${obj.id}">`;
        edits += `<td><form><textarea id="${obj.id}" style="overflow-wrap: normal" class="form-control" placeholder="${obj.id}"></textarea></form></td>`;
        edits += `<td><form><textarea id="poster-${obj.id}" style="overflow-wrap: normal" class="form-control" ></textarea></form></td>`;
        edits += `<td><form><textarea id="title-${obj.id}" style="overflow-wrap: normal" class="form-control" placeholder="${obj.title}"></textarea></form></td>`;
        edits += `<td><form><textarea id="genre-${obj.id}" style="overflow-wrap: normal" class="form-control" placeholder="${obj.genre}"></textarea></form></td>`;
        edits += `<td><form><textarea id="year-${obj.id}" style="overflow-wrap: normal" class="form-control text-center" placeholder="${obj.year}"></textarea></form></td>`
        edits += `<td><form><textarea id="rating-${obj.id}" style="overflow-wrap: normal" class="form-control text-center" placeholder="${obj.rating}"></textarea></form></td>`
        edits += `<td><form><textarea id="plot-${obj.id}" style="overflow-wrap: normal" class="form-control" placeholder="${obj.plot}"></textarea></form></td>`;
        edits += `<td>
                    <button type="button" id="submit-${obj.id}" class="btn btn-success submit-btn mb-1 w-100">Submit</button>
                    <button type="button" id="delete-${obj.id}" class="btn btn-danger w-100">Delete</button>
                 </td>`;
        edits += "</tr>";
    });
    $('tbody').html(edits);
}; //fn allows for editing entire db but only permits submitting edits for 1 movie at a time.

function makeRowEdits(num, arr) {
    arr.forEach((obj) => {
        if (obj.id === parseInt(num)) {
            let edits = "";
            edits += `<td><form><textarea id="${num}" style="overflow-wrap: normal" class="form-control" placeholder="${obj.id}">${obj.id}</textarea></form></td>`;
            edits += `<td><form><textarea id="poster-${num}" style="overflow-wrap: normal" class="form-control" placeholder="${obj.poster}">${obj.poster}</textarea></form></td>`;
            edits += `<td><form><textarea id="title-${num}" style="overflow-wrap: normal" class="form-control" placeholder="${obj.title}">${obj.title}</textarea></form></td>`;
            edits += `<td><form><textarea id="genre-${num}" style="overflow-wrap: normal" class="form-control" placeholder="${obj.genre}">${obj.genre}</textarea></form></td>`;
            edits += `<td><form><textarea id="year-${num}" style="overflow-wrap: normal" class="form-control text-center" placeholder="${obj.year}">${obj.year}</textarea></form></td>`
            edits += `<td><form><textarea id="rating-${num}" style="overflow-wrap: normal" class="form-control text-center" placeholder="${obj.rating}">${obj.rating}</textarea></form></td>`
            edits += `<td><form><textarea id="plot-${num}" style="overflow-wrap: normal" class="form-control" placeholder="${obj.plot}">${obj.plot}</textarea></form></td>`;
            edits += `<td>
                    <button type="button" id="submit-${num}" class="btn btn-success submit-btn mb-1 w-100">Submit</button>
                    <button type="button" id="delete-${num}" class="btn btn-danger w-100">Delete</button>
                 </td>`;
            let select = 'row-' + num;
            $(`#${select}`).html(edits);
        } else {
            return false;
        }
    });
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


$(document).on('click', '.btn-primary', function(e) {
    e.preventDefault();
    let uniqueID = $(e.target).attr("id")
    console.log(uniqueID);
    let uniqueNum = uniqueID.substring(5, uniqueID.length);
    console.log(uniqueNum);
    fetch(url).then(response => {
        response.json()
            .then(result => {
                console.log("Render Movies: ", result);
                // makeTableEdits(result); //rowID goes here instead of results?
                makeRowEdits(uniqueNum, result);
            })
    }).catch(error => console.error(error));
});

// Submit btn (success-btn) reveals upon 1st click of edit
// This submit button captures info from textareas and PATCH (fetch) requests to database
// the initial function to render the table with current db info is invoked at the end of this click event

$(document).on('click', '.btn-success', function(e) {
    e.preventDefault();
    let uniqueID = $(e.target).attr("id");
    let editID = uniqueID.substring(7, uniqueID.length); //edit substring!
    const editMoviePost = {
        genre: $(`#genre-${editID}`).val(),
        id: $(`#id-${editID}`).val(),
        plot: $(`#plot-${editID}`).val(),
        poster: $(`#poster-${editID}`).val(),
        title: $(`#title-${editID}`).val(),
        year: $(`#year-${editID}`).val(),
        rating: $(`#rating-${editID}`).val()
    };
    console.log(editMoviePost);
    const patchOption = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(editMoviePost),
    };
    let deleteURL = url + "/" + uniqueID.substring(7, uniqueID.length);
    fetch(deleteURL, patchOption).then( success => getMovies());
})

$(document).ready(function () {
    $('#dt-sort').DataTable();
    $('.dataTables_length').addClass('bs-select');
});