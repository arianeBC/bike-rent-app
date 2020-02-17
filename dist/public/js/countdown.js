<<<<<<< HEAD
class Countdown{constructor(seconde){this.btnConfirm=document.querySelector(".canvas-container div button[type=submit]");let reset=()=>clearInterval(x);this.btnConfirm.addEventListener("click",reset);Date.prototype.addMins=function(s){this.setTime(this.getTime()+(s*1000));return this;};this.datePlusMinutes=function(){var a=new Date();a.addMins(seconde);return a;};this.countDownDate=this.datePlusMinutes();const x=setInterval(()=>{this.now=new Date().getTime();const distance=this.countDownDate-this.now;const minutes=Math.floor((distance%(1000*60*60))/(1000*60));const seconds=Math.floor((distance%(1000*60))/1000);const pluriel=(minutes>1)?"s":"";sessionStorage.setItem("reservationCountdown",`${minutes*60+seconds}`);document.querySelector(".reservation__time").innerHTML=`Expire dans ${("0"+minutes).slice(-2)}:${("0"+seconds).slice(-2)} minute${pluriel}`;if(distance<0){clearInterval(x);document.querySelector(".reservation__time").innerHTML="La réservation est expirée";sessionStorage.removeItem("reservationCountdown");sessionStorage.removeItem("currentReservation");sessionStorage.removeItem("availableBikes");sessionStorage.removeItem("totalStands");sessionStorage.removeItem("address");sessionStorage.removeItem("stationName");}},1000);this.removeReservedBike();};removeReservedBike(){let getAvailableBikes = sessionStorage.getItem("availableBikes");let matches=getAvailableBikes.match(/(\d+)/);if (matches){const pluriel=(document.querySelector('.availableBikes')>1)?"s":"";document.querySelector('.availableBikes').innerHTML=`${matches[0]-1} vélo${pluriel} disponible${pluriel}`;}};};
=======
class Countdown {
   constructor(seconde) {
   // reset CountDown
   this.btnConfirm = document.querySelector(".canvas-container div button[type=submit]");
   let reset = () => clearInterval(x);
   this.btnConfirm.addEventListener("click", reset);

   // Add secondes to current date
   Date.prototype.addSecondes = function(s) {     
      // this.setTime(this.getTime() + (m*60*1000));
      this.setTime(this.getTime() + (s*1000));
      return this;    
   };

   this.datePlusSecondes = function() { 
      var a = new Date(); 
      a.addSecondes(seconde);
      return a;
   };

   // Set the date we're counting down to
   if (sessionStorage.getItem("reservationEnd")) {
      this.countDownDate = new Date(sessionStorage.getItem("reservationEnd"));
   } else {
      this.countDownDate = this.datePlusSecondes();
      sessionStorage.setItem("reservationEnd", `${this.countDownDate}`);
   }

   //setinterval
   const x = setInterval(() => {
      // Get today's date and time
      this.now = new Date().getTime();

      // Find the distance between now and the count down date
      const distance = this.countDownDate - this.now;
      // Time calculations for days, hours, minutes and seconds
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      //Add to sessionStorage;
      const pluriel = (minutes > 1) ? "s" : "";
      document.querySelector(".reservation__time").innerHTML = `Expire dans ${("0" + minutes).slice(-2)}:${("0" + seconds).slice(-2)} minute${pluriel} `;

      // If the count down is finished, write some text
      if (distance < 0) {
      clearInterval(x);
      document.querySelector(".reservation__time").innerHTML = "La réservation est expirée";
      sessionStorage.removeItem("reservationCountdown");
      sessionStorage.removeItem("currentReservation");
      sessionStorage.removeItem("availableBikes");
      sessionStorage.removeItem("totalStands");
      sessionStorage.removeItem("address");
      sessionStorage.removeItem("stationName");
      }
   }, 1000);

      this.removeReservedBike();
   };

   removeReservedBike() {
   let getAvailableBikes = sessionStorage.getItem("availableBikes");
   let matches = getAvailableBikes.match(/(\d+)/);
      if (matches) {
         const pluriel = (Number(matches[0]) > 1) ? "s" : "";
         document.querySelector('.availableBikes').innerHTML = `${matches[0] - 1} vélo${pluriel} disponible${pluriel}`;
      } 
   };
};
>>>>>>> beautify
