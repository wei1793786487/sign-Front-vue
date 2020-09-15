<template>
  <div class="app-container">
    <el-card>
      <el-table
        v-loading="listLoading"
        :data="list"
        element-loading-text="正在加载数据"
        border
        fit
        highlight-current-row
      >
        >
        <el-table-column type="selection" width="55"></el-table-column>

        <el-table-column align="center" label="ID" width="70">
          <template slot-scope="scope">{{ scope.$index +1 }}</template>
        </el-table-column>

        <el-table-column align="center" label="小程序用户id" prop="openid" />

        <el-table-column align="center" label="绑定人员">
          <template slot-scope="{row}">
            <template v-if="row.persons===null">未绑定用户</template>
            <template v-else>{{row.persons.personName}}</template>
          </template>
        </el-table-column>

        <el-table-column align="center" label="上次登录时间" prop="createTime" />

        <el-table-column align="center" label="创建时间" prop="lastTime" />

        <el-table-column label="操作" align="center">
          <template slot-scope="{row}">
            <el-button type="primary" size="mini" @click="chance(row)">解绑</el-button>
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
import { getVxUserList, unband } from "@/api/vxUser";
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
      },
    };
  },
  created() {
    this.getList();
  },
  watch: {},
  methods: {
    getList() {
      this.listLoading = true;
      getVxUserList(this.listQuery)
        .then((res) => {
          console.log(res);
          this.total = res.count;
          this.list = res.data;
          this.listLoading = false;
        })
        .catch((res) => {
          this.listLoading = false;
        });
    },
    chance(row) {
      if(row.persons===null){
            this.$message({
          showClose: true,
          message: '该用户没绑定人员',
          type: 'error'
        });
      
        return
      }
    this.$confirm('是否删除该用户绑定的人员', '提示', {
          confirmButtonText: '删除',
          cancelButtonText: '不删',
          type: 'warning'
        }).then(() => {
          console.log("1");
          this.unband(row.openid,"1")
        }).catch(() => {
          console.log("0");
          this.unband(row.openid,"0") 
        });
    },
    unband(id,type){
       unband(id,type).then((res) => {
         console.log(res);
        this.$message({
          message: '解绑成功',
             showClose: true,
          type: 'success'
        });
        this.getList()
      });
    }
  },
};
</script>



<style  scoped>
.filter-container {
  margin-bottom: 20px;
}
</style>
