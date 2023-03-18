<template>
 <el-card shadow="hover" class="mgb20" style="height:270px;">
          <div class="user-info">
            <img :src="avatar" class="user-avator" alt />
            <div class="user-info-cont" style="padding-left: 30px">
              <div>{{name}}</div>
              <div v-for="role in roles" :key="role.id">
                {{ role.describe }}
                <br />
              </div>
            </div>
          </div>
          <div class="user-info-list">
            上次登录时间：
            <span>{{last_time}}</span>
          </div>
          <div class="user-info-list">
            上次登录地点：
            <span>{{address}}</span>
          </div>
        </el-card>
</template>

<script>
import { mapGetters } from "vuex";

export default {
 computed: {
    ...mapGetters(["name", "avatar", "roles", "last_time", "address"]),
  }
}
</script>

<style>

.user-info {
  display: flex;
  align-items: center;
  padding-bottom: 20px;
  border-bottom: 2px solid #ccc;
  margin-bottom: 20px;
}
.user-avator {
  width: 120px;
  height: 120px;
  border-radius: 30%;
  margin-left: 20px;
}
.user-info-cont div:first-child {
  font-size: 30px;
  color: #222;
  float: left;
}
.user-info-list {
  padding-left: 10px;
  font-size: 14px;
  color: #999;
  line-height: 25px;
}

.mgb20 {
  margin-bottom: 20px;
}
</style>