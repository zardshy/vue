(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-191d8675"],{"797f":function(e,t,a){"use strict";var i=a("7b27"),r=a.n(i);r.a},"7b27":function(e,t,a){},ffe8:function(e,t,a){"use strict";a.r(t);var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"main"},[a("el-button",{attrs:{type:"primary",size:"mini",icon:"el-icon-loading",plain:""},on:{click:e.add3Dmarker}},[e._v("添加3D标记")]),a("el-button",{attrs:{type:"primary",size:"mini",icon:"el-icon-loading",plain:""},on:{click:e.addLine}},[e._v("动态画线")]),a("el-button",{attrs:{type:"primary",size:"mini",icon:"el-icon-loading",plain:""},on:{click:e.cj}},[e._v("测量距离")]),a("el-button",{attrs:{type:"primary",size:"mini",icon:"el-icon-loading",plain:""},on:{click:e.exportjpg}},[e._v("导出jpg")]),a("div",{attrs:{id:"map"}})],1)},r=[],n=(a("5453"),a("ec60")),o=(a("6d7a"),{data:function(){return{map:null,white_bd:"http://online{s}.map.bdimg.com/onlinelabel/?qt=tile&x={x}&y={y}&z={z}&styles=pl&scaler=1&p=1",bule_bd:"http://api{s}.map.bdimg.com/customimage/tile?&x={x}&y={y}&z={z}&udt=20170620&scale=1&ak=8d6c8b8f3749aed6b1aff3aad6f40e37&styles=t%3Awater%7Ce%3Aall%7Cc%3A%23044161%2Ct%3Aland%7Ce%3Aall%7Cc%3A%23091934%2Ct%3Aboundary%7Ce%3Ag%7Cc%3A%23064f85%2Ct%3Arailway%7Ce%3Aall%7Cv%3Aoff%2Ct%3Ahighway%7Ce%3Ag%7Cc%3A%23004981%2Ct%3Ahighway%7Ce%3Ag.f%7Cc%3A%23005b96%7Cl%3A1%2Ct%3Ahighway%7Ce%3Al%7Cv%3Aon%2Ct%3Aarterial%7Ce%3Ag%7Cc%3A%23004981%7Cl%3A-39%2Ct%3Aarterial%7Ce%3Ag.f%7Cc%3A%2300508b%2Ct%3Agreen%7Ce%3Aall%7Cv%3Aoff%7Cc%3A%23056197%2Ct%3Asubway%7Ce%3Aall%7Cv%3Aoff%2Ct%3Amanmade%7Ce%3Aall%7Cv%3Aoff%2Ct%3Alocal%7Ce%3Aall%7Cv%3Aoff%2Ct%3Aarterial%7Ce%3Al%7Cv%3Aon%2Ct%3Aboundary%7Ce%3Ag.f%7Cc%3A%23029fd4%2Ct%3Abuilding%7Ce%3Aall%7Cc%3A%231a5787%2Ct%3Apoi%7Ce%3Aall%7Cv%3Aoff%2Ct%3Aall%7Ce%3Al%7Cv%3Aoff",tdt:"http://t{s}.tianditu.com/DataServer?T=vec_c&x={x}&y={y}&l={z}&tk=de0dc270a51aaca3dd4e64d4f8c81ff6"}},mounted:function(){var e=this;this.$nextTick(function(){return t()});var t=function(){var t={center:[105.08052356963802,36.04231948670001],zoom:5,cneter:[121],maxZoom:16,spatialReference:{projection:"baidu"},scaleControl:{position:"bottom-left",maxWidth:100,metric:!0,imperial:!0},zoomControl:{position:"top-right",slider:!0,zoomLevel:!0},overviewControl:{"level ":5,size:[130,80]},baseLayer:new n["TileLayer"]("base",{urlTemplate:e.white_bd,subdomains:[0,1,2],attribution:'&copy; <a href="http://www.osm.org" target="_blank">OpenStreetMap</a> contributors'})};e.map=new n["Map"]("map",t)}},methods:{add3Dmarker:function(){for(var e=new n["VectorLayer"]("3dmk",{enableAltitude:!0,drawAltitude:{lineWidth:1,lineColor:"red"}}).addTo(this.map),t=[],a=[[121.1,31.1331,10001],[121.12234,31.133,8001],[121.1342,31.13241,6001],[121.14,31.1123,7001],[121.4,31.223,10001],[121.2234,31.133,8001],[121.13,31.12341,6001],[121.14,31.1423,700]],i=0,r=a;i<r.length;i++){var o=r[i];t.push(new n["Marker"]([o[0],o[1]],{properties:{altitude:o[2]}}))}e.addGeometry(t),this.map.animateTo({center:[121.1,31.1],zoom:11,pitch:65,bearing:360},{duration:7e3})},addLine:function(){this.map.animateTo({center:[121.1,31.1],zoom:12,pitch:15,bearing:360},{duration:1e3});var e=new n["LineString"]([[121.1,31.1331,10001],[121.12234,31.133,8001],[121.1342,31.13241,6001],[121.14,31.1123,7001],[121.4,31.223,10001],[121.2234,31.133,8001],[121.13,31.12341,6001],[121.14,31.1423,700]],{visible:!1,arrowStyle:"classic",arrowPlacement:"vertex-last",symbol:{lineColor:"#1bbc9b",lineWidth:6}});new n["VectorLayer"]("vector",e).addTo(this.map);function t(){e.hide(),e.animateShow({duration:2500,easing:"out"},function(e){"finished"===e.state.playState&&console.log("finished")})}setTimeout(function(){t()},1200)},cj:function(){this.$notify({title:"单击地图开始测距! 双击结束测距！",type:"success"});new n["DistanceTool"]({symbol:{lineColor:"#34495e",lineWidth:2},vertexSymbol:{markerType:"ellipse",markerFill:"#1bbc9b",markerLineColor:"#000",markerLineWidth:3,markerWidth:10,markerHeight:10},labelOptions:{textSymbol:{textFaceName:"monospace",textFill:"#fff",textLineSpacing:1,textHorizontalAlignment:"right",textDx:15,markerLineColor:"#b4b3b3",markerFill:"#000"},boxStyle:{padding:[6,2],symbol:{markerType:"square",markerFill:"#000",markerFillOpacity:.9,markerLineColor:"#b4b3b3"}}},clearButtonSymbol:[{markerType:"square",markerFill:"#000",markerLineColor:"#b4b3b3",markerLineWidth:2,markerWidth:15,markerHeight:15,markerDx:20},{markerType:"x",markerWidth:10,markerHeight:10,markerLineColor:"#fff",markerDx:20}],language:"en-US"}).addTo(this.map)},exportjpg:function(){this.map.toDataURL({mimeType:"image/jpeg",save:!0,fileName:"map"})}}}),l=o,c=(a("797f"),a("2877")),m=Object(c["a"])(l,i,r,!1,null,"03922abe",null);t["default"]=m.exports}}]);
//# sourceMappingURL=chunk-191d8675.42e837cf.js.map