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
  for (var i = 0; i < tracks.length; i++) {
    var $trackrow = $("  <div class='container-fluid row' id='tracktable'>"
     + "    <div class='col-xs-2 play'><a href='https://youtu.be/eI_O5_tJ1hA'>"
     + "    <i class='fa fa-play-circle-o fa-2x'></i></a></div>"
     + "    <div class='col-xs-2 song'>bowy dog</div>"
     + "    <div class='col-xs-4 artist'>bowy and the zingers</div>"
     + "    <div class='col-xs-2 artwork'></div>"
     + "    <div class='col-xs-2 listeners'>1000</div>"
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
