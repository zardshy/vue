<template>
  <div class="main">
    <el-button type="primary" size="mini" icon="el-icon-search" plain @click="mapFlyto">缩放至marker</el-button>
    <el-button type="primary" size="mini" icon="el-icon-edit" plain @click="add3DL">加载3D建筑</el-button>
    <el-button type="primary" size="mini" icon="el-icon-edit" plain @click="changeWXT">显示卫星图</el-button>
    <div id="map"></div>
  </div>
</template>

<script>
var mapboxgl = require("mapbox-gl/dist/mapbox-gl.js");
var MapboxLanguage = require("@mapbox/mapbox-gl-language");
export default {
  data() {
    return {
      MyToken:
        "pk.eyJ1IjoiemFyZHNoeSIsImEiOiJjand1YXU1aTAwOTUyNDlscnNjdTZ6ZHR1In0.pVt9-AoZhnXF5mR78xSm0g",
      CNLFurl:
        "https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.1.0/mapbox-gl-rtl-text.js",
      Map: null,
      mk_id: "mk01",
      Marker_geojson: {
        id: "mk01",
        type: "symbol",
        source: {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: [
              {
                type: "Feature",
                properties: {
                  description: "<strong>hello world</strong>",
                  name: "zard",
                  icon: "theatre"
                },
                geometry: {
                  type: "Point",
                  coordinates: [121.49, 31.23]
                }
              }
            ]
          }
        },
        layout: {
          "icon-image": "{icon}-15",
          "icon-allow-overlap": true
        }
      },
      d3_geojson: {
        id: "3d-buildings",
        source: "composite",
        "source-layer": "building",
        filter: ["==", "extrude", "true"],
        type: "fill-extrusion",
        minzoom: 15,
        paint: {
          "fill-extrusion-color": "#aaa",

          // use an 'interpolate' expression to add a smooth transition effect to the
          // buildings as the user zooms in
          "fill-extrusion-height": [
            "interpolate",
            ["linear"],
            ["zoom"],
            15,
            0,
            15.05,
            ["get", "height"]
          ],
          "fill-extrusion-base": [
            "interpolate",
            ["linear"],
            ["zoom"],
            15,
            0,
            15.05,
            ["get", "min_height"]
          ],
          "fill-extrusion-opacity": 0.6
        }
      }
    };
  },
  mounted() {
    mapboxgl.accessToken = this.MyToken;
    this.Map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v10",
      center: [121, 31],
      zoom: 7,
      pitch: 45,
      bearing: -17.6,
      hash: false,
      crossSourceCollisions: false
    });
    mapboxgl.setRTLTextPlugin(this.CNLFurl);

    this.Map.addControl(new mapboxgl.NavigationControl());
    const CNL = new MapboxLanguage({
      defaultLanguage: "zh"
    });

    this.Map.on("load", () => {
      this.addMKLayer();
    });
    this.Map.addControl(CNL);
    this.Map.on("click", this.mk_id, e => {
      console.log(e);
      let coordinates = e.features[0].geometry.coordinates.slice();
      let description = e.features[0].properties.description;

      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      }
      new mapboxgl.Popup()
        .setLngLat(coordinates)
        .setHTML(description)
        .addTo(this.Map);
    });

    this.Map.on("mouseenter", this.mk_id, () => {
      this.Map.getCanvas().style.cursor = "pointer";
    });

    this.Map.on("mouseleave", this.mk_id, () => {
      this.Map.getCanvas().style.cursor = "";
    });
  },
  methods: {
    add3DL() {
       this.Map.flyTo({
        center: [121.49, 31.23],
        zoom: 16,
        bearing: 0,
        pitch: 66,
        speed: 10,
        curve: 1, // change the speed at which it zooms out
        easing: function(t) {
          return t;
        }
      });
      var layers = this.Map.getStyle().layers;
      var labelLayerId;
      for (var i = 0; i < layers.length; i++) {
        if (layers[i].type === "symbol" && layers[i].layout["text-field"]) {
          labelLayerId = layers[i].id;
          break;
        }
      }
      this.Map.addLayer(this.d3_geojson, labelLayerId);
    },
    addMKLayer() {
      this.Map.addLayer(this.Marker_geojson);
    },
    mapFlyto() {
      this.Map.flyTo({
        center: [121.49, 31.23],
        zoom: 16,
        bearing: 0,
        pitch: 66,
        speed: 4,
        curve: 1, // change the speed at which it zooms out
        easing: function(t) {
          return t;
        }
      });
    },
    changeWXT() {
      this.Map.flyTo({
        center: [121.49, 31.23],
        zoom: 3,
        bearing: 0,
        pitch: 45,
        speed: 11,
        curve: 1, // change the speed at which it zooms out
        easing: function(t) {
          return t;
        }
      });
      this.Map.setStyle("mapbox://styles/mapbox/satellite-v9");
    }
  }
};
</script>


<style scoped>
.main {
  background-color: #ffffff;
  padding: 10px;
}
#map {
  height: calc(100vh - 120px);
  margin: 0px;
  padding: 0px;
}
</style>