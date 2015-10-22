
angular.module('contactController',['geolocation', 'gservice'])
        .controller('contactController',function($scope, Contacts, geolocation, gservice) {
            $scope.formData = {};

            //$http.get('/api/contacts')
//            Contacts.get()
//                .success(function(data) {
//                    $scope.contacts = data;
//                    //console.log(data);
//                })  
//                .error(function(data) {
//                    console.log('Error: ' + data);
//                });
//                
//                var lat = 0;
//                var long = 0;
                $scope.formData.latitude = -34.5987586;
                $scope.formData.longitude = -58.3855415;

            // when submitting the add form, send the text to the node API
            $scope.createContact = function() {
//                $http.post('/api/contacts', $scope.formData)
//                    .success(function(data) {
//                        $scope.formData = {};
//                        $scope.contacts = data;
//                        console.log(data);
//                    })
//                    .error(function(data) {
//                        console.log('Error: ' + data);
//                    });
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
                            gservice.refresh($scope.formData.latitude, $scope.formData.longitude);
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
                            });
            };
    
//        function getContacts(){
//            $http.get('/api/contacts')
//                .success(function(data) {
//                    return data;
//                })
//                .error(function(data) {
//                    console.log('Error: ' + data);
//            });
//
//            return data;
//        };

});
