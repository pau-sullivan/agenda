(function(){
    'use strict';
    
    angular
        .module('MainController',['gservice'])
        .controller('MainController',MainController);
    
    MainController.$inject =['$scope','$rootScope', 'Contacts', 'geolocation', 'gservice','$uibModal'];
    function MainController($scope,$rootScope, Contacts, geolocation, gservice, $uibModal) {
        
        /* jshint validthis: true */
        var vm = this;
        vm.formData = {};
        vm.latitude = -34.5987586;
        vm.longitude = -58.3855415;
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
                vm.longitude = parseFloat(coords.long).toFixed(3);
                vm.latitude = parseFloat(coords.lat).toFixed(3);

                // Display message confirming that the coordinates verified.
                vm.formData.htmlverified = "Yep (Thanks for giving us real data!)";

                gservice.setLocation(vm.latitude, vm.longitude);
            }
        });
                
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
                    vm.latitude = parseFloat(gservice.clickLat).toFixed(3);
                    vm.longitude = parseFloat(gservice.clickLong).toFixed(3);
                    vm.formData.htmlverified = "Nope (Thanks for spamming my map...)";
                });
            }
        });
            

        vm.open = function (contact) {
            if(contact){
                vm.formData.id = contact._id;
                vm.formData.latitude = contact.location[1];
                vm.formData.longitude = contact.location[0];
                vm.formData.htmlverified = contact.htmlverified;
                vm.formData.name = contact.name;
                vm.formData.lastName = contact.lastName;
            }
            else{
                 vm.formData.name = "";
                 vm.formData.lastName = "";
                 vm.formData.latitude = vm.latitude;
                 vm.formData.longitude = vm.longitude;
            }
            
          var modalInstance = $uibModal.open({
            templateUrl: '/js/partials/modalContact.html',
            controller: ModalInstanceCtrl,
            resolve:{
                formData:function(){
                    return vm.formData;
                }
            }
          });
        };
        
        var ModalInstanceCtrl = function ($scope, $uibModalInstance, formData) {
            
            $scope.formData = formData;
            if($scope.formData.id == null)
                $scope.formData.action = "Agregar";
            else
                $scope.formData.action = "Modificar";
            
            $scope.submit = function() {
          
            var contactData={
               name : vm.formData.name,
               lastName : vm.formData.lastName,
               location :[vm.formData.longitude, vm.formData.latitude],
               htmlverified : vm.formData.htmlverified
             };
             
             if(!$scope.formData.id){
                Contacts.create(contactData)
                    .success(function(data){
                        vm.formData.name = "";
                        vm.formData.lastName="";
                        vm.contacts = data;
                        gservice.refresh(data);
                    });
             }
             else{
                 Contacts.update($scope.formData.id, contactData)
                    .success(function(data){
                        vm.formData.name = "";
                        vm.formData.lastName="";
                        vm.contacts = data;
                        gservice.refresh(data);
                    });
             }

          $uibModalInstance.close();
        };

        $scope.ok = function () {
          $uibModalInstance.close();
        };

        $scope.cancel = function () {
          $uibModalInstance.dismiss('cancel');
        };
      };

    }    
})();