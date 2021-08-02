<template>
  <el-container class="container">
    <el-row type="flex" justify="start">
      <el-col :span="12">
        <img src="../../../assets/img/404.png" alt="" />
      </el-col>
      <el-col :span="12" class="l-h-344">
        <div>抱歉您访问的页面不存在</div>
      </el-col>
    </el-row>
  </el-container>
</template>
<script>
export default {
  name: 'R404'
}
</script>
<style lang="less" scoped>
  .container {
    padding: 200px 0;
  }

  img {
    width: 100%;
    height: 100%;
  }

  .l-h-344 {
    line-height: 344px;
    div {
      font-size: 18px;
      color: #434259;
    }
  }
</style>
