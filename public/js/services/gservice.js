/* global google */

// Creates the gservice factory. This will be the primary means by which we interact with Google Maps
angular.module('gservice', [])
    .factory('gservice', function($rootScope){

        // Initialize Variables
        // -------------------------------------------------------------
        // Service our factory will return
        var googleMapService = {};
        googleMapService.clickLat  = 0;
        googleMapService.clickLong = 0;
        
        var markers=[];
        var map;
        var lastMarker;
        
        // Functions
        // --------------------------------------------------------------
        // Refresh the Map with new data. Function will take new latitude and longitude coordinates.
        googleMapService.refresh = function(contacts){
            var latitude = -34.5987586;
            var longitude = -58.3855415;
            
            if(!map){
                initialize(latitude, longitude);
            }
            
            
            deleteMarkers();
            
            var locations= convertToMapPoints(contacts);
            
            // Loop through each location in the array and place a marker
            locations.forEach(function(n, i){
                var marker = new google.maps.Marker({
                    position: n.latlon,
                    title: "Big Map",
                    icon: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
                });
                marker.setMap(map);
                markers.push(marker);
                // For each marker created, add a listener that checks for clicks
                google.maps.event.addListener(marker, 'click', function(e){
                    n.message.open(map, marker);
                });
            });
        };

        googleMapService.setLocation = function(latitude, longitude){
            setLocation(latitude,longitude);
        };
        
        // Private Inner Functions
        // --------------------------------------------------------------
        // Convert a JSON of users into map points
        var convertToMapPoints = function(contacts){
            
            // Clear the locations holder
            var locs = [];

            // Loop through all of the JSON entries provided in the response
            for(var i= 0; i < contacts.length; i++) {
                var contact = contacts[i];

                // Create popup windows for each record
                var  contentString =
                    '<p><b>Nombre</b>: ' + contact.name +
                    '<br><b>Apellido</b>: ' + contact.lastName +
                    '</p>';
                // Converts each of the JSON records into Google Maps Location format (Note [Lat, Lng] format).
                locs.push({
                    latlon: new google.maps.LatLng(contact.location[1], contact.location[0]),
                    message: new google.maps.InfoWindow({
                        content: contentString,
                        maxWidth: 320
                    }),
                    name : contact.name,
                    lastName : contact.lastName
                });
            }
            // location is now an array populated with records in Google Maps format
            return locs;
        };

        // Initializes the map
        var initialize = function(latitude, longitude) {
            var mapOptions = {
              scrollwheel: false,
              mapTypeControl: true,
              mapTypeId: google.maps.MapTypeId.ROADMAP,
              center:new google.maps.LatLng(latitude,longitude),
              zoom:12
            };

            map = new google.maps.Map(document.getElementById("map"), mapOptions);
            
            // Clicking on the Map moves the bouncing red marker
            google.maps.event.addListener(map, 'click', function(e){
                    setLocation(e.latLng.lat(),e.latLng.lng());
            });            
        };
        
        var deleteMarkers= function() {
            markers.forEach(function(m){m.setMap(null);});
        };
        
        var setLocation = function(latitude,longitude){
           var location = new google.maps.LatLng(latitude, longitude);
                   
           var marker = new google.maps.Marker({
                position: location,
                animation: google.maps.Animation.BOUNCE,
                icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
            });

            if(lastMarker)
                lastMarker.setMap(null);
            
            marker.setMap(map);
            lastMarker = marker;
            
            map.panTo(marker.position);
            
            // Update Broadcasted Variable (lets the panels know to change their lat, long values)
            googleMapService.clickLat = marker.getPosition().lat();
            googleMapService.clickLong = marker.getPosition().lng();
            $rootScope.$broadcast("clicked");
       
        };
//         Refresh the page upon window load. Use the initial latitude and longitude
//        google.maps.event.addDomListener(window, 'load',
//            googleMapService.refresh(selectedLat, selectedLong));

        return googleMapService;
});