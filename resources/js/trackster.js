$(document).ready(function() {
  // search button input by clicking and the enter key
  $('#searchbutton').click(function() {
    Trackster.searchTracksByTitle($('.inputfield').val());
    });

  $('.inputfield').on('keydown', function(event) {
    if (event.which === 13) {
      Trackster.searchTracksByTitle($('.inputfield').val());
    };
  });

  // Sorting the list table by 3 different headers
  $('.songheader').click(function() {
    trackList.sort(sortSongs);
    $('#trackcontainer').empty();
    $('#trackcontainer').append(trackList);
  });

  $('.artistheader').click(function() {
    trackList.sort(sortArtists);
    $('#trackcontainer').empty();
    $('#trackcontainer').append(trackList);
  });

  $('.listenersheader').click(function() {
    trackList.sort(sortListeners);
    $('#trackcontainer').empty();
    $('#trackcontainer').append(trackList);
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
     + "    <div class='col-xs-1 play'><a href='" + tracks[i].url +"'>"
     + "    <i class='fa fa-play-circle-o fa-2x'></i></a></div>"
     + "    <div class='col-xs-4 song'>" + tracks[i].name + "</div>"
     + "    <div class='col-xs-4 artist'>" + tracks[i].artist + "</div>"
     + "    <div class='col-xs-1 artwork'><img src='" + mediumAlbumArt +"'></div>"
     + "    <div class='col-xs-1 listeners'>" + tracks[i].listeners + "</div>"
     + "    <div class='col-xs-1 streamable'>" + tracks[i].streamable + "</div>"
     + "  </div>"
     + "</div>");
     $('#trackcontainer').append($trackrow);
   };
    window.trackList = $('#trackcontainer > #tracktable');
};


var sortSongs = function(a, b) {return a.children[1].textContent.localeCompare(
  b.childNodes[3].textContent);
};

var sortArtists = function(a, b) {return a.children[2].textContent.localeCompare(
  b.children[2].textContent);
};

var sortListeners = function(a, b) {return a.children[4].textContent -
  b.children[4].textContent;
};



/*
  Given a search term as a string, query the LastFM API.
  Render the tracks given in the API query response.
*/
Trackster.searchTracksByTitle = function(title) {
  $.ajax({
    url:'https://ws.audioscrobbler.com/2.0/?method=track.search&track='
      + title + '&api_key=' + API_KEY + '&format=json',

    beforeSend: function() {
    $('header h1').css({'animation-name': 'headeranimation',
    'animation-duration': '400ms'})
      },

    success: function(response) {
        Trackster.renderTracks(response.results.trackmatches.track);
      },

    complete: function() {
      $('header h1').css({'animation-name':''})
    }

  });
};
