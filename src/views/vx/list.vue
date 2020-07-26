<template>
  <div class="padd20">
    <mapselect :mapcenter="centerLatLng" 
    @geocoder="geocoder"
    :oldmarker="oldMarker" @mapclick="pointChange"></mapselect>
  </div>
</template>

<script>
import mapselect from "@/components/qqMap";
export default {
  components: { mapselect },
  data() {
    return {
      pointName: "日照",
      qqmap: null,
      centerLatLng: "35.469513,119.546547",
      oldMarker: "35.469513,119.546547",
      newMarker: null,
    };
  },
  mounted() {},
  methods: {
    pointChange(ev) {
      console.log("捕获到点击坐标", ev);
    },
    geocoder(ev){
    console.log(ev);
    }
  },
};
</script>

<style>
</style>