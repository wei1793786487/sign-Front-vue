<template>
  <div class="app-container">
    <el-card>
      <div class="filter-container">
        <el-input
          v-model="listQuery.meetingName"
          placeholder="请输入会议姓名"
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

        <el-table-column align="center" label="会议名字">
          <template slot-scope="{row}">{{row.meetingName}}</template>
        </el-table-column>

        <el-table-column align="center" label="会议地点">
          <template slot-scope="{row}">{{row.addressName}}</template>
        </el-table-column>

        <el-table-column align="center" label="会议地址">
          <template slot-scope="{row}">{{row.meetingAddress}}</template>
        </el-table-column>

        <el-table-column align="center" label="开始时间">
          <template slot-scope="{row}">{{row.startTime}}</template>
        </el-table-column>

        <el-table-column align="center" label="结束时间">
          <template slot-scope="{row}">{{row.endTime}}</template>
        </el-table-column>

        <el-table-column align="center" label="人员数量">
          <template slot-scope="{row}">{{row.persionNumber}}</template>
        </el-table-column>

        <el-table-column label="操作" align="center">
          <template slot-scope="{row}">
            <router-link :to="'/meeting/edit/'+row.id">
            <el-button type="primary" size="mini" >编辑</el-button>
            </router-link>
            <el-button size="mini" type="danger" @click="deleteOne(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <pagination
        v-show="total>0"
        :total="total"
        :current-page="5"
        :page.sync="listQuery.page"
        :limit.sync="listQuery.limit"
        @pagination="getList"
      />
    </el-card>

    <el-dialog title="人员修改" :visible.sync="dialogVisible" width="30%" :show-close="false"></el-dialog>
  </div>
</template>

<script>
import waves from "@/directive/waves";
import Pagination from "@/components/Pagination";
import { getMeetingList,deleteMeeting } from "@/api/meeting";
export default {
  components: { Pagination },
  directives: { waves },
  data() {
    return {
      list: null,
      total: 0,
      dialogVisible: false,
      choseIds:0,
      listQuery: {
        page: 1,
        limit: 5,
        meetingName: undefined
      },
      visibleCancel: "none",
      listLoading: false
    };
  },
  created() {
    this.getList();
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
  methods: {
    getList() {
      this.listLoading = true;
      getMeetingList(this.listQuery)
        .then(res => {
          this.list = res.data;
          this.total = res.count;
          this.listLoading = false;
        })
        .catch(res => {
          this.listLoading = false;
        });
    },
    deleteOne(data) {
       this.delete({ ids: [data.id] });
    },
    handleCreate() {
      this.$router.push("/meeting/add");
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
          deleteMeeting(
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
