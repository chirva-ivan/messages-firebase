app.controller('userinfoCtrl', ['$scope', '$routeParams', 'currentUser', 'currentMessage', function($scope, $routeParams, currentUser, currentMessage) {

	$scope.userInfo = currentMessage.get();
	console.log($scope.userInfo);

}]);