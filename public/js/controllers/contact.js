(function(){
    'use strict';
    
    angular
        .module('ContactController',['gservice'])
        .controller('ContactController',ContactController);
    
    ContactController.$inject =['$scope','$rootScope', 'Contacts', 'geolocation', 'gservice', 'ModalContact'];
    function ContactController($scope,$rootScope, Contacts, geolocation, gservice, ModalContact, $uibModalInstance) {
        
        /* jshint validthis: true */
        var vm = this;
        vm.formData = {};
        vm.formData.latitude = -34.5987586;
        vm.formData.longitude = -58.3855415;
        vm.sortType     = 'name';
        vm.sortReverse  = false;
        vm.searchContact   = '';
        
        Contacts.get()
            .success(function(data) {
                vm.contacts = data;
                gservice.refresh(data);
            })  
            .error(function(data) {
                console.log('Error: ' + data);
            });
            
            // Get User's actual coordinates based on HTML5 at window load
        geolocation.getLocation().then(function(data){
            if(data.coords.latitude && data.coords.longitude)
            {
                // Set the latitude and longitude equal to the HTML5 coordinates
                var coords = {lat:data.coords.latitude, long:data.coords.longitude};

                // Display coordinates in location textboxes rounded to three decimal points
                vm.formData.longitude = parseFloat(coords.long).toFixed(3);
                vm.formData.latitude = parseFloat(coords.lat).toFixed(3);

                // Display message confirming that the coordinates verified.
                vm.formData.htmlverified = "Yep (Thanks for giving us real data!)";

                gservice.setLocation(vm.formData.latitude, vm.formData.longitude);
            }
        });
                
        vm.createContact = function() {
            var contactData={
              name : vm.formData.name,
              lastName : vm.formData.lastName,
              location :[vm.formData.longitude, vm.formData.latitude],
              htmlverified : vm.formData.htmlverified
            };

            Contacts.create(contactData)
                .success(function(data){
                    vm.formData.name = "";
                    vm.formData.lastName="";
                    vm.contacts = data;
                    gservice.refresh(data);
                });
        };

        vm.deleteContact = function(id) {
            Contacts.delete(id)
                .success(function(data){
                    vm.contacts = data;
                    gservice.refresh(data);
                });
        };
    
        // Get coordinates based on mouse click. When a click event is detected....
        $rootScope.$on("clicked", function(){

            if(!$rootScope.$$phase) {
                // Run the gservice functions associated with identifying coordinates
                $scope.$apply(function(){
                    vm.formData.latitude = parseFloat(gservice.clickLat).toFixed(3);
                    vm.formData.longitude = parseFloat(gservice.clickLong).toFixed(3);
                    vm.formData.htmlverified = "Nope (Thanks for spamming my map...)";
                });
            }
        });
            
        vm.open = function(contact){          
            
            ModalContact.showModal(contact)
                .then(
                    function (result) {}, //OK
                    function(){}         //Cancel
                );
        };    
        
        
//        vm.ok = function () {
//            $uibModalInstance.close('Resultado OK');
//          };
//
//        vm.cancel = function () {
//            $uibModalInstance.dismiss('cancel');
//          };
    }    
})();

//            $scope.open = function (contact) {
//                var modalInstance = $uibModal.open({
//                  animation: $scope.animationsEnabled,
//                  templateUrl: 'js/templates/modalContact.html',//'js/templates/contact.html',
//                  controller: 'modalContactController',
//                  size: 'lg',
//                  resolve: {
//                    contact: function () {
//                      return contact;
//                    }
//                  }
//                });
//                
//                modalInstance.result.then(
//                    function () {
//                        //$scope.selected = selectedItem;
//                        alert('entro');
//                    }, 
//                    function () {
//                        //$log.info('Modal dismissed at: ' + new Date());
//                    }
//                );
//            };