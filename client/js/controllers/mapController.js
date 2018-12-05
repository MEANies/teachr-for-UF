    mapboxgl.accessToken = 'pk.eyJ1IjoidGhlbWVhbmllcyIsImEiOiJjanA5MDU4NWcwZTd5M2xta2l0MmhmYncyIn0.YToxrWErQ5TrXnsKKirjIw';
      var map = new mapboxgl.Map({
        container: 'map', // container id
    style: 'mapbox://styles/mapbox/streets-v9', // stylesheet location
    center: [-82.34435, 29.64831], // starting position [lng, lat]
    zoom: 16  // starting zoom
  });
  // Add geolocate control to the map.
      map.addControl(new mapboxgl.GeolocateControl({
        positionOptions: {
        enableHighAccuracy: true
  },
  trackUserLocation: true
}));
map.loadImage("https://i.imgur.com/1LzQt93.png"), function(err, image){
    if (err) throw err;
    map.addImage("pin", image);
}

        // geojson.features.forEach(function (marker) {

        //     // create a HTML element for each feature
        //     var el = document.createElement('div');
        //     el.className = 'marker';

        //     // make a marker for each feature and add to the map
        //     new mapboxgl.Marker(el)
        //         .setLngLat(marker.geometry.coordinates)
        //         .setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
        //             .setHTML('<h3>' + marker.properties.title + '</h3><p>' + marker.properties.description + '</p>'))
        //         .addTo(map);
        // });
        