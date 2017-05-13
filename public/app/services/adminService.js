angular.module("blog").service("adminService", function($http, $state) {

  this.createBlogEntry = function(blog) {
    $http.post('/api/createBlogEntry', blog)
        .success(function(data) {
          alert("Entry Posted");
        })
        .error(function(data) {
          alert("Error in Posting");
        })
  },

  this.getBlog = function(id) {
    return $http.get('/api/getBlogEntry/' + id);
  }


});
