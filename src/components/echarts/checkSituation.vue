<template>
  <div id="myChart" :style="{width: '400px', height: '400px'}"></div>
</template>

<script>
export default {
  props: {
    check: {
      type: Number,
      default: true
    },
    unCheck: {
      type: Number,
      default: true
    }
  },
  watch: {
    check: function() {
      this.drawLine();
    },
    unCheck: function() {
      this.drawLine();
    }
  },

  methods: {
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      // 绘制图表
      let vue = this;
      myChart.setOption({
        color: ["#70E1FF", "#B1C0C2"],
        title: {
          text: "签到情况",
          left: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "签到情况 <br/>{b} : {c} ({d}%)"
        },
        legend: {
          bottom: 10,
          left: "center",
          data: ["已签到", "未签到"]
        },
        series: [
          {
            type: "pie",
            radius: "50%",
            center: ["50%", "50%"],
            selectedMode: "single",
            data: [
              {
                value: vue.check,
                name: "已签到"
              },
              {
                value: vue.unCheck,
                name: "未签到"
              }
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      });
    }
  }
};
</script>

<style>
</style>
