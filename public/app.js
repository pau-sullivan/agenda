
var agendaApp = angular.module('agendaApp', []);
function mainController($scope, $http) {
    $scope.formData = {};

    $http.get('/api/contacts')
        .success(function(data) {
            $scope.contacts = data;
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

    // when submitting the add form, send the text to the node API
    $scope.createContact = function() {
        $http.post('/api/contacts', $scope.formData)
            .success(function(data) {
                $scope.formData = {};
                $scope.contacts = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    // delete a todo after checking it
    $scope.deleteContact = function(id) {
        $http.delete('/api/contacts/' + id)
            .success(function(data) {
                $scope.contacts = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };
    
    function getContacts(){
        $http.get('/api/contacts')
            .success(function(data) {
                return data;
            })
            .error(function(data) {
                console.log('Error: ' + data);
        });
        
        return data;
    };

}


