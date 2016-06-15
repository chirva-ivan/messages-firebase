app.controller('loginCtrl', ['$scope', '$location', 'currentUser', function($scope, $location, currentUser) {
	
  // user create function	
  $scope.createUser = function() {
    firebase.auth().createUserWithEmailAndPassword($scope.emailNew, $scope.passwordNew)

  	// error message
  	.catch(function(error) {
  		alert(error);

  	// add a name for just created user
  	}).then(function(userData) {
    		userData.updateProfile({
    			displayName: $scope.usernameNew
    	})

  	// make input fields empty
  	}).then(function() {		
  		$scope.usernameNew = '';
  		$scope.emailNew = '';
  		$scope.passwordNew = '';
  		$scope.$apply();
  	});
  };

  // user sign in function
  $scope.signIn = function() {
    firebase.auth().signInWithEmailAndPassword($scope.email, $scope.password)
	
  	// error message
  	.catch(function(error) {
  		alert(error);	
	
  	// we need currentUser to store current signin user
  	}).then(function() {
  		currentUser.set(firebase.auth().currentUser);
		$scope.currentUser = currentUser.get();
  		console.log('Sign as: ' + $scope.currentUser.displayName);

  	}).then(function() {
		// make input fields empty
  		$scope.email = '';
  		$scope.password = '';

		// go to chat template
		$location.path('/chat');
  		$scope.$apply();
  	});
  };

  // sign in anonymously function
  $scope.signInAnon = function() {

	firebase.auth().signInAnonymously()
	  .catch(function(error) {
  		alert(error);	
	
  	  }).then(function() {

		currentUser.set(firebase.auth().currentUser);
		$scope.currentUser = currentUser.get();

		Object.defineProperty($scope.currentUser, 'displayName', {
			writable: true,
			value: 'Anonymous'
		});
		Object.defineProperty($scope.currentUser, 'email', {
			writable: true,
			value: ''
		});
		console.log('Sign as: ' + $scope.currentUser.displayName);

		$location.path('/chat');
		$scope.$apply();
  	  });
  };

	$scope.email = 'ivan@m.ru';
	$scope.password = '111111';

}]);