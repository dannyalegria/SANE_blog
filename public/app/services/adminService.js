angular.module("blog").service("adminService", function($http) {

  // this.createBlogEntry = function(blog) {
  //   $http.post('/api/createBlogEntry').then(function(response) {
  //     return response;
  //   });
  // };

  this.createBlogEntry = function(blog) {
    return $http({
        method: 'POST',
        url: '/api/createBlogEntry',
        data: blog,
        success: function(){
        console.log('form submitted.');
      }
      })
      .then(function(response) {
        return response;
      });
  };

});
