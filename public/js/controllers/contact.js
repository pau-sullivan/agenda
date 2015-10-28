
angular.module('contactController',['gservice'])
        .controller('contactController',function($scope, $rootScope, Contacts, geolocation, gservice, modalService) {
            $scope.formData = {};
    
            $scope.sortType     = 'name';
            $scope.sortReverse  = false;
            $scope.searchContact   = '';

            //$http.get('/api/contacts')
            Contacts.get()
                .success(function(data) {
                    $scope.contacts = data;
                    gservice.refresh(data);
                    //console.log(data);
                })  
                .error(function(data) {
                    console.log('Error: ' + data);
                });

            $scope.formData.latitude = -34.5987586;
            $scope.formData.longitude = -58.3855415;
            
            // Get User's actual coordinates based on HTML5 at window load
            geolocation.getLocation().then(function(data){

                // Set the latitude and longitude equal to the HTML5 coordinates
                coords = {lat:data.coords.latitude, long:data.coords.longitude};

                // Display coordinates in location textboxes rounded to three decimal points
                $scope.formData.longitude = parseFloat(coords.long).toFixed(3);
                $scope.formData.latitude = parseFloat(coords.lat).toFixed(3);

                // Display message confirming that the coordinates verified.
                $scope.formData.htmlverified = "Yep (Thanks for giving us real data!)";

                gservice.setLocation($scope.formData.latitude, $scope.formData.longitude);

            });
                

            // when submitting the add form, send the text to the node API
            $scope.createContact = function() {
                var contactData={
                  name : $scope.formData.name,
                  lastName : $scope.formData.lastName,
                  location :[$scope.formData.longitude, $scope.formData.latitude],
                  htmlverified : $scope.formData.htmlverified
                };

                Contacts.create(contactData)
                    .success(function(data){
                        $scope.formData.name = "";
                        $scope.formData.lastName="";
                        $scope.contacts = data;
                        gservice.refresh(data);
                    });
                    
            };

            // delete a todo after checking it
            $scope.deleteContact = function(id) {
//                $http.delete('/api/contacts/' + id)
//                    .success(function(data) {
//                        $scope.contacts = data;
//                        console.log(data);
//                    })
//                    .error(function(data) {
//                        console.log('Error: ' + data);
//                    });
                    Contacts.delete(id)
                            .success(function(data){
                                $scope.contacts = data;
                                gservice.refresh(data);
                            });
            };
    
            
            // Get coordinates based on mouse click. When a click event is detected....
            $rootScope.$on("clicked", function(){

                if(!$rootScope.$$phase) {
                    // Run the gservice functions associated with identifying coordinates
                    $scope.$apply(function(){
                        $scope.formData.latitude = parseFloat(gservice.clickLat).toFixed(3);
                        $scope.formData.longitude = parseFloat(gservice.clickLong).toFixed(3);
                        $scope.formData.htmlverified = "Nope (Thanks for spamming my map...)";
                    });
                }
            });
            
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

            $scope.open = function(contact){
                  
                var modalOptions = {
                    closeButtonText: 'Cancel',
                    actionButtonText: 'OK',
                    headerText: 'Contacto ' + contact.name,
                    bodyText: 'Last Name' + contact.lastName
                };

                modalService.showModal({}, modalOptions)
                        .then(function (result) {
        //                dataService.deleteCustomer($scope.customer.id).then(function () {
        //                $location.path('/customers');
                            alert(result);
                        }, 
                        function(){alert('error');});
            };
            
});
