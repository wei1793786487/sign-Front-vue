<template>
  <el-card class="box-card-component" style="margin-left:8px;">
    <div slot="header" class="box-card-header">
      <img src="https://avatars2.githubusercontent.com/u/54950332?s=400&u=12f122c0161ca805777864b54fad69679ee83ecb&v=4" />
    </div>
    <div style="position:relative;">
      <img src="https://q4.qlogo.cn/g?b=qq&nk=1793786487&s=140" class="panThumb" />
      <mallki class-name="mallki-text" text="会议签到系统前端" />
      <div style="padding-top:35px;" class="progress-item"></div>Vue
      <el-progress :percentage="67.7" color="#42b983"></el-progress>JavaScript
      <el-progress :percentage="6.6" color="#f1e05a"></el-progress>CSS
      <el-progress :percentage="25.4"></el-progress>HTML
      <el-progress :percentage="0.3" color="#f56c6c"></el-progress>
    </div>
  </el-card>
</template>

<script>
import { mapGetters } from "vuex";
import Mallki from "@/components/TextHoverEffect/Mallki";

export default {
  components: { Mallki },

  filters: {
    statusFilter(status) {
      const statusMap = {
        success: "success",
        pending: "danger"
      };
      return statusMap[status];
    }
  },
  data() {
    return {
      statisticsData: {
        article_count: 1024,
        pageviews_count: 1024
      }
    };
  },
  computed: {
    ...mapGetters(["name", "avatar", "roles"])
  }
};
</script>

<style lang="scss" >
.box-card-component {
  .el-card__header {
    padding: 0px !important;
  }
}
</style>
<style lang="scss" scoped>
.box-card-component {
  .box-card-header {
    position: relative;
    height: 220px;
    img {
      width: 100%;
      height: 100%;
      transition: all 0.2s linear;
      &:hover {
        transform: scale(1.1, 1.1);
        filter: contrast(130%);
      }
    }
  }
  .mallki-text {
    position: absolute;
    top: 0px;
    right: 0px;
    font-size: 20px;
    font-weight: bold;
  }
  .panThumb {
    z-index: 100;
    height: 70px !important;
    width: 70px !important;
    position: absolute !important;
    top: -45px;
    left: 0px;
    border: 5px solid #ffffff;
    background-color: #fff;
    margin: auto;
    box-shadow: none !important;
    /deep/ .pan-info {
      box-shadow: none !important;
    }
  }
  .progress-item {
    margin-bottom: 10px;
    font-size: 14px;
  }
  @media only screen and (max-width: 1510px) {
    .mallki-text {
      display: none;
    }
  }
}
</style>
