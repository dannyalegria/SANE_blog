angular.module('blog', ['ui.router'])
.config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider) {

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
				user: ["authService", "$state", function(authService, $state) {
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
				}]
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
}]);

angular.module("blog").service("adminService", ["$http", "$state", function($http, $state) {

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


}]);

angular.module("blog")
	.service("authService", ["$http", function($http) {

		this.login = function(user) {
			return $http({
					method: 'POST',
					url: '/api/login',
					data: user
				})
				.then(function(response) {
					return response;
				});
		};

		this.logout = function() {
			return $http({
					method: 'GET',
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

angular.module("blog").service("homeService", ["$http", function($http) {

  this.blogs = $http.get('/api/getBlogEntries'); 

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

angular.module('blog').directive('navDir', function() {
  return {
    restrict: 'EA',
    templateUrl: './app/directives/nav/navTmpl.html',
    controller: 'navCtrl'
  };
});

angular.module("blog").controller("adminCtrl", ["$scope", "user", "authService", function($scope, user, authService) {

		$scope.user = user;

		$scope.updateUser = function(user) {
			authService.editUser(user)
				.then(function(response) {
					$scope.user = response.data;
				});
		};

}]);

angular.module("blog").controller("createEntryCtrl", ["$scope", "adminService", function($scope, adminService) {

		$scope.createBlogEntry = function(blog){
			adminService.createBlogEntry(blog);
		}

}]);

angular.module("blog").controller("updateEntriesCtrl", ["$scope", "$stateParams", "adminService", "homeService", function($scope, $stateParams, adminService, homeService) {

  homeService.blogs.then(function(response){
    $scope.blogs = response.data;
  })

  // $scope.updateBlogEntry = function(blog){
  //   adminService.updateBlogEntry(blog);
  // }

  // var id = $stateParams.id;
  //
  // console.log($stateParams);
  //
  // adminService.getBlog(id).then(function(response){
  //   $scope.specificBlog = response.data;
  // })

}]);

angular.module("blog").controller("updateEntryCtrl", ["$scope", "$stateParams", "adminService", function($scope, $stateParams, adminService) {

  var id = $stateParams.id;
  var title = $stateParams.title;
  var author = $stateParams.author;
  var imageurl = $stateParams.imageurl;
  var content = $stateParams.content;

  adminService.getBlog(id).then(function(response){
    $scope.specificBlog = response.data;
  })

  // NOTE Change these names to just updateBlog etc, no entry needed NOTE //

  $scope.updateBlogEntry = function(id, title, author, imageurl, content) {
    adminService.updateBlogEntry(id, title, author, imageurl, content);
  }

  $scope.deleteBlogEntry = function(id) {
    // if(confirm('Are you sure? This will permanently delete this entry.')) {
      adminService.deleteBlogEntry(id);
    //  }
  }

}]);

angular.module("blog").controller("homeCtrl", ["$scope", "homeService", function($scope, homeService) {

  homeService.blogs.then(function(response){
    $scope.blogs = response.data;
  })

}]);

angular.module("blog").controller("loginCtrl", ["$scope", "authService", "$state", function($scope, authService, $state) {
  $scope.user = {
    email: 'karl@marx.com',
    password: 'capital'
  }

  $scope.login = function(user) {
    authService.login(user).then(function(response) {
      if (!response.data) {
        alert('User does not exist');
        $scope.user.password = '';
      } else {
        $state.go('admin');
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
