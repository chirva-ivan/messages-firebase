// Контроллер дополнительной информации о пользователе.
app.controller('userinfoCtrl', ['$scope', '$routeParams', 'currentUser', function($scope, $routeParams, currentUser) {

	// Запрашиваем базовую информацию о текущем пользователе.
	$scope.currentUser = currentUser.get();

	// Запрашиваем дополнительную информацию о текущем пользователе и
	// сохраняем ее в локальную переменную или
	// назначем свойства локальной переменной, если информации нет.
	function getInfo() {
		firebase.database().ref('/users/' + $scope.currentUser.uid).on('value', function(snapshot) {
			if(snapshot.val()) {
				$scope.userInfo = snapshot.val();
			} else {
				$scope.userInfo = {
					firstName: $scope.currentUser.displayName,
					lastName: '',
					email: $scope.currentUser.email,
					homeTown: ''		
				};
			};
			
			// Сохраняем дополнительную информацию на сервере.
			firebase.database().ref('/users/' + $scope.currentUser.uid).set($scope.userInfo);
		});
	};

	// Фукция добавления дополнительной информации на сервер.
	$scope.add = function() {
		firebase.database().ref('/users/' + $scope.currentUser.uid).set($scope.userInfo);
	};

	// Запуск ранее объявленной функции.
	getInfo();

}]);