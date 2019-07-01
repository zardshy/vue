<template>
  <el-header style="text-align: right; font-size: 12px">
    <span class="header-btn">
      <el-badge :value="3" class="badge">
        <i class="el-icon-bell"></i>
      </el-badge>
    </span>
    <el-dropdown>
      <span class="header-btn">
        Admin
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item @click.native="$router.push('/personal')">
          <i style="padding-right: 8px" class="fa fa-cog"></i>个人中心
        </el-dropdown-item>
        <el-dropdown-item @click.native="logout">
          <i style="padding-right: 8px" class="fa fa-key"></i>退出系统
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
  background-color: #3c8dbc;
  line-height: 60px;
}
.el-icon-bell {
  font-size: 17px;
}
.header-btn {
  .el-badge__content {
    top: 17px;
    right: 7px;
    text-align: center;
    font-size: 12px;
    padding: 0 3px;
    background-color: #00a65a;
    color: #fff;
    border: none;
    white-space: nowrap;
    vertical-align: baseline;
    border-radius: 0.25em;
  }
  overflow: hidden;
  height: 60px;
  display: inline-block;
  text-align: center;
  line-height: 60px;
  cursor: pointer;
  padding: 0 14px;
  color: #fff;
}
.header-btn:hover {
  background-color: #3184b4;
  color: #fff;
}
</style>

