angular
        .module('placesApp',['ngRoute','ngRoute','CoreController','contactService'])
        .config(function($routeProvider) {
                        $routeProvider

                            // route for the home page
                            .when('/', {
                                templateUrl : 'js/partials/map.html',
                                controller  : 'CoreController'
                            })
                            // route for the contact page
                            .when('/list', {
                                templateUrl : 'js/partials/placesList.html',
                                controller  : 'CoreController'
                            })
                            .when('/search', {
                                templateUrl : 'js/partials/searchPlace.html',
                                controller  : 'CoreController'
                            });
                    })
        .run(anchorScroll);

anchorScroll.$inject =['$anchorScroll'];

 function anchorScroll($anchorScroll) {
            $anchorScroll = angular.noop;
}


