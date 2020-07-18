<template>
  <div class="app-container">
    <el-card>
      <div class="filter-container">
        <el-input
          v-model="listQuery.serch"
          placeholder="请输入要搜索的信息"
          style="width: 200px;"
          @keyup.enter.native="getList"
        />
        <el-button v-waves type="success" icon="el-icon-search" @click="getList">搜索</el-button>
        <el-button v-show="isAdmin"
          :style="{ display: visibleCancel }"
          type="danger"
          icon="el-icon-delete"
          @click="handleDeleteChose"
        >删除所选</el-button>
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
        <el-table-column type="selection" width="55"></el-table-column>

        <el-table-column align="center" label="ID" width="70">
          <template slot-scope="scope">{{ scope.$index +1 }}</template>
        </el-table-column>

        <el-table-column v-show="isAdmin" align="center" label="所属用户" prop="user" />

        <el-table-column align="center" prop="name" label="行为" />>
        <el-table-column align="center" prop="url" label="路径" />

        <el-table-column align="center" label="参数" prop="requestparam" />

        <el-table-column align="center" label="请求ip" prop="ip" />

        <el-table-column align="center" label="请求方式">
          <template slot-scope="{row}">
            <el-tag v-if="row.requesttype=='POST'" type="success">{{ row.requesttype }}</el-tag>
            <el-tag v-if="row.requesttype=='GET'">{{ row.requesttype }}</el-tag>
            <el-tag v-if="row.requesttype=='PUT'" type="warning">{{ row.requesttype }}</el-tag>
            <el-tag v-if="row.requesttype=='DELETE'" type="danger">{{ row.requesttype }}</el-tag>
          </template>
        </el-table-column>

        <el-table-column align="center" prop="ipinfo" label="请求地点" />

        <el-table-column align="center" label="时间(毫秒)" prop="time" />

        <el-table-column align="center" label="执行时间" prop="createTime" :formatter="dateFormat" />
     
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
  </div>
</template>

<script>
import waves from "@/directive/waves";
import Pagination from "@/components/Pagination";
import { getLogList ,deleteLog} from "@/api/log";
import store from '../../store'
export default {
  components: { Pagination },
  directives: { waves },
  data() {
    return {
      list: null,
      total: 0,
      isAdmin:false,
      visibleCancel: "",
      listQuery: {
        page: 1,
        limit: 15,
        serch: undefined
      }
    };
  },
  created() {
    this.getList();
  },
  watch: {},
  methods: {
    getList() {
      const hasRoles = store.getters.roles 
      hasRoles.forEach(element=>{
        if(element.roleName==="ADMIN"){
          this.isAdmin=true;
        }
      })
      this.listLoading = true;
      getLogList(this.listQuery)
        .then(res => {
          this.total = res.count;
          this.list = res.data;
          this.listLoading = false;
        })
        .catch(res => {
          this.listLoading = false;
        });
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
          deleteLog(
            this.$qs.stringify(data, { arrayFormat: "repeat" })
          ).then(res => {
            this.$message({
              message: "删除成功",
              type: "success"
            });
            this.getList();
            loading.close();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    chance() {},
    deleteOne(data) {
      this.delete({ ids: [data.id] });
    },
    handleSelectionChange() {},
    handleCreate() {},
    dateFormat(row, column) {
      var date = row[column.property];
      if (date == undefined) {
        return "";
      }
      return this.$moment(date).format("YYYY-MM-DD HH:mm:ss");
    },
    handleDeleteChose() {
      this.delete({ ids: this.choseIds });
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
</style>
