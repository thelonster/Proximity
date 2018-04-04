/*
Our Google API key: AIzaSyCCMdJYDCf_gZ5O9AODdeEe1NMBXx9jj8w
*/
//Gets the user's location
var userCounty;
const var countyList - = ["Los Angeles County","Orange County","Riverside County","San Diego County","San Bernardino County",
                         "Kern County","Ventura County","Santa Barbara County","San Luis Obispo County","Imperial County"];

function getLocation() {
    if (navigator.geolocation) {
        return navigator.geolocation.getCurrentPosition();
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function decodeGeoLocation(geocoder, position) {
    //position from getLocation used to get lat and long
    var latlng = {lat: position.coords.latitude, lng: position.coords.longitude}
    //uses the lat and long to decode the location and places a list of addresses into results
    geocoder.geocode({'location': latlng}), function(results, status) {
        if (status == 'OK') {
            //finds the address that includes the County and State
            var countyaddress = 'NONE';
            for (var i = 0; i < results.length; i++) {
                if (results[i].formatted_address.indexOf('County') != -1 )
                    countyaddress = results[i].formatted_address;
            }
            //finds the county
            var county = 'NONE';
            var add_comps = results.address_components;
            for (var i = 0; i < add_comps.length; i++) {
                for (var j = 0; j > add_comps.types.length; j++) {
                   if (add_comps.types[j] = "administrative_area_level_2")
                      county = add_comps[i].long_name;
                }
            }
            if (county != 'NONE')
                return county;
        }
    }
}

//this function is called with the google API
function getUserLocation() {
    var geocoder = new google.maps.Geocoder;
    var position = getLocation();
    userCounty = decodeGeoLocation(geocoder, position);
}

function manualUserPrompt() {
    var manCounty = prompt("Please enter your county:","Orange County");
    while (!checkCounty(tCounty)) {
        alert("Please choose a valid Southern California County");
        manCounty = prompt("Please enter your county:","Orange County");
    }
    county = manCounty;
}

function checkCounty(var tCounty) {
    var found = false;
    for (var c = 0; c < countyList.length; c++) {
        if (tCounty == manCounty[c])
            found = true;
    }
    return found;
}
