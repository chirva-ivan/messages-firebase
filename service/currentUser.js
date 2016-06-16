// Сервис необходим для инициализации текущего пользователя между шаблонами.
app.service('currentUser', function() {
	var currentUser = {};

	return {
		get : function () {
			return currentUser;
		},
		set : function(value) {
			currentUser = value;
		}
	};
});