var Time = {
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

    return today = yyyy+'-'+mm+'-'+dd;
  },

  getTimeText: function() {
    var today = new Date();
    var hours = today.getHours();
    var minutes = today.getMinutes();
    var seconds = today.getSeconds();	

    if( hours < 10 ) { hours ='0'+hours };
    if( minutes < 10 ) { minutes ='0'+minutes }; 
    if( seconds < 10 ) { seconds ='0'+seconds }; 

    return today = hours+':'+minutes+':'+seconds;
  },

  // how much time has passed after sending a message
  getTimeAgo: function() {
    var timeRemain = Date.now() - this.dateMS;
    var timeMsInOne = {
      second: 1000,
      minute: 60 * 1000,
      hour: 60 * 60 * 1000,
      day: 24 * 60 * 60 * 1000,
      week: 7 * 24 * 60 * 60 * 1000,
      month: 30 * 7 * 24 * 60 * 60 * 1000
    };

    if ((Math.round(timeRemain / timeMsInOne.second)) == 0) return 'just now';
    if (timeRemain < timeMsInOne.minute) return Math.round(timeRemain / timeMsInOne.minute * 59) + ' sec ago';
    if (timeRemain < timeMsInOne.hour) return Math.round(timeRemain / timeMsInOne.hour * 59) + ' min ago';
    if (timeRemain < timeMsInOne.day) return Math.round(timeRemain / timeMsInOne.day * 23) + ' h ago';
    if (timeRemain < timeMsInOne.week) return Math.round(timeRemain / timeMsInOne.week * 6) + ' d ago';
    if (timeRemain < timeMsInOne.month) return Math.round(timeRemain / timeMsInOne.month * 29) + ' week ago';
  }
};