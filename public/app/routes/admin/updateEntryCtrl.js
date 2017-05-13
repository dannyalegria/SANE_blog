angular.module("blog").controller("updateEntryCtrl", function($scope, $stateParams, adminService) {

  var id = $stateParams.id;

  adminService.getBlog(id).then(function(response){
    $scope.specificBlog = response.data;
  })

});
