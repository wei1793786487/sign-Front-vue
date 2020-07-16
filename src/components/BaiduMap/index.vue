<template>
  <baidu-map
    class="map"
    :style="{ display: isShow }"
    :center="circlePath.center"
    :scroll-wheel-zoom="true"
    :zoom="zoom"
    @ready="handler"
  >
    <bm-circle
      :center="circlePath.center"
      :radius="circlePath.radius"
      stroke-color="blue"
      :stroke-opacity="0.5"
      :stroke-weight="2"
      :editing="false"
    ></bm-circle>
  </baidu-map>
</template>

<script>
export default {
  props: {
    circlePath: {
      type: Object
    },
    zoom: {
      type: Number,
      default: 15
    },
    isShow: {
      type: String,
      default: ""
    }
  },
  data() {
    return {};
  },
  methods: {
    handler({BMap, map}){
       let vue=this
        var geoc = new BMap.Geocoder();
        map.addEventListener("click",function(e){
            var pt = e.point;
            geoc.getLocation(pt,function(rs){
                var addrComp = rs.addressComponents;
                vue.$emit("onclick", pt,addrComp);
            })
        });

    }
  }
};
</script>
<style>
.map {
  width: 100%;
  height: 300px;
}
</style>