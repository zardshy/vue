<template>
  <div class="main">
    <div id="map"></div>
  </div>
</template>

<script>
import "maptalks/dist/maptalks.css";
import * as maptalks from "maptalks";
import MaptalksWindy from "wind-layer/dist/MaptalksWindy.js";

export default {
  data() {
    return {
      _Map: null
    };
  },
  mounted() {
    this.$nextTick(() => {
      this._Map = new maptalks.Map("map", {
        center: [121, 44],
        zoom: 3,
        baseLayer: new maptalks.TileLayer("base", {
          urlTemplate:
            "http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png",
          subdomains: ["a", "b", "c", "d"],
          attribution:
            '&copy; <a href="http://osm.org">OpenStreetMap</a> contributors, &copy; <a href="https://carto.com/">CARTO</a>'
        })
      });
      this.$axios
        .get("https://raw.githubusercontent.com/zardshy/zard/master/assect/outaa.json")
        .then(res => {
          console.log(res);
          var config = {
            minVelocity: 0, // 粒子强度最小的速度 (m/s)
            maxVelocity: 10, // 粒子强度最大的速度 (m/s)
            velocityScale: 0.05, // 风速的比例
            particleAge: 90, // 重绘之前生成的离子数量的最大帧数
            lineWidth: 1, // 绘制粒子的线宽
            particleMultiplier: 0.005 // 离子数量
          };

          var layer = new MaptalksWindy("windy", res.data, {
            colorScale: [
              "rgb(36,104, 180)",
              "rgb(60,157, 194)",
              "rgb(128,205,193 )",
              "rgb(151,218,168 )",
              "rgb(198,231,181)",
              "rgb(238,247,217)",
              "rgb(255,238,159)",
              "rgb(252,217,125)",
              "rgb(255,182,100)",
              "rgb(252,150,75)",
              "rgb(250,112,52)",
              "rgb(245,64,32)",
              "rgb(237,45,28)",
              "rgb(220,24,32)",
              "rgb(180,0,35)"
            ],
            minVelocity: 7,
            maxVelocity: 10,
            velocityScale: 0.05,
            particleAge: 90,
            lineWidth: 1,
            particleMultiplier: 1 / 300
          });
          this._Map.addLayer(layer);
        });
    });
  }
};
</script>


<style scoped>
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