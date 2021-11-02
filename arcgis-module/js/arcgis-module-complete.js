require(["esri/Map", "esri/views/MapView", "esri/layers/FeatureLayer"], (Map, MapView, FeatureLayer) => {
    const map = new Map({
      basemap: "topo-vector"
    });
    const view = new MapView({
      container: "viewDiv", // Reference to the view div 
      map: map, // Reference to the map object 
      zoom: 6, // Sets zoom level based on level of detail (LOD)
      center: [-84.930666,44.317797] // Sets center point of view using longitude,latitude
    });
    const countiesLayer = new FeatureLayer({
      url: "https://services.arcgis.com/P3ePLMYs2RVChkJx/arcgis/rest/services/USA_Counties_Generalized/FeatureServer/0" // Sets the URL for the counties feature layer
    });
    map.add(countiesLayer); // Adds the counties layer, so that it hovers above the map
});