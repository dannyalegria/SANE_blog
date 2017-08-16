angular.module('blog', ['ui.router'])
.config(function($stateProvider, $urlRouterProvider) {

	$urlRouterProvider.otherwise('/');

	$stateProvider
		.state('home', {
			url: '/',
			templateUrl: './app/routes/home/home.html',
			controller: 'homeCtrl'
		})
		.state('login', {
			url: '/login',
			templateUrl: './app/routes/login/login.html',
			controller: 'loginCtrl'
		})
		.state('admin', {
			url: '/admin',
			templateUrl: './app/routes/admin/admin.html',
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
						});
				}
			}
		})
		.state('createEntry', {
			url: '/createEntry',
			templateUrl: './app/routes/admin/createEntry.html',
			controller: 'createEntryCtrl'
		})
		.state('updateEntries', {
			url: '/updateEntries',
			templateUrl: './app/routes/admin/updateEntries.html',
			controller: 'updateEntriesCtrl'
		})
		.state('updateEntry', {
			url: '/updateEntry/:id',
			templateUrl: './app/routes/admin/updateEntry.html',
			controller: 'updateEntryCtrl'
		})
		.state('blogs', {
			url:'/blogs',
			templateUrl:'./app/routes/blogs/blogs.html',
			controller: 'blogsCtrl'
		})
		.state('portfolio', {
			url: '/portfolio',
			templateUrl: './app/routes/portfolio/portfolio.html',
			controller: 'portfolioCtrl'
		})
		.state('contact', {
			url: '/contact',
			templateUrl: './app/routes/contact/contact.html',
			controller: 'contactCtrl'
		})
});
