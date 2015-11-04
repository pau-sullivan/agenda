
(function(){
    'use strict';
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
    })
    .factory('ModalContact',function($uibModal){
        var modalDefaults = {
            backdrop: true,
            keyboard: true,
            modalFade: true,
            templateUrl: '/js/partials/modalContact.html'
        };
        

        this.showModal = function (contact) {
                        
            return this.show(contact);
        };

        this.show = function (contact) {
            //Create temp objects to work with since we're in a singleton service
            var tempModalDefaults = {};
            var tempModalOptions = {
                contact: contact
            };

            //Map angular-ui modal custom defaults to modal defaults defined in service
            angular.extend(tempModalDefaults, modalDefaults);

            if (!tempModalDefaults.controller) {
                tempModalDefaults.controller = function ($scope, $uibModalInstance) {
                    $scope.modal = tempModalOptions;
                    
                    $scope.modal.ok = function (result) {
                        alert(result);
                        $uibModalInstance.close(result);
                    };
                    $scope.modal.close = function (result) {
                        $uibModalInstance.dismiss('cancel');
                    };
                }
            };

            return $uibModal.open(tempModalDefaults).result;
        };
        
        return this;
        
    });
})();

