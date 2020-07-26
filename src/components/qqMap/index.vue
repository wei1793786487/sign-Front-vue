<template>
  <div>
    <div class="mapWrap">
      <div class="qqmap" id="qqmapCont"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    mapcenter: {
      type: String,
      default: "35.469513,119.546547",
    },
    oldmarker: {
      type: String,
      default: "35.469513,119.546547",
    },
  },
  data: function () {
    return {
      qqmap: "",
      premarker: "",
      marker: "",
      latlngCurrent: "",
      cirle:""
    };
  },
  mounted() {
    let that = this;
    this.inputVal = this.inputDefault;
    if (this.oldmarker) {
      this.latlngCurrent = this.oldmarker || this.mapcenter;
    }
    if (typeof qq == "object") {
      that.createMap();
    } else {
      this.loadQQmap();
    }
    window.onMapFileLoad = function () {
      that.createMap();
    };
  },
  watch: {
    oldmarker(newVal, oldVal) {
      if (newVal) {
        console.log(typeof newVal);
        this.latlngCurrent = newVal;
        this.qqmap && this.createMarker();
      }
    },
  },
  methods: {
    loadQQmap() {
      let script = document.createElement("script");
      //设置标签的type属性
      script.type = "text/javascript";
      //设置标签的链接地址
      script.src =
        "https://map.qq.com/api/js?v=2.exp&key=N4NBZ-5IFWK-NH7JH-AK7LS-77W77-LMBVI&callback=onMapFileLoad";
      //添加标签到dom
      document.body.appendChild(script);
    },
    createMap() {
      let that = this;
      this.qqmap = new qq.maps.Map(document.getElementById("qqmapCont"), {
        center: new qq.maps.LatLng(
          that.mapcenter.split(",")[0],
          that.mapcenter.split(",")[1]
        ), // 地图的中心地理坐标。
        zoom: 19, // 地图的中心地理坐标。
      });
      setTimeout(() => {
        this.createMarker();
        this.bindMapEvent();
        this.createCircle()
      }, 500);
    },
    createCircle(){
    let that = this;
     if (that.cirle) {
        that.cirle.setMap(null);
      }
      that.cirle = new qq.maps.Circle({
          center:  new qq.maps.LatLng(
            that.oldmarker.split(",")[0],
            that.oldmarker.split(",")[1]
          ),
          radius: 100,
          map: that.qqmap,
        });
    },
    createMarker() {
      let that = this;
      if (that.premarker) {
        that.premarker.setMap(null);
      }
      if (this.oldmarker) {
        console.log("编辑模式：", this.oldmarker);
        that.qqmap.setCenter(
          new qq.maps.LatLng(
            that.oldmarker.split(",")[0],
            that.oldmarker.split(",")[1]
          )
        );
        that.premarker = new qq.maps.Marker({
          position: new qq.maps.LatLng(
            that.oldmarker.split(",")[0],
            that.oldmarker.split(",")[1]
          ),
          map: that.qqmap,
        });
      } else {
        //获取城市列表接口设置中心点
        let citylocation = new qq.maps.CityService({
          complete: function (result) {
            that.qqmap.setCenter(result.detail.latLng);
          },
        });
        //调用searchLocalCity();方法
        citylocation.searchLocalCity();
      }
    },
    bindMapEvent() {
      let that = this;
      // 地图点击事件
      qq.maps.event.addListener(that.qqmap, "click", function (event) {
        that.marker && that.marker.setMap(null);
        that.premarker && that.premarker.setMap(null);
        that.cirle && that.cirle.setMap(null);
        that.$emit("mapclick", event.latLng); // 地图点击坐标 传递给父组件
        that.latlngCurrent = event.latLng.lat + "," + event.latLng.lng;
        that.marker = new qq.maps.Marker({
          position: event.latLng,
          map: that.qqmap,
        });
         that.cirle = new qq.maps.Circle({
          center: event.latLng,
          radius: 100,
          map: that.qqmap,
        });
        that.geocoder(event.latLng)
      });
    },
     geocoder(latLng){
        geocoder = new qq.maps.Geocoder();
        geocoder.getAddress(latLng);
        geocoder.setComplete(res=>{
           this.$emit("geocoder", res);
        })
     }
  },
};
</script>

<style>
.qqmap {
  width: 100%;
  height: 600px;
}
.mapWrap {
  position: relative;
  width: 100%;
  height: 600px;
  overflow: hidden;
  margin-top: 15px;
}
.lngTips {
  display: none;
  width: 255px;
  height: 40px;
  padding: 5px 7px;
  overflow: hidden;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 123456;
  background: #ffffff;
  border-radius: 5px;
  line-height: 20px;
  box-shadow: #eeeeee 1px 1px 3px;
  border: #eeeeee 1px solid;
  font-size: 12px;
}
</style>