
(function(){

    'use strict';

    angular
        .module('agendaApp')
        .directive('contactInfo', contactInfo);

    function contactInfo() { 
        return { 
            restrict: 'AE', 
            scope: { 
            formData: '=' 
            }, 
            templateUrl: 'js/directives/contact.html' 
        }; 
    };
    
})();


