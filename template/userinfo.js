app.controller('userinfoCtrl', ['$scope', '$routeParams', 'currentUser', function($scope, $routeParams, currentUser) {

	$scope.currentUser = currentUser.get();

	$scope.userInfo = {
		firstName: $scope.currentUser.displayName,
		lastName: '',
		email: $scope.currentUser.email,
		homeTown: ''		
	};
	
	function getInfo() {
		firebase.database().ref('/users/' + $scope.currentUser.uid).on('value', function(snapshot) {
			if(snapshot.val()) $scope.userInfo = snapshot.val();
		});
	};

	getInfo();

	firebase.database().ref('/users/' + $scope.currentUser.uid).set($scope.userInfo);

	$scope.add = function() {
		firebase.database().ref('/users/' + $scope.currentUser.uid).set($scope.userInfo);
	};

}]);