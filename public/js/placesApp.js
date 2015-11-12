angular
        .module('placesApp'),['CoreController','contactService,','ngRoute','mapService']
        .config(function($routeProvider) {
                        $routeProvider

                            // route for the home page
                            .when('/', {
                                templateUrl : 'js/partials/map.html',
                                controller  : 'CoreController'
                            })
                            // route for the contact page
                            .when('/places', {
                                templateUrl : 'partials/list.html',
                                controller  : 'CoreController'
                            });
                    });
anchorScroll.$inject =['$anchorScroll'];

 function anchorScroll($anchorScroll) {
            $anchorScroll = angular.noop;
}


