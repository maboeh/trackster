const API_KEY = "5459d706543484f3e3ad1516724a044f";
$(document).ready(function() {
    $("#search-button").click(function() {
        var search_string = $("#search-string").val();
        Trackster.searchTracksByTitle(search_string);
    });

});


var Trackster = {};

/*
  Given an array of track data, create the HTML for a Bootstrap row for each.
  Append each "row" to the container in the body to display all tracks. 
*/
Trackster.renderTracks = function(tracks) {
    $("#songs").empty();
    for (var i = 0; i < tracks.length; i++) {
        var track = tracks[i];
        var mediumAlbumArt = track.image[1]["#text"];
        var track_string =
            '<div class="row" id="tracks-row">' +
            '<a href="' + track.url + '"target="_blank">' + '<i class="col-md-1 col-md-offset-1 far fa-play-circle fa-2x"></i></a>' +
            '<p class="col-md-4">' + track.name + '</p>' +
            '<p class="col-md-2">' + track.artist + '</p>' +
            '<p class="col-md-2"><img src="' + mediumAlbumArt + '"/></p>' +
            '<p class="col-md-2">' + track.listeners + '</p>' +
            '</div>';

        $("#songs").append(track_string);
    }
};

/*
  Given a search term as a string, query the LastFM API.
  Render the tracks given in the API query response.
*/
Trackster.searchTracksByTitle = function(title) {
    $.ajax({
        url: "https://ws.audioscrobbler.com/2.0/?method=track.search&track=" + title + "&api_key=" + API_KEY + "&format=json",
        success: function(response) {
            Trackster.renderTracks(response.results.trackmatches.track);
        }
    });
};