var app = angular.module("messageApp", []);

app.controller("mainController", ["$scope", function($scope) {

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
	
  	// we need $scope.currentUser to store current signin user
  	}).then(function() {
  		$scope.currentUser = firebase.auth().currentUser;		
  		console.log('Sign as: ' + $scope.currentUser.displayName);

  	// make input fields empty
  	}).then(function() {
  		$scope.email = '';
  		$scope.password = '';
  		$scope.$apply();
  	});
  };

  // sign in anonymously function
  $scope.signInAnon = function() {
	firebase.auth().signInAnonymously()
	  .catch(function(error) {
  		alert(error);	
	
  	  // we need $scope.currentUser to store current signin user
  	  }).then(function() {
		    $scope.currentUser = {};
  		  $scope.currentUser.displayName = 'Anon' + Math.round(Math.random()*100000);	
		    $scope.currentUser.email = '';
		    console.log('Sign as: ' + $scope.currentUser.displayName);
		    $scope.$apply();
  	  });
  };

  // message set function
  $scope.sendMessage = function() {

	if($scope.messagePost !== '') {
	
    	// get an unique ID of push() method
    	var key = firebase.database().ref('messages/').push().key;

    	// new message object with the saved unique ID
    	var message = {
     	  username: $scope.currentUser.displayName,
    	  email: $scope.currentUser.email,
        message: $scope.messagePost,
    	  dateText: currentDate.get(),
    	  dateMS: currentDate.now(),
    	  key: key
      };
  	};

  	// set our message into directory with an unique ID 
  	firebase.database().ref('messages/' + key).set(message);	

  	// make input field empty
  	$scope.messagePost = '';  	
  };

  // run function with a list of messages as an argument
  firebase.database().ref('/messages/').on('value', function(snapshot) {
  	getMessages(snapshot.val());
  });

  // get list of  messages 
  getMessages = function(messages) {
	  $scope.messages = messages;
  };

  // remove a single message
  $scope.remove = function(message) {
	  firebase.database().ref('/messages/' + message.key).remove();
  };

  // 
  $scope.signOut = function() {
  	firebase.auth().signOut().then(function() {
  		$scope.currentUser = null;
  		$scope.$apply();
  	});
  };

  // send message on ENTER
  var $messageBox = $("#message-box");

  $messageBox.keyup(function(event){
  	if(event.keyCode == 13) { 
  	  $scope.sendMessage();
  	  $scope.$apply();
  	};
  });
  
  // how much messages will be showed
  $scope.messagesLimit = 5;
  $scope.showMoreMessages = function() {
	  $scope.messagesLimit += 5;
  };

}]);