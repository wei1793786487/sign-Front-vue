<template>
  <div class="app-container">
    <el-card>
      <!-- {{form}} -->
      <el-divider content-position="left">{{isEdit?"会议修改":"会议添加"}}</el-divider>
      <br />
      <el-form ref="form" :rules="rules" :model="form" label-width="120px">
        <el-form-item label="会议名称" prop="meetingName">
          <el-input v-model="form.meetingName" placeholder="请输入会议的名称" />
        </el-form-item>

        <el-form-item label="会议地址" prop="meetingAddress">
          <el-input
            v-model="form.meetingAddress"
            readonly
            @focus="loadBaiduMap"
            placeholder="请选择会议的具体地点"
          />
        </el-form-item>

        <el-form-item label="会议地点" prop="addressName">
          <el-input v-model="form.addressName" placeholder="请选择会议的地点" />
        </el-form-item>

        <el-form-item label="联系电话" required prop="meetingPhone">
          <el-input v-model="form.meetingPhone" placeholder="请输入管理员联系电话" />
        </el-form-item>

        <el-row>
          <el-col :span="12">
            <el-form-item label="开始时间" prop="startTime">
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
            <el-form-item label="结束时间" prop="endTime">
              <el-date-picker
                v-model="form.endTime"
                type="datetime"
                value-format="yyyy-MM-dd HH:mm"
                placeholder="选择日期时间"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item label="会议信息" prop="information">
          <el-input type="textarea" v-model="form.information" placeholder="请输入会议的信息"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit">{{isEdit?"修改会议":"添加会议"}}</el-button>
        </el-form-item>
      </el-form>

      <el-dialog :visible.sync="dialogVisible" title="会议地点选择">
        <el-autocomplete
          style="width:400px "
          popper-class="my-autocomplete"
          v-model="searchAddressList"
          :fetch-suggestions="querySearchAsync"
          placeholder="请输入要搜索的地点"
          @select="handleSelect"
        >
          <template slot="prepend">地点：</template>
          <template slot-scope="{ item }">
            <div class="name">{{ item.name }}</div>
            <span class="addr">{{ item.address }}</span>
          </template>
        </el-autocomplete>
        <br />
        <br />
        <baiduMap :circlePath="circlePath" :zoom="zoom" :isShow="isShow" @onclick="onclick"></baiduMap>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import baiduMap from "@/components/BaiduMap";
import { findAddress } from "@/api/address";
import { addMeeting, findById, chanceMeeting } from "@/api/meeting";
export default {
  components: { baiduMap },
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    var checkPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("手机号不能为空"));
      } else {
        const reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
        console.log(reg.test(value));
        if (reg.test(value)) {
          callback();
        } else {
          return callback(new Error("请输入正确的手机号"));
        }
      }
    };

    return {
      form: {
        meetingName: "",
        meetingAddress: "",
        addressName: "",
        meetingPhone: "",
        startTime: "",
        endTime: "",
        information: "",
        lng: "",
        lat: ""
      },
      rules: {
        meetingName: [
          { required: true, message: "请输入会议名称", trigger: "blur" }
        ],
        meetingAddress: [
          { required: true, message: "请选择会议地点", trigger: "chance" }
        ],
        addressName: [
          { required: true, message: "请选择会议地点", trigger: "chance" }
        ],
        meetingPhone: [{ validator: checkPhone, trigger: "blur" }],
        startTime: [
          {
            required: true,
            message: "请选择会议开始日期",
            trigger: "change"
          }
        ],
        endTime: [
          {
            required: true,
            message: "请选择会议结束日期",
            trigger: "change"
          }
        ]
      },
      circlePath: {
        center: {
          lng: 116.404,
          lat: 39.915
        },
        radius: 100
      },
      addressList: "",
      searchAddressList: "",
      zoom: 17,
      dialogVisible: false,
      isShow: "none"
    };
  },
  watch: {
    "circlePath.center": {
      handler(newAddress) {
        this.form.lng = newAddress.lng;
        this.form.lat = newAddress.lat;
      },
      deep: true
    }
  },
  created() {
    if (this.isEdit) {
      const id = this.$route.params && this.$route.params.id;
      this.fetchData(id);
    }
  },
  methods: {
    onSubmit() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (!this.isEdit) {
            addMeeting(this.$qs.stringify(this.form)).then(res => {
              this.$message({
                message: "添加成功",
                type: "success"
              });
              this.$refs["form"].resetFields();
            });
          } else {
            chanceMeeting(this.$qs.stringify(this.form)).then(res => {
              this.$message({
                message: "修改成功",
                type: "success"
              });
            this.fetchData()
            });
          }
        } else {
          this.$message.error("请按要求填写表单");
        }
      });
    },
    fetchData(id) {
      findById(88).then(res => {
        let data = res.data;
        this.form = data;
      });
    },
    onclick(point, addrComp) {
      this.circlePath.center.lng = point.lng;
      this.circlePath.center.lat = point.lat;
      this.form.meetingAddress =
        addrComp.province +
        " " +
        addrComp.city +
        " " +
        addrComp.district +
        " " +
        addrComp.street +
        " " +
        addrComp.streetNumber;
    },

    loadBaiduMap() {
      this.dialogVisible = true;
    },
    querySearchAsync(qs, cb) {
      this.form.addressName = qs;
      if (qs !== "") {
        findAddress({ keyword: qs }).then(res => {
          this.addressList = res.data;
          cb(this.addressList);
        });
      } else {
        cb([]);
      }
    },
    handleSelect(data) {
      this.circlePath.center.lng = data.location.lng;
      this.circlePath.center.lat = data.location.lat;
      this.form.meetingAddress = data.address;
      this.isShow = "";
    }
  }
};
</script>

<style scoped lang="scss">
.line {
  text-align: center;
}
.el-divider__text {
  font-size: 20px;
}
.my-autocomplete {
  li {
    line-height: normal;
    padding: 7px;

    .name {
      text-overflow: ellipsis;
      overflow: hidden;
    }
    .addr {
      font-size: 12px;
      color: #b4b4b4;
    }

    .highlighted .addr {
      color: #ddd;
    }
  }
}
</style>

