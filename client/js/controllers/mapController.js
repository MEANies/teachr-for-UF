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

      // var geojson = {
        //     type: 'FeatureCollection',
        //     features: [{
        //       type: 'Feature',
        //       geometry: {
        //         type: 'Point',
        //         coordinates: [-82.34435, 29.64831]
        //       },
        //       properties: {
        //         title: 'CSE',
        //         description: 'Office Hours Currently Being Held:'
        //       }
        //     }]
        //   };
        // map.addLayer({
        //     id: "marker",
        //     type: "symbol",
        //     source: {
        //       type: "geojson",
        //       data: {
        //         type: "FeatureCollection",
        //         features: [{ "type": "Feature", "geometry": { "type": "Point", "coordinates": [long, lat] } }]
        //       }
        //     },
        //     layout: {
        //       "icon-image": "custom-marker",
        //     }
        //   });
        geojson.features.forEach(function (marker) {

            // create a HTML element for each feature
            var el = document.createElement('div');
            el.className = 'marker';

            // make a marker for each feature and add to the map
            new mapboxgl.Marker(el)
                .setLngLat(marker.geometry.coordinates)
                .setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
                    .setHTML('<h3>' + marker.properties.title + '</h3><p>' + marker.properties.description + '</p>'))
                .addTo(map);
        });