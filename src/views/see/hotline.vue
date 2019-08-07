<template>
  <div class="main">
    <div id="hotlinemap"></div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      fullscreenLoading: false
    };
  },
  mounted() {
    const loading = this.$loading({
      lock: true,
      text: 'Loading',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.7)'
    });
    setTimeout(() => {
      loading.close();
    }, 2000);
  }
};
</script>


<style>
.main {
  background-color: #ffffff;
  padding: 10px;
}
#hotlinemap {
  height: calc(100vh - 80px);
  margin: 0px;
  padding: 0px;
}
</style>