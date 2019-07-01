<template>
  <div>
    <Header />
    <el-container>
      <Aside />
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </div>
</template>

<script>
import Header from "@/views/layout/Header.vue";
import Aside from "@/views/layout/Aside.vue";

export default {
  data() {
    const item = {
      date: "2016-05-02",
      name: "王小虎",
      address: "上海市普陀区金沙江路 1518 弄"
    };
    return {
      tableData: Array(20).fill(item)
    };
  },
  components: { Header, Aside }
};
</script>


 <style>
.el-container {
  min-height: 100vh;
  border: 1px solid #eee;
}
.el-main {
  padding: 10px 10px 10px 10px;
}
</style>