angular.module("personalWebsite").controller("blogCtrl", function($scope, blogService) {

  blogService.blogs.then(function(response){
    $scope.blogs = response.data;
  })

});
