// IF GoogleMaps API:
// https://developers.google.com/maps/documentation/embed/start
// https://developers.google.com/maps/documentation/javascript/get-api-key#get-an-api-key
// https://developers.google.com/maps/documentation/javascript/places
var slideIndex = 1;
var slides     = null;

function loadSlides() {
  slides = document.getElementsByClassName("mySlides");

  if (slides == null || slides.length ==0) {
    console.log("slides not found");
  }
  else {
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
  }
}

// Next/previous controls
function plusSlides(n) {
  loadSlides();
  if (n==1 && slideIndex < slides.length) {
    slideIndex++;
  }
  else if (n==-1 && slideIndex > 1) {
    slideIndex--;
  }
  else {
    console.log("slide index out of range");
  }
  showSlide();
}

// Thumbnail image controls
function currentSlide() {
  return(slideIndex);
}

function showSlide() {
  slides[slideIndex-1].style.display = "block";
}

/* center the google maps on user's geolocation */
// function getLocation(position) {
//     var latitude = position.coords.latitude;
//     var longitude = position.coords.longitude;
//     if (!map) {
//         showMap(latitude, longitude);
//     }
// }
//
// function showMap(lat, long) {
//     var googleLatLong = new google.maps.LatLng(lat, long);
//     var mapOptions = {
//         zoom: 12,
//         center: googleLatLong,
//         mapTypeId: google.maps.MapTypeId.ROADMAP
//     };
//     var mapDiv = document.getElementById("map");
//     map = new google.maps.Map(mapDiv, mapOptions);
//     map.panTo(googleLatLong);
// }

// This example adds a search box to a map, using the Google Place Autocomplete
// feature. People can enter geographical searches. The search box will return a
// pick list containing a mix of places and predicted search terms.

// This example requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">

function initAutocomplete() {
  var geocoder = new google.maps.Geocoder();

  var map = new google.maps.Map(document.getElementById('map'), {
    /* coordinates of Texas */
    center: {lat: 31.9686, lng: 99.9018},
    zoom: 13,
    mapTypeId: 'roadmap'
  });

  geocoder.geocode({'address': 'Houston'}, function(results, status) {
    if (status == 'OK') {
      map.setCenter(results[0].geometry.location);
    } else {
      console.log("Geocode could not find Houston: " + status);
    }
  }

  // Create the search box and link it to the UI element.
  var input = document.getElementById('pac-input');
  var searchBox = new google.maps.places.SearchBox(input);
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

  // Bias the SearchBox results towards current map's viewport.
  map.addListener('bounds_changed', function() {
    searchBox.setBounds(map.getBounds());
  });

  var markers = [];
  // Listen for the event fired when the user selects a prediction and retrieve
  // more details for that place.
  searchBox.addListener('places_changed', function() {
    var places = searchBox.getPlaces();

    if (places.length == 0) {
      return;
    }

    // Clear out the old markers.
    markers.forEach(function(marker) {
      marker.setMap(null);
    });
    markers = [];

    // For each place, get the icon, name and location.
    var bounds = new google.maps.LatLngBounds();
    places.forEach(function(place) {
      if (!place.geometry) {
        console.log("Returned place contains no geometry");
        return;
      }
      var icon = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25)
      };

      // Create a marker for each place.
      markers.push(new google.maps.Marker({
        map: map,
        icon: icon,
        title: place.name,
        position: place.geometry.location
      }));

      if (place.geometry.viewport) {
        // Only geocodes have viewport.
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    });
    map.fitBounds(bounds);
  });
}
