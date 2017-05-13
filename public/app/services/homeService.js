angular.module("blog").service("homeService", function($http) {

  this.blogs = $http.get('/api/getBlogEntries'); 

});
