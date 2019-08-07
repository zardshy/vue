<template>
  <div class="main">
    <el-button type="primary" size="mini" icon="el-icon-location" plain @click="add3Dmarker">添加3D标记</el-button>
    <el-button type="primary" size="mini" icon="el-icon-minus" plain @click="addLine">动态画线</el-button>
    <el-button type="primary" size="mini" icon="el-icon-info" plain @click="cj">测量距离</el-button>
    <el-button type="primary" size="mini" icon="el-icon-printer" plain @click="exportjpg">导出jpg</el-button>
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
      map: null,
      white_bd:
        "http://online{s}.map.bdimg.com/onlinelabel/?qt=tile&x={x}&y={y}&z={z}&styles=pl&scaler=1&p=1",
      bule_bd:
        "http://api{s}.map.bdimg.com/customimage/tile?&x={x}&y={y}&z={z}&udt=20170620&scale=1&ak=8d6c8b8f3749aed6b1aff3aad6f40e37&styles=t%3Awater%7Ce%3Aall%7Cc%3A%23044161%2Ct%3Aland%7Ce%3Aall%7Cc%3A%23091934%2Ct%3Aboundary%7Ce%3Ag%7Cc%3A%23064f85%2Ct%3Arailway%7Ce%3Aall%7Cv%3Aoff%2Ct%3Ahighway%7Ce%3Ag%7Cc%3A%23004981%2Ct%3Ahighway%7Ce%3Ag.f%7Cc%3A%23005b96%7Cl%3A1%2Ct%3Ahighway%7Ce%3Al%7Cv%3Aon%2Ct%3Aarterial%7Ce%3Ag%7Cc%3A%23004981%7Cl%3A-39%2Ct%3Aarterial%7Ce%3Ag.f%7Cc%3A%2300508b%2Ct%3Agreen%7Ce%3Aall%7Cv%3Aoff%7Cc%3A%23056197%2Ct%3Asubway%7Ce%3Aall%7Cv%3Aoff%2Ct%3Amanmade%7Ce%3Aall%7Cv%3Aoff%2Ct%3Alocal%7Ce%3Aall%7Cv%3Aoff%2Ct%3Aarterial%7Ce%3Al%7Cv%3Aon%2Ct%3Aboundary%7Ce%3Ag.f%7Cc%3A%23029fd4%2Ct%3Abuilding%7Ce%3Aall%7Cc%3A%231a5787%2Ct%3Apoi%7Ce%3Aall%7Cv%3Aoff%2Ct%3Aall%7Ce%3Al%7Cv%3Aoff",
      tdt:
        "http://t{s}.tianditu.com/DataServer?T=vec_c&x={x}&y={y}&l={z}&tk=de0dc270a51aaca3dd4e64d4f8c81ff6"
    };
  },
  mounted() {
    this.$nextTick(() => initMap());
    const initMap = () => {
      let option = {
        center: [105.19052356963802, 36.04231948670001],
        zoom: 5,
        cneter: [121.0],
        maxZoom: 16,
        spatialReference: {
          projection: "baidu"
        },
        scaleControl: {
          position: "bottom-left",
          maxWidth: 100,
          metric: true,
          imperial: true
        },
        zoomControl: {
          position: "top-right",
          slider: true,
          zoomLevel: true
        },
        overviewControl: {
          "level ": 5,
          size: [130, 80]
        },
        baseLayer: new maptalks.TileLayer("base", {
          urlTemplate: this.white_bd,
          subdomains: [0, 1, 2],
          attribution:
            '&copy; <a href="http://www.osm.org" target="_blank">OpenStreetMap</a> contributors'
        })
      };
      this.map = new maptalks.Map("map", option);
    };
  },
  methods: {
    add3Dmarker() {
      var layer = new maptalks.VectorLayer("3dmk", {
        enableAltitude: true,
        // draw altitude
        drawAltitude: {
          lineWidth: 1,
          lineColor: "red"
        }
      }).addTo(this.map);
      let markers = [];
      let mk = [
        [121.1, 31.1331, 10001],
        [121.12234, 31.133, 8001],
        [121.1342, 31.13241, 6001],
        [121.14, 31.1123, 7001],
        [121.4, 31.223, 10001],
        [121.2234, 31.133, 8001],
        [121.13, 31.12341, 6001],
        [121.14, 31.1423, 700]
      ];
      for (let i of mk) {
        markers.push(
          new maptalks.Marker([i[0], i[1]], {
            properties: {
              altitude: i[2]
            }
          })
        );
      }
      layer.addGeometry(markers);
      this.map.animateTo(
        {
          center: [121.1, 31.1],
          zoom: 11,
          pitch: 65,
          bearing: 360
        },
        {
          duration: 7000
        }
      );
    },
    addLine() {
      this.map.animateTo(
        {
          center: [121.2, 31.1],
          zoom: 12,
          pitch: 15,
          bearing: 360
        },
        {
          duration: 1000
        }
      );
      var line = new maptalks.LineString(
        [
          [121.1, 31.1331, 10001],
          [121.12234, 31.133, 8001],
          [121.1342, 31.13241, 6001],
          [121.14, 31.1123, 7001],
          [121.4, 31.223, 10001],
          [121.2234, 31.133, 8001],
          [121.13, 31.12341, 6001],
          [121.14, 31.1423, 700]
        ],
        {
          visible: false,
          arrowStyle: "classic",
          arrowPlacement: "vertex-last",
          symbol: {
            lineColor: "#1bbc9b",
            lineWidth: 6
          }
        }
      );
      var lineLayer = new maptalks.VectorLayer("vector", line).addTo(this.map);

      function replay() {
        line.hide();
        //line's animateShow
        line.animateShow(
          {
            duration: 2500,
            easing: "out"
          },
          function(frame) {
            if (frame.state.playState === "finished") {
              console.log("finished");
            }
          }
        );
      }
      setTimeout(() => {
        replay();
      }, 1200);
    },
    cj() {
      this.$notify({
        title: "单击地图开始测距! 双击结束测距！",
        type: "success"
      });
      var distanceTool = new maptalks.DistanceTool({
        symbol: {
          lineColor: "#34495e",
          lineWidth: 2
        },
        vertexSymbol: {
          markerType: "ellipse",
          markerFill: "#1bbc9b",
          markerLineColor: "#000",
          markerLineWidth: 3,
          markerWidth: 10,
          markerHeight: 10
        },

        labelOptions: {
          textSymbol: {
            textFaceName: "monospace",
            textFill: "#fff",
            textLineSpacing: 1,
            textHorizontalAlignment: "right",
            textDx: 15,
            markerLineColor: "#b4b3b3",
            markerFill: "#000"
          },
          boxStyle: {
            padding: [6, 2],
            symbol: {
              markerType: "square",
              markerFill: "#000",
              markerFillOpacity: 0.9,
              markerLineColor: "#b4b3b3"
            }
          }
        },
        clearButtonSymbol: [
          {
            markerType: "square",
            markerFill: "#000",
            markerLineColor: "#b4b3b3",
            markerLineWidth: 2,
            markerWidth: 15,
            markerHeight: 15,
            markerDx: 20
          },
          {
            markerType: "x",
            markerWidth: 10,
            markerHeight: 10,
            markerLineColor: "#fff",
            markerDx: 20
          }
        ],
        language: "en-US"
      }).addTo(this.map);
    },
    exportjpg() {
      var data = this.map.toDataURL({
        mimeType: "image/jpeg", // or 'image/png'
        save: true, // to pop a save dialog
        fileName: "map" // file name
      });
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
  height: calc(100vh - 80px);
  margin: 0px;
  padding: 0px;
}
</style>