<template>
  <div class="new-songs">
    <!-- 头部导航栏 -->
    <div class="area">
      <div v-for="(item, index) in tabList" :key="index" :class="{ action: areaIndex == index }" class="area-item" @click="handleTabClick(index)">
        {{ item.name }}
      </div>
    </div>
    <scroll ref="scroll" :pull-up-load="true" class="new-scroll">
      <div class="content">
        <div class="play" @click="playMusic()">
          <i class="el-icon-video-play"></i>
          <span> 播放全部</span>
        </div>
        <div class="music-table">
          <div class="music-table-tr" v-for="(item, index) in musicList" :key="index">
            <div class="music-table-td" v-html="setMusicItemIndex(index)"></div>
            <div class="music-table-td">
              <div class="backMask" @click="playMusicItem(index)">
                <img v-imgLazy :data-src="item.pic + '?param=50y50'" alt="" src="" />
                <div class="icon">
                  <i class="el-icon-video-play"></i>
                </div>
              </div>
            </div>
            <div class="music-table-td">{{ item.name }}</div>
            <div class="music-table-td">{{ item.album }}</div>
            <div class="music-table-td">{{ item.time }}</div>
          </div>
        </div>
      </div>
    </scroll>
  </div>
</template>
<script>
import { _getTopSongs } from '@/network/discover';
import { _getSongsDetail } from '@/network/detail';
import { mixinsPlayMusic } from '@/mixins/mixinsPlayMusic'; // 播放音乐方法混入
import { formDate } from '@/assets/common/tool';
export default {
  name: 'newMusic',
  data() {
    return {
      imgCurrent: 0,
      areaIndex: 0,
      tabList: [
        { value: 0, name: '全部' },
        { value: 7, name: '华语' },
        { value: 96, name: '欧美' },
        { value: 16, name: '韩国' },
        { value: 8, name: '日本' }
      ],
      list: [],
      musicList: []
    };
  },
  mixins: [mixinsPlayMusic],
  created() {
    this.initNewMusicList();
  },
  methods: {
    // 头部导航条点击
    handleTabClick(index) {
      this.areaIndex = index;
      this.initNewMusicList();
    },
    async initNewMusicList() {
      const {
        data: { data }
      } = await _getTopSongs(this.tabList[this.areaIndex].value);
      const ids = data.map(item => item.id).join(',');
      const {
        data: { songs }
      } = await _getSongsDetail(ids);
      this.musicList = songs.map(item => {
        return {
          id: item.id,
          name: item.name,
          album: item.al.name,
          song: item.ar[0].name,
          pic: item.al.picUrl,
          time: formDate(new Date(item.dt), 'mm:ss')
        };
      });
    },
    // 判断是否在同一歌单下面，是则不重新获取音乐数据，而是修改音乐播放列表序号
    playMusicItem(index) {
      this.$store.commit('setPlayMusicIndex', index);
    },
    setMusicItemIndex(i) {
      return i + 1 <= 9 ? `0${i + 1}` : i + 1;
    }
  }
};
</script>
<style lang="less" scoped>
.new-songs {
  padding: 0 98px;
  margin-bottom: 20px;
  width: 100%;
  height: 100%;
  overflow: hidden;
  & > .area {
    display: flex;
    border-bottom: 1px solid #d3d4d6;
    color: #01060a;
    font-size: 14px;

    > .area-item {
      padding: 10px 10px;
      cursor: pointer;
    }
  }
  & > .new-scroll {
    height: calc(100% - 45px);
    overflow: hidden;
    .content {
      margin-top: 8px;

      > .play {
        padding: 10px 0;
        width: 100%;
        font-size: 24px;
        cursor: pointer;

        & > span {
          font-size: 14px !important;
        }

        & > i {
          vertical-align: -4px;
          color: red;
        }
      }
    }
  }

  .music-table {
    width: 100%;
    & > .music-table-tr {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      width: 100%;
      height: 60px;
      cursor: pointer;
      &:hover {
        color: #0a0a0a;
        background-color: #c9c6c6;
      }
      & > div {
        padding: 6px;
        text-align: center;
        line-height: 28px;
      }
      & > .music-table-td:nth-child(1) {
        position: relative;
        width: 10%;
        color: rgb(36, 199, 240);
      }
      & > .music-table-td:nth-child(2) {
        width: 14%;
        & > .backMask {
          position: relative;
          width: 50px;
          height: 50px;

          > img {
            width: 100%;
            height: 100%;
            background-size: 100%, 100%;
          }

          > .icon {
            position: absolute;
            margin: auto;
            width: 24px;
            height: 24px;
            left: 0;
            top: 0;
            right: 0;
            bottom: 0;

            > i {
              font-size: 24px;
              color: #fff;
              opacity: 0.8;
            }
          }
        }
      }
      & > .music-table-td:nth-child(3) {
        width: 34%;
        max-width: 190px;
      }
      & > .music-table-td:nth-child(4) {
        width: 34%;
      }
      & > .music-table-td:nth-child(5) {
        width: 8%;
        max-width: 162px;
      }
    }
    & > .music-table-tr:nth-child(odd) {
      background-color: #eeecec;
    }
    .active-icon {
      position: absolute;
      margin: auto;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      width: 16px;
      height: 16px;
      z-index: 1;
    }
    .active-music {
      background-color: #c9c6c6 !important;
      & > div:nth-child(1) {
        color: transparent !important;
      }
    }
  }
  .action {
    color: #01060a;
    border-bottom: 2px solid #828384;
  }
}
</style>
