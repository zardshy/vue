<template>
  <div class="main">
    <el-button type="primary" size="mini" icon="el-icon-edit" plain @click="addPoint">加载点</el-button>
     <el-button type="primary" size="mini" icon="el-icon-edit" plain @click="addLine">生成流态线</el-button>
     <el-button type="primary" size="mini" icon="el-icon-edit" plain @click="lineWQ">计算曲线</el-button>
     <el-button type="primary" size="mini" icon="el-icon-edit" plain @click="circle">生成缓冲区</el-button>
     <el-button type="primary" size="mini" icon="el-icon-edit" plain @click="voronoi">计算泰森多边形</el-button>
     <el-button type="primary" size="mini" icon="el-icon-edit" plain @click="pointZM">点增密</el-button>
    <div id="map"></div>
  </div>
</template>


<script>
import * as leaflet from 'leaflet'
import {antPath} from 'leaflet-ant-path';
import * as turf from '@turf/turf'
export default {
  data(){
    return{
      _map:null,
      latlons:[[31.413819, 120.744324],[31.223763, 120.808411],[31.17051, 121.168298]
      ,[31.17051, 121.568298],[30.953273, 121.790772]],
    }
  },
  mounted(){
    this._map = leaflet.map('map').setView([31,121], 2);

    leaflet.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this._map);

    // function onMapClick(e) {
    // alert("You clicked the map at " + e.latlng);
    // }   

this._map.on('click', onMapClick);
  },
  methods:{
    addPoint(){
      for(let item of this.latlons){
        leaflet.marker(item).addTo(this._map)
      }
            const pathLayer=antPath(this.latlons, {
        "delay": 400,
        "dashArray": [
          10,
          20
        ],
        "weight": 6,
        "color": "#000",
        "pulseColor": "#fff",
        "paused": false,
        "reverse": false,
        "hardwareAccelerated": true
      });
      this._map.fitBounds(pathLayer.getBounds())
    },
    addLine(){
      const pathLayer=antPath(this.latlons, {
        "delay": 400,
        "dashArray": [
          10,
          20
        ],
        "weight": 6,
        "color": "#000",
        "pulseColor": "#fff",
        "paused": false,
        "reverse": false,
        "hardwareAccelerated": true
      });

      this._map.addLayer(pathLayer);
      this._map.fitBounds(pathLayer.getBounds())
      console.log(pathLayer.getBounds())

      
    },
    lineWQ(){
      let lonlats=[];
      for(let item of this.latlons){
        lonlats.push([item[1],item[0]])
      }
      var line = turf.lineString(lonlats);
      var curved = turf.bezierSpline(line);
      console.log(curved)
      var layerline = leaflet.geoJSON(curved).addTo(this._map);
    },
    voronoi(){
       var buildGeojson={};
        buildGeojson.type='FeatureCollection';
        buildGeojson.features=[];

        for(let item of this.latlons){
          buildGeojson.features.push({
            geometry:{
              type:'Point',
              coordinates:[item[1],item[0]]
            },
            type: "Feature"
          })
        }
        var options = {
          bbox: [120.555725, 30.907331,121.972961, 31.480599]
        };
        var points = turf.randomPoint(2, options);
        var voronoiPolygons = turf.voronoi(buildGeojson,options );
        var layerGeo = leaflet.geoJSON(voronoiPolygons).addTo(this._map);
    },
    circle(){
      for(let item of this.latlons){
         var circle = L.circle([item[0],item[1]],5000, {
            color: 'red',
            fillColor: '#f03',
            fillOpacity: 0.5,
            //radius: 500
        }).addTo(this._map);
      }
      this.$message({
          message: '已生成半径为5km的缓冲区！',
          type: 'success'
      });
    },
    pointZM(){
      let lonlats=[];
      for(let item of this.latlons){
        lonlats.push([item[1],item[0]])
      }
      var line = turf.lineString(lonlats);
      var chunk = turf.lineChunk(line, 1, {units: 'miles'});
      for(let item of chunk.features){
        leaflet.marker([item.geometry.coordinates[1][1],item.geometry.coordinates[1][0]]).addTo(this._map)
      }
    }
  }
}
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