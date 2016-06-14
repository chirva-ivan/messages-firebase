app.controller('chatCtrl', ['$scope', 'currentUser', 'currentMessage', function($scope, currentUser, currentMessage) {

  $scope.currentUser = currentUser.get();
	
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
		      dateText: Time.getTimeText(),
    		  key: key
     		};
  	};

  	// set our message into directory with an unique ID
	var date = Time.getDate();
  	firebase.database().ref('messages/' + date + '/' + key).set(message);	

  	// make input field empty
  	$scope.messagePost = '';  	
  };

  // run function with a list of messages as an argument
  function getMessageRef() {
    firebase.database().ref('/messages/').on('value', function(snapshot) {
    	
      getMessage = function(value) {
        $scope.messages = value;
      	for (key in $scope.messages) {
      		$scope.messages[key].date = key;
      	};
        console.log($scope.messages);
      };
      getMessage(snapshot.val());
    });
  };

  // remove a single message
  $scope.remove = function(date, message) {
	  firebase.database().ref('/messages/' + date + '/' + message.key).remove();
  };

  // 
  $scope.signOut = function() {
	  currentUser.set(firebase.auth().signOut());
  };
  
  // how much messages will be showed
  $scope.messagesLimit = {
  	default: 6,
  	getMore: function() {
  		$scope.messagesLimit.default += 5;
  	},
  	getLess: function() {
  		$scope.messagesLimit.default -= 5;
  	},
  	total: 0
  };

	$scope.edit = function(date, message) {
		if (message.username == firebase.auth().currentUser.displayName) {
			var editedMessage = message.message;
			editedMessage = prompt('Edit', editedMessage);
			firebase.database().ref('/messages/' + date + '/' + message.key + '/message/').set(editedMessage);
		} else {
			console.log('Access denied')
		};
	};

	$scope.test = function(item) {
		console.log(item);
		console.log($scope.messagesLimit.total);
	};

	getMessageRef();

	$scope.getInfo = function(message) {		
		currentMessage.set(message);
	};
	
}]);
