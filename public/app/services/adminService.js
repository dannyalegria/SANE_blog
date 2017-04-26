angular.module("blog").service("adminService", function($http) {

  this.createBlogEntry = function(blog) {
    $http.post('/api/createBlogEntry').then(function(response) {
      return response;
    });
  };

});
