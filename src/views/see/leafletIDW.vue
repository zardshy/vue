<template>
  <div class="main">
    <div id="map"></div>
  </div>
</template>


<script>
export default {
  data() {
    return {};
  },
  created(){
   
  },
  mounted() {

    this.$nextTick(() => {
      let coord = [
        [31.381779, 121.228638, 54],
        [31.123, 121.289063, 14],
        [31.274516203, 121.393433, 34],
        [31.4151, 121.662598, 61],
        [31.134, 121.133, 34],
        [31.12341545, 121.34222, 14],
        [31.611515279, 121.37146, 45],
        [30.134, 121.61597, 77],
        [30.8123499868, 121.282446, 26],
        [31.51, 121.181824, 73]
      ];

      var map = L.map("map").setView([31.2, 121.47], 9);

      var tiles = L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);

      for (var i = 0; i < coord.length; i++) {
        var marker = L.marker([coord[i][0], coord[i][1]]).addTo(map);
        marker.bindPopup(`<b>值:${coord[i][2]}</b>`);
      }

      // var idw1 = L.idwLayer(coord, {
      var idw1 = window.idw(coord, {
        opacity: 0.4,
        maxZoom: 11,
        cellSize: 5, //每个单元格的高度和宽度，默认为25
        exp: 3, //加权指数 默认为1
        max: 100 //最大点值 默认1.0
        // gradient - color gradient config, e.g. {0.4: 'blue', 0.65: 'lime', 1: 'red'}
      }).addTo(map);
    });
  }
};
</script>


<style >
.main {
  background-color: #ffffff;
  padding: 10px;
}
#map {
  height: calc(100vh - 80px);
  margin: 0px;
  padding: 0px;
}
</style>