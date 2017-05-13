angular.module("blog").controller("homeCtrl", function($scope, homeService) {

  homeService.blogs.then(function(response){
    $scope.blogs = response.data;
  })

});
