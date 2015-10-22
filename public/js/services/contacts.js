angular.module('contactService', [])

    // super simple service
    // each function returns a promise object 
    .factory('Contacts', function($http) {
        return {
            get : function() {
                return $http.get('/api/contacts');
            },
            create : function(contactData) {
                return $http.post('/api/contacts', contactData);
            },
            delete : function(id) {
                return $http.delete('/api/contacts/' + id);
            }
        };
    });
