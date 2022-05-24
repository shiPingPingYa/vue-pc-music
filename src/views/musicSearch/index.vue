<template>
  <div class="music-search" ref="musicSearch" @mouseleave="handleInputBlur">
    <!-- 搜索框 -->
    <div class="search-item">
      <form>
        <input type="text" ref="keyword_input" class="mess" placeholder="请输入搜索歌曲" v-model.trim="keywords" @focus="handleInputFocus" @keydown.enter="goMusicDetail" />
      </form>
      <img src="@/assets/img/search_svg.svg" @click="goMusicDetail" alt="" />
    </div>
    <transition-group name="fade-in-linear">
      <SearchContent :key="0" v-show="musicSearchModal" :keywords="keywords" :searchMusic="searchMusic" :searchArtist="searchArtist" />
      <HotSearch :key="1" v-if="musicHotModal" />
    </transition-group>
  </div>
</template>
<script>
import { _Suggest } from '@/network/search';
import { debounce } from '@/assets/common/tool';
import HotSearch from './components/Hotsearch';
import SearchContent from './components/searchContent';
export default {
  name: 'musicSearch',
  components: { HotSearch, SearchContent },
  data() {
    return {
      keywords: '',
      musicHotModal: false,
      musicSearchModal: false,
      searchMusic: [],
      searchArtist: []
    };
  },
  watch: {
    // 监听keywords的值
    keywords(v) {
      if (v) {
        this.musicHotModal = false;
        this.musicSearchModal = true;
        this.getSearchMusic();
      }
    }
  },
  methods: {
    // input输入内容后，发送请求,防抖输入值的时候多次向服务器请求数据
    getSearchMusic: debounce(async function() {
      if (this.keywords !== '') {
        await _Suggest({ keywords: this.keywords }).then(res => {
          this.searchMusic = res.data.result.songs;
          this.searchArtist = res.data.result.artists;
        });
        this.musicSearchModal = true;
      }
    }, 400),
    handleInputFocus() {
      const { keywords } = this;
      if (!keywords) this.musicHotModal = true;
      else {
        this.musicSearchModal = true;
        this.musicHotModal = false;
      }
    },
    goMusicDetail() {
      if ((this.keywords ?? '') === '') return this.$message.info('搜索内容不能为空，请输入搜索内容!!!');
      this.goSearchDetail(this.keywords);
    },
    handleInputBlur() {
      this.$refs.keyword_input.blur();
      this.keywords = '';
      this.musicSearchModal = this.musicHotModal = false;
    }
  }
};
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
