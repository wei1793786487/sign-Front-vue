<template>
  <div class="dashboard-container">
    <!-- <div class="dashboard-text">name: {{ name }}</div>
    <div class="dashboard-text">roles: <span v-for="role in roles" :key="role.id">{{ role.roleName }}</span></div>-->
    <el-row :gutter="20">
      <!-- 第一行 -->
      <el-col :span="6">

         <!-- 用户列表  -->
         <user-info/>
         <!-- 信息 -->
         <box-card />
 
      </el-col>
    <!-- 第二行 -->
      <el-col :span="16">
        <el-col :span="12">
          <el-card shadow="hover" :body-style="{padding: '0px'}">
            <div class="grid-content grid-con-1">
              <!-- <svg-icon icon-class="user" class="el-icon-lx-people grid-con-icon"/> -->
              <div class="grid-cont-right">
                <div class="grid-num">1234</div>
                <div>人员总数量</div>
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card shadow="hover" :body-style="{padding: '0px'}">
            <div class="grid-content grid-con-3">
              <!-- <svg-icon icon-class="meeting"  class="el-icon-lx-notice grid-con-icon"/> -->
              <div class="grid-cont-right">
                <div class="grid-num">321</div>
                <div>会议总数量</div>
              </div>
            </div>
          </el-card>
        </el-col>
        
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import CountTo from 'vue-count-to'
import BoxCard from './components/BoxCard'
import Userinfo from './components/Userinfo'

export default {
  name: "Dashboard",
  components: {
     CountTo,
     'box-card':BoxCard,
     'user-info': Userinfo
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
