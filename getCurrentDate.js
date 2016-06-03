var getCurrentDate = {
	today: new Date(),
	
  get: function() {
  	var dd = this.today.getDate();
		var mm = this.today.getMonth() + 1;
		var yyyy = this.today.getFullYear();
		var hours = this.today.getHours();
		var minutes = this.today.getMinutes();
		var seconds = this.today.getSeconds();	

		if( dd < 10 ) { dd ='0'+dd }; 
		if( mm < 10 ) { mm ='0'+mm };
		if( hours < 10 ) { hours ='0'+hours };
		if( minutes < 10 ) { minutes ='0'+minutes }; 
		if( seconds < 10 ) { seconds ='0'+seconds }; 

		return today = yyyy+'/'+mm+'/'+dd+' - '+hours+':'+minutes+':'+seconds;
	}
};