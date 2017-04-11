var app = angular.module("blog", ['ui.router'])

.config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider) {

	$urlRouterProvider.otherwise("/");

	$stateProvider
		.state('home', {
			url: "/",
			templateUrl: "./app/routes/home/homeTmpl.html",
			controller: 'homeCtrl'
		})
		.state('login', {
			url: '/login',
			templateUrl: './app/routes/login/loginTmpl.html',
			controller: 'loginCtrl'
		})
		.state('profile', {
			url: '/profile',
			templateUrl: './app/routes/profile/profileTmpl.html',
			controller: 'profileCtrl',
			resolve: {
				user: ["authService", "$state", function(authService, $state) {
					return authService.getCurrentUser()
						.then(function(response) {
							if (!response.data)
								$state.go('login');
							return response.data;
						})
						.catch(function(err) {
							$state.go('login');
						});
				}]
			}
		});

}]);

angular.module("blog")
	.service("authService", ["$http", function($http) {

		this.login = function(user) {
			return $http({
					method: 'post',
					url: '/api/login',
					data: user
				})
				.then(function(response) {
					return response;
				});
		};

		this.logout = function() {
			return $http({
					method: 'get',
					url: '/api/logout'
				})
				.then(function(response) {
					return response;
				});
		};

		this.getCurrentUser = function() {
			return $http({
					method: 'GET',
					url: '/api/me'
				})
				.then(function(response) {
					return response;
				});
		};

		this.registerUser = function(user) {
			return $http({
					method: 'POST',
					url: '/api/register',
					data: user
				})
				.then(function(response) {
					return response;
				});
		};

		this.editUser = function(user) {
			return $http({
					method: 'PUT',
					url: "/api/user/current",
					data: user
				})
				.then(function(response) {
					return response;
				});
		};
	}]);

angular.module("blog")
	.service("userService", ["$http", function($http) {

		this.getUsers = function() {
			return $http({
				method: 'GET',
				url: '/api/user'
			});
		};

		this.getUser = function(id) {
			return $http({
				method: 'GET',
				url: '/api/user?id=' + id
			});
		};
	}]);

angular.module("blog").controller("navCtrl", ["$scope", "authService", "$state", function($scope, authService, $state) {
  $scope.logout = function() {
    authService.logout().then(function(response) {
      $state.go('login');
    });
  };
}]);

angular.module('app').directive('navDir', function() {
  return {
    restrict: 'EA',
    templateUrl: './app/directives/nav/navTmpl.html',
    controller: 'navCtrl'
  };
});

angular.module("blog").controller("homeCtrl", ["$scope", function($scope) {
  $scope.hello = 'Hello World!';

}]);

angular.module("blog").controller("loginCtrl", ["$scope", "authService", "$state", function($scope, authService, $state) {
  $scope.user = {
    email: 't@t.com',
    password: 't'
  }

  $scope.login = function(user) {
    authService.login(user).then(function(response) {
      if (!response.data) {
        alert('User does not exist');
        $scope.user.password = '';
      } else {
        $state.go('profile');
      }
    }).catch(function(err) {
      alert('Unable to login');
    });
  };

  $scope.register = function(user) {
    authService.registerUser(user).then(function(response) {
      if (!response.data) {
        alert('Unable to create user');
      } else {
        alert('User Created');
        $scope.newUser = {};
      }
    }).catch(function(err) {
      alert('Unable to create user');
    });
  };
}]);

angular.module("blog")
	.controller("profileCtrl", ["$scope", "user", "authService", function($scope, user, authService) {
		$scope.user = user;

		$scope.updateUser = function(user) {
			authService.editUser(user)
				.then(function(response) {
					$scope.user = response.data;
				});
		};
	}]);
