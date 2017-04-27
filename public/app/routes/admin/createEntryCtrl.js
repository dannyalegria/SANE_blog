angular.module("blog").controller("createEntryCtrl", function($scope, adminService) {

		$scope.createBlogEntry = function(blog){
			adminService.createBlogEntry(blog).then(function(response) {
				if (response.data) {
	        return response.data;
					alert('Created Blog entry');
				} else {
					alert('Catastrophic failure.');
				}
			}
  )};

});
