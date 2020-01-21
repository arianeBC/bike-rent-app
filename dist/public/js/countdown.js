class Countdown {
   constructor(minutes) {

   // Add minutes to current date
   Date.prototype.addMins = function(m) {     
      this.setTime(this.getTime() + (m*60*1000));  
      return this;    
   };
   this.datePlusMinutes = function() { 
      var a = new Date(); 
      a.addMins(minutes); 
      return a;
   };

   // Set the date we're counting down to
   this.countDownDate = this.datePlusMinutes();

   // During countdown remove 1 bike
   let getAvailableBikes = sessionStorage.getItem("availableBikes");
   let matches = getAvailableBikes.match(/(\d+)/); 
   if (matches) {
      document.querySelector('.availableBikes').innerHTML = matches[0] - 1 + " vélos disponibles";
   }

   // Reset countdown
   this.btnConfirm = document.querySelector(".canvas-container div button[type=submit]");
   let reset = () => clearInterval(setInterval);
   this.btnConfirm.addEventListener("click", reset);
   };

   // Update the count down every 1 second
   setInterval() {
      console.log("hello");
      // Get today's date and time
      this.now = new Date().getTime();

      // Find the distance between now and the count down date
      this.distance = countDownDate - now;

      // Time calculations for days, hours, minutes and seconds
      this.minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      this.seconds = Math.floor((distance % (1000 * 60)) / 1000);

      // Display the result in the element with id="demo"
      // slice(-2) returns the last two characters of a string
      this.sessionStorage.setItem("reservationCountDown", minutes + ":" + seconds);
      this.document.querySelector(".reservation__time").innerHTML = "Expire dans " + ("0"+minutes).slice(-2) + ":" + ("0"+seconds).slice(-2) + " minutes";

      // If the count down is finished, write some text
      if (this.distance < 0) {
         clearInterval(setInterval); /////////////////////////////////////////////////////
         this.document.querySelector(".reservation__time").innerHTML = "La réservation est expirée";
         this.sessionStorage.removeItem("reservationCountDown");
         
      }
   } 1000;
};




// class Countdown {
//    constructor(minutes) {

//    // Reset countdown
//    const btnConfirm = document.querySelector(".canvas-container div button[type=submit]");
//    let reset = () => clearInterval(x);
//    btnConfirm.addEventListener("click", reset);

//    // Add minutes to current date
//    Date.prototype.addMins = function(m) {     
//       this.setTime(this.getTime() + (m*60*1000));  
//       return this;    
//    };
//    function datePlusMinutes() { 
//       var a = new Date(); 
//       a.addMins(20); 
//       return a;
//    };

//    // Set the date we're counting down to
//    var countDownDate = datePlusMinutes();

// };

//    // Update the count down every 1 second
//    var x = setInterval(function() {

//       // Get today's date and time
//       var now = new Date().getTime();

//       // Find the distance between now and the count down date
//       var distance = countDownDate - now;

//       // Time calculations for days, hours, minutes and seconds
//       var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
//       var seconds = Math.floor((distance % (1000 * 60)) / 1000);

//       // Display the result in the element with id="demo"
//       // slice(-2) returns the last two characters of a string
//       sessionStorage.setItem("reservationCountDown", minutes + ":" + seconds);
//       document.querySelector(".reservation__time").innerHTML = "Expire dans " + ("0"+minutes).slice(-2) + ":" + ("0"+seconds).slice(-2) + " minutes";

//       // If the count down is finished, write some text
//       if (distance < 0) {
//          clearInterval(x);
//          document.querySelector(".reservation__time").innerHTML = "La réservation est expirée";
//          sessionStorage.removeItem("reservationCountDown");
//       }
//    }, 1000);
//    // During countdown remove 1 bike
//    var getAvailableBikes = sessionStorage.getItem("availableBikes");
//    var matches = getAvailableBikes.match(/(\d+)/); 
//    if (matches) {
//       document.querySelector('.availableBikes').innerHTML = matches[0] - 1 + " vélos disponibles";
//    }

// };