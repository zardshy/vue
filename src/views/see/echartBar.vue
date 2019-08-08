<template>
  <div class="main">
    <div id='mapview'></div>
  </div>
</template>


<script>
import axios from 'axios'
// import "maptalks/dist/maptalks.css";
// import * as maptalks from "maptalks";
export default {
  data(){
    return{

    }
  },
  mounted(){
    var myChart = echarts.init(document.getElementById('mapview'));
    myChart.showLoading();
    axios.get('https://zardshy.github.io/zard/assect/cs.json').then((res)=>{
        var linedata = res.data
        myChart.hideLoading();
                    myChart.setOption({
                visualMap: { //视觉映射组件
                    show: false, //图例
                    calculable: false, //拖拽手柄
                    realtime: false, //拖拽时 是否实时更新
                    inRange: {
                        color: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026']
                    },
                    max: 100
                },
                maptalks3D: {
                    // center: [121.4693, 31.123070],
                    zoom: 5,
                    pitch: 0,
                    bearing: 0,
                    center: [108.4693, 33.123070],
                    zoom: 2,

                    // urlTemplate: 'http://www.google.cn/maps/vt?lyrs=m@189&gl=cn&x={x}&y={y}&z={z}',
                    urlTemplate: 'http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png',
                    //    baseLayer: {
                    //     //google
                    //   'urlTemplate': 'http://www.google.cn/maps/vt?lyrs=m@189&gl=cn&x={x}&y={y}&z={z}',
                    // 'urlTemplate': 'http://wprd{s}.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=1&scl=1&style=7',
                    // 'subdomains': ['01', '02', '03', '04'],
                    // 'cssFilter': "sepia(90%) invert(90%)",

                    //     //amap 高德
                    //   // 'urlTemplate': ' http://webrd01.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}',

                    //   //this is arcgis
                    //  'urlTemplate': ' http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetGray/MapServer/tile/{z}/{y}/{x}',

                    // 'subdomains'  : ['a','b','c','d']
                    //   },
                    boxHeight: 22,
                    postEffect: {
                        enable: true,
                        SSAO: {
                            enable: true,
                            radius: 2,
                            intensity: 1.5
                        }
                    },
                    light: {
                        main: {
                            intensity: 1, //光强度
                            shadow: true, //阴影
                            shadowQuality: 'high'
                        },
                        ambient: {
                            intensity: 8 //亮强度
                        },
                        ambientCubemap: {
                            texture: '../../data/data-1491896094618-H1DmP-5px.hdr',
                            exposure: 111,
                            diffuseIntensity: 0.5
                        }
                    }
                },
                series: [{
                    type: 'bar3D',
                    shading: 'lambert', //3D图形的着色效果  /color/lambert/realistic
                    coordinateSystem: 'maptalks3D', //坐标系
                    barSize: 10,
                    silent: true, //是否触发鼠标事件
                    animation: true,
                    animationDurationUpdate: 1000,
                    data: linedata
                }]
            });

        var map = myChart.getModel().getComponent('maptalks3D').getMaptalks();
        console.log(map)
        setTimeout(() => {
          map.animateTo({
              center: [108.4693, 33.123070],
              zoom: 4,
              pitch: 50,
              bearing: 330
          }, {
              duration: 7000
          });
        }, 1000);

     })
  }
}
</script>



<style scoped>
.main {
  background-color: #ffffff;
  padding: 10px;
}
#mapview{
  height: calc(100vh - 80px);
  margin: 0px;
  padding: 0px;
}
</style>