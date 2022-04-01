<template>
  <div class="artist">
    <!-- 导航条 -->
    <div class="category">
      <div class="area">
        语种:
        <div class="area-item" v-for="(item,index) in area" :key="index" :class="{'action':areaIndex == index}" @click.stop="handleAreaClick(index)">
          {{item.name}}
        </div>
      </div>
      <div class="type">
        分类:
        <div class="type-item" v-for="(item,index) in type " :key="index" :class="{'action':typeIndex == index}" @click.stop="handleTypeClick(index)">
          {{item.name}}
        </div>
      </div>
    </div>
    <!-- 滚动条 -->
    <scroll ref="scroll" class="scroll-artist" :pull-up-load="true" @pullingUp="pullingUp">
      <!-- 歌手列表 -->
      <artist-list :artistList='artistList'></artist-list>
    </scroll>
  </div>
</template>
<script>
// 导入scroll
import Scroll from '../../../components/common/scroll/Scroll'
// 导入歌手列表组件
import ArtistList from '../childComps/ArtistList'
// 导入数据请求
import { _getArtist } from '../../../network/discover'
// 节流
import { throttled } from '../../../assets/common/tool'
export default {
  name: 'ArtistCategory',
  components: {
    ArtistList,
    Scroll
  },
  data () {
    return {
      areaIndex: 0,
      typeIndex: 0,
      artistList: [],
      area: [
        { value: -1, name: '全部' },
        { value: 7, name: '华语' },
        { value: 96, name: '欧美' },
        { value: 8, name: '日本' },
        { value: 16, name: '韩国' },
        { value: 0, name: '其他' }
      ],
      type: [
        { value: -1, name: '全部' },
        { value: 1, name: '男歌手' },
        { value: 2, name: '女歌手' },
        { value: 3, name: '乐队' }
      ]
    }
  },
  created () {
    this.getArtist()
  },
  methods: {
    // 获取默认全部的歌手数据
    async getArtist () {
      this.artistList = []
      const params = {
        area: this.area[this.areaIndex].value,
        type: this.type[this.typeIndex].value,
        offset: this.artistList.length
      }
      const {
        data: { artists }
      } = await _getArtist(params)
      this.artistList = artists
    },
    // scroll下拉刷新
    pullingUp: throttled(async function () {
      const params = {
        area: this.area[this.areaIndex].value,
        type: this.type[this.typeIndex].value,
        offset: this.artistList.length
      }
      const {
        data: { artists }
      } = await _getArtist(params)
      artists.forEach(item => this.artistList.push(item))
      this.$refs.scroll.finishPullUp()
    }, 800),
    handleAreaClick (index) {
      this.areaIndex = index
      this.$refs.scroll.scrollTo(0, 0, 200)
      this.getArtist()
    },
    handleTypeClick (index) {
      this.typeIndex = index
      this.$refs.scroll.scrollTo(0, 0, 200)
      this.getArtist()
    }
  }
}
</script>
<style lang="less" scoped>
  .artist {
    padding: 0 10%;
    width: 100%;
    height: 100%;
    font-size: 14px;
    overflow: hidden;
  }
  .category {
    margin-bottom: 10px;
    padding-bottom: 8px;
    border-bottom: 1px solid #828384;
    color: #01060a;
    > .area {
      display: flex;
      > .area-item {
        margin-left: 10px;
        padding: 0 10px;
        cursor: pointer;
      }
    }
    > .type {
      margin-top: 10px;
      display: flex;
      > .type-item {
        margin-left: 10px;
        padding: 0 10px;
        cursor: pointer;
      }
    }
  }

  .scroll-artist {
    height: calc(100% - 54px - 20px);
    overflow: hidden;
  }

  .action {
    color: #fff;
    background-color: #828384;
  }
</style>
