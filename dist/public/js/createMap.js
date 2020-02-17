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