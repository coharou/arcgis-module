require(["esri/Map", "esri/views/MapView"], (Map, MapView) => {
    const map = new Map({
      basemap: "topo-vector"
    });
    const view = new MapView({
      container: "viewDiv", // Reference to the view div 
      map: map, // Reference to the map object 
      zoom: 6, // Sets zoom level based on level of detail (LOD)
      center: [-84.930666,44.317797] // Sets center point of view using longitude,latitude
    });
});