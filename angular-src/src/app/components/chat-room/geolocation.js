/*
Our Google API key: AIzaSyCCMdJYDCf_gZ5O9AODdeEe1NMBXx9jj8w
*/
//Gets the user's location
var userCounty;
var countyList = ["Los Angeles County","Orange County","Riverside County","San Diego County","San Bernardino County",
                         "Kern County","Ventura County","Santa Barbara County","San Luis Obispo County","Imperial County"];
var theGeocoder;
var longi;
var lati;
var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
};

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(savePosition,manualUserPrompt,options);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function savePosition(position) {
crd = position.coords;
longi = crd.longitude;
lati = crd.latitude;
decodeGeoLocation(theGeocoder);
}

function error() {
    alert("Unable to get your location");
}


function decodeGeoLocation(geocoder) {
    //position from getLocation used to get lat and long
    var latlng = {lat: lati, lng: longi}
    //uses the lat and long to decode the location and places a list of addresses into results
    geocoder.geocode({'location': latlng}, function(results, status) {
        if (status == 'OK') {
            //finds the county
            var county = 'NONE';
            for (var i = 0; i < results.length; i++) {
								var rtypes = results[i].types;
								for (var j = 0; j < rtypes.length; j++) {
										if (rtypes[j] == "administrative_area_level_2") //county level
												county = results[i].formatted_address;
								}
						}
            county = county.substring(0,county.indexOf(","));
            if (county != 'NONE')
                userCounty = county;
        }
    });
}

//this function is called with the google API
function getUserLocation() {
    theGeocoder = new google.maps.Geocoder;
    getLocation();
}

function manualUserPrompt() {
    var manCounty = prompt("Sorry but we couldn't get your location\n\nPlease enter your county:","Orange County");
    while (!checkCounty(tCounty)) {
        alert("Please choose a valid Southern California County (capitalized)");
        manCounty = prompt("Please enter your county:","Orange County");
    }
    county = manCounty;
}

function checkCounty(var tCounty) {
    var found = false;
    for (var c = 0; c < countyList.length; c++) {
        if (tCounty == countyList[c])
            found = true;
    }
    return found;
}
