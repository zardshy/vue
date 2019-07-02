<template>
  <el-menu
    unique-opened
    router
    default-active="table"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
  >
    <el-submenu v-for="(item,i) in this.$router.options.routes" :key="i" :index="item.name">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span>{{item.meta.title}}</span>
      </template>
      <el-menu-item
        v-for="itemC in item.children"
        :key="itemC.name"
        :index="itemC.name"
      >{{itemC.meta.title}}</el-menu-item>
    </el-submenu>
  </el-menu>
</template>


<script>
export default {
  data() {
    return {};
  },
  created() {
    console.log(this.$router);
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