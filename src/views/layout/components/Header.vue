<template>
  <el-header style="text-align: right; font-size: 12px">
    <span class="header-btn">
      <!-- <el-badge :value="3" class="badge"> -->
        <i class="el-icon-bell"></i>
      <!-- </el-badge> -->
    </span>
    <el-dropdown>
      <span class="header-btn">
        Admin
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu class="dropdownclass" slot="dropdown">
        <el-dropdown-item>
        <i class="el-icon-document" style="color:#3c8dbc"></i>个人中心
        </el-dropdown-item>
        <el-dropdown-item @click.native="logout">
        <i class="el-icon-circle-close"  style="color:#3c8dbc"></i>退出系统
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </el-header>
</template>


<script>
export default {
  data() {
    return {};
  },
  methods: {
    logout() {
      sessionStorage.removeItem(this.$Config.tokenKey);
      this.$router.push({ path: "/login" });
    }
  }
};
</script>


<style lang='scss' scoped>

.el-header {
  background-color: #134057;
  // background: url('../../../assets/images/bg.jpg');
  line-height: 60px;
}
.el-icon-bell{
  font-size: 15px;
}
.header-btn {
  overflow: hidden;
  height: 60px;
  display: inline-block;
  text-align: center;
  line-height: 60px;
  cursor: pointer;
  padding: 0 15px;
  color: #fff;
  margin: 0px;
}
.header-btn:hover {
  background-color: #275e7e;
  color: #fff;
}
</style>

