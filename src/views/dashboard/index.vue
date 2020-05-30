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
          1、天爷爷地奶奶我不知道这里写啥了。<br>
         
        </el-card>
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
