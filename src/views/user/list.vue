<template>
  <div class="app-container">
    <el-card>
      <div class="filter-container">
        <el-input
          v-model="listQuery.search"
          placeholder="请输入要搜索的信息"
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

        <el-table-column align="center" label="账号名称" prop="username" />

        <el-table-column align="center" label="账号性别">
          <template slot-scope="{row}">
            <el-tag v-if="row.sex==='男'" type="primary">男</el-tag>
            <el-tag v-else-if="row.sex==='女'" type="danger">女</el-tag>
            <el-tag v-else type="info">变态</el-tag>
          </template>
        </el-table-column>

        <el-table-column align="center" label="联系电话">
          <template slot-scope="{row}">
            <div v-if="row.phone!==null">{{row.phone}}</div>
            <div v-else>未绑定</div>
          </template>
        </el-table-column>

        <el-table-column align="center" label="上次登录地点">
          <template slot-scope="{row}">
            <div v-if="row.address!==null">{{row.address}}</div>
            <div v-else>未登录</div>
          </template>
        </el-table-column>

        <el-table-column align="center" label="上次登录时间">
          <template slot-scope="{row}">
            <div v-if="row.lasttime!==null">{{row.lasttime}}</div>
            <div v-else>未登录</div>
          </template>
        </el-table-column>

        <el-table-column align="center" label="角色">
          <template slot-scope="{row}">
            <el-tag type="danger" v-if="row.roles.length===0">未绑定</el-tag>
            <el-tag v-else v-for="  role in row.roles" :key="role.id">{{role.roleName}}</el-tag>
          </template>
        </el-table-column>

        <el-table-column align="center" label="是否可用">
          <template slot-scope="{row}">
            <el-switch
              v-model="row.isenabled"
              :active-value="0"
              @change="isenabledChance(row)"
              :inactive-value="1"
              active-color="#13ce66"
              inactive-color="#ff4949"
            ></el-switch>
          </template>
        </el-table-column>

        <el-table-column label="操作" align="center" width="200">
          <template slot-scope="{row}">
            <router-link :to="'/user/edit/'+row.id">
              <el-button type="primary" size="mini">编辑</el-button>
            </router-link>
            <el-button size="mini" waves type="info" @click="addRoleHandle(row)">绑定角色</el-button>
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

      <el-dialog title="请选择你要分配的角色" center :visible.sync="AddRoleVisible" width="30%">
        <el-checkbox-group v-model="choseRoleList">
          <el-tooltip
            v-for="role in RoleList"
            :key="role.id"
            class="item"
            effect="dark"
            :content="role.describe"
            placement="top-start"
          >
            <el-checkbox :label="role.id">{{role.roleName}}</el-checkbox>
          </el-tooltip>
        </el-checkbox-group>
        <el-button class="create" type="primary" @click="deSRole">分配</el-button>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import waves from "@/directive/waves";
import Pagination from "@/components/Pagination";
import { getUserList, updatedState, getRoles } from "@/api/user";
import{addUserDes} from "@/api/role"
export default {
  components: { Pagination },
  directives: { waves },
  data() {
    return {
      list: null,
      choseRoleList: [],
      total: 0,
      choseUid:'',
      visibleCancel: "",
      RoleList: [],
      AddRoleVisible: false,
      listQuery: {
        page: 1,
        limit: 15,
        search: undefined
      }
    };
  },
  created() {
    this.getList();
  },
  watch: {},
  methods: {
    getList() {
      this.listLoading = true;
      getUserList(this.listQuery)
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
    async addRoleHandle(row) {
      this.choseUid=row.id
      let roleIds = [];
      row.roles.forEach(element => [roleIds.push(element.id)]);
      this.choseRoleList=roleIds
      const { data } = await getRoles();
      this.RoleList = data;
      this.AddRoleVisible = true;
    },
  async deSRole() {
       let res= await addUserDes(this.$qs.stringify({'uid':this.choseUid,'rid':this.choseRoleList.toString()}));
       this.AddRoleVisible=false;
       this.getList()
    },
    isenabledChance(row) {
      let isSuper = false;
      row.roles.forEach(element => {
        if (element.roleName === "ADMIN") {
          this.$message({
          showClose: true,
          message: '账号管理员不可修改状态',
          type: 'error'
        });
          isSuper = true;
        }
      });
      if (isSuper) {
        row.isenabled = 0;
        return;
      } else {
        updatedState(row.id, row.isenabled);
      }
    },
    handleCreate() {
      this.$router.push("/user/add");
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
.create {
  position: relative;
  top: 20%;
  margin-top: 20%;
  left: 38%;
}
</style>
