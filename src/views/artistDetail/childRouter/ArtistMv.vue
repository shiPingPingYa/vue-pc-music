<template>
  <div class="artist-mv">
  <mv-item class="mv" :mvList="mvList"></mv-item>
  </div>
</template>
<script>
// 导入mv条目
import MvItem from '../../mv/childComps/MVItem'
// 导入获取mv数据接口
import { _getArtistMv } from '../../../network/artist'
// 导入，mv数据接口，把获取的mv数据处理获取想要的mv对象(id,cover,name,artist,count)
import { MV } from '../../../network/mv'
export default {
  name: 'ArtistMv',
  data () {
    return {
      artist: null,
      mvList: []
    }
  },
  components: {
    MvItem
  },
  created () {
    this.artist = JSON.parse(localStorage.getItem('artist'))
    // 调用获取mv数据接口传入用户id，拿到返回的歌手mv数据
    _getArtistMv(this.artist.id).then(res => {
      res.data.mvs.forEach(item => this.mvList.push(new MV(item)))
    })
  }

}
</script>
<style lang="less" scoped>
.artist-mv{
  margin-top: 4px;
  width: 100%;
}
.mv {
  margin-right: 40px;
}
</style>
