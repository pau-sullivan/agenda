
/* global google */
(function(){
    'use strict';
// Creates the gservice factory. This will be the primary means by which we interact with Google Maps
angular.module('mapService', [])
    .factory('mapService', function($rootScope){

        // Initialize Variables
        // -------------------------------------------------------------
        // Service our factory will return
        var googleMapService = {};

        var markers=[];
        var map;
        var lastMarker;
        
        // Functions
        // --------------------------------------------------------------
        // Refresh the Map with new data. Function will take new latitude and longitude coordinates.
        googleMapService.refresh = function(places){
            var latitude = -34.5987586;
            var longitude = -58.3855415;
            
            if(!map){
                initialize(latitude, longitude);
            }
            
            deleteMarkers();
            
            var locations= convertToMapPoints(places);
            
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
        
        var convertToMapPoints = function(places){
            
            var locs = [];

            for(var i= 0; i < places.length; i++) {
                var place = places[i];

                
                var  contentString =
                    '<p><b>Lugar</b>: ' + place.name +
                    '</p>';
                
                locs.push({
                    latlon: new google.maps.LatLng(place.location[1], place.location[0]),
                    message: new google.maps.InfoWindow({
                        content: contentString,
                        maxWidth: 320
                    }),
                    name : place.name
                });
            }
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

            var divMap = document.getElementById("map");
            if(divMap !== null)
            {
                map = new google.maps.Map(divMap, mapOptions);
            
                //google.maps.event.addListener(map, 'click', function(e){
                //    setLocation(e.latLng.lat(),e.latLng.lng());
                //});            
            }
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
        return googleMapService;
});

})();