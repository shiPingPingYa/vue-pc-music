<template>
  <div class="music-baseinfo-container" v-if="baseInfo !== null">
    <div class="baseinfo-img">
      <img :src="baseInfo.img" alt="" />
    </div>
    <div class="baseinfo-content-container">
      <div class="top">
        <span class="icon">歌单</span>
        <span>{{ baseInfo.name }} </span>
        <div class="right">
          <table>
            <tr>
              <td>
                歌曲数量
                <br />
                {{ baseInfo.trackCount }}
              </td>
              <td>
                播放量
                <br />
                {{ baseInfo.playCount }}
              </td>
            </tr>
          </table>
        </div>
      </div>
      <div class="center">
        <div class="play" @click="playMusic"><i class="el-icon-video-play"></i>播放全部</div>
        <div class="collect"><i class="el-icon-folder-add"></i>收藏</div>
        <div class="share"><i class="el-icon-share"></i>分享</div>
      </div>
      <div class="desc">
        <div class="tag-item">
          <label>标签：</label>
          <label class="title" v-html="handleTagsHtml(baseInfo.tags)" />
        </div>
        <div class="desc-item">{{ baseInfo.title || '暂无歌单描述' }}</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'MusicBaseInfo',
  props: {
    baseInfo: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    playMusic() {
      this.$emit('playMusic');
    },
    handleTagsHtml(v) {
      return v.join('、') || '暂无标签信息';
    }
  }
};
</script>
<style lang="less" scoped>
.music-baseinfo-container {
  display: flex;
  align-items: center;
  width: 100%;
  height: 200px;
  & > .baseinfo-img {
    width: 200px;
    height: 100%;
    > img {
      width: 100%;
      height: 100%;
    }
  }
  & > .baseinfo-content-container {
    position: relative;
    padding: 0 20px;
    width: 90%;
    height: 100%;
    flex: 1;
    overflow: hidden;

    .top {
      margin: 6px auto;
      width: 100%;
      height: 30px;
      > .icon {
        padding: 5px;
        border: 1px solid red;
        border-radius: 4px;
        color: red;
        font-size: 12px;
      }
      > span {
        font-size: 26px;
        vertical-align: auto;
      }
      > .right {
        float: right;
        color: #4e4e52;
        td {
          text-align: center;
          font-size: 12px;
          padding: 5px;
          cursor: pointer;
        }
      }
    }

    .center {
      padding-top: 40px;
      display: flex;
      align-items: center;
      > div {
        margin-right: 10px;
        padding: 5px 10px;
        width: 100px;
        height: 30px;
        text-align: center;
        background-color: #fff;
        border-radius: 10px;
        font-size: 14px;
        cursor: pointer;
      }
      > .play {
        background-color: #cd2929;
      }
    }

    .desc {
      position: absolute;
      bottom: 0;
      height: 50px;
      font-size: 14px;
      .tag-item {
        & .title {
          font-weight: bold;
        }
      }
      .desc-item {
        line-height: 30px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
  }
}
</style>
