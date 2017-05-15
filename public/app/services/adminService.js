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
  },

  // this.updateBlogEntry = function(id, title, author, imageurl, content) {
  //   return $http.put('/api/updateBlogEntry/' + id, ({title, author, imageurl, content}))
  //     .success(function(data) {
  //       alert("Entry Updated");
  //     })
  //     .error(function(data) {
  //       alert("Error Updating");
  //     })
  // }

  this.updateBlogEntry = function(id, title, author, imageurl, content) {
    return $http({
      method: 'PUT',
      url: 'updateBlogEntry/' + id,
      data: {
        id: id,
        title: title,
        author: author,
        imageurl: imageurl,
        content: content
      }
    })
    .success(function(data) {
      alert("Entry Updated");
    })
    .error(function(data) {
      alert("Error Updating");
    })
  }


});
