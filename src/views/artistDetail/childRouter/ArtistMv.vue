<template>
  <div class="artist-mv">
    <mv-item class="mv" :mvList="mvList"></mv-item>
  </div>
</template>
<script>
import MvItem from '../../mv/childComps/MVItem'; // mv组件
import { _getArtistMv } from '../../../network/artist'; // 获取mv数据接口
export default {
  name: 'ArtistMv',
  data() {
    return {
      mvList: [],
    };
  },
  components: { MvItem },
  created() {
    this.initMvList();
  },
  methods: {
    async initMvList() {
      const { id } = this.$route.query;
      // 调用获取mv数据接口传入用户id，拿到返回的歌手mv数据
      const {
        data: { mvs },
      } = await _getArtistMv(id);
      this.mvList = mvs.map(item => {
        return {
           id: item.id,
          cover: item.cover || item.imgurl || item.picUrl,
          name: item.name,
          artist: item.artistName,
          count: item.playCount,
        };
      });
    },
  },
};
</script>
<style lang="less" scoped>
  .artist-mv {
    margin-top: 4px;
    width: 100%;
  }
  .mv {
    margin-right: 40px;
  }
</style>
