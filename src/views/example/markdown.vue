<template>
  <mavon-editor v-model="value" />
</template>


<script>
export default {
  data() {
    return {
      value: `**输入内容**
*输入内容*
# 输入内容
++输入内容++
==输入内容==`
    };
  }
};
</script>


<style scoped>
.main {
  background-color: #ffffff;
  padding: 20px;
  height: calc(100vh - 80px);
}
</style>
