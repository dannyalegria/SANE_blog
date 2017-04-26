angular.module('blog', ['ui.router'])

.config(function($stateProvider, $urlRouterProvider) {

	$urlRouterProvider.otherwise('/');

	$stateProvider
		.state('home', {
			url: '/',
			templateUrl: './app/routes/home/homeTmpl.html',
			controller: 'homeCtrl'
		})
		.state('login', {
			url: '/login',
			templateUrl: './app/routes/login/loginTmpl.html',
			controller: 'loginCtrl'
		})
		.state('admin', {
			url: '/admin',
			templateUrl: './app/routes/admin/adminTmpl.html',
			controller: 'adminCtrl',
			resolve: {
				user: function(authService, $state) {
					return authService.getCurrentUser()
						.then(function(response) {
							if (!response.data)
								$state.go('login');
							return response.data;
							alert(response.data);
						})
						.catch(function(err) {
							$state.go('login');
							alert(response.data);
						});
				}
			}
		})
});
