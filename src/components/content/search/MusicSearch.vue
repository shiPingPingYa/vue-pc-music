<template>
  <div class="music-search">
    <div class="search-item">
        <el-input size="mini" suffix-icon="el-icon-zoom-in" v-model="keywords">
  </el-input>
    </div>
    <hot-search></hot-search>
  </div>
</template>
<script>
import HotSearch from './Hotsearch'
export default {
  data () {
    return {
      keywords: ''
    }
  },
  name: 'MusicSearch',
  components: {
    HotSearch
  }
}
</script>
<style lang="less" scoped>
.music-search{
  margin-left: 18px;
  position: relative;
  float: left;
  width: 25%;
  height: 100%;
  line-height: 54px;
}

.search-item{
  width: 100%;
  height: 100%;
}
.el-input{
  width: 100%;
  height: 30px;
  border-radius: 20px;
}
#el-input{
  border-radius: 8px;
}
</style>
