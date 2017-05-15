angular.module("blog").controller("updateEntryCtrl", function($scope, $stateParams, adminService) {

  var id = $stateParams.id;
  var title = $stateParams.title;
  var author = $stateParams.author;
  var imageurl = $stateParams.imageurl;
  var content = $stateParams.content;

  adminService.getBlog(id).then(function(response){
    $scope.specificBlog = response.data;
  })

  $scope.updateBlogEntry = function(id, title, author, imageurl, content) {
    adminService.updateBlogEntry(id, title, author, imageurl, content);
  }

});
