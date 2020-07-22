<template>
  <div class="homepage-hero-module">
    <div class="video-container">
      <div :style="fixStyle" class="filter">
        <div class="title_style">
          <strong>签到管理系统登录界面</strong>
        </div>

        <!-- 登录开始 -->
        <div class="login_box">
          <!-- 登录表单区 -->
          <el-form
            label-width="0px "
            ref="loginFormRef"
            :rules="loginFormRole"
            :model="loginForm"
            class="login_form"
            v-loading.fullscreen.lock="fullscreenLoading"
          >
            <el-form-item prop="username">
              <el-input
                v-model="loginForm.username"
                prefix-icon="el-icon-user-solid"
              ></el-input>
            </el-form-item>
            <!-- 密码 -->
            <el-form-item prop="password">
              <el-input
                type="password"
                v-model="loginForm.password"
                prefix-icon="el-icon-edit"
                @keyup.enter.native="login"
              ></el-input>
            </el-form-item>
            <!-- <el-form-item>
                <el-checkbox  v-model="checked">七天免登陆</el-checkbox>
            </el-form-item>-->
            <!-- 确认按钮 -->
            <el-form-item>
              <el-button class="btns" type="primary" size="medium" @click="login">登录</el-button>
            </el-form-item>
          </el-form>
          <div class="status">
            服务器状态 :
            <span :style="{color:color}">{{status?"正常":"异常"}}</span>
          </div>
        </div>

        <!-- 登录结束 -->
        <!-- <div class="saying">
         &ensp;&ensp; 衡量一个人的真正品格，是看他在知道没人看见的时候干些什么。
        </div>-->
      </div>
      <video  :style="fixStyle" autoplay loop muted class="fillWidth" v-on:canplay="canplay">
        <source src="@/assets/video/3.mp4" type="video/mp4" />浏览器不支持 video 标签，建议升级浏览器。
      </video>

      <div class="poster hidden" v-if="!vedioCanPlay">
        <img :style="fixStyle" src="@/assets/back.jpg" alt />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Video",
  data() {
    return {
      vedioCanPlay: false,
      fixStyle: "",
      //加载条
      fullscreenLoading:false,
      //   服务的状态
      status: true,
      color: "green",
      //跳转的目的地
      redirect: undefined,
      //登录表单的数据
      loginForm: {
        username: "admin",
        password: "lx1793786487",
      },
      loginFormRole: {
        //验证账号
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 10, message: "请输入3到10位账号", trigger: "blur" }
        ],
        //验证密码
        password: [
          { required: true, message: "请输入登录密码", trigger: "blur" },
          { min: 6, max: 15, message: "请输入6到15位密码", trigger: "blur" }
        ]
      }
    };
  },
 
 //监听路由的变化
 watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },

  methods: {
    canplay() {
      this.vedioCanPlay = true;
    },
    //点击重置表单
    resetLoginForm() {
      this.$refs.loginFormRef.resetFields();
    },
    login() {
      //表单的预验证
      this.$refs.loginFormRef.validate(valid => {
        if(valid){
          this.fullscreenLoading = true
          this.$store.dispatch('user/login', this.loginForm).then(() => {
            this.$router.push({ path: this.redirect || '/' })
            this.fullscreenLoading = false
          }).catch(() => {
            this.fullscreenLoading = false
          })
        }else{
          return false
        }
      });
    }
  },
  mounted: function() {
    //屏幕自适应
    window.onresize = () => {
      const windowWidth = document.body.clientWidth;
      const windowHeight = document.body.clientHeight;
      const windowAspectRatio = windowHeight / windowWidth;
      let videoWidth;
      let videoHeight;
      if (windowAspectRatio < 0.5625) {
        videoWidth = windowWidth;
        videoHeight = videoWidth * 0.5625;
        this.fixStyle = {
          height: windowWidth * 0.5625 + "px",
          width: windowWidth + "px",
          "margin-bottom": (windowHeight - videoHeight) / 2 + "px",
          "margin-left": "initial"
        };
      } else {
        videoHeight = windowHeight;
        videoWidth = videoHeight / 0.5625;
        this.fixStyle = {
          height: windowHeight + "px",
          width: windowHeight / 0.5625 + "px",
          "margin-left": (windowWidth - videoWidth) / 2 + "px",
          "margin-bottom": "initial"
        };
      }
    };
    window.onresize();
  },
  watch: {
      //观察属性，更换服务器状态的颜色
    status(chance) {
        if(chance){
         this.color='green';
        }else{
         this.color='red';
        }
    }
  }
};
</script>


<style scoped>
.saying {
  font-size: 30px;
  color: aliceblue;
  position: absolute;
  top: 70%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.status {
  font-size: 25px;
  color: aliceblue;
}
.title_style {
  font-size: 50px;
  color: aliceblue;
  font-family: "Courier New", Courier, monospace;
  position: absolute;
  top: 20%;
  left: 50%;
  transform: translate(-50%, -50%);
}


.login_box {
  width: 400px;
  height: 300px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.btns {
  width: 100%;
}
.homepage-hero-module,
.video-container {
  position: relative;
  height: 100vh;
  overflow: hidden;
}

.video-container .poster img {
  z-index: 0;
  position: absolute;
}

.video-container .filter {
  z-index: 1;
  position: absolute;
  background: rgba(0, 0, 0, 0.4);
  width: 100%;
}

.fillWidth {
  width: 100%;
}
</style>