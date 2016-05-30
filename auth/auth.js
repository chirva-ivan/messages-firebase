var app = angular.module("messegeApp", ["firebase"]);

app.controller("authController", function($scope, $firebaseObject) {
  var ref = new Firebase("https://blinding-torch-9498.firebaseio.com");
  
  $scope.createUser = function () {

  	ref.push({
  		username: $scope.auth.username,
  		email: $scope.auth.email,
  		password: $scope.auth.password
  	}, function() {
  		console.log("ready")
  	});
  };
});