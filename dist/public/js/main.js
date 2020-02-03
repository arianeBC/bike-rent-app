// Animation --slide to app
function smoothScroll(target,duration) {
   var target = document.querySelector(target);
   var targetPosition = target.getBoundingClientRect().top;
   var startPosition = window.pageYOffset;
   var distance = targetPosition - startPosition;
   var startTime = null;

   function animation(currentTime) {
      if(startTime === null) startTime = currentTime;
      var timeElapsed = currentTime - startTime;
      var run = ease(timeElapsed, startPosition, distance, duration);
      window.scrollTo(0, run);
      if(timeElapsed < duration) requestAnimationFrame(animation);
   };

   function ease(t, b, c, d) {
      t /= d / 2;
      if (t < 1) return c / 2 * t * t + b;
      t--;
      return -c / 2 * (t * (t - 2) - 1) + b;
   };

   requestAnimationFrame(animation);
};

// Layout app
document.querySelector(".canvas-container").style.display = "none";
let getSavedFormValues = JSON.parse(localStorage.getItem("savedFormValues"));
let stationName        = sessionStorage.getItem("stationName");
let reservationElt     = `Vélo réservé à la station ${stationName} par ${getSavedFormValues.inputFirstName} ${getSavedFormValues.inputName}`;
// Auto named inputs
if (getSavedFormValues) {
   document.forms["save-later-form"].elements["name"].value = getSavedFormValues.inputName
   document.forms["save-later-form"].elements["firstName"].value = getSavedFormValues.inputFirstName
};


// ********** Form => reservation button ********** //
const addInputField = (e) => {
   e.preventDefault();
   var canvasContainer = document.querySelector(".canvas-container");
   var stationDetails = document.querySelector(".station__details");

   //show canvas
   const showCanvas = () => {
      if (canvasContainer.style.display === "none") {
         canvasContainer.style.display = "block";
         stationDetails.style.display = "none";
      }
      new Canvas(210, 100);
   };

   let inputField = {
      inputName: document.querySelector("#name").value,
      inputFirstName: document.querySelector("#firstName").value
   }

   const required = () => {
      inputName = document.querySelector("#name").value,
      inputFirstName = document.querySelector("#firstName").value,
      stationName = document.querySelector(".stationName").innerHTML,
      availableBikes = document.querySelector(".availableBikes").innerHTML
      if (inputName == "" || inputFirstName == "" || stationName == "" || stationName == null || availableBikes == "0 vélos disponibles") {
         alert("Veuillez vérifier tous les champs S.V.P.");
         return false;
      } else {
         return true; 
      }
   };

   if(required()) {
      let addressElt = document.querySelector(".address").innerHTML;
      let totalStandsElt = document.querySelector(".totalStands").innerHTML;
      localStorage.setItem("savedFormValues", JSON.stringify(inputField) );
      sessionStorage.setItem("availableBikes", availableBikes);
      sessionStorage.setItem("stationName", stationName);
      sessionStorage.setItem("address", addressElt);
      sessionStorage.setItem("totalStands", totalStandsElt);
      showCanvas();
   };
};

// ********** Form => confirmation button ********** //
const addReservation = (e) => {
   e.preventDefault();
   var canvasContainer    = document.querySelector(".canvas-container");
   var stationDetails     = document.querySelector(".station__details");
   var getSavedFormValues = JSON.parse(localStorage.getItem("savedFormValues"));
   let stationName        = sessionStorage.getItem("stationName");
   var reservationElt     = `Vélo réservé à la station ${stationName} par ${getSavedFormValues.inputFirstName} ${getSavedFormValues.inputName}`;

   // Check if canvas's blank
   //// returns true if every pixel's uint32 representation is 0 (or "blank")
   const isCanvasBlank = (canvas) => {
      const context     = canvas.getContext("2d");
      const pixelBuffer = new Uint32Array(
         context.getImageData(0, 0, canvas.width, canvas.height).data.buffer
      )
      return !pixelBuffer.some(color => color !== 0);
   };

      // Return to homepage
   const showForm = () => {
      if (stationDetails.style.display = "none") {
         stationDetails.style.display = "block";
      }
      canvasContainer.style.display = "none";
      document.querySelector(".reservation__details").innerHTML = reservationElt;
      sessionStorage.setItem("currentReservation", reservationElt);
      new Countdown(1200);
   };

   const signature = () => {
      if (isCanvasBlank(canvas)) {
         alert("Veuillez signer avant de confirmer S.V.P.");
         canvas.width = canvas.width;
      } else {
         canvas.width = canvas.width;
         showForm();
         document.querySelector(".reservation__details").innerHTML = reservationElt;
      }
   };

   if(signature()) {
      showForm();
   };

};

//Event Listeners
//animation
let btnAnimation = document.querySelector(".btnAnimation"); // Selector to start animation
btnAnimation.addEventListener('click', function(){
   smoothScroll('.app', 1000)
});

//localStorage
document.addEventListener("DOMContentLoaded", () => {
   document.querySelector("#save-later-form button").addEventListener("click", addInputField);
});
//reservation
document.addEventListener("DOMContentLoaded", () => {
   document.querySelector(".canvas-container button[type=submit]").addEventListener("click", addReservation);
});
//slider
window.addEventListener("load", new Slider);
//map
let jcDecauxUrl = "https://api.jcdecaux.com/vls/v1/stations?contract=Toulouse&apiKey=f67f16fd73dc90a271e02178de2d6f71c7a7826e";
window.addEventListener("load", new CreateMap(jcDecauxUrl));
//restart countdown (refresh)
let reservationCountdown = sessionStorage.getItem("reservationCountdown");
if (reservationCountdown) {
   stopCount = reservationCountdown;
   window.addEventListener("load", new Countdown(stopCount));
   let addressElt = sessionStorage.getItem("address");
   let totalStandsElt = sessionStorage.getItem("totalStands");
   document.querySelector(".reservation__details").innerHTML = reservationElt;
   document.querySelector(".stationName").innerHTML = stationName;
   document.querySelector(".address").innerHTML = addressElt;
   document.querySelector(".totalStands").innerHTML = totalStandsElt;
};