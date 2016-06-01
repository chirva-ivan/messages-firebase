var app = angular.module("messageApp", ["firebase"]);

app.factory("Auth", ["$firebaseAuth",
  function($firebaseAuth) {
    var ref = new Firebase("https://blinding-torch-9498.firebaseio.com/");
    return $firebaseAuth(ref);
  }
]);

app.factory("Users", function() {
    var ref = new Firebase("https://blinding-torch-9498.firebaseio.com/users/");
    return ref;
  }
);

app.factory("Messages", ["$firebaseArray",
  function($firebaseArray) {
    var ref = new Firebase("https://blinding-torch-9498.firebaseio.com/messages/");
    return $firebaseArray(ref);
  }
]);