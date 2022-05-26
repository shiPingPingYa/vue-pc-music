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
        <div class="music">
          <table>
            <tbody>
              <tr v-for="(item, index) in musicList" :key="index" :class="{ backColor: setBackColor(index), curMusicItem: playIndex == index }" @dblclick="albumClick(index)">
                <td :class="{ curFont: playIndex == index }">
                  {{ setSerial(index) }}
                  <div v-show="playIndex == index" class="curPlay">
                    <img alt="" src="@/assets/img/playmusic/currentplay.svg" />
                  </div>
                </td>
                <td>
                  <img alt class="live" src="@/assets/img/leftmenu/live.svg" />
                  <img alt class="download" src="@/assets/img/leftmenu/xiazai.svg" />
                </td>
                <td>
                  {{ item.name }}
                </td>
                <td>
                  {{ item.time }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { _getAlbum } from '@/network/artist';
import { _getSongsDetail, AllSongDetail, SongDetail } from '@/network/detail';
import { tableMixin } from '@/mixins/tableMixin';
import { mixinsPlayMusic } from '@/mixins/mixinsPlayMusic';
import { playMinxin } from '@/mixins/mixinsBusOnPlaying';

export default {
  name: 'ArtistAlbumList',
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
  mixins: [tableMixin, mixinsPlayMusic, playMinxin],
  created() {
    // 判断专辑信息是否为空
    if (this.album !== null) {
      // 调用接口，根据专辑ID获取专辑
      _getAlbum(this.album.id).then(res => {
        if (res.data.songs.length === 1) {
          _getSongsDetail(res.data.songs[0].id).then(res => {
            this.musicList.push(new SongDetail(res.data.songs));
          });
        } else {
          const ids = res.data.songs.map(item => item.id).join(',');
          _getSongsDetail(ids).then(res => {
            res.data.songs.forEach(item => this.musicList.push(new AllSongDetail(item)));
          });
        }
      });
    }
  },
  methods: {
    albumClick(i) {
      this.playMusic(i);
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
    padding-left: 26%;
    height: 20px;
    color: #0a0a0a;
    font-size: 14px;
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

.music tr td .live {
  margin: auto;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 20px !important;
  height: 26px !important;
  vertical-align: -2px;
}

.music tr td .download {
  margin-left: 26px;
  width: 20px !important;
  height: 26px !important;
}

.music > table {
  margin-top: 4px;
  width: 100%;
  border: 1px solid #e6e7e9;
}

.music tbody {
  color: #575757;
}

.music tbody tr td {
  border: none;
}

.music tr td {
  position: relative;
  border: 1px solid #23262c;
}

.music tr {
  height: 30px;
  text-align: left;
}

.music tr:hover {
  background-color: #c9c6c6;
  cursor: pointer;
}

.music tr td:nth-child(1) {
  width: 10%;
  text-align: center;
  color: rgb(36, 199, 240);
}

.music tr td:nth-child(2) {
  width: 12%;

  > img {
    width: 20px;
    opacity: 0.4;
  }
}

.music tr td .live {
  position: absolute;
  margin: auto;
  left: 0;
  right: 0;
  bottom: 0;
}

.music tr td .download {
  margin-left: 26px;
}

.music tbody tr td:nth-child(3) {
  width: 24%;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  color: #0a0a0a;
}

.music tr td:nth-child(4) {
  width: 16%;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
</style>
