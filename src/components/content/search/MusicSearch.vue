<template>
  <div class="music-search" @mouseleave="leave()">
    <!-- 搜索框 -->
    <div class="search-item">
        <el-input size="mini" suffix-icon="el-icon-zoom-in" v-model="keywords"
        @focus="focus()"
        @change="keyEnter"></el-input>
    </div>
    <!-- 热搜榜 -->
    <hot-search @del="del" :searchList='searchList' v-show="isShow"></hot-search>
    <!-- 搜索内容 -->
    <div class="suggest" v-show="isSuggest">
      <div class="top">
        搜索
        <span>"{{keywords}}"</span>相关的结果>
      </div>
      <dl>
        <!-- 搜索歌曲-->
        <dt>
          <div class="icon"><i class="el-icon-user-solid"></i></div>
          <div class="title">单曲</div>
        </dt>
        <dd v-for="(item,index ) in this.sugSongs" :key="index+'song'">
          {{item.name}}——{{item.artists[0].name}}
        </dd>
      <!-- 搜索歌手 -->
        <dt>
          <div class="icon"><i class="el-icon-bell"></i></div>
          <div class="title">歌手</div>
        </dt>
        <dd v-for="(item,index) in sugArtist" :key="index">{{item.name}}</dd>
      </dl>
    </div>
  </div>
</template>
<script>
// 热搜榜
import HotSearch from './Hotsearch'
// 请求数据
import { _Suggest } from '../../../network/search'
export default {
  data () {
    return {
      searchList: ['海底', '世间美好与你环环相扣', '灰狼'],
      keywords: '',
      isShow: false,
      isSuggest: false,
      sugSongs: [],
      sugArtist: []
    }
  },
  name: 'MusicSearch',
  components: {
    HotSearch
  },
  methods: {
    // 鼠标离开input，隐藏热搜
    leave () {
      this.isShow = false
      this.isSuggest = false
    },
    // 鼠标聚焦input，显示热搜
    focus () {
      this.isShow = true
    },
    // 点击删除图标清除热搜内容
    del () {
      this.searchList = []
    },
    // 添加热搜记录
    keyEnter () {
      if (this.keywords === '' || this.keywords == null) return
      this.searchList.unshift(this.keywords)
      this.keywords = ''
      this.isSuggest = false
      this.isShow = false
    },
    // input输入内容后，发送请求
    suggest () {
      _Suggest(this.keywords).then(res => {
        this.sugSongs = res.data.result.songs
        this.sugArtist = res.data.result.artists
      })
      console.log(this.sugSongs)
    }
  },
  watch: {
    // 监听keywords的值
    keywords () {
      if (this.keywords !== '') {
        this.isShow = false
        this.isSuggest = true
        this.suggest()
      }
    }
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

.suggest{
  position: absolute;
  padding: 10px;
  top: 54px;
  width: 400px;
  color: #828385;
  z-index: 10;
  background-color: #2d2f33;

}

.top{
  line-height: 20px;
  font-size: 13px;
  >span{
    color: #2e6bb0;
  }
}

dl{
  width: 100%;
  font-size: 13px;
}

dl dt{
  margin-top: 4px;
  padding: 5px 8px;
  display: flex;
  width: 100%;
  line-height: 20px;
  align-content: center;
  background-color: #303236;
  color: #fff;
}

dl dd{
  padding: 5px 31px;
  line-height: 20px;
}

dd:hover{
  background-color: #2a2c30;
}

.icon{
  margin-right: 6px;
  width: 16px;
  height: 16px;
  > i{
    width: 100%;
    height: 100%;
    background-size: 100%,100%;
  }
}

title{
  margin-left: 8px;
  color: #dcdde4;
}
</style>
