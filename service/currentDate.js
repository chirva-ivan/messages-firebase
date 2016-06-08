var currentDate = {
  now: function() {
    return Date.now();
  },
  
  getDate: function() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();

    if( dd < 10 ) { dd ='0'+dd }; 
    if( mm < 10 ) { mm ='0'+mm };

    return today = yyyy+'/'+mm+'/'+dd;
  },

  getTime: function() {
    var today = new Date();
    var hours = today.getHours();
    var minutes = today.getMinutes();
    var seconds = today.getSeconds();	

    if( hours < 10 ) { hours ='0'+hours };
    if( minutes < 10 ) { minutes ='0'+minutes }; 
    if( seconds < 10 ) { seconds ='0'+seconds }; 

    return today = hours+':'+minutes+':'+seconds;
  }
};