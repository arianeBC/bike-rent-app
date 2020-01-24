class CreateMap {
   constructor(jcDecauxAPIaddress) {
      // Map
      const toulouse = [43.6044622, 1.4442469];
      this.mymap = L.map('map').setView(toulouse, 17);

      // Map layer(style)
      L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYXJpYW5lYmMiLCJhIjoiY2s0OWNpeGliMDNnaTNkbzdpNWFxdHVrdSJ9.m7kpXFCpYTSPVj2I8Q2E6Q', {
         maxZoom: 22,
         id: 'mapbox/streets-v11',
      }).addTo(this.mymap);

      // Personnalized marker
      this.LeafIcon = L.Icon.extend({
         options: {
            iconSize:     [34, 47.5], 
            iconAnchor:   [17, 47.5], 
            popupAnchor:  [-3, -76] 
         }
      });

      // JCDecaux API
      this.request = new XMLHttpRequest();
      this.request.onreadystatechange = () => {
         if (this.request.readyState == XMLHttpRequest.DONE && this.request.status == 200) {
            this.makeMarkers(JSON.parse(this.request.responseText));
         };
      };
      this.request.open("GET", jcDecauxAPIaddress);
      this.request.send();
   };

   makeMarkers(list){
      let iconColor;
      const greenIcon = new this.LeafIcon({iconUrl: "/dist/public/images/makerGreen.png"}),
            redIcon = new this.LeafIcon({iconUrl: "/dist/public/images/makerRed.png"}),
            orangeIcon = new this.LeafIcon({iconUrl: "/dist/public/images/makerOrange.png"});

      list.forEach((info) => {
         if (info.available_bikes === 0) iconColor = redIcon;  
         else iconColor = greenIcon;
         if (info.available_bikes <= 3 && info.available_bikes !== 0) iconColor = orangeIcon;
         L.marker([info.position.lat, info.position.lng], {icon: iconColor})
            .on('click', (e)=> { this.onMarkerClick(e, info)} )
            .addTo(this.mymap);
      });
   };

   onMarkerClick(e, info) {
      if ((e.latlng.lat === info.position.lat) && (e.latlng.lng === info.position.lng)) {
         const pluriel = (info.available_bikes > 1) ? "s" : "";
         let stationElt = info.name;
         stationElt = stationElt.substring(stationElt.indexOf("-") + 1); //remove numbers of stationElt

         document.querySelector('.stationName').innerHTML    = stationElt;
         document.querySelector('.address').innerHTML        = this.capitalizeWords(`Adresse : ${info.address}`);
         document.querySelector('.totalStands').innerHTML    = `${info.bike_stands} places`;
         document.querySelector('.availableBikes').innerHTML = `${info.available_bikes} vélo${pluriel} disponible${pluriel}`;
         this.mymap.setView(e.latlng, 17);
      };
   };

   capitalizeWords(str) {
      return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
   };
};

// ********** Animation => slide to app ********** //
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
   }

   function ease(t, b, c, d) {
      t /= d / 2;
      if (t < 1) return c / 2 * t * t + b;
      t--;
      return -c / 2 * (t * (t - 2) - 1) + b;
   }

   requestAnimationFrame(animation);
};

var btnAnimation = document.querySelector(".btnAnimation"); 
btnAnimation.addEventListener('click', function(){
   smoothScroll('.app', 1000)
});

// Layout app
document.querySelector(".canvas-container").style.display = "none";
// Auto named inputs
var getSavedFormValues = JSON.parse(localStorage.getItem("savedFormValues"));
document.forms["save-later-form"].elements["name"].value = getSavedFormValues.inputName;
document.forms["save-later-form"].elements["firstName"].value = getSavedFormValues.inputFirstName; 

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
      inputFirstName: document.querySelector("#firstName").value,
      stationName: document.querySelector(".stationName").innerHTML
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
      localStorage.setItem("savedFormValues", JSON.stringify(inputField) );
      sessionStorage.setItem("availableBikes", availableBikes);
      showCanvas();
   };
};

document.addEventListener("DOMContentLoaded", () => {
   document.querySelector("#save-later-form button").addEventListener("click", addInputField);
});

// ********** Form => confirmation button ********** //
const addReservation = (e) => {
   e.preventDefault();
   var canvasContainer = document.querySelector(".canvas-container");
   var stationDetails = document.querySelector(".station__details");
   var getSavedFormValues = JSON.parse(localStorage.getItem("savedFormValues"));
   var reservationElt = `Vélo réservé à la station ${getSavedFormValues.stationName} par ${getSavedFormValues.inputFirstName} ${getSavedFormValues.inputName}`;

   // Check if canvas's blank
   const isCanvasBlank = (canvas) => {
      const context = canvas.getContext("2d");
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
      new Countdown(1);
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

document.addEventListener("DOMContentLoaded", () => {
   document.querySelector(".canvas-container button[type=submit]").addEventListener("click", addReservation);
});

var jcDecauxUrl = "https://api.jcdecaux.com/vls/v1/stations?contract=Toulouse&apiKey=f67f16fd73dc90a271e02178de2d6f71c7a7826e";

window.addEventListener("load", new Slider);
window.addEventListener("load", new CreateMap(jcDecauxUrl));