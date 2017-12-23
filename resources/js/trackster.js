$(document).ready(function() {
  $('#searchbutton').click(function() {
    Trackster.searchTracksByTitle($('.inputfield').val());

  });
});


var Trackster = {};

var API_KEY = '4f6de2993aa304bcc28c04bf091980b2';

/*
  Given an array of track data, create the HTML for a Bootstrap row for each.
  Append each "row" to the container in the body to display all tracks.
*/
Trackster.renderTracks = function(tracks) {
  $('#trackcontainer').empty();
  for (var i = 0; i < tracks.length; i++) {
    var mediumAlbumArt = tracks[i].image[1]["#text"];
    var $trackrow = $("  <div class='container-fluid row' id='tracktable'>"
     + "    <div class='col-xs-2 play'><a href='" + tracks[i].url +"'>"
     + "    <i class='fa fa-play-circle-o fa-2x'></i></a></div>"
     + "    <div class='col-xs-2 song'>" + tracks[i].name + "</div>"
     + "    <div class='col-xs-4 artist'>" + tracks[i].artist + "</div>"
     + "    <div class='col-xs-2 artwork'><img src='" + mediumAlbumArt +"'></div>"
     + "    <div class='col-xs-2 listeners'>" + tracks[i].listeners + "</div>"
     + "  </div>"
     + "</div>");
      $('#trackcontainer').append($trackrow);

   };
};

/*
  Given a search term as a string, query the LastFM API.
  Render the tracks given in the API query response.
*/
Trackster.searchTracksByTitle = function(title) {
  $.ajax({
    url:'http://ws.audioscrobbler.com/2.0/?method=track.search&track='
      + title + '&api_key=' + API_KEY + '&format=json',
    success: function(response) {
        Trackster.renderTracks(response.results.trackmatches.track);
      }

  });
};
