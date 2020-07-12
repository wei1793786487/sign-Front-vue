<template>
  <baidu-map
    class="map"
    :style="{ display: isShow }"
    :center="circlePath.center"
    @click="onclick"
    :scroll-wheel-zoom="true"
    :zoom="zoom"
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
    onclick({ point }) {
      this.$emit("onclick", point);
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