<template>
  <el-aside width="201px">
    <el-menu
      router
      unique-opened
      :default-active="this.$route.path"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#252424"
      text-color="#fff"
      active-text-color="#3c8dbc"
    >
      <template v-for="(item,i) in routeList">
        <el-submenu :key="i" :index="item.path">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>{{item.meta.title}}</span>
          </template>
          <el-menu-item
            class="itemC"
            v-for="itemC in item.children"
            :key="itemC.name"
            :index="itemC.path"
          >
            <i class="el-icon-more-outline"></i>
            <span>{{itemC.meta.title}}</span>
          </el-menu-item>
        </el-submenu>
      </template>
    </el-menu>
  </el-aside>
</template>


<script>
export default {
  data() {
    return {
      routeList: []
    };
  },
  created() {
    let temp = this.$router.options.routes.filter(r => {
      return r.path != "/" && r.path != "/login" && r.path != "*";
    });
    this.routeList = temp;
    console.log(this.routeList);
    console.log(this.$route.path);
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>


<style>
.itemC {
  padding-left: 10px;
  padding-right: 0px;
}
.el-aside {
  display: block;
  position: relative;
  overflow-y: scroll;
  background-color: #252424;
}
</style>
