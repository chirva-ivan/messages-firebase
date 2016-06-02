app.controller("mainController", ["$scope", "Auth", "Users", "Messages", 
  function($scope, Auth, Users, Messages) {

  $scope.createUser = function () {
    Auth.$createUser({
    	email: $scope.emailNew,
       	password: $scope.passwordNew
     	}).then(function(userData) {
  	
      //additional information for new user
      var userInfo = {
    		key: userData.uid,
    		date: getCurrentDate(),
    		username: $scope.usernameNew,
    		email: $scope.emailNew
    	};
  		       
  	Users.child(userData.uid).set(userInfo);

   	console.log("User created: " + userData.uid);
    	$scope.usernameNew = '';
    	$scope.emailNew = '';
    	$scope.passwordNew = '';
  	});
  };

  //temporary function for getting data
  $scope.get = function () {  
	console.log(getCurrentDate());
 	console.log($scope.currentUser);
      Users.on("value", function(snapshot) {
        console.log(snapshot.val());
      });
  	console.log(Messages);
  };
    
  $scope.login = function () {
  	Auth.$authWithPassword({
  		email: $scope.email,
  		password: $scope.password
    }).then(function(authData) {
    	$scope.email = '';
    	$scope.password = '';
    	$scope.currentUser = authData;

    	var ref = new Firebase("https://blinding-torch-9498.firebaseio.com/users/" + authData.uid + "/");
    		
    	ref.on("value", function(snapshot) {				
    		$scope.currentUser.userInfo = snapshot.val()
    	});
    }), function() {
  		remember: "sessionOnly"
  	};
  };

  $scope.sendMessage = function () {
  	
  	Messages.$add({
  		content: $scope.messagePost,
  		author: $scope.currentUser.userInfo.username,
  		date: getCurrentDate()
  	});

  	$scope.messagePost = '';
  };

  $scope.messages = Messages;

  $scope.logout = function () {
  	$scope.currentUser = null;
  	Auth.$unauth();
  }

}]);