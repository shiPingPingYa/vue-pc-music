<template>
  <div class="album_info">
    <div class="album_image">
      <img :src="albumInfo.avatarUrl + '?param=200y200'" alt="" />
    </div>
    <div class="album_status">
      <div class="album_title">{{ albumInfo.albumName }}</div>
      <div class="album_num">
        <el-button size="medium " icon="el-icon-folder-add"
          >收藏{{ albumInfo.subCount }}</el-button
        >
        <el-button size="medium " icon="el-icon-share">
          分享{{ albumInfo.shareCount }}
        </el-button>
      </div>
      <div class="co_b">
        歌手：<label>{{ albumInfo.albumName }}</label>
      </div>
      <div class="co_b">
        时间：<label>{{ formDate(new Date(albumInfo.albumPublishTime),'ff:mm:dd',2) }}</label>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ArtistInfo',
  props: {
    albumInfo: {
      type: Object,
      default () {
        return {}
      }
    }
  }
}
</script>
<style lang="less" scoped>
  .album_info {
    display: flex;
    width: 100%;
    height: 200px;
    justify-content: flex-start;
    .album_image {
      width: 200px;
      height: 200px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .album_status {
      flex: 1;
      padding-left: 60px;
      .album_title {
        width: 100%;
        font-size: 26px;
        font-weight: bold;
      }
      .album_num {
        margin: 20px 0;
        i {
          margin-left: 10px;
        }
      }
    }
  }

  .co_b {
    label {
      font-size: 14px;
      color: #828385;
    }
  }
</style>
