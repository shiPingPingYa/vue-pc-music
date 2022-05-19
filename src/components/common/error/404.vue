<template>
  <el-container class="container">
    <el-row type="flex" justify="center">
      <el-col :span="12">
        <img src="http://rc4igsiwi.hn-bkt.clouddn.com/01.png" alt="" />
      </el-col>
    </el-row>
    <el-row type="flex" justify="center">
      <el-col :span="12">
        <el-button type="primary" size="small" @click="$router.go(-1)">点击退回</el-button>
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
    display: flex;
    flex-direction: column;
    padding: 200px 0;
  }

  img {
    width: 100%;
  }

  .l-h-344 {
    line-height: 344px;
    div {
      font-size: 18px;
      color: #434259;
    }
  }
</style>
