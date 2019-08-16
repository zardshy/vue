<template>
  <div class="main">
    <div id="heatMap"></div>
  </div>
</template>


<script>
import "maptalks/dist/maptalks.css";
import * as maptalks from "maptalks";
import { HeatLayer } from 'maptalks.heatmap';
export default {
  data() {
    return {
      coord:[[31.381779, 121.228638, 54],
        [31.123, 121.289063, 14],
        [31.113, 121.212891063, 24],
        [31.21123, 121.23289063, 14],
        [31.41123, 121.23289063, 22],
        [31.231123, 121.23289063, 14],
        [31.1274516203, 121.393433, 34],
        [31.424151, 121.662598, 61],
        [31.23134, 121.133, 34],
        [31.312341545, 121.34222, 44],
        [31.4611515279, 121.37146, 45],
        [31.12341545, 121.34222, 33],
        [31.611515279, 121.37146, 45],
        [31.12341545, 121.34222, 14],
        [31.611515279, 121.37146, 45],
        [30.134, 121.61597, 77],
        [30.8123499868, 121.282446, 26],
        [31.51, 121.181824, 73]]
    };
  },
  mounted() {
    const loading = this.$loading({
      lock: true,
      text: 'Loading',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.7)'
    });
    setTimeout(() => {
      loading.close(); 
      this.$nextTick(() => initMap());
    }, 1000);
   
    const initMap = () => {
      let option = {
        center: [121.460651,31.219751],
        zoom: 8,
        cneter: [121.0],
        maxZoom: 16,
        spatialReference: {
          // projection: "baidu"
        },
        baseLayer: new maptalks.TileLayer("base", {
          urlTemplate: 'http://wprd{s}.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=1&scl=1&style=7',
          subdomains: ['01', '02', '03', '04'],
          attribution:
            '&copy; <a target="_blank" href="http://map.baidu.com">GaoDeMap</a>',
           cssFilter: "sepia(80%) invert(90%)"
        })
      };
      this.map = new maptalks.Map("heatMap", option);
    
    
    let heatCoords=this.coord.map((value,index,arr)=>{
      return [value[1],value[0],value[2]]
    })
    let heatOptions={
      'max': 80,//最大值
      'radius' : 30,  //点半径
      'blur' : 20,    //模糊半径
      'minOpacity ':0.05,//最小点不透明度 default 0.05
      'heatValueScale ':1,
      'gradient' : {0.4: 'blue', 0.65: 'lime', 1: 'red'}
    }

    const heatLayer = new HeatLayer('heat', heatCoords,heatOptions).addTo(this.map);
    };
  }
};
</script>


<style>
.main {
  background-color: #ffffff;
  padding: 10px;
}
#heatMap {
  height: calc(100vh - 80px);
  margin: 0px;
  padding: 0px;
}
</style>