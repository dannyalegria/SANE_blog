angular.module("blog")
	.controller("adminCtrl", function($scope, user, authService) {

		$scope.user = user;

		$scope.updateUser = function(user) {
			authService.editUser(user)
				.then(function(response) {
					$scope.user = response.data;
					console.log(response.data);
				});
		};

		$scope.createBlogEntry = function(blog){
			adminService.createBlogEntry(blog).then(function(response) {
				if (!response.data) {
					alert('Unable to create blog entry.');
				} else {
					alert('Blog entry created.');
					$scope.blog = {}; // NOTE THIS MIGHT NOT BE NEEDED?
				}
			}).catch(function(err){
				alert('Unable to create blog entry.');
			});
		};

	});
