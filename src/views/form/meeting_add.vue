<template>
  <div class="app-container">
    <el-card>
      {{form}}
      <el-divider content-position="left">会议添加</el-divider>
      <br />
      <el-form ref="form" :model="form" label-width="120px">
        <el-form-item label="会议名称">
          <el-input v-model="form.meetingName" placeholder="请输入会议的名称" />
        </el-form-item>
        <el-form-item label="会议地址">
          <el-input v-model="form.meetingAddress" @focus="loadBaiduMap" placeholder="请选择会议的具体地点" />
        </el-form-item>

        <el-form-item label="会议地点">
          <el-input v-model="form.addressName" placeholder="请选择会议的地点" />
        </el-form-item>

        <el-form-item label="联系电话">
          <el-input v-model="form.meetingPhone" placeholder="请输入管理员联系电话" />
        </el-form-item>

        <el-row>
          <el-col :span="12">
            <el-form-item label="开始时间">
              <el-date-picker
                v-model="form.startTime"
                default-time="12:00:00"
                type="datetime"
                value-format="yyyy-MM-dd HH:mm"
                placeholder="选择日期时间"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="结束时间">
              <el-date-picker
                v-model="form.endTime"
                type="datetime"
                value-format="yyyy-MM-dd HH:mm"
                placeholder="选择日期时间"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item label="会议信息">
          <el-input type="textarea" v-model="form.information" placeholder="请选择会议信息"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit">创建会议</el-button>
        </el-form-item>
      </el-form>

      <el-dialog :visible.sync="dialogVisible" title="会议地点选择">
      
        <baiduMap :circlePath="circlePath" :zoom="zoom" :isShow="isShow" @onclick="onclick"></baiduMap>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import baiduMap from "@/components/BaiduMap";
export default {
  components: { baiduMap },
  data() {
    return {
      form: {
        meetingName: "",
        meetingAddress: "",
        addressName: "",
        meetingPhone: "",
        startTime: "",
        endTime: "",
        information: ""
      },
      circlePath: {
        center: {
          lng: 116.404,
          lat: 39.915
        },
        radius: 100
      },
      zoom: 18,
      dialogVisible: false,
      isShow:'none'
    };
  },
  methods: {
    onSubmit() {
      this.$message("submit!");
    },
    onclick(point) {
      this.circlePath.center.lng = point.lng;
      this.circlePath.center.lat = point.lat;
    },
    loadBaiduMap() {
      this.dialogVisible = true;
    }
  }
};
</script>

<style scoped>
.line {
  text-align: center;
}
.el-divider__text {
  font-size: 20px;
}
</style>

