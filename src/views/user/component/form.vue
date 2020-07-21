<template>
  <div class="app-container">
    <el-card>
      <el-divider content-position="left">{{isEdit?"账号信息修改":"账号新增"}}</el-divider>
      <br />
      <el-form ref="form" :rules="rules" :model="form" label-width="120px">
        <el-form-item label="用户姓名" prop="username">
          <el-input v-model="form.username" placeholder="请输入用户登录名" />
        </el-form-item>

        <el-form-item label="用户性别" prop="addressName">
          <el-radio v-model="form.sex" label="男">男</el-radio>
          <el-radio v-model="form.sex" label="女">女</el-radio>
        </el-form-item>

        <el-form-item label="联系电话" required prop="phone">
          <el-input v-model="form.phone" placeholder="请输入管理员联系电话" />
        </el-form-item>

        <el-form-item label="密码" required prop="password" v-show="!isEdit">
          <el-input type="password" v-model="form.password" placeholder="请输入密码" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" required prop="checkPass" v-show="!isEdit">
          <el-input
            type="password"
            v-model="form.checkPass"
            autocomplete="off"
            placeholder="请输入确认密码"
          ></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit" :loading="isDisable">{{isEdit?"修改":"添加"}}</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { addUser, chanceUser, getUserById } from "@/api/user";
export default {
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
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.form.checkPass !== "") {
          this.$refs.form.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.form.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      form: {
        username: "",
        sex: "男",
        phone: "",
        password: "",
        checkPass: ""
      },
      id: "",
      isDisable: false,
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        sex: [{ required: true, message: "请选择性别", trigger: "chance" }],
        phone: [{ validator: checkPhone, trigger: "blur" }],
        password: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }]
      }
    };
  },

  created() {
    if (this.isEdit) {
      this.id = this.$route.params && this.$route.params.id;
      this.fetchData();
    }
  },
  methods: {
    onSubmit() {
      this.$refs["form"].validate(valid => {
        if (!this.isEdit) {
          if (valid) {
            this.isDisable = true;
            addUser(this.$qs.stringify(this.form)).then(res => {
              this.$message({
                message: "添加成功",
                type: "success"
              });
              this.isDisable = false;
              this.$refs["form"].resetFields();
            });
            this.isDisable = false;
          } else {
            this.$message.error("请按要求填写表单");
          }
        } else {
          chanceUser(this.$qs.stringify(this.form)).then(res => {
            this.$message({
              message: "修改成功",
              type: "success"
            });
            this.isDisable = false;
            // this.fetchData()
            this.$router.go(-1);
          });
        }
      });
      setTimeout(() => {
        this.isDisable = false;
      }, 5000);
    },
    fetchData() {
      getUserById(this.id).then(res => {
        let data = res.data;
        this.form = data;
      });
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

