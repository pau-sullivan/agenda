angular
        .module('placesApp',['ngRoute','ngRoute','CoreController','contactService'])
        .config(function($routeProvider) {
                        $routeProvider

                            // route for the home page
                            .when('/', {
                                templateUrl : 'js/partials/map.html',
                                controller  : 'CoreController',
                                activetab :'#'
                            })
                            // route for the contact page
                            .when('/list', {
                                templateUrl : 'js/partials/placesList.html',
                                controller  : 'CoreController',
                                activetab :'list'
                            })
                            .when('/search', {
                                templateUrl : 'js/partials/searchPlace.html',
                                controller  : 'CoreController',
                                activetab :'search'
                                
                            });
                    })
        .run(anchorScroll);

anchorScroll.$inject =['$anchorScroll'];

 function anchorScroll($anchorScroll) {
            $anchorScroll = angular.noop;
}


