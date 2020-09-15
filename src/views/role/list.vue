<template>
  <div class="app-container">
    <el-card>
      <div class="filter-container">
        <el-input
          v-model="listQuery.roleName"
          placeholder="请输入角色姓名"
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

        <el-table-column align="center" label="角色名称" prop="roleName" />

        <el-table-column align="center" label="角色描述" prop="describe" />

        <el-table-column label="操作" align="center">
          <template slot-scope="{row}">
                <router-link :to="'/role/edit/'+row.id">
              <el-button type="primary" size="mini">编辑</el-button>
            </router-link>
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
  </div>
</template>

<script>
import waves from "@/directive/waves";
import Pagination from "@/components/Pagination";
import { getRoleList,deleteRole } from "@/api/role";
export default {
  components: { Pagination },
  directives: { waves },
  data() {
    return {
      list: null,
      total: 0,
      visibleCancel: "",
      listQuery: {
        page: 1,
        limit: 15,
        roleName: undefined
      }
    };
  },
  created() {
    this.getList();
  },

  methods: {
    getList() {
      this.listLoading = true;
      getRoleList(this.listQuery)
        .then(res => {
          console.log(res);
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
          deleteRole(
            this.$qs.stringify(data, { arrayFormat: "repeat" })
          ).then(res => {
            this.$message({
              message: "删除成功",
                  showClose: true,
              type: "success"
            });
            this.getList();
            loading.close();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
                showClose: true,
            message: "已取消删除"
          });
        });
    },
    chance() {},
    deleteOne(data) {
      this.delete({ ids: [data.id] });
    },
    handleSelectionChange() {},
    handleCreate() {
      this.$router.push("/role/add");
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
