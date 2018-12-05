angular.module('directoryApp').controller('DetailsInstanceController', function ($rootScope, $uibInstanceModal, User, Auth, Courses) {
    var $ctrl = this;
        
    $ctrl.ok = function () {
        $uibModalInstance.close('Closed');
      };
    
      $ctrl.cancel = function () {
        console.log("Debug: Edit Modal Canceled");
        $uibModalInstance.dismiss('home');
      };
})