<template>
  <div class="dashboard-container">
    <el-row :gutter="20">
      <!-- 第一行 -->
      <el-col :span="6">
        <user-info />

        <box-card />
      </el-col>

      <!-- 第二行 -->

      <el-col :span="18">
        <panel-group />
      </el-col>

      <el-col :span="6" style="margin-bottom:30px;">
        <todo-list />
      </el-col>

      <el-col :span="12">
        <el-card>
          记事本可记录有关公司活动或事务、业务合作、个人日常琐事哦.
          <!-- <div style="text-align: center;">
            尚未佩妥剑，
            <br />转眼便江湖。
            <br />愿历尽千帆，
            <br />归来仍少年。
            <br />
          </div>-->
        </el-card>
        <br />

        <el-card>
          本项目基于vue-element-admin 模板，模板github地址:
          <a>https://github.com/PanJiaChen/vue-element-admin/</a>
        </el-card>
        <br />

        <el-card>如果您在此项目中发现任何bug或者问题，请issues，或者联系作者1793786487@qq.com</el-card>

        <br />

        <el-card>本项目使用 GPL 开源协议，您可以任意使用、修改此项目，但是应保证自由软件对所有用户是自由的。</el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import CountTo from "vue-count-to";
import BoxCard from "./components/BoxCard";
import UserInfo from "./components/Userinfo";
import TodoList from "./components/TodoList";
import PanelGroup from "./components/PanelGroup";

export default {
  name: "Dashboard",
  components: {
    CountTo,
    TodoList,
    BoxCard,
    UserInfo,
    PanelGroup
  }
};
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}

.el-row {
  margin-bottom: 20px;
}
.grid-content {
  display: flex;
  align-items: center;
  height: 100px;
}
.grid-cont-right {
  flex: 1;
  text-align: center;
  font-size: 14px;
  color: #999;
}
.grid-num {
  font-size: 30px;
  font-weight: bold;
}
.grid-con-icon {
  font-size: 50px;
  width: 100px;
  height: 100px;
  text-align: center;
  line-height: 100px;
  color: #fff;
}
.grid-con-1 .grid-con-icon {
  background: rgb(45, 140, 240);
}
.grid-con-1 .grid-num {
  color: rgb(45, 140, 240);
}
.grid-con-2 .grid-con-icon {
  background: rgb(100, 213, 114);
}
.grid-con-2 .grid-num {
  color: rgb(45, 140, 240);
}
.grid-con-3 .grid-con-icon {
  background: rgb(242, 94, 67);
}
.grid-con-3 .grid-num {
  color: rgb(242, 94, 67);
}
</style>
