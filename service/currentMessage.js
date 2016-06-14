app.service('currentMessage', function() {
	var currentMessage = {};

	return {
		get : function () {
			return currentMessage;
		},
		set : function(value) {
			currentMessage = value;
		}
	};
});