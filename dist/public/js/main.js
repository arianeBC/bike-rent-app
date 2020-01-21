class CreateMap {
   constructor() {
      // Map
      this.toulouse = [43.6044622, 1.4442469];
      this.mymap = L.map('map').setView(this.toulouse, 17);

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

      this.greenIcon = new this.LeafIcon({iconUrl: "/dist/public/images/makerGreen.png"}),
      this.redIcon = new this.LeafIcon({iconUrl: "/dist/public/images/makerRed.png"}),
      this.orangeIcon = new this.LeafIcon({iconUrl: "/dist/public/images/makerOrange.png"});

      // JCDecaux API
      this.request = new XMLHttpRequest();
      this.request.onreadystatechange = this.myRequest();
      this.request.open("GET", "https://api.jcdecaux.com/vls/v1/stations?contract=Toulouse&apiKey=f67f16fd73dc90a271e02178de2d6f71c7a7826e");
      this.request.send();
   };

   myRequest() {
      console.log("world");
      if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {

         this.response = JSON.parse(this.responseText);

         this.response.forEach(function (info) {

            this.latitude = info.position.lat;
            this.longitude = info.position.lng;
            if (info.available_bikes === 0) {
            L.marker([this.latitude, this.longitude], {icon: redIcon}).on('click', onMarkerClick).addTo(this.mymap);
            } else {
               L.marker([latitude, longitude], {icon: greenIcon}).on('click', onMarkerClick).addTo(this.mymap);
            };
            if (info.available_bikes <= 3 && info.available_bikes !== 0) {
               L.marker([latitude, longitude], {icon: orangeIcon}).on('click', onMarkerClick).addTo(this.mymap);
               
            };

            function onMarkerClick(e) {
               if ((e.latlng.lat === info.position.lat) && (e.latlng.lng === info.position.lng)) {
                  this.stationElt = info.name;
                  this.addressElt = "Adresse : " + info.address;
                  this.standsElt = info.bike_stands + " places";
                  this.bikesElt = info.available_bikes + " vélos disponibles";

                  //remove numbers of stationElt
                  this.stationElt = this.stationElt.substring(stationElt.indexOf("-") + 1);

                  //capitalize words of adressElt
                  capitalize_Words = (str) => {
                  return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
                  };
                  
                  document.querySelector('.stationName').innerHTML = stationElt;
                  document.querySelector('.address').innerHTML = capitalize_Words(addressElt);
                  document.querySelector('.totalStands').innerHTML = standsElt;
                  document.querySelector('.availableBikes').innerHTML = bikesElt;
                  mymap.setView(e.latlng, 17);
               };
            };
         });
      };
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
   var reservationElt = "Vélo réservé à la station " + getSavedFormValues.stationName + " par " + getSavedFormValues.inputFirstName + " " + getSavedFormValues.inputName;

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
      document.querySelector(".reservation__details").innerHTML = reservationElt;
      showForm();
   };
   new Countdown(20);
   sessionStorage.setItem("currentReservation", reservationElt);
};

document.addEventListener("DOMContentLoaded", () => {
   document.querySelector(".canvas-container button[type=submit]").addEventListener("click", addReservation);
});


window.addEventListener("load", new Slider);
window.addEventListener("load", new CreateMap);



//  // Map
// const toulouse = [43.6044622, 1.4442469];
// const mymap = L.map('map').setView(toulouse, 17);

//  // Map layer(style)
//  L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYXJpYW5lYmMiLCJhIjoiY2s0OWNpeGliMDNnaTNkbzdpNWFxdHVrdSJ9.m7kpXFCpYTSPVj2I8Q2E6Q', {
//     maxZoom: 22,
//     id: 'mapbox/streets-v11',
//  }).addTo(mymap);

//  // Personnalized marker
//  var LeafIcon = L.Icon.extend({
//     options: {
//        iconSize:     [34, 47.5], 
//        iconAnchor:   [17, 47.5], 
//        popupAnchor:  [-3, -76] 
//     }
//  });

//  var greenIcon = new LeafIcon({iconUrl: "/dist/public/images/makerGreen.png"}),
//     redIcon = new LeafIcon({iconUrl: "/dist/public/images/makerRed.png"}),
//     orangeIcon = new LeafIcon({iconUrl: "/dist/public/images/makerOrange.png"});

//  // JCDecaux API
//  var request = new XMLHttpRequest();

//  request.onreadystatechange = function() {
//     if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
//        var response = JSON.parse(this.responseText);
//        response.forEach(function (info) {

//           const latitude = info.position.lat;
//           const longitude = info.position.lng;
//           if (info.available_bikes === 0) {
//           L.marker([latitude, longitude], {icon: redIcon}).on('click', onMarkerClick).addTo(mymap);
//           } else {
//              L.marker([latitude, longitude], {icon: greenIcon}).on('click', onMarkerClick).addTo(mymap);
//           };
//           if (info.available_bikes <= 3 && info.available_bikes !== 0) {
//              L.marker([latitude, longitude], {icon: orangeIcon}).on('click', onMarkerClick).addTo(mymap);
//           };

//           function onMarkerClick(e) {
//              if ((e.latlng.lat === info.position.lat) && (e.latlng.lng === info.position.lng)) {
//                 var stationElt = info.name;
//                 var addressElt = "Adresse : " + info.address;
//                 var standsElt = info.bike_stands + " places";
//                 var bikesElt = info.available_bikes + " vélos disponibles";

//                 //remove numbers of stationElt
//                 stationElt = stationElt.substring(stationElt.indexOf("-") + 1);

//                 //capitalize words of adressElt
//                 const capitalize_Words = (str) => {
//                 return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
//                 };

//                 document.querySelector('.stationName').innerHTML = stationElt;
//                 document.querySelector('.address').innerHTML = capitalize_Words(addressElt);
//                 document.querySelector('.totalStands').innerHTML = standsElt;
//                 document.querySelector('.availableBikes').innerHTML = bikesElt;
//                 mymap.setView(e.latlng, 17);
//              };
//           };
//        });
//     };
//  };

//  request.open("GET", "https://api.jcdecaux.com/vls/v1/stations?contract=Toulouse&apiKey=f67f16fd73dc90a271e02178de2d6f71c7a7826e");
//  request.send();