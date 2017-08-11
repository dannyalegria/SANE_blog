angular.module("blog").controller("updateEntriesCtrl", function($scope, $stateParams, adminService, homeService) {

  var id = $stateParams.id;

  homeService.blogs.then(function(response){
    $scope.blogs = response.data;
  })

  // NOTE Duplicate function, coalesce all these controllers. NOTE //
  // TODO Figure out how to make the page refresh after deleting a blog entry. TODO //

  $scope.deleteBlogEntry = function(id) {
    console.log('clicked');
    if (confirm("Are you sure? Clicking 'OK' will permanently delete this entry.")) {
      adminService.deleteBlogEntry(id);
    }
  }

});
