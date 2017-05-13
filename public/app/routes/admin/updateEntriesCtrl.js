angular.module("blog").controller("updateEntriesCtrl", function($scope, $stateParams, adminService, homeService) {

  homeService.blogs.then(function(response){
    $scope.blogs = response.data;
  })

  // $scope.updateBlogEntry = function(blog){
  //   adminService.updateBlogEntry(blog);
  // }

  // var id = $stateParams.id;
  //
  // console.log($stateParams);
  //
  // adminService.getBlog(id).then(function(response){
  //   $scope.specificBlog = response.data;
  // })

});
