<template>
  <div>
    <el-card>
      <div class="filter-container">
        <!-- <el-input
              v-model="listQuery.title"
              placeholder="请输入菜单名称"
              style="width: 300px;"
              class="filter-item"
              @keyup.enter.native="handleFilter"
            />
              <el-button
              v-waves
              class="filter-item"
              type="primary"
              icon="el-icon-search"
              @click="handleFilter"
        >搜索</el-button>-->
          <el-button
          class="filter-item"
          style="margin-left: 10px;"
          type="primary"
          icon="el-icon-edit"
          @click="handleCreate"
        >添加新菜单</el-button>
      </div>

      <el-table
        v-loading="listLoading"
        :data="menuList"
        border
        fit
        :default-sort="{prop: 'id', order: 'descending'}"
        highlight-current-row
        style="width: 100%;"
      >
        <el-table-column label="ID" prop="id" sortable="true" align="center" width="80">
          <template slot-scope="{row}">
            <span>{{ row.id }}</span>
          </template>
        </el-table-column>

        <el-table-column label="所属组件" prop="component" width="150px" align="center"></el-table-column>

        <el-table-column label="组件名称" width="150px" align="center">
          <template slot-scope="{row}">
            <span>{{row.meta.title}}</span>
          </template>
        </el-table-column>

        <el-table-column label="所属图标" width="150px" align="center">
          <template slot-scope="{row}">
            <svg-icon :icon-class="row.meta.icon"></svg-icon>
          </template>
        </el-table-column>

        <el-table-column label="所属角色" align="center">
          <template slot-scope="{row}">
            <el-tag v-for="  role in row.meta.roleList" :key="role.id">{{role.roleName}}</el-tag>
          </template>
        </el-table-column>

        <el-table-column label="是否隐藏" width="150px" align="center">
          <template slot-scope="{row}">
            <el-tag type="success" v-if="row.hidden===0">未隐藏</el-tag>
            <el-tag type="danger" v-else>隐藏</el-tag>
          </template>
        </el-table-column>

        <el-table-column label="父组件名称" width="100px" align="center">
          <template slot-scope="{row}">
            <span v-if="row.parent===0">顶级组件</span>
            <span v-else>{{getFathername(row.parent)}}{{father}}</span>
          </template>
        </el-table-column>

        <el-table-column label="操作" align="center">
          <template slot-scope="{row}">
            <el-button type="primary" size="mini" @click="lazy(row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="lazy(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getMenusList" /> -->
    </el-card>

    <el-dialog title="添加菜单" :visible.sync="AddFormVisible">
   <el-form ref="AddMenuForm" :model="MenuForm" label-width="80px">

    </el-form>
    </el-dialog>

  </div>
</template>

<script>
import { getMenus } from "@/api/user";
import waves from "@/directive/waves"; // waves directive
// import Pagination from '@/components/Pagination' // secondary package based on el-pagination
export default {
  name: "menuList",
  // components:{Pagination},
  directives: { waves },
  data() {
    return {
      menuList: [],
      AddFormVisible :false,
      listLoading: false,
      total: 0,
      father:'',
      addForm:{
    
      },
      MenuForm:'',
      listQuery: {
        page: 1,
        limit: 20,
        title: undefined
      }
    };
  },
  created() {
    this.getMenusList();
  },
  methods: {
    async getMenusList() {
      const { data } = await getMenus(0);
      console.log(data);
      this.menuList = data;
    },
    lazy() {
      this.$alert("这个功能我没有做！！！！！", "懒懒懒懒懒", {
        confirmButtonText: "确定",
      });
    },
    getFathername(id){
    this.menuList.forEach(element => {
    if(element.id===id){
      this.father= element.meta.title
    }
   });
    },
    handleFilter() {},
    handleCreate() {
      this.AddFormVisible=true;
    },
    handleUpdate(row) {
      console.log(row);
    },
    handleDelete() {}
  }
};
</script>

<style  scoped>
.el-tag {
  margin: 7px;
}
.bdtop {
  border-top: 1px solid #eeeeee;
}
.bdbottom {
  border-bottom: 1px solid #eeeeee;
}
.el-button {
  margin-bottom: 10px;
}
</style>