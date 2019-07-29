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

