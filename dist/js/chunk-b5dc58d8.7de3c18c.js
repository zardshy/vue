(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-b5dc58d8"],{1437:function(e,t,o){e.exports=o.p+"img/car.a5bf12c1.png"},"5cff":function(e,t,o){"use strict";o.r(t);var n=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{staticClass:"main"},[e._v("\n  移动轨迹显示\n  "),o("el-button",{attrs:{type:"primary",size:"mini",icon:"el-icon-loading",plain:""},on:{click:e.animation}},[e._v("移动")]),o("div",{attrs:{id:"map"}})],1)},r=[],a=o("595b"),i={data:function(){return{requestID:null}},mounted:function(){var e=this,t=new ol.layer.Tile({source:new ol.source.XYZ({url:"http://www.google.cn/maps/vt?pb=!1m5!1m4!1i{z}!2i{x}!3i{y}!4i256!2m3!1e0!2sm!3i342009817!3m9!2szh-CN!3sCN!5e18!12m1!1e47!12m3!1e37!2m1!1ssmartmaps!4e0&token=32965"})}),n=new ol.layer.Vector({source:new ol.source.Vector}),r=new ol.layer.Vector({source:new ol.source.Vector,style:new ol.style.Style({stroke:new ol.style.Stroke({color:"#ec0404",width:1})}),Zindex:999,visible:!1}),i=new ol.View({center:new ol.proj.fromLonLat([114.6,30.65]),zoom:13}),s=(new ol.Map({layers:[t,n,r],view:i,target:"map",logo:!1}),1e3),c=[[114.56,30.66],[114.66,30.66],[114.66,30.63],[114.67,30.63],[114.67,30.65],[114.62,30.63],[114.61,30.64]],l=u(c,s,{units:"kilometers"});function u(e,t,o){for(var n={type:"Feature",geometry:{type:"LineString",coordinates:e}},r=[],i=a["lineDistance"](n),s=i/t,c=0;c<e.length-1;c++){var l=a["point"](e[c]),u=a["point"](e[c+1]),g=a["distance"](l,u,o);if(0==c&&r.push(e[0]),g>s){var y=m(l,u,g,s,o);r=r.concat(y)}else r.push(e[c+1])}return r}function m(e,t,o,n,r){for(var i=parseInt(o/n),s=o-i*n,c=[],l=a["lineString"]([e.geometry.coordinates,t.geometry.coordinates]),u=1;u<=i;u++){var m=u*n,g=a["along"](l,m,{units:"kilometers"});c.push(g.geometry.coordinates)}return s>0&&c.push(t.geometry.coordinates),c}var g=new ol.Feature({geometry:new ol.geom.LineString(l).transform("EPSG:4326","EPSG:3857")});n.getSource().addFeature(g);var y=new ol.Feature({geometry:new ol.geom.Point(new ol.proj.fromLonLat([114.56,30.66]))});y.setStyle(new ol.style.Style({image:new ol.style.Icon({src:o("1437"),rotateWithView:!0})}));var d=y.clone();n.getSource().addFeature(y);var w=0,p=function t(){if(w++,w<s){var o,n=g.getGeometry().getCoordinates()[w];o=1===w?d.getGeometry().getCoordinates():y.getGeometry().getCoordinates();var r=-Math.atan((n[1]-o[1])/(n[0]-o[0]));v(n,r),y.getGeometry().setCoordinates(g.getGeometry().getCoordinates()[w]),y.getStyle().getImage().setRotation(r),e.requestID=requestAnimationFrame(t)}},f=[];function v(e,t){if(r.getVisible()||r.setVisible(!0),1===w){f.push(d.getGeometry().getCoordinates(),e);var o=new ol.Feature({geometry:new ol.geom.LineString(f)});r.getSource().addFeature(o)}else f.push(e);r.getSource().getFeatures()[0].getGeometry().setCoordinates(f)}f=[],w=0,r.getSource().clear(),this.requestID&&cancelAnimationFrame(this.requestID),p()},methods:{animation:function(){routePath=[],counter=0,lineAnimateLayer.getSource().clear(),this.requestID&&cancelAnimationFrame(this.requestID),animate()}}},s=i,c=(o("f16a"),o("2877")),l=Object(c["a"])(s,n,r,!1,null,"664381f6",null);t["default"]=l.exports},c76c:function(e,t,o){},f16a:function(e,t,o){"use strict";var n=o("c76c"),r=o.n(n);r.a}}]);
//# sourceMappingURL=chunk-b5dc58d8.7de3c18c.js.map