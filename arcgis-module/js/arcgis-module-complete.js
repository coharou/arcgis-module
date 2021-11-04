require(["esri/Map", "esri/views/MapView", "esri/layers/FeatureLayer", "esri/widgets/LayerList"], (Map, MapView, FeatureLayer, LayerList) => {
    const popupInfo = {  
      title: "{NAME} County",
      content:[ // Property of popupTemplate - provides template for popup
        {
          type: "fields",
          fieldInfos: [ // fieldInfos is an array of objects
            {
              fieldName: "POPULATION",
              label: "Population Total"
            },
            {
              fieldName: "FEMALES",
              label: "Female Count"
            },
            {
              fieldName: "MALES",
              label: "Male Count"
            }
          ]
        }
      ]
    };

    const countiesLayer = new FeatureLayer({
      url: "https://services.arcgis.com/P3ePLMYs2RVChkJx/arcgis/rest/services/USA_Counties_Generalized/FeatureServer/0", // Sets the URL for the counties feature layer
      popupTemplate: popupInfo // Setting template on the popupTemplate property
    });

    const map = new Map({
      basemap: "topo-vector"
    });

    const view = new MapView({
      container: "viewDiv", // Reference to the view div 
      map: map, // Reference to the map object 
      zoom: 6, // Sets zoom level based on level of detail (LOD)
      center: [-84.930666,44.317797] // Sets center point of view using longitude,latitude
    });

    const layerList = new LayerList({
      view: view
    });

    view.ui.add(layerList, "top-right");

    map.add(countiesLayer); // Adds the counties layer, so that it hovers above the map
});