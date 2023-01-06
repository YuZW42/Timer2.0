(function () {
  'use strict';
   var alarmName = 'remindme';
   function checkAlarm(callback) {
     chrome.alarms.getAll(function(alarms) {
       var hasAlarm = alarms.some(function(a) {
         return a.name == alarmName;
       });
       var newLabel;
       if (hasAlarm) {
         newLabel = 'Cancel alarm';
       } else {
         newLabel = 'Activate alarm';
       }
       document.getElementById('toggleAlarm').innerText = newLabel;
       if (callback) callback(hasAlarm);
     })
   }
   function createAlarm() {
    var desireTime = prompt("Set timer for how many min?");
    var dummy = new Date().getTime();
    desireTime = desireTime * 60000 + dummy +2000 
    /*This is used to get the desired time --> input: 10 min into something accurate*/ 
    
    // Run myfunc every second
    var myfunc = setInterval(function() {
    
    var now = new Date().getTime();
    var timeleft = desireTime - now;
    
    console.log(timeleft);
    // Calculating the days, hours, minutes and seconds left
    var days = Math.floor(timeleft  / (1000 * 60 * 60 * 24));
    var hours = Math.floor((timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((timeleft  % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((timeleft  % (1000 * 60)) / 1000);
        
    // Result is output to the specific element
    document.getElementById("days").innerHTML = days + "d "
    document.getElementById("hours").innerHTML = hours + "h " 
    document.getElementById("mins").innerHTML = minutes + "m " 
    document.getElementById("secs").innerHTML = seconds + "s " 
        
    // Display the message when countdown is over
    if (timeleft < 0) {
        clearInterval(myfunc);
        document.getElementById("days").innerHTML = ""
        document.getElementById("hours").innerHTML = "" 
        document.getElementById("mins").innerHTML = ""
        document.getElementById("secs").innerHTML = ""
        document.getElementById("end").innerHTML = "TIME UP!!";
    }
    }, 1000);
   }
   function cancelAlarm() {
     chrome.alarms.clear(alarmName);
   }
   function doToggleAlarm() {
     checkAlarm( function(hasAlarm) {
       if (hasAlarm) {
         cancelAlarm();
       } else {
         createAlarm();
       }
       checkAlarm();
     });
   }
   document.getElementById('toggleAlarm').addEventListener('click', doToggleAlarm);
  checkAlarm();
})();
chrome.alarms.getAll(function(alarms) {
  console.log(alarms);
  console.log(alarms[0]);
});