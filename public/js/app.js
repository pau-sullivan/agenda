angular
        .module('agendaApp', ['MainController', 'contactService','geolocation','gservice','ui.bootstrap'])
        .run(anchorScroll);

anchorScroll.$inject =['$anchorScroll'];

 function anchorScroll($anchorScroll) {
            $anchorScroll = angular.noop;
}
