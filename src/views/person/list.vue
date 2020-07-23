<template>
  <div class="app-container">
    <el-card>
      <div class="filter-container">
        <el-input
          v-model="listQuery.personName"
          placeholder="请输入人员姓名"
          style="width: 200px;"
          @keyup.enter.native="getList"
        />

        <el-button v-waves type="success" icon="el-icon-search" @click="getList">搜索</el-button>
        <el-button
          style="margin-left: 10px;"
          type="primary"
          icon="el-icon-edit"
          @click="handleCreate"
        >添加</el-button>

        <el-button
          :style="{ display: visibleCancel }"
          type="danger"
          icon="el-icon-delete"
          @click="handleDeleteChose"
        >删除所选</el-button>

        <el-tooltip class="item" effect="dark" content="下载模板文件" placement="top">
          <el-link
            class="uploads"
            href="https://www.hqgml.com/xls/人员信息.xlsx"
            :underline="false"
            type="info"
          >
            <el-button style="margin-left: 10px;" type="success" icon="el-icon-download">点我下载模板文件</el-button>
          </el-link>
        </el-tooltip>

        <el-tooltip class="item" effect="dark" content="上传文件模板，自动匹配人员与手机号" placement="top">
          <el-upload
            :headers="headers"
            class="uploads"
            action="http://localhost:8080/upload/Phone"
            multiple
            :on-exceed="numberHandle"
            :limit="1"
          >
            <el-button style="margin-left: 10px;" type="info" icon="el-icon-upload2">点击上传</el-button>
          </el-upload>
        </el-tooltip>
      </div>
      <el-table
        v-loading="listLoading"
        :data="list"
        element-loading-text="正在加载数据"
        border
        fit
        highlight-current-row
        @selection-change="handleSelectionChange"
      >
        >
        <el-table-column type="selection" width="55"></el-table-column>

        <el-table-column align="center" label="ID" width="70">
          <template slot-scope="scope">{{ scope.$index +1 }}</template>
        </el-table-column>

        <el-table-column align="center" label="人员名称">
          <template slot-scope="{row}">{{row.personName}}</template>
        </el-table-column>


          <el-table-column align="center" label="添加类型">
          <template slot-scope="{row}">
            <el-tag v-if="row.bandType===0">管理员添加</el-tag>
         
           <el-tag v-else-if="row.bandType===1" type="success">小程序添加</el-tag>
 
           <el-tag v-else type="danger">未知类型</el-tag>

          </template>
        </el-table-column>


        <el-table-column align="center" label="联系方式">
          <template slot-scope="{row}">
            <el-tag v-if="row.phone===''" type="danger">未绑定</el-tag>
            <template v-else>{{row.phone}}</template>
          </template>
        </el-table-column>


        <el-table-column align="center" label="用户图像">
          <template slot-scope="{row}">
          <el-tag v-if="row.url==''||row.url==null" type="danger">未上传人脸</el-tag>
            <el-image v-else
              style="width: 100px; height: 100px"
              :src="'http://www.hqgml.com/'+row.url"
              :preview-src-list="['http://www.hqgml.com/'+row.url]"
            ></el-image>
          </template>
        </el-table-column>

        <el-table-column align="center" label="添加时间">
          <template slot-scope="{row}">{{row.addTime}}</template>
        </el-table-column>

        <el-table-column label="操作" align="center">
          <template slot-scope="{row}">
            <el-button type="primary" size="mini" @click="chance(row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="deleteOne(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <pagination
        v-show="total>0"
        :total="total"
        :current-page="15"
        :page.sync="listQuery.page"
        :limit.sync="listQuery.limit"
        @pagination="getList"
      />
    </el-card>

    <el-dialog
      title="人员修改"
      :rules="rules"
      :visible.sync="dialogVisible"
      width="30%"
      :show-close="false"
    >
      <el-form ref="AddPersonForm" :model="psersonForm" label-width="80px">
        <el-form-item label="人员姓名" prop="personName">
          <el-input v-model="psersonForm.personName" placeholder="请输入修改的人员姓名"></el-input>
        </el-form-item>

        <el-form-item label="电话号码" prop="phone">
          <el-input v-model="psersonForm.phone" placeholder="请选择电话号码"></el-input>
        </el-form-item>
        <el-form-item label="添加时间" prop="time">
          <el-input v-model="time" disabled></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit">修改</el-button>
          <el-button @click="onCancel">关闭</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { getPerSionList, chancePerson, deletePerson } from "@/api/person";
import waves from "@/directive/waves";
import Pagination from "@/components/Pagination";
import { getToken } from "@/utils/auth";
export default {
  components: { Pagination },
  directives: { waves },
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
      list: null,
      listLoading: true,
      total: 0,
      token: "",
      time: "",
      visibleCancel: "none",
      dialogVisible: false,
      choseIds: [],
      psersonForm: {
        id: "",
        personName: "",
        phone: ""
      },
      listQuery: {
        page: 1,
        limit: 10,
        personName: undefined
      },
      rules: {
        personName: [
          { required: true, message: "请输入人员姓名", trigger: "chance" }
        ],
        phone: [{ validator: checkPhone, trigger: "blur" }]
      }
    };
  },
  created() {
    this.getList();
    this.setToken();
  },
  watch: {
    choseIds: function(data) {
      if (data.length > 1) {
        this.visibleCancel = "";
      } else {
        this.visibleCancel = "none";
      }
    }
  },
  computed: {
    headers() {
      return {
        Authorization: "Bearer " + this.token
      };
    }
  },
  methods: {
    getList(data) {
      this.listLoading = true;
      getPerSionList(this.listQuery)
        .then(response => {
          this.total = response.count;
          this.list = response.data;
          this.listLoading = false;
        })
        .catch(er => {
          this.listLoading = false;
          this.listQuery.personName = "";
        });
    },
    numberHandle() {
      this.$message({
        message: "超过最大上传个数",
        type: "error"
      });
    },
    onCancel() {
      this.dialogVisible = false;
    },
    onSubmit(data) {
      if (data.psersonForm === "") {
        this.$message({
          message: "人员名称不能为空",
          type: "warning"
        });
      }
      chancePerson(this.psersonForm).then(res => {
        this.$message({
          message: "更新成功",
          type: "success"
        });
        this.getList();
      });
      this.dialogVisible = false;
    },
    setToken() {
      this.token = getToken();
    },
    handleClose() {},
    handleFilter() {},
    handleCreate() {
      this.$router.push("/person/upload");
    },
    chance(row) {
      this.dialogVisible = true;
      this.psersonForm.personName = row.personName;
      this.psersonForm.phone = row.phone;
      this.time = row.addTime;
      this.psersonForm.id = row.id;
    },
    deleteOne(data) {
      this.delete({ ids: [data.id] });
    },
    delete(data) {
      this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          const loading = this.$loading({
            lock: true,
            text: "删除中",
            spinner: "el-icon-loading",
            background: "rgba(0, 0, 0, 0.7)"
          });
          deletePerson(
            this.$qs.stringify(data, { arrayFormat: "repeat" })
          ).then(res => {
            this.$message({
              message: "删除成功",
              type: "success"
            });
            this.getList()
            loading.close()
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    handleDeleteChose() {
      this.delete({ids: this.choseIds})
    },
    handleSelectionChange(data) {
      let choses = [];
      data.forEach(element => {
        choses.push(element.id);
      });
      this.choseIds = choses;
    }
  }
};
</script>



<style  scoped>
.filter-container {
  margin-bottom: 20px;
}
.el-link.el-link--info {
  color: white;
}
.uploads {
  float: right;
  /* padding-right: 60px; */
  margin-top: 3px;
}
</style>
