angular.module('agendaApp').controller('modalContactController',function($scope, $uibModalInstance,contact) {
    
$scope.contact = contact;
  
 $scope.ok = function () {
    $uibModalInstance.close($scope.selected.item);
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
    
}
);

