angular.module("personalWebsite").service("adminService", function($http, $state) {

  this.createBlogEntry = function(blog) {
    $http.post('/api/createBlogEntry', blog)
        .success(function(data) {
          alert("Entry Posted");
        })
        .error(function(data) {
          alert("Error in Posting. Refresh the page and try again.");
        })
  },

  this.getBlog = function(id) {
    return $http.get('/api/getBlogEntry/' + id);
  },

  // NOTE See if you can make all these shorthand NOTE //

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
      // BUG Need this to redirect to home page, and refresh. Right now, it only refreshes if done manually... BUG //
      $state.go('home', {}, {reload: 'home'});
    })
    .error(function(data) {
      alert("Error Updating. Refresh the page and try again.");
    })
  },

  this.deleteBlogEntry = function(id) {
    return $http.delete('/api/deleteBlogEntry/' + id)
    // BUG this also fires the .success of the PUT function.. sigh.  BUG //
    .success(function(data) {
      alert("Entry Deleted");
    // BUG this is not refreshing. BUG //
      $state.refresh();
    })
    .error(function(data) {
      alert("Error in Deleting. Refresh the page and try again.");
    })
  }


});
