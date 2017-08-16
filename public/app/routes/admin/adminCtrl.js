angular.module("personalWebsite").controller("adminCtrl", function($scope, user, authService) {

		$scope.user = user;

		$scope.updateUser = function(user) {
			authService.editUser(user)
				.then(function(response) {
					$scope.user = response.data;
				});
		};

});
