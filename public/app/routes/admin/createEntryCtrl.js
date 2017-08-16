angular.module("personalWebsite").controller("createEntryCtrl", function($scope, adminService) {

		$scope.createBlogEntry = function(blog){
			adminService.createBlogEntry(blog);
		}

});
