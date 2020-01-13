// Map
const toulouse = [43.6044622, 1.4442469];
const mymap = L.map('map').setView(toulouse, 17);

// Map layer(style)
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYXJpYW5lYmMiLCJhIjoiY2s0OWNpeGliMDNnaTNkbzdpNWFxdHVrdSJ9.m7kpXFCpYTSPVj2I8Q2E6Q', {
   maxZoom: 22,
   id: 'mapbox/streets-v11',
}).addTo(mymap);

// Personnalized marker
var LeafIcon = L.Icon.extend({
   options: {
      iconSize:     [34, 47.5], 
      iconAnchor:   [17, 47.5], 
      popupAnchor:  [-3, -76] 
   }
});

var greenIcon = new LeafIcon({iconUrl: "/dist/public/images/makerGreen.png"}),
   redIcon = new LeafIcon({iconUrl: "/dist/public/images/makerRed.png"}),
   orangeIcon = new LeafIcon({iconUrl: "/dist/public/images/makerOrange.png"});

// JCDecaux API
var request = new XMLHttpRequest();

request.onreadystatechange = function() {
   if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
      var response = JSON.parse(this.responseText);
      response.forEach(function (info) {

         const latitude = info.position.lat;
         const longitude = info.position.lng;
         if (info.available_bikes === 0) {
         L.marker([latitude, longitude], {icon: redIcon}).on('click', onMarkerClick).addTo(mymap);
         } else {
            L.marker([latitude, longitude], {icon: greenIcon}).on('click', onMarkerClick).addTo(mymap);
         };
         if (info.available_bikes <= 3 && info.available_bikes !== 0) {
            L.marker([latitude, longitude], {icon: orangeIcon}).on('click', onMarkerClick).addTo(mymap);
         };

         function onMarkerClick(e) {
            if ((e.latlng.lat === info.position.lat) && (e.latlng.lng === info.position.lng)) {
               var stationElt = info.name;
               var addressElt = "Adresse : " + info.address;
               var standsElt = info.bike_stands + " places";
               var bikesElt = info.available_bikes + " vélos disponibles";

               //remove numbers of stationElt
               stationElt = stationElt.substring(stationElt.indexOf("-") + 1);

               //capitalize words of adressElt
               function capitalize_Words(str) {
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

request.open("GET", "https://api.jcdecaux.com/vls/v1/stations?contract=Toulouse&apiKey=f67f16fd73dc90a271e02178de2d6f71c7a7826e");
request.send();

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
   }

   function ease(t, b, c, d) {
      t /= d / 2;
      if (t < 1) return c / 2 * t * t + b;
      t--;
      return -c / 2 * (t * (t - 2) - 1) + b;
   }

   requestAnimationFrame(animation);
}

var btnAnimation = document.querySelector(".btnAnimation"); // Selector to start animation

btnAnimation.addEventListener('click', function(){
   smoothScroll('.app', 1000)
});