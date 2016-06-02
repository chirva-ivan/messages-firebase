function getCurrentDate () {
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1;
	var yyyy = today.getFullYear();
	var hours = today.getHours();
	var minutes = today.getMinutes();
	var seconds = today.getSeconds();	

	if( dd < 10 ) { dd ='0'+dd }; 
	if( mm < 10 ) { mm ='0'+mm };
	if( hours < 10 ) { hours ='0'+hours };
	if( minutes < 10 ) { minutes ='0'+minutes }; 
	if( seconds < 10 ) { seconds ='0'+seconds }; 

	return today = yyyy+'/'+mm+'/'+dd+' - '+hours+':'+minutes+':'+seconds;
}