<template>
  <div class="home-container">
    <h6 class="mt-5 mb-3">请使用邮箱和密码注册或登录问卷调查系统</h6>
    <div class="container">
      <!-- :state="true" 表示验证成功的状态-->
      <b-form-input class="mb-4" role="input" label="Email address:" v-model="email" placeholder="Enter your email"
        type="email"></b-form-input>
      <!-- <div class="mt-2">Value: {{ email }}</div> -->
      <b-form-input role="input" v-model="password" placeholder="Enter your password" type="password"></b-form-input>

      <div class="mt-3">
        <b-button-group>
          <b-button @click="loginHandle" class="mr-1" variant="info">登录</b-button>
          <b-button @click="signupHandle" class="ml-1" variant="primary">注册</b-button>
        </b-button-group>
      </div>
    </div>
  </div>
</template>

<script>
import Cookies from 'js-cookie';// 引入cookies方便后续进行存储用户信息

export default {
  name: "Loginpage",
  data() {
    return {
      email: "",
      password: "",
    }
  },
  methods: {
    makeToast(variant = null, content, title = "提示") {
      this.$bvToast.toast(content, {
        title: title,
        variant: variant,
        solid: true
      })
    },
    // 登录函数
    loginHandle() {
      const app = this.$cloudbase;// 云开发的实例
      app
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then((loginState) => {
          // 登录成功，展示提示框，跳转到表单页面
          this.makeToast("success", "登录成功");
          setTimeout(() => this.$router.push({ name: "Survey" }), 1500);
        }).catch((err) => {
          const errinfo = `${err}`
          const index = errinfo.indexOf("{")
          const errinObj = JSON.parse(errinfo.substring(index));
          const errMsg = errinObj.msg;
          // this.makeToast("danger", "登录失败请检查邮箱和密码是否正确");          
          if (errMsg === "[INVALID_PARAM] [100003] account email invalid") {
            this.makeToast("danger", "无效的电子邮箱，请检查后填入","邮箱错误");
            return;
          }
          if (errMsg === "[AUTH_LOGIN_FAILED] [102001] account auth fail") {
            this.makeToast("danger", "身份校验失败,请重试",'登录失败');
            return;
          }
          if (errMsg === "[INVALID_PARAM] [102003] mail user not exist") {
            this.makeToast("info", "此电子邮箱还未注册，请先注册","还未注册");
            return;
          }
          
          this.makeToast("info", "系统错误");

        })
    },
    // 注册函数
    signupHandle() {
      console.log("注册")
      const app = this.$cloudbase;
      app.auth()
        .signUpWithEmailAndPassword(this.email, this.password)
        .then((r) => {
          this.makeToast("success", "请登录邮箱点击验证链接来完成注册");
        }).catch(err => {
          const errinfo = `${err}`
          const index = errinfo.indexOf("{")
          const errinObj = JSON.parse(errinfo.substring(index));
          if (errinObj.msg === `[AUTH_EMAIL_HAS_BEEN_BOUND] [102002] mail user exist`) {
            this.makeToast("danger", "此邮箱已被注册", "注册失败");
            return;
          }
          if (errinObj.msg === `[INVALID_PARAM] [100003] mail addr is invalid`) {
            this.makeToast("danger", "这是一个错误的邮箱地址", "注册失败");
            return;
          }
          if (errinObj.msg === `[INVALID_PARAM] [100003] pwd is weak`) {
            this.makeToast("warning", "密码太简单了，请换个难一点的密码", "请再次重试");
            return;
          }
          this.makeToast("danger", "请检查输入的邮箱是否正确,密码是否太简单")
        });
    }
  },
  created() {
    // 在cookies中插入值
    // Cookies.set("user", 0); 这里是测试
  }
}
</script>

<style></style>