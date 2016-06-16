// Контроллер чата.
app.controller('chatCtrl', ['$scope', 'currentUser', function($scope, currentUser) {

	// Запрашиваем базовую информацию о текущем пользователе.
 	$scope.currentUser = currentUser.get();

	// Запрашиваем дополнительную информацию о текущем пользователе и
	// добавляем ее к объекту текущего пользователя.
	function getInfo() {
		firebase.database().ref('/users/' + $scope.currentUser.uid).on('value', function(snapshot) {
			$scope.currentUser.info = snapshot.val();
		});
	};

  // Функция для отправки сообщений.
  $scope.sendMessage = function() {

	// Проверяем что поле ввода не пустое.
	if($scope.messagePost !== '') {
	
    		// Для каждого сообщения генирируется уникальный ключ.
    		var key = firebase.database().ref('messages/').push().key;

    		// Создаем временный объект с информацией о сообщении.
    		var message = {
		  displayName: $scope.currentUser.displayName,
      	  	  message: $scope.messagePost,
    		  dateMS: Time.now(),
		  dateText: Time.getTimeText(),
		  uid: $scope.currentUser.uid,
    		  key: key,
		  userInfo: $scope.currentUser.info
     		};
  	};

  	// Сообщения сортируются по дате.
	// Объект сообщений на сервере имеет структуру:
	// Все сообщения: {Дата1} {Дата2} ... {ДатаN}.
	// Дата1: {Сообщение1} {Сообщение2} ... {СообщениеN}.
	var date = Time.getDate();
  	firebase.database().ref('/messages/' + date + '/' + key).set(message);
	
  	// Обнуляем поле ввода.
  	$scope.messagePost = '';
  };

  // Функция для запроса списока всех отправленных сообщений.
  function getMessageRef() {
    firebase.database().ref('/messages/').on('value', function(snapshot) {
    	
	// Функция для присваивания к переменной $scope.messages запрошенного списка сообщений,
	// с которой в дальнейшем будем работать.
      getMessage = function(value) {
        $scope.messages = value;
	  
	  // Добавляем для каждого объекта-даты свойства: 
	  // имя, количество показываемых сообщений в списке, общее число сообщений.
        for (key in $scope.messages) {
		
      		$scope.messages[key].date = key;
		$scope.messages[key].quantityMessage = 10;

		var totalMessages = 0;
		for (message in $scope.messages[key]) {
			totalMessages += 1
		};

		$scope.messages[key].length = totalMessages - 2;
        };
      };

	// Вызываем функцию присвоения с информацией от сервера в аргументе.
      getMessage(snapshot.val());
    });
  };

  // Функция удаления сообщения.
  $scope.remove = function(date, message) {
	  firebase.database().ref('/messages/' + date + '/' + message.key).remove();
  };

  // Функция выхода.
  $scope.signOut = function() {
	  currentUser.set(firebase.auth().signOut());
  };
  
	// Функция редактирования сообщений.
	// Редактирование доступно только для "своих" сообщений.
	$scope.edit = function(date, message) {
		if (message.displayName == firebase.auth().currentUser.displayName) {
			var editedMessage = message.message;
			editedMessage = prompt('Edit', editedMessage);
			if(editedMessage) {
				firebase.database().ref('/messages/' + date + '/' + message.key + '/message/').set(editedMessage);
			};
		} else {
			console.log('Access denied')
		};
	};

	// Функция отображения большего количества сообщений.
	// Функция реализованна через директиву ngInfiniteScroll.
	$scope.loadMore = function(day) {
		if (day.length !== day.quantityMessage) {
			$scope.messages[day.date].quantityMessage += 5;
		};
  	};

	// Запуск ранее объявленных функций.
	getInfo();
	getMessageRef();
	
}]);
