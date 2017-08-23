angular.module("personalWebsite").controller("blogsCtrl", function($scope, blogService) {

  blogService.blogs.then(function(response){
    $scope.blogs = response.data;
  })

});
