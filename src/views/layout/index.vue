<template>
  <div>
      <Header />
      <el-container>
        <Aside />
        <Main />
      </el-container>
  </div>
</template>

<script>
import Header from "@/views/layout/components/Header.vue"
import Aside from "@/views/layout/components/aside/index.vue"
import Main from '@/views/layout/components/Main.vue'

export default {
  name:'layout',
  components: { Header, Aside,Main}
  };
</script>


<style scoped>
  .el-container {
    min-height: 100vh;
  }
</style>

