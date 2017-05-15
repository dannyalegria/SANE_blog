angular.module("blog").controller("updateEntryCtrl", function($scope, $stateParams, adminService) {

  var id = $stateParams.id;
  var title = $stateParams.title;
  var author = $stateParams.author;
  var imageurl = $stateParams.imageurl;
  var content = $stateParams.content;

  adminService.getBlog(id).then(function(response){
    $scope.specificBlog = response.data;
  })

  // NOTE Change these names to just updateBlog etc, no entry needed NOTE //

  $scope.updateBlogEntry = function(id, title, author, imageurl, content) {
    adminService.updateBlogEntry(id, title, author, imageurl, content);
  }

  $scope.deleteBlogEntry = function(id) {
    // if(confirm('Are you sure? This will permanently delete this entry.')) {
      adminService.deleteBlogEntry(id);
    //  }
  }

});
