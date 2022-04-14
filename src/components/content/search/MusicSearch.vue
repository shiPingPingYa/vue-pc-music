<template>
  <div class="music-search" @mouseleave="leave()">
    <!-- 搜索框 -->
    <div class="search-item">
      <form>
        <input type="text" ref="keyword_input" class="mess" placeholder="请输入搜索歌曲" v-model.trim="keywords" @focus="focus()" @keydown.enter="keyEnter()" />
      </form>
      <img src="../../../assets/img/search_svg.svg" @click="keyEnter" alt="" />
    </div>
    <!-- 搜索内容 -->
    <transition name="fade-in-linar">
      <searchContent v-show="isSuggest" :keywords="keywords" :sugSongs="sugSongs" :sugArtist="sugArtist" @goSearchDetail="goSearchDetail" @goArtistDetail="handleInputBlur" />
    </transition>
    <!-- 热搜榜 -->
    <transition name="fade-in-linear">
      <hot-search v-if="isShow" @del="del" :searchList="searchList" @goSearchDetail="goSearchDetail"></hot-search>
    </transition>

  </div>
</template>
<script>
// 热搜榜
import HotSearch from './components/Hotsearch'
import searchContent from './components/searchContent'
// 请求数据
import { _Suggest } from '../../../network/search'
// 防抖
import { debounce } from '../../../assets/common/tool'
export default {
  data() {
    return {
      searchList: [],
      keywords: '',
      isShow: false,
      isSuggest: false,
      sugSongs: [],
      sugArtist: []
    }
  },
  name: 'MusicSearch',
  components: { HotSearch, searchContent },
  watch: {
    // 监听keywords的值
    keywords(newValue) {
      if (newValue) {
        this.isShow = false
        this.isSuggest = true
        this.suggest()
      }
    }
  },
  created() {
    var searchList = localStorage.getItem('searchList')
    if (searchList) this.searchList = searchList.split(',')
    else this.searchList = ['海底', '世间美好与你环环相扣', '灰狼']
  },
  methods: {
    // input输入内容后，发送请求,防抖输入值的时候多次向服务器请求数据
    suggest: debounce(async function () {
      if (this.keywords !== '') {
        await _Suggest({ keywords: this.keywords }).then(res => {
          this.sugSongs = res.data.result.songs
          this.sugArtist = res.data.result.artists
        })
        this.isSuggest = true
      }
    }, 400),
    // 鼠标离开input，隐藏热搜
    leave() {
      this.isShow = false
      this.isSuggest = false
    },
    // 鼠标聚焦input，显示热搜
    focus() {
      const { keywords } = this
      if (!keywords) this.isShow = true
      else {
        this.isSuggest = true
        this.isShow = false
      }
    },
    // 点击删除图标清除热搜内容
    del() {
      this.searchList = []
      localStorage.setItem('searchList', '')
    },
    // 添加热搜记录,并跳转搜索的内容
    keyEnter() {
      if ((this.keywords ?? '') === '') {
        return this.$message.info('搜索内容不能为空，请输入搜索内容!!!')
      }
      this.goSearchDetail(this.keywords)
    },
    // 热搜历史记录的跳转
    recordClick(i) {
      this.$router.push('/search/' + this.searchList[i])
      this.keywords = ''
      this.isShow = false
    },
    // 搜索内容歌曲点击跳转
    enterSongs(song) {
      this.$router.push('/search/' + song)
      this.keywords = ''
      this.isSuggest = false
    },
    goSearchDetail(val = '') {
      this.searchList.unshift(val)
      this.searchList = [...new Set(this.searchList)]
      localStorage.setItem('searchList', this.searchList)
      this.$router.push('/search/' + val)
      this.handleInputBlur()
    },
    handleInputBlur() {
      this.$refs.keyword_input.blur()
      this.keywords = ''
      this.isSuggest = this.isShow = false
    }
  }
}
</script>
<style lang="less" scoped>
  .music-search {
    margin-left: 18px;
    position: relative;
    float: left;
    width: 25%;
    height: 100%;
    line-height: 54px;
    opacity: 1;
  }
  .search-item {
    position: absolute;
    display: flex;
    margin: auto;
    top: 0;
    bottom: 0;
    width: 100%;
    height: 50%;
    justify-content: space-between;
    line-height: 54px;
    background-color: rgba(255, 255, 255, 0.966);
    border-radius: 10px;
    > img {
      display: inline-block;
      width: 20px;
      height: 100%;
      margin-right: 2%;
    }
    > img:hover {
      cursor: pointer;
    }
  }
  .mess {
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

  .icon {
    position: absolute;
    right: 6px;
    bottom: 3px;
    width: 20px;
    height: 20px;
    text-align: center;
    line-height: 20px;
    font-size: 20px;
    cursor: pointer;
  }

  .el-icon-zoom-in {
    width: 20px;
    height: 20px;
  }

  .el-input {
    width: 100%;
    height: 30px;
    border-radius: 20px;
  }
  #el-input {
    border-radius: 8px;
  }

  .suggest {
    position: absolute;
    padding: 10px;
    top: 54px;
    width: 400px;
    color: #828385;
    z-index: 10;
    background-color: #2d2f33;
  }

  .top {
    line-height: 20px;
    font-size: 13px;
    > span {
      color: #2e6bb0;
    }
  }

  dl {
    width: 100%;
    font-size: 13px;
  }

  dl dt {
    margin-top: 4px;
    padding: 5px 8px;
    display: flex;
    width: 100%;
    line-height: 20px;
    align-content: center;
    background-color: #303236;
    color: #fff;
  }

  dl dd {
    padding: 5px 31px;
    line-height: 20px;
    cursor: pointer;
  }

  dd:hover {
    background-color: #2a2c30;
  }

  title {
    margin-left: 8px;
    color: #dcdde4;
  }
</style>
