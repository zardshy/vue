<template>
  <div class="login">
    <div class="login-form">
      <div class="login-header">
        <img src="@/assets/images/123.jpg" width="90" height="90" alt />
        <p>地理信息大数据可视化系统demo</p>
      </div>
      <el-input
        placeholder="请输入用户名"
        suffix-icon="fa fa-user"
        v-model="userNmae"
        style="margin-bottom: 17px"
      ></el-input>

      <el-input
        placeholder="请输入密码"
        suffix-icon="fa fa-keyboard-o"
        v-model="password"
        type="password"
        style="margin-bottom: 18px"
        @keyup.native.enter="handleLogin"
      ></el-input>

      <el-button
        type="primary"
        :loading="loginLoading"
        style="width: 100%;margin-bottom: 18px"
        @click.native="handleLogin"
      >登录</el-button>
      <div>
        <el-checkbox v-model="Remenber">记住我</el-checkbox>
        <a href="#" style="float: right;color: #3C8DBC;font-size: 14px">还没有账号?点击注册</a>
      </div>
    </div>
  </div>
</template>

<script>
import { setToken } from "@/utils/dataStorage.js";
// import { login as loginApi } from "../../api/demo";

export default {
  data() {
    return {
      userNmae: "admin",
      password: "admin",
      Remenber: true,
      loginLoading: false
    };
  },
  methods: {
    handleLogin() {
      this.loginLoading = true;
      //loginApi({userNmae:this.userNmae,password:this.password}).then(r=>{}).catch(_=>{})
      setTimeout(() => {
        setToken("adminToken");
        this.$notify({
          title: "登录成功!",
          type: "success"
        });
        this.loginLoading = false;
        this.$router.push({ path: "/map" });
      }, 1000);
    }
  }
};
</script>

<style lang="scss">
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  height: 100%;
  width: 100%;
  background-color: #4498c4;
  .login-form {
    width: 355px;
    height: 380px;
    padding: 30px;
    background-color: white;
    text-align: left;
    border-radius: 4px;
    position: relative;
    margin-left: 0;
    margin-right: 0;
    zoom: 1;
    display: block;
    .login-header {
      text-align: center;
      font-size: 17px;
      font-weight: bold;
      margin-bottom: 20px;
    }
  }
}
</style>
