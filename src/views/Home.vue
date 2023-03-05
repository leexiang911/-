<template>
  <div class="home-container">
    <h1>请使用邮箱和密码注册或登录</h1>
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
export default {
  name: "Loginpage",
  data() {
    return {
      email: "",
      password: "",
    }
  },
  methods: {
    loginHandle() {
      const app = this.$cloudbase;
      app
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then((loginState) => {
          // 登录成功
          
          console.log("登录成功", loginState)
          this.$router.push({name:"Survey"})
        }).catch((err) => {
          console.log("登录失败", err)
        })
    },
    signupHandle() {
      console.log("注册")
      const app = this.$cloudbase;
      app.auth()
        .signUpWithEmailAndPassword(this.email, this.password)
        .then((r) => {
          console.log(r)
          // 发送验证邮件成功
        }).catch(err => {
          console.log(err);
        });
    }
  }
}
</script>

<style></style>