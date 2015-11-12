(function(){
    'use strict';
    
    angular
        .module('CoreController',['mapService'])
        .controller('CoreController',CoreController);
    
    CoreController.$inject =['$scope', 'Contacts', 'mapService'];
    function CoreController($scope, Contacts, mapService) {
        
        /* jshint validthis: true */
        var vm = this;
        vm.formData = {};
        vm.latitude = -34.5987586;
        vm.longitude = -58.3855415;
        vm.sortType     = 'name';
        vm.sortReverse  = false;
        vm.search   = '';
        
        Contacts.get()
            .success(function(data) {
                vm.contacts = data;
                mapService.refresh(data);
            })  
            .error(function(data) {
                console.log('Error: ' + data);
            });
    }    
})();