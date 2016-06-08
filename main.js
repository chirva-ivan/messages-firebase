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

  // count for today's login anon
  var anonRef = 'anonCount/' + Time.getDate().replace(/\//g,'_');

  firebase.database().ref(anonRef).on('value', function(snapshot) {
  	snapshot ? getAnonCount(snapshot.val()) : $scope.anonCount = 0;
  });

  getAnonCount = function(value) {
  	$scope.anonCount = value;
  };

  // sign in anonymously function
  $scope.signInAnon = function() {
	firebase.auth().signInAnonymously()
	  .catch(function(error) {
  		alert(error);	
	
  	  // we need $scope.currentUser to store current signin user
	  }).then(function() {

  		// increase anon's login number and save it
  		$scope.anonCount ++;
  		firebase.database().ref(anonRef).set($scope.anonCount);

  		$scope.currentUser = {};
  		$scope.currentUser.displayName = 'anon' + Time.getDate() + "#" + $scope.anonCount;
   		$scope.currentUser.email = '';
  		console.log('Sign as: ' + $scope.currentUser.displayName);
		$scope.$apply();
	  });
  };

  // message send function
  $scope.sendMessage = function() {

	  if($scope.messagePost !== '') {
	
    	// get an unique ID of push() method
    	var key = firebase.database().ref('messages/').push().key;

    	// new message object with the saved unique ID
    	var message = {
     	  username: $scope.currentUser.displayName,
    	  email: $scope.currentUser.email,
        message: $scope.messagePost,
    	  dateMS: Time.now(),
    	  key: key
      };
  	};

  	// set our message into directory with an unique ID 
  	firebase.database().ref('messages/' + key).set(message);	

  	// make input field empty
  	$scope.messagePost = '';  	
  };

  // getting message data from firebase
  function getMessageRef() {
    firebase.database().ref('/messages/').on('value', function(snapshot) {
    	getMessages(snapshot.val());
    });
  }

  // save message data
  getMessages = function(messages) {
    $scope.messages = messages;
    
    var total = 0;
    for (key in $scope.messages) {

      // call for function than set ago time 
      $scope.messages[key].dateAgo = Time.getTimeAgo.call($scope.messages[key]);

      // counting messages
      total++;
      $scope.messagesLimit.total = total; 
    };
  };

  // remove a single message
  $scope.remove = function(message) {
    firebase.database().ref('/messages/' + message.key).remove();
  };

  // sing out function
  $scope.signOut = function() {
  	firebase.auth().signOut().then(function() {
  		$scope.currentUser = null;
  		$scope.$apply();
  	});
  };
  
  // how much messages will be showed
  $scope.messagesLimit = {
  	default: 5,
  	getMore: function() {
  		$scope.messagesLimit.default += 5;
  	},
  	getLess: function() {
  		$scope.messagesLimit.default -= 5;
  	},
  	total: 0
  };

  // auto update message list
  var updateMessages = setInterval(function() {
  	getMessages($scope.messages);
  	$scope.$apply();
  }, 1000);

  getMessageRef();

}]);