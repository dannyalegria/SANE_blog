angular.module("personalWebsite").controller("homeCtrl", function($scope, blogService) {

  blogService.blogs.then(function(response){
    $scope.blogs = response.data;
  })

});
