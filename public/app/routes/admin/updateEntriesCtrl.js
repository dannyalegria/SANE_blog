angular.module("blog").controller("updateEntriesCtrl", function($scope, $stateParams, adminService, homeService) {

  var id = $stateParams.id;

  homeService.blogs.then(function(response){
    $scope.blogs = response.data;
  })

  // NOTE Duplicate function, coalesce all these controllers. NOTE //
  // BUG Why isn't this working? BUG //

  $scope.deleteBlogEntry = function(id) {
    console.log('clicked');
    if (confirm("Are you sure? Clicking 'OK' will permanently delete this entry.")) {
      adminService.deleteBlogEntry(id);
    }
  }

});
