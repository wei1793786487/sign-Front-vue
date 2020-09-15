<template>
  <div class="app-container">
    <el-card>
      <el-divider content-position="left">{{isEdit?"角色信息修改":"角色新增"}}</el-divider>
      <br />
      <el-form ref="form" :rules="rules" :model="form" label-width="120px">
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="form.roleName" placeholder="请输入角色名称" />
        </el-form-item>

        <el-form-item label="角色描述" prop="describe">
          <el-input type="textarea" v-model="form.describe " placeholder="请输入角色描述"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit" :loading="isDisable">{{isEdit?"修改":"添加"}}</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { addRole, chanceRole ,findById} from "@/api/role";
export default {
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      form: {
        roleName: "",
        describe: ""
      },
      id: "",
      isDisable:false,
      rules: {
        roleName: [
          { required: true, message: "请输入角色名称", trigger: "blur" }
        ],
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
        if (valid) {
          if (!this.isEdit) {
              this.isDisable=true
            addRole(this.$qs.stringify(this.form)).then(res => {
              this.$message({
                message: "添加成功",
                 showClose: true,
                type: "success"
              });
              this.isDisable=false
              this.$refs["form"].resetFields();
            });
          } else {
            chanceRole(this.$qs.stringify(this.form)).then(res => {
              this.$message({
                message: "修改成功",
                 showClose: true,
                type: "success"
              });
            // this.fetchData()
              this.isDisable=true
            this.$router.go(-1);
            });
          }
        } else {
          this.$message({
          showClose: true,
          message: '请按要求填写表单',
          type: 'error'
        });
        }
      });
    },
    fetchData() {
      findById(this.id).then(res => {
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
</style>

