<template>
 
 <div id="container" style="width:100%; height:300px"></div>

</template>

<script>
import maps from "qqmap"
export default {

  created() {
    this.init()
  },
  methods: {
   init() {
     var that = this;
     maps.init("N4NBZ-5IFWK-NH7JH-AK7LS-77W77-LMBVI", () => {
       var myLatlng = new qq.maps.LatLng(22.547931568083015, 114.1306221485138);
       var myOptions = {
         zoom: 16,
         center: myLatlng,
         mapTypeId: qq.maps.MapTypeId.ROADMAP
       };
       that.map = new qq.maps.Map(
         document.getElementById("container"),
         myOptions
       );
       //获取点击后的地址
       qq.maps.event.addListener(that.map, "click", function(event) {
        //  // 获取点击后的地图坐标
        //  that.shopInfo.lng = event.latLng.getLng();
        //  that.shopInfo.lat = event.latLng.getLat();
       });
 
     });
   },
}
}
</script>

<style>

</style>