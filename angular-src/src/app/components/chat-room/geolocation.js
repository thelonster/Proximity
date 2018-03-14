/*
Our Google API key: AIzaSyCCMdJYDCf_gZ5O9AODdeEe1NMBXx9jj8w
*/
//Gets the user's location
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

//temporarily here, used to decode the geolocation, will use in HTML
var geocoder = new google.maps.Geocoder;

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
