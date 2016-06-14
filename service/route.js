app.config(function($routeProvider, $locationProvider) {
	$routeProvider
		.when('/', {
			templateUrl: 'template/login.html',
			controller: 'loginCtrl'
		})
		.when('/chat', {
			templateUrl: 'template/chat.html',
			controller: 'chatCtrl'
		})
		.when('/:username', {
			templateUrl: 'template/userinfo.html',
			controller: 'userinfoCtrl'
		});
});