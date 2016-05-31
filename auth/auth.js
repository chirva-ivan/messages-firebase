var app = angular.module("messageApp", ["firebase"]);

app.factory("Auth", ["$firebaseAuth",
  function($firebaseAuth) {
    var ref = new Firebase("https://blinding-torch-9498.firebaseio.com");
    return $firebaseAuth(ref);
  }
]);

app.factory("Ref", function() {
    var ref = new Firebase("https://blinding-torch-9498.firebaseio.com");
    return ref;
  }
);

app.factory("Message", ["$firebaseArray",
  function($firebaseArray) {
    var ref = new Firebase("https://blinding-torch-9498.firebaseio.com");
    return $firebaseArray(ref);
  }
]);

app.controller("authController", ["$scope", "Auth", "Ref", "Message", function($scope, Auth, Ref, Message) {
  
  $scope.createUser = function () {
      Auth.$createUser({
        email: $scope.authNew.email,
        password: $scope.authNew.password
      }).then(function(userData) {
        console.log("User created with uid: " + userData.uid);
      }).catch(function(error) {
        $scope.error = error;
      });
    };

  $scope.get = function () {    
    Ref.on("value", function(snapshot) {
      console.log(snapshot.val());
    });
  };

  $scope.login = function () {
	Ref.authWithPassword({
  		email: $scope.auth.email,
  		password: $scope.auth.password
	}, function(error, authData) {
		if (error) {
    			console.log("Login Failed!", error);
  		} else {
			$scope.currentUser = authData;
    			console.log("Authenticated successfully with payload:", authData);
  		}
	});
  };

  $scope.go = function () {
    $window.location.href = '/messages.html';
    console.log('e');
  };

  $scope.sendMessage = function () {

	Message.$add({
		content: $scope.message
	});
	$scope.message = '';
  };

  $scope.messages = Message;
}]);