angular.module("saneBlog")
	.controller("profileCtrl", function($scope, user, authService) {
		$scope.user = user;

		$scope.updateUser = function(user) {
			authService.editUser(user)
				.then(function(response) {
					$scope.user = response.data;
				});
		};
	});
