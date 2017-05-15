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

  // NOTE See if you can make all these shorthand NOTE //

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
      url: '/api/updateBlogEntry/' + id,
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
  },

  // NOTE Add an 'are you sure?' dialog NOTE//

  this.deleteBlogEntry = function(id) {
    return $http.delete('/api/deleteBlogEntry/' + id)
    .success(function(data) {
      alert("Entry Deleted");
    })
    .error(function(data) {
      alert("Error in Deleting");
    })
  }


});
