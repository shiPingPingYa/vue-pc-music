<template>
  <div class="individuation">
   <scroll ref="scroll" class="individ-scroll">
      <!-- 轮播图区域 -->
    <swiper :banner="banner"></swiper>
    <p>推荐歌单</p>
    <!-- 推荐歌单区域 -->
    <music-list :totalList='totalList'></music-list>
    <!-- 私人派送区域 -->
    <private-content :privateContent='privateContent'></private-content>
    <!-- 最新音乐区域 -->
    <new-songs :songList="songList"></new-songs>
    <!-- 推荐mv区域 -->
    <p class="pri-mv">推荐MV</p>
    <mv-item :mvList="mvList"></mv-item>
   </scroll>
  </div>
</template>
<script>
import Scroll from '../../../components/common/scroll/Scroll'
// 导入轮播图
import Swiper from '../../../components/common/swiper/Swiper'
// 导入歌单
import MusicList from '../../musicListDetail/MusicList'
// 导入私人派送
import PrivateContent from '../childComps/PrivateContent'
// 导入最新歌曲
import NewSongs from '../childComps/NewSongs'
// 导入首页数据请求
import { _getBanner, _getPersonalized, _getPrivateContent, _getNewSong, _getPrivateMv } from '../../../network/discover'
// 导入封装的mv处理函数
import { MV } from '../../../network/mv'
// 导入mv组件
import MvItem from '../../mv/childComps/MVItem'
export default {
  name: 'Individuation',
  data () {
    return {
      banner: null,
      limit: 12,
      totalList: null,
      songList: null,
      musicList: [],
      privateContent: null,
      mvList: [],
      notMvList: null
    }
  },
  components: {
    Swiper,
    Scroll,
    MusicList,
    PrivateContent,
    NewSongs,
    MvItem
  },
  async created () {
    // 获取首页轮播图
    // _getBanner().then(res => {
    //   this.banner = res.data.banners.slice(0, 6)
    // })
    await Promise.all([_getBanner(), _getPersonalized(this.limit), _getPrivateContent(), _getNewSong(), _getPrivateMv()]).then(res => {
      this.banner = res[0].data.banners.slice(0, 6)
      this.totalList = res[1].data.result
      this.privateContent = res[2].data
      this.songList = res[3].data.result
      this.notMvList = res[4].data.result
    })
    // 处理mv获取需要的参数
    for (var i of this.notMvList) {
      var mv = new MV(i.id, i.picUrl, i.name, i.artistName, i.playCount)
      this.mvList.push(mv)
    }
    this.mvList.slice(0, 3)
  }
}
</script>
<style lang="less" scoped>
.individuation{
  width: 100%;
  height: 100%;
  p{
    margin: 20px  0 6px 0;
    padding-bottom: 6px;
    line-height: 30px;
    font-size: 16px;
    border-bottom: 1px solid #b8b6b6;
    color: #fff;
    line-height: 20px;
  }
}

.individ-scroll{
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
