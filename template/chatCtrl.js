app.controller('chatCtrl', ['$scope', 'currentUser', function($scope, currentUser) {

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
    		  key: key
     		};
  	};

  	// set our message into directory with an unique ID 
  	firebase.database().ref('messages/' + key).set(message);	

  	// make input field empty
  	$scope.messagePost = '';  	
  };

  // run function with a list of messages as an argument
function getMessageRef() {
  firebase.database().ref('/messages/').on('value', function(snapshot) {
  	getMessages(snapshot.val());
  });
};

  // get list of  messages
  getMessages = function(messages) {
	  $scope.messages = messages;
	  var total = 0;
	  for (key in $scope.messages) {
	    $scope.messages[key].dateAgo = Time.getTimeAgo.call($scope.messages[key]);
	    total++;
	    $scope.messagesLimit.total = total; 
	  };
  };

  // remove a single message
  $scope.remove = function(message) {
	  firebase.database().ref('/messages/' + message.key).remove();
  };

  // 
  $scope.signOut = function() {
	currentUser.set(firebase.auth().signOut());
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
  $scope.showMoreMessages = function() {
	  $scope.messagesLimit += 5;
  };

  var updateMessages = setInterval(function() {
	getMessageRef();
	$scope.$apply();
    }, 1000);

}]);
