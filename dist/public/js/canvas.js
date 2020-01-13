// #CANVAS
window.addEventListener("load", () =>{

   const canvas = document.querySelector("#canvas");
   const context = canvas.getContext("2d");
   const clearButton = document.querySelector(".btn-clear");

   //resizing
   canvas.height = 100;
   canvas.width = 210;

   //variables
   let drawing = false;

   function startPosition(e) {
      drawing = true;
      draw(e);
   };

   function finishedPosition() {
      drawing = false;
      context.beginPath();
   };

   function draw(e) {
      if(!drawing) return;
      var rect = canvas.getBoundingClientRect();
      context.lineWidth = 3;
      context.lineCap = "round";
      context.lineJoin = "round";
      context.lineTo(e.clientX - rect.left, e.clientY- rect.top);
      context.stroke();
      context.beginPath();
      context.moveTo(e.clientX- rect.left, e.clientY- rect.top);
   };

   function erase(e){
      canvas.width = canvas.width;
   }

   function startTouchPosition(e) {
      drawing = true;
      drawTouch(e);
   };

   function drawTouch(e) {
      if(!drawing) return;
      var rect = canvas.getBoundingClientRect();
      var touch = e.touches[0];
      context.lineWidth = 3;
      context.lineCap = "round";
      context.lineJoin = "round";
      context.lineTo(touch.clientX - rect.left, touch.clientY- rect.top);
      context.stroke();
      context.beginPath();
      context.moveTo(touch.clientX- rect.left, touch.clientY- rect.top);
   };

   //EventListeners
   canvas.addEventListener("mousedown", startPosition);
   canvas.addEventListener("mouseup", finishedPosition);
   canvas.addEventListener("mousemove", draw);
   canvas.addEventListener("touchstart", startTouchPosition);
   canvas.addEventListener("touchend", finishedPosition);
   canvas.addEventListener("touchmove", drawTouch);

   //Effacer
   clearButton.addEventListener("click", erase);

});

//*************************//

document.querySelector(".canvas-container").style.display = "none";
var canvasContainer = document.querySelector(".canvas-container");
var stationDetails = document.querySelector(".station__details");

//show canvas
function showCanvas() {
   if (canvasContainer.style.display === "none") {
      canvasContainer.style.display = "block";
      stationDetails.style.display = "none";
   }
};

//RESERVE BUTTON ACTION
const addInputField = (e) => {
   e.preventDefault();
   let inputField = {
      inputName: document.querySelector("#name").value,
      inputFirstName: document.querySelector("#firstName").value,
      stationName: document.querySelector(".stationName").innerHTML
   }

   function required() {
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
      localStorage.setItem("savedFormValues", JSON.stringify(inputField) );
      showCanvas();
   } 
};

document.addEventListener("DOMContentLoaded", () => {
   document.querySelector("#save-later-form button").addEventListener("click", addInputField);
});

//*************************//

// Check if canvas's blank
function isCanvasBlank(canvas) {
   const context = canvas.getContext("2d");
   const pixelBuffer = new Uint32Array(
      context.getImageData(0, 0, canvas.width, canvas.height).data.buffer
   );
   return !pixelBuffer.some(color => color !== 0);
};

// Return to homepage
function showForm() {
   if (stationDetails.style.display = "none") {
      stationDetails.style.display = "block";
   };
   canvasContainer.style.display = "none";
};

// CONFIRM BUTTON ACTION
const addReservation = (e) => {

   e.preventDefault();
   var getSavedFormValues = JSON.parse(localStorage.getItem("savedFormValues"));
   var reservationElt = "Vélo réservé à la station " + getSavedFormValues.stationName + " par " + getSavedFormValues.inputFirstName + " " + getSavedFormValues.inputName;

   function signature() {
      if (isCanvasBlank(canvas)) {
         alert("Veuillez signer avant de confirmer S.V.P.");
         canvas.width = canvas.width;
      } else {
         canvas.width = canvas.width;
         showForm();
         document.querySelector(".reservation__details").innerHTML = reservationElt;
      };
   };

   if(signature()) {
      showForm();
      document.querySelector(".reservation__details").innerHTML = reservationElt;
   }   

   startCountdown();

};

document.addEventListener("DOMContentLoaded", () => {
   document.querySelector(".canvas-container button[type=submit]").addEventListener("click", addReservation);
});

// Auto add names input
var getSavedFormValues = JSON.parse(localStorage.getItem("savedFormValues"));
document.forms["save-later-form"].elements["name"].value = getSavedFormValues.inputName;
document.forms["save-later-form"].elements["firstName"].value = getSavedFormValues.inputFirstName; 