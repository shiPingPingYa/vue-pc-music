<template>
  <div class="music-search" @mouseleave="leave()">
    <!-- 搜索框 -->
    <div class="search-item">
        <input type="text" class="mess" v-model="keywords" @focus="focus()" @keydown.enter="keyEnter()">
      <div class="icon el-icon-zoom-in" @click="keyEnter()"></div>
    </div>
    <!-- 热搜榜 -->
    <hot-search @del="del" :searchList='searchList' v-show="isShow" @recordClick='recordClick($event)'></hot-search>
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
        <dd v-for="(item,index ) in this.sugSongs" :key="index+'song'" @click="enterSongs(item.name)">
          {{item.name}}——{{item.artists[0].name}}
        </dd>
      <!-- 搜索歌手 -->
        <dt>
          <div class="icon"><i class="el-icon-bell"></i></div>
          <div class="title">歌手</div>
        </dt>
        <dd v-for="(item,index) in sugArtist" :key="index" @click="enterArtists(item)">{{item.name}}</dd>
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
  watch: {
    // 监听keywords的值
    keywords () {
      if (this.keywords !== '') {
        this.isShow = false
        this.isSuggest = true
        this.suggest()
      }
    }
  },
  methods: {
    // input输入内容后，发送请求
    suggest () {
      _Suggest(this.keywords).then(res => {
        this.sugSongs = res.data.result.songs
        this.sugArtist = res.data.result.artists
      })
    },
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
    // 添加热搜记录,并跳转搜索的内容
    keyEnter () {
      if (this.keywords === '' || this.keywords == null) return
      this.searchList.unshift(this.keywords)
      this.$router.push('/search/' + this.keywords)
      this.keywords = ''
      this.isSuggest = false
      this.isShow = false
    },
    // 热搜历史记录的跳转
    recordClick (i) {
      this.$router.push('/search/' + this.searchList[i])
      this.isShow = false
    },
    // 搜索内容歌曲点击跳转
    enterSongs (song) {
      this.$router.push('/search/' + song)
      this.isSuggest = false
    },
    enterArtists (artist) {
      this.$router.push({
        path: '/artist',
        query: {
          artist: artist
        }
      })
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
  position: absolute;
  margin: auto;
  top: 0;
  bottom: 0;
  line-height: 54px;
  width: 100%;
  height: 50%;
  background-color: #fff;
  border-radius: 10px;
}
.mess{
  position: absolute;
  width: 80%;
  height: 100%;
  padding: 0 10px;
  border: #f6f6f6;
  border-radius: 10px;
  line-height: 16px;
  color: #333;
  background-color: transparent;
  outline-style: none;
}

.icon{
  position: absolute;
  right: 6px;
  bottom: 3px;
  width: 20px;
  height: 20px;
  text-align: center;
  line-height: 20px;
  font-size: 20px;
}

.el-icon-zoom-in{
  width: 20px;
  height: 20px;
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
  cursor: pointer;
}

dd:hover{
  background-color: #2a2c30;
}

title{
  margin-left: 8px;
  color: #dcdde4;
}
</style>
