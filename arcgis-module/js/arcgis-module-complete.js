require(
  [
    "esri/Map", 
    "esri/views/MapView", 
    "esri/layers/FeatureLayer", 
    "esri/widgets/LayerList", 
    "esri/Graphic", 
    "esri/layers/GraphicsLayer"
  ], 
  (Map, MapView, FeatureLayer, LayerList, Graphic, GraphicsLayer) => {

    //////////////////////////////////
    //   Setting up the basic map   //
    //////////////////////////////////

    const map = new Map({
      basemap: "topo-vector"
    });

    const view = new MapView({
      container: "viewDiv", // Reference to the view div 
      map: map, // Reference to the map object 
      zoom: 6, // Sets zoom level based on level of detail (LOD)
      center: [-84.930666, 44.317797] // Sets center point of view using longitude,latitude
    });

    //////////////////////////////////
    //  Adding features to the map  //
    //////////////////////////////////

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
      popupTemplate: popupInfo, // Setting template on the popupTemplate property
      title: "The Features Layer - USA Counties",
      opacity: 0.75
    });

    map.add(countiesLayer); // Adds the counties layer, so that it hovers above the map
    
    //////////////////////////////////
    //  Adding graphics to the map  //
    //////////////////////////////////

    const graphicsLayer = new GraphicsLayer();
    graphicsLayer.title = "The Graphics Layer";
    map.add(graphicsLayer);

    // All Graphic objects need to have geometry and symbol properties
    // The symbol property only needs to have at type, though
    const polygonGraphic = new Graphic({
      geometry: {
        type: "polygon",
        rings: [
          [-111.05519731202473, 45.00131986325488],
          [-104.07494018416355, 45.00131986325488],
          [-104.07494018416355, 41.04024444190718],
          [-111.05519731202473, 41.04024444190718]
        ]
      },
      symbol: {
        type: "simple-fill",
        style: "horizontal", // OPTIONAL: changes how the shape is filled in
        color: "green", // OPTIONAL: changes the color of the fill
        outline: { // OPTIONAL: marks the outline of the shape
          color: "yellow",
          style: "dash",
          width: "4px" // The value accepts px and pt units
        }
      },
    });

    graphicsLayer.add(polygonGraphic, 0); // "0" is an index value, which sets the layer on top of all the pre-existing layers.

    //////////////////////////////////
    //    The layer list widget     //
    //////////////////////////////////

    const layerList = new LayerList({
      view: view
    });

    view.ui.add(layerList, "top-right");
});