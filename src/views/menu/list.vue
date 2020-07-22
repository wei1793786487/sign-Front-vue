<template>
  <div>
    <el-card>
      <div class="filter-container">
        <el-button
          class="filter-item"
          style="margin-left: 10px;"
          type="primary"
          icon="el-icon-edit"
          @click="handleCreate"
        >添加新菜单</el-button>
        <el-button
          class="filter-item"
          style="margin-left: 10px;"
          type="primary"
          icon="el-icon-edit"
          @click="handleCreateMeta"
        >添加META</el-button>
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
            <el-tag type="danger" v-if="row.meta.roleList.length===0">未绑定</el-tag>
            <el-tag v-else v-for="  role in row.meta.roleList" :key="role.id">{{role.roleName}}</el-tag>
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
            <span v-else>{{row.parentName}}</span>
          </template>
        </el-table-column>

        <el-table-column label="操作" align="center">
          <template slot-scope="{row}">
            <el-button type="primary" size="mini">编辑</el-button>
            <el-button size="mini" type="danger" @click="lazy(row)">删除</el-button>
            <el-button size="mini" type="info" @click="addRoleHandle(row)">绑定角色</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getMenusList" /> -->
      
    </el-card>

    <el-dialog title="添加META" :rules="MetaRules" :visible.sync="AddMataVisible" destroy-on-close>
      <el-form ref="AddMetaForm" :model="MetaForm" label-width="80px">
        <el-form-item label="图标" prop="metaName">
          <el-input v-model="MetaForm.title" placeholder="请选择图标"></el-input>
        </el-form-item>

        <el-form-item label="icon名称" prop="iconName">
          <el-input v-model="MetaForm.icon" placeholder="请前往icon复制选择"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmitMeta">立即创建</el-button>
        </el-form-item>
        
      </el-form>
    </el-dialog>

    <el-dialog title="添加菜单" :rules="menuRules" :visible.sync="AddFormVisible" destroy-on-close>
      <el-form ref="AddMenuForm" :model="MenuForm" label-width="80px">
        <!-- {{MenuForm}} -->
        <el-form-item label="菜单路径" prop="path">
          <el-input v-model="MenuForm.path" placeholder="请输入菜单的路径"></el-input>
        </el-form-item>

        <el-form-item label="顶级组件" prop="isTop">
          <el-radio v-model="MenuForm.isTop" label="true">是</el-radio>
          <el-radio v-model="MenuForm.isTop" label="false">否</el-radio>
        </el-form-item>

        <el-form-item label="组件名称" prop="CompName">
          <el-input
            v-model="MenuForm.component"
            :disabled="istopCom"
            placeholder="请输入组件名称（此组件需要在前端注册）"
          ></el-input>
        </el-form-item>

        <el-form-item label="父菜单">
          <el-autocomplete
            readonly
            :disabled="istopCom"
            :fetch-suggestions="queryMenuSearchAsync"
            placeholder="请选择所属父菜单"
            @select="handleSelectMenu"
            v-model="choseMenu"
          ></el-autocomplete>
        </el-form-item>

        <el-form-item label="菜单名称" prop="menuName">
          <el-input v-model="MenuForm.name" placeholder="请输入菜单的名称"></el-input>
        </el-form-item>

        <el-form-item label="meta" prop="meta">
          <el-autocomplete
            readonly
            :fetch-suggestions="querySearchAsync"
            placeholder="请选择meta"
            @select="handleSelect"
            v-model="choseMeta"
          ></el-autocomplete>
        </el-form-item>

        <el-form-item label="是否隐藏" prop="ishidden">
          <el-radio-group v-model="MenuForm.hidden">
            <el-radio label="1">是</el-radio>
            <el-radio label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item>
          <el-button  type="primary" @click="onSubmitMenu">立即创建</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>



    <el-dialog title="请选择你要分配的角色" center :visible.sync="AddRoleVisible"  width="30%">
      <el-checkbox-group v-model="choseRoleList">
         <el-tooltip v-for="role in RoleList" :key="role.id" class="item" effect="dark" :content="role.describe" placement="top-start">
          <el-checkbox  :label="role.id" >{{role.roleName}}</el-checkbox>
        </el-tooltip>
      </el-checkbox-group>
          <el-button class="create" type="primary" @click="deSRole">分配</el-button>
    </el-dialog>




  </div>
</template>

<script>
import { getMenus, getMeta, addMeta, addMenus, getRoles } from "@/api/user";
import {findDes,addDes } from "@/api/role";

import waves from "@/directive/waves"; // waves directive
// import Pagination from '@/components/Pagination' // secondary package based on el-pagination
export default {
  name: "menuList",
  // components:{Pagination},
  directives: { waves },
  data() {
    return {
      menuList: [],
      choseRoleList: [],
      AddFormVisible: false,
      AddMataVisible: false,
      listLoading: false,
      total: 0,
      choseMenuId: "",
      istopCom: false,
      AddRoleVisible: false,
      metaList: [],
      RoleList: [],
      choseMeta: "",
      //选择到的菜单
      meta:'',
      choseMenu: "",
      MenuForm: {
        path: "",
        component: "",
        name: "",
        isTop: "false",
        metaId: "",
        hidden: "0",
        parent: ""
      },
      searchmenuList: "",
      MetaForm: {
        title: "",
        icon: ""
      },
      listQuery: {
        page: 1,
        limit: 20,
        title: undefined
      },
      //菜单规则
      menuRules: {
        path: [{ required: true, message: "请输入菜单路径", trigger: "blur" }],
        isTop: [
          { required: true, message: "请选择是否为顶级", trigger: "blur" }
        ],
        menuName: [
          { required: true, message: "请输入菜单的名称", trigger: "blur" }
        ],
        meta: [{ required: true, message: "请选择meta", trigger: "blur" }],
        ishidden: [
          { required: true, message: "请选择是否隐藏", trigger: "blur" }
        ]
      },

      MetaRules: {
        metaName: [
          { required: true, message: "请输入meta的名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        iconName: [
          { required: true, message: "请输入icon名称", trigger: "blur" }
        ]
      }
    };
  },
  watch: {
    "MenuForm.isTop": {
      handler(newName, oldName) {
        if (newName === "true") {
          this.istopCom = true;
          this.MenuForm.component = "Layout";
        } else {
          this.istopCom = false;
          this.MenuForm.component = "";
        }
      },
      deep: true
    }
  },
  created() {
    this.getMenusList();
    this.getMetaList();
  },
  methods: {
    async getMenusList() {
      this.listLoading=true;
      const { data } = await getMenus(0);
      this.listLoading=false;

      this.menuList = data;
      this.searchmenuList = data;
    },

    addRoleHandle(row) {  
     this.choseRoleList=[];
     this.AddRoleVisible=true;
     this.meta=row.meta.id;
     this.getRoleList();
     findDes(row.meta.id).then(res=>{
          res.data.forEach(element => {
            this.choseRoleList.push(element.id)
         }); 
     })

    },
   async deSRole(){
     if(this.choseRoleList.length==0){
          this.$message({
          message: '请先选择你要分配的角色',
          type: 'error'
        });
        return;
     }
       let res= await addDes(this.$qs.stringify({'mid':this.meta,'rid':this.choseRoleList.toString()}));
       this.getMenusList();
       this.AddRoleVisible=false;
    },
    queryMenuSearchAsync(search, cb) {
      this.getMenusList();                               
      this.searchmenuList = this.searchmenuList.map(item => {
        return {
          id: item.id,
          value: item.value || item.meta.title
        };
      });
      cb(this.searchmenuList);
    },

    querySearchAsync(search, cb) {
      this.getMetaList();
      this.metaList = this.metaList.map(item => {
        return {
          id: item.id,
          value: item.title || item.value,
          icon: item.icon
        };
      });
      cb(this.metaList);
    },
    lazy() {
      this.$alert("这个功能我没有做！！！！！", "懒懒懒懒懒", {
        confirmButtonText: "确定"
      });
    },
    handleSelect(item) {
      this.state = item.value;
      this.choseMenuId = item.id;
      this.MenuForm.metaId = item.id;
    },

    handleSelectMenu(item) {
      this.MenuForm.parent = item.id;
    },

    createStateFilter(queryString) {
      return state => {
        return (
          state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        );
      };
    },

    handleFilter() {},
    handleCreate() {
      this.AddFormVisible = true;
    },
    handleCreateMeta() {
      this.AddMataVisible = true;
    },
    handleUpdate(row) {
      console.log(row);
    },

    async getMetaList() {
      const { data } = await getMeta();
      this.metaList = data;
    },

    async getRoleList() {
      const { data } = await getRoles();
      this.RoleList = data;
    },

    handleDelete() {},
    onSubmitMeta() {
      this.$refs["AddMetaForm"].validate(valid => {
        if (valid) {
          addMeta(this.$qs.stringify(this.MetaForm)).then(res => {
            this.$message("添加成功");
            this.AddMataVisible = false;
          });
          console.log(this.MetaForm);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    onSubmitMenu() {
      this.$refs["AddMenuForm"].validate(valid => {
        if (valid) {
          this.menuList.path = "/" + this.menuList.path;
          addMenus(this.$qs.stringify(this.MenuForm)).then(res => {
            this.$message("添加成功");
            this.$refs.AddMenuForm = "";
            this.AddFormVisible = false;
            this.getMenusList();
          });

        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
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
.create{
   position: relative;
   top: 20%;
   margin-top: 20%;
   left: 38%;
}
</style>