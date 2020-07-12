<template>
  <div>
  <baiduMap :circlePath="circlePath"  :zoom="zoom" @onclick="onclick">
    
  </baiduMap>
  </div>
</template>

<script>
import baiduMap from '@/components/BaiduMap'

export default {

  components: { baiduMap },
  
  data() {
    return {
      circlePath: {
        center: {
          lng: 116.404,
          lat: 39.915
        },      
        radius: 100
      },
      zoom:18
    };
  },
  methods: {
    onclick(point) {
      this.circlePath.center.lng=point.lng
      this.circlePath.center.lat=point.lat
    },
  }
};
</script>
<style>
.map {
  width: 100%;
  height: 300px;
}
</style>