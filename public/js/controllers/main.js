
angular.module('contactController',[])
        .controller('mainController',function($scope, $http, Contacts) {
            $scope.formData = {};

            //$http.get('/api/contacts')
            Contacts.get()
                .success(function(data) {
                    $scope.contacts = data;
                    //console.log(data);
                })  
                .error(function(data) {
                    console.log('Error: ' + data);
                });

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
                    if($scope.formData.name.length && $scope.formData.lastName.length)
                    {
                        Contacts.create($scope.formData)
                            .success(function(data){
                                $scope.formData = {};
                                $scope.contacts = data;
                            });
                    }
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
