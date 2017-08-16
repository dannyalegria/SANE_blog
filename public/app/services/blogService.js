angular.module("personalWebsite").service("blogService", function($http) {

  this.blogs = $http.get('/api/getBlogEntries');

});
