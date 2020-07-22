<template>
  <div class="app-container">
    <el-card>
      <el-divider content-position="left">个人信息修改</el-divider>
      <br />
      <el-form ref="form" :rules="rules" :model="form" label-width="120px">
          
        <el-form-item label="请输入旧密码" prop="old_password">
          <el-input v-model="form.old_password" placeholder="请输入旧密码" />
        </el-form-item>

       

        <el-form-item label="密码" required prop="new_password" v-show="!isEdit">
          <el-input type="password" v-model="form.new_password" placeholder="请输入密码" autocomplete="off"></el-input>
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
import { removeToken } from '@/utils/auth'
import {  chancePassword } from "@/api/user";
export default {
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
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
      } else if (value !== this.form.new_password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      form: {
        old_password:"",
        new_password: "",
        checkPass: ""
      },
      isDisable:false,
      rules: {
        old_password: [
          { required: true, message: "请输入原来的密码", trigger: "blur" }
        ],
        password: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }]
      }
    };
  },
  methods: {
    onSubmit() {
      this.$refs["form"].validate(valid => {
       chancePassword(this.$qs.stringify(this.form)).then(res=>{
         if(res.code===200){
         removeToken('token')
         this.$router.go(0)
         }
       })
      });
      setTimeout(() => {
        this.isDisable = false;
      }, 5000);
    },
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

</style>

