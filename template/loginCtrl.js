// Контроллер входа.
app.controller('loginCtrl', ['$scope', '$location', 'currentUser', function($scope, $location, currentUser) {
	
  // Функция регистрации нового пользователя.
  $scope.createUser = function() {
    firebase.auth().createUserWithEmailAndPassword($scope.emailNew, $scope.passwordNew)

  	// Ловим ошибки.
  	.catch(function(error) {
  		alert(error);

  	// Сохраняем имя пользователя.
  	}).then(function(userData) {
    		userData.updateProfile({
    			displayName: $scope.usernameNew
    	})

  	// Обнуляем поля ввода.
  	}).then(function() {		
  		$scope.usernameNew = '';
  		$scope.emailNew = '';
  		$scope.passwordNew = '';
  		$scope.$apply();
  	});
  };

  // Функция входа.
  $scope.signIn = function() {
    firebase.auth().signInWithEmailAndPassword($scope.email, $scope.password)
	
  	// Ловим ошибки.
  	.catch(function(error) {
  		alert(error);	
	
  	// Сохраняем информацию о текущем пользователе в сервисе currentUser и
	// и присваиваем локальной переменной эту же информацию.
  	}).then(function() {
  		currentUser.set(firebase.auth().currentUser);
		$scope.currentUser = currentUser.get();
  		console.log('Sign as: ' + $scope.currentUser.displayName);

  	}).then(function() {

		// Обнуляем поля ввода.
  		$scope.email = '';
  		$scope.password = '';

		// Переходим в шаблон чата.
		$location.path('/chat');
  		$scope.$apply();
  	});
  };

  // Функция анонимного входа.
  $scope.signInAnon = function() {

	firebase.auth().signInAnonymously()

	  // Ловим ошибки.
	  .catch(function(error) {
  		alert(error);	
	
  	  }).then(function() {

  		// Сохраняем информацию о текущем пользователе в сервисе currentUser и
		// и присваиваем локальной переменной эту же информацию.
		currentUser.set(firebase.auth().currentUser);
		$scope.currentUser = currentUser.get();

		// Изменяем отображаемое имя.
		Object.defineProperty($scope.currentUser, 'displayName', {
			writable: true,
			value: 'Anonymous'
		});

		console.log('Sign as: ' + $scope.currentUser.displayName);

		// Переходим в шаблон чата.
		$location.path('/chat');
		$scope.$apply();
  	  });
  };

	$scope.email = 'ivan@m.ru';
	$scope.password = '111111';

}]);