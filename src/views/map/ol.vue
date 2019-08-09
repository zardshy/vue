<template>
  <div class="main">
    移动轨迹显示
    <el-button type="primary" size="mini" icon="el-icon-loading" plain @click="animation">移动</el-button> 

    <div id="map"></div>
  </div>
</template>

<script>

// import 'ol/ol.css';
// import {Map, View} from 'ol';
// import TileLayer from 'ol/layer/Tile';
// import OSM from 'ol/source/OSM';
import * as turf from '@turf/turf'

export default {
  data(){
    return{
      requestID:null
    }
  },
  mounted(){
     var layer = new ol.layer.Tile({
            source: new ol.source.XYZ({
                url: 'http://www.google.cn/maps/vt?pb=!1m5!1m4!1i{z}!2i{x}!3i{y}!4i256!2m3!1e0!2sm!3i342009817!3m9!2szh-CN!3sCN!5e18!12m1!1e47!12m3!1e37!2m1!1ssmartmaps!4e0&token=32965'
            })
        });
        var vector = new ol.layer.Vector({
            source: new ol.source.Vector()
        });

        var lineAnimateLayer = new ol.layer.Vector({
            source: new ol.source.Vector(),
            style: new ol.style.Style({
                stroke: new ol.style.Stroke({
                    color: '#ec0404',
                    width: 1
                })
            }),
            Zindex: 999,
            visible: false
        });

        var view = new ol.View({
            center: new ol.proj.fromLonLat([114.60, 30.65]),
            zoom: 13
        });
        var map = new ol.Map({
            layers: [layer, vector, lineAnimateLayer],
            view: view,
            target: "map",
            logo: false
        })


        var total_step = 1000;
        var lineCoords = [[114.56, 30.66], [114.66, 30.66], [114.66, 30.63], [114.67, 30.63], [114.67, 30.65], [114.62, 30.63], [114.61, 30.64]];
        var newroute = getRoute(lineCoords, total_step, { units: 'kilometers' })

        function getRoute(coords, total_step, units) {
            var route = {
                "type": "Feature",
                "geometry": {
                    "type": "LineString",
                    "coordinates": coords
                }
            }
            var newcoords = [];
            var total_lineLength = turf.lineDistance(route);
            var per_stepLength = total_lineLength / total_step;
            // console.log(total_step, per_stepLength)
            for (let i = 0; i < coords.length - 1; i++) {
                var from = turf.point(coords[i]);
                var to = turf.point(coords[i + 1]);
                let lDistance = turf.distance(from, to, units);
                if (i == 0) {
                    newcoords.push(coords[0])
                }
                if (lDistance > per_stepLength) {
                    let rings = lineMore(from, to, lDistance, per_stepLength, units)
                    newcoords = newcoords.concat(rings)
                } else {
                    newcoords.push(coords[i + 1])
                }
            }
            return newcoords
        }

        function lineMore(from, to, distance, splitLength, units) {
            var step = parseInt(distance / splitLength)
            var leftLength = distance - step * splitLength
            var rings = []
            var route = turf.lineString([from.geometry.coordinates, to.geometry.coordinates])
            for (let i = 1; i <= step; i++) {
                let nlength = i * splitLength
                let pnt = turf.along(route, nlength, { units: 'kilometers' });
                rings.push(pnt.geometry.coordinates)
            }
            if (leftLength > 0) {
                rings.push(to.geometry.coordinates)
            }
            return rings
        }


        var fastLine = new ol.Feature({
            geometry: new ol.geom.LineString(newroute).transform('EPSG:4326', 'EPSG:3857')
        });
        vector.getSource().addFeature(fastLine);

        //lineAnimateLayer.getSource().addFeature(fastLine.clone());

        var point = new ol.Feature({
            geometry: new ol.geom.Point(new ol.proj.fromLonLat([114.56, 30.66])),
        });
        point.setStyle(new ol.style.Style({
            image: new ol.style.Icon({
                src: require('@/assets/images/car.png'),
                rotateWithView: true,
            })
        }));
        var origin = point.clone();
        vector.getSource().addFeature(point);

  
        var counter = 0;

        // function animate() {
        //     counter++;
        //     if (counter < total_step) {
        //         var second = fastLine.getGeometry().getCoordinates()[counter];
        //         var first
        //         if (counter === 1) {
        //             first = origin.getGeometry().getCoordinates();
        //         } else {
        //             first = point.getGeometry().getCoordinates();
        //         }
        //         var angle = -Math.atan((second[1] - first[1]) / (second[0] - first[0]));
        //         LineAnimate(second, angle);
        //         point.getGeometry().setCoordinates(fastLine.getGeometry().getCoordinates()[counter]);
        //         point.getStyle().getImage().setRotation(angle);
        //         this.requestID = requestAnimationFrame(animate);
        //     }
        // }

        const animate=()=>{
                      counter++;
            if (counter < total_step) {
                var second = fastLine.getGeometry().getCoordinates()[counter];
                var first
                if (counter === 1) {
                    first = origin.getGeometry().getCoordinates();
                } else {
                    first = point.getGeometry().getCoordinates();
                }
                var angle = -Math.atan((second[1] - first[1]) / (second[0] - first[0]));
                LineAnimate(second, angle);
                point.getGeometry().setCoordinates(fastLine.getGeometry().getCoordinates()[counter]);
                point.getStyle().getImage().setRotation(angle);
                this.requestID = requestAnimationFrame(animate);
            }
        }

        var routePath = [];

        function LineAnimate(second, angle) {
            // console.log(angle);
            if (!lineAnimateLayer.getVisible()) {
                lineAnimateLayer.setVisible(true)
            }
            if (counter === 1) {
                routePath.push(origin.getGeometry().getCoordinates(), second);
                var line = new ol.Feature({
                    geometry: new ol.geom.LineString(routePath)
                });
                lineAnimateLayer.getSource().addFeature(line);
            } else {
                routePath.push(second);
            }
            lineAnimateLayer.getSource().getFeatures()[0].getGeometry().setCoordinates(routePath);
        };

        routePath = [];
        counter = 0;
        lineAnimateLayer.getSource().clear();
        if (this.requestID) {
            cancelAnimationFrame(this.requestID);
        }
        animate();

  },
  methods:{

    animation(){
        routePath = [];
        counter = 0;
        lineAnimateLayer.getSource().clear();
        if (this.requestID) {
            cancelAnimationFrame(this.requestID);
        }
        animate();
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
  height: calc(100vh - 120px);
  margin: 0px;
  padding: 0px;
}
</style>