angular.module("personalWebsite", ['ui.router'])
.config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider) {

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
}]);

angular.module("personalWebsite").service("adminService", ["$http", "$state", function($http, $state) {

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


}]);

angular.module("personalWebsite")
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

angular.module("personalWebsite").service("blogService", ["$http", function($http) {

  this.blogs = $http.get('/api/getBlogEntries');

}]);

angular.module("personalWebsite").service("homeService", ["$http", function($http) {

}]);

angular.module("personalWebsite")
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

angular.module("personalWebsite").controller("navCtrl", ["$scope", "authService", "$state", function($scope, authService, $state) {
  $scope.logout = function() {
    authService.logout().then(function(response) {
      $state.go('login');
    });
  };
}]);

angular.module("personalWebsite").directive('navDir', function() {
  return {
    restrict: 'EA',
    templateUrl: './app/directives/nav/nav.html',
    controller: 'navCtrl',
    link: function(scope, element, attribute) {

      // nav dropdown toggle:
      $('nav ul li > a:not(:only-child)').click(function(e) {
        $(this).siblings('.nav-dropdown').toggle();
        // if there is more than one toggle button, this prevents all toggles from opening:
        $('.nav-dropdown').not($(this).siblings()).hide();
        e.stopPropagation();
      });

      // close toggle when you click outside of it:
      $('html').click(function() {
        $('.nav-dropdown').hide();
      });

      // toggle hamburger
      $('#nav-toggle').on('click', function() {
        this.classList.toggle('active');
      });

      $('#nav-toggle').click(function() {
        $('nav ul').toggle();
      });

    }
  };
});

angular.module("personalWebsite").controller("adminCtrl", ["$scope", "user", "authService", function($scope, user, authService) {

		$scope.user = user;

		$scope.updateUser = function(user) {
			authService.editUser(user)
				.then(function(response) {
					$scope.user = response.data;
				});
		};

}]);

angular.module("personalWebsite").controller("createEntryCtrl", ["$scope", "adminService", function($scope, adminService) {

		$scope.createBlogEntry = function(blog){
			adminService.createBlogEntry(blog);
		}

}]);

angular.module("personalWebsite").controller("updateEntriesCtrl", ["$scope", "$stateParams", "adminService", "blogService", function($scope, $stateParams, adminService, blogService) {

  var id = $stateParams.id;

  blogService.blogs.then(function(response){
    $scope.blogs = response.data;
  })

  // NOTE Duplicate function, coalesce all these controllers. NOTE //
  // TODO Figure out how to make the page refresh after deleting a blog entry. TODO //

  $scope.deleteBlogEntry = function(id) {
    console.log('clicked');
    if (confirm("Are you sure? Clicking 'OK' will permanently delete this entry.")) {
      adminService.deleteBlogEntry(id);
    }
  }

}]);

angular.module("personalWebsite").controller("updateEntryCtrl", ["$scope", "$stateParams", "adminService", function($scope, $stateParams, adminService) {

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
    console.log(id, title, author, imageurl, content)
    adminService.updateBlogEntry(id, title, author, imageurl, content);
  }

  $scope.deleteBlogEntry = function(id) {
    if (confirm("Are you sure? Clicking 'OK' will permanently delete this entry.")) {
      adminService.deleteBlogEntry(id);
    }
  }

}]);

angular.module("personalWebsite").controller("blogCtrl", ["$scope", "blogService", function($scope, blogService) {

  blogService.blogs.then(function(response){
    $scope.blogs = response.data;
  })

}]);

angular.module("personalWebsite").controller("blogsCtrl", ["$scope", "blogService", function($scope, blogService) {

  blogService.blogs.then(function(response){
    $scope.blogs = response.data;
  })

}]);

angular.module("personalWebsite").controller("homeCtrl", ["$scope", "blogService", function($scope, blogService) {

  blogService.blogs.then(function(response){
    $scope.blogs = response.data;
  })

}]);

angular.module("personalWebsite").controller("contactCtrl", ["$scope", function($scope) {

}]);

angular.module("personalWebsite").controller("portfolioCtrl", ["$scope", function($scope) {

}]);

angular.module("personalWebsite").controller("loginCtrl", ["$scope", "authService", "$state", function($scope, authService, $state) {
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
