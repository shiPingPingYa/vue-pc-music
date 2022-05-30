<template>
  <div class="album-list">
    <p class="top">{{ album.name }}</p>
    <div class="album">
      <div class="left">
        <div class="icon">
          <img v-imgLazy :data-src="album.picUrl + '?param=280y260'" alt="" src="" />
        </div>
      </div>
      <div class="right">
        <div class="music-table">
          <div :class="['music-table-tr', activeMusic && currentIndex ? 'active-music' : '']" v-for="(item, index) in musicList" :key="index" @dblclick="musicItemClick(index)">
            <div class="music-table-td">
              {{ setSerial(index) }}
              <div class="active-icon" v-show="activeMusic && currentIndex">
                <img src="@/assets/img/playmusic/currentplay.svg" alt="" />
              </div>
            </div>
            <div class="music-table-td">
              <img src="@/assets/img/leftmenu/live.svg" alt="" class="live" />
              <img src="@/assets/img/leftmenu/xiazai.svg" alt="" class="download" />
            </div>
            <div class="music-table-td one-over-eclipse">{{ item.name }}</div>
            <div class="music-table-td  one-over-eclipse">{{ item.song }}</div>
            <div class="music-table-td  one-over-eclipse">{{ item.album }}</div>
            <div class="music-table-td">{{ item.time }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex';
import { _getAlbum } from '@/network/artist';
import { _getSongsDetail } from '@/network/detail';
import { mixinsPlayMusic } from '@/mixins/mixinsPlayMusic';
import { formDate } from '@/assets/common/tool';

export default {
  name: 'ArtistAlbumList',
  mixins: [mixinsPlayMusic],
  props: {
    album: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      musicList: [],
      fold: true
    };
  },
  computed: {
    ...mapState(['songListPath', 'currentIndex']),
    activeMusic() {
      return this.songListPath == location.hash;
    }
  },
  created() {
    this.initAblumList();
  },
  methods: {
    async initAblumList() {
      if (this.album !== null) {
        let { data } = await _getAlbum(this.album.id);
        if (data.code == 200) {
          let { songs } = data;
          if (songs.length == 1) {
            let { data } = await _getSongsDetail(songs[0].id);
            this.musicList.push({
              id: data.songs[0].id,
              name: data.songs[0].name,
              album: data.songs[0].al.name,
              song: data.songs[0].ar[0].name,
              pic: data.songs[0].al.picUrl,
              time: formDate(new Date(data.songs[0].dt), 'mm:ss')
            });
          } else {
            let ids = songs.map(item => item.id).join(',');
            let { data } = await _getSongsDetail(ids);
            data.songs.forEach(item => {
              this.musicList.push({
                id: item.id,
                name: item.name,
                album: item.al.name,
                song: item.ar[0].name,
                pic: item.al.picUrl,
                time: formDate(new Date(item.dt), 'mm:ss')
              });
            });
          }
        }
      }
    },
    setSerial(i) {
      return i + 1 <= 9 ? `0${i + 1}` : i + 1;
    },
    musicItemClick(i) {
      if (location.hash === this.songListPath) this.$store.commit('setPlayMusicIndex', i);
      else this.playMusic(i);
    }
  }
};
</script>
<style lang="less" scoped>
.album-list {
  margin-top: 50px;
  width: 100%;
  color: #0a0a0a;

  > .top {
    display: block;
    padding: 0 0 8px 26%;
    line-height: 20px;
    color: #0a0a0a;
    font-size: 16px;
  }

  > .album {
    display: flex;
    width: 100%;
    justify-content: flex-start;

    > .left {
      width: 20%;
      > .icon {
        width: 100%;
        > img {
          padding: 0 0 0 20px;
          width: 100%;
          min-height: 100px;
        }
      }
    }
    > .right {
      margin-left: 40px;
      width: 75%;
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
    height: 40px;
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
      width: 10%;
      & > img {
        width: 20px;
      }
    }
    & > .music-table-td:nth-child(3) {
      width: 26%;
      max-width: 190px;
    }
    & > .music-table-td:nth-child(4) {
      width: 18%;
    }
    & > .music-table-td:nth-child(5) {
      width: 18%;
      max-width: 162px;
    }
    & > .music-table-td:nth-child(6) {
      width: 18%;
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
</style>
