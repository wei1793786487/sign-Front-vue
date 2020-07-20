<template>
  <div class="app-container">
    <el-card>
      <el-row>
        <el-col :span="8">
          <el-autocomplete
            style="width:400px "
            popper-class="my-autocomplete"
            v-model="searchMeetingList"
            :fetch-suggestions="querySearchAsync"
            placeholder="请选择会议"
            @select="handleSelect"
            @clear="clearHandle"
            clearable
          >
            <template slot="prepend">地点：</template>
            <template slot-scope="{ item }">
              <div class="name">名称：{{ item.meetingName }}</div>
              <span class="addr">地点：{{ item.meetingAddress + item.addressName}}</span>
            </template>
          </el-autocomplete>
        </el-col>
        <el-col :span="14 " :push="4">
          <el-input
            v-model="listQuery.personName"
            placeholder="请输入人员姓名"
            style="width: 300px;"
            @keyup.enter.native="getList"
          >
            <template slot="prepend">姓名：</template>
          </el-input>
          <el-select v-model="listQuery.isCheck" style="width: 190px;" placeholder="请选择签到状态">
            <el-option label="未签到" value="0"></el-option>
            <el-option label="已签到" value="1"></el-option>
            <el-option label="全部" value="3"></el-option>
          </el-select>

          <el-button v-waves type="success" icon="el-icon-search" @click="getList">搜索</el-button>
        </el-col>
      </el-row>

      <br />
      <br />

      <div class="filter-container">
        <el-button
          style="margin-left: 10px;"
          type="primary"
          icon="el-icon-edit"
          @click="handleCreate"
        >添加</el-button>

        <el-button
          v-show="show"
          type="warning"
          icon="el-icon-picture-outline-round"
          @click="handlePic"
        >查看签到图表</el-button>

        <el-button
          style="margin-left: 10px;"
          type="success"
          v-show="isChose"
          icon="el-icon-bell"
          @click="handleChanceState"
        >修改选中人员签到状态</el-button>
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

        <el-table-column align="center" label="人员姓名" prop="personName" />

        <el-table-column align="center" label="联系方式">
          <template slot-scope="{row}">
            <el-tag v-if="row.phone===''" type="warning">未绑定</el-tag>
            <template v-else>{{row.phone}}</template>
          </template>
        </el-table-column>

        <el-table-column align="center" label="签到情况">
          <template slot-scope="{row}">
            <el-tag v-if="row.isCheck===0" type="danger">未签到</el-tag>
            <el-tag v-else-if="row.isCheck===1" type="success">已签到</el-tag>
            <el-tag v-else>异常</el-tag>
          </template>
        </el-table-column>

        <el-table-column label="操作" align="center">
          <template slot-scope="{row}">
            <el-button type="primary"  size="mini" @click="sendMessage(row)">短信通知</el-button>
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

      <el-dialog :visible.sync="dialogVisible">
        <check :check="check" :unCheck="uncheck" />
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import check from "@/components/echarts/checkSituation";
import waves from "@/directive/waves";
import {
  getCheckNumber,
  getCheckPersons,
  chanceCheckStatue
} from "@/api/check";
import { sendOneMassage } from "@/api/message";
import Pagination from "@/components/Pagination";
import { getMeetingList } from "@/api/meeting";
export default {
  components: { Pagination, check },
  directives: { waves },
  data() {
    return {
      check: 0,
      uncheck: 0,
      list: null,
      isChose: false,
      show: false,
      deleteshow: false,
      dialogVisible: false,
      choseIds: [],
      listLoading: false,
      choseMeetingId: null,
      searchMeetingList: null,
      total: 0,
      visibleCancel: "",
      listQuery: {
        page: 1,
        limit: 15,
        meetingName: undefined,
        isCheck: undefined
      }
    };
  },
  created() {},
  watch: {
    searchMeetingList: function(data) {
      if (data.length > 1) {
        this.show = true;
      } else {
        this.show = false;
      }
    },
    "listQuery.isCheck": {
      handler(newName, oldName) {
        if (newName === "3") {
          this.listQuery.isCheck = undefined;
        }
        this.getList();
      },
      deep: true
    },
    choseIds: function(data) {
      if (data.length > 0) {
        this.isChose = true;
      } else {
        this.isChose = false;
      }
    }
  },
  methods: {
    getList() {
      if (this.choseMeetingId === null) {
        this.$message.error("请先选择一个会议");
        return;
      }
      this.listLoading = true;
      getCheckPersons(this.choseMeetingId, this.listQuery)
        .then(res => {
          this.total = res.count;
          this.list = res.data;
          this.listLoading = false;
        })
        .catch(res => {
          this.listLoading = false;
        });
    },
    sendMessage(row) {
          const loading = this.$loading({
          lock: true,
          text: '发送短信中',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
      sendOneMassage({ mid: this.choseMeetingId, pid: row.id }).then(res=>{
         loading.close();
           this.$message({
          message: '发送成功',
          type: 'success'
        });
      }).catch(res=>{
         loading.close();
      });
    },
    handleChanceState() {
      this.$confirm("请选择要修改的状态", "签到状态", {
        confirmButtonText: "已签到",
        cancelButtonText: "未签到"
      })
        .then(() => {
          this.chanceStateAction(1);
        })
        .catch(() => {
          this.chanceStateAction(0);
        });
    },
    handlePic() {
      this.getcheckNumber();
      this.dialogVisible = true;
    },
    chanceStateAction(state) {
      chanceCheckStatue(
        this.choseMeetingId,
        state,
        this.choseIds.join(",")
      ).then(res => {
        console.log(res);
        this.getList();
      });
    },
    handleSelect(data) {
      this.choseMeetingId = data.id;
      this.getList();
    },
    clearHandle() {
      this.choseMeetingId = null;
    },
    getcheckNumber() {
      getCheckNumber({ mid: this.choseMeetingId }).then(res => {
        this.check = res.data.checkNumber;
        this.uncheck = res.data.uncheckNumber;
      });
    },
    querySearchAsync(qs, cb) {
      getMeetingList({ meetingName: qs || "" })
        .then(res => {
          this.meetingList = res.data;
          cb(this.meetingList);
        })
        .catch(res => {
          cb("");
        });
    },
    handleCreate() {
      this.$router.push("/meeting/mselect");
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



<style  scoped lang="scss">
.filter-container {
  margin-bottom: 20px;
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
