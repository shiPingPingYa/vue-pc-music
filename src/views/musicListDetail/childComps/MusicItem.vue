<template>
  <div class="music" v-if="musicList != null">
    <table cellspacing="0">
      <!-- 标题 -->
      <thead>
        <tr>
          <td>#</td>
          <td>操作</td>
          <td>音乐标题</td>
          <td>歌手</td>
          <td>专辑</td>
          <td>时长</td>
        </tr>
      </thead>
      <!-- 内容 -->
      <tbody>
        <tr v-for="(item, index) in musicList" :key="index" :class="{
            'backColor': setBackColor(index),
            'curMusicItem': playIndex == index,
          }" @dblclick="musicItemClick(index)">
          <td :class="{ curFont: playIndex == index }">
            {{ setSerial(index) }}
            <div class="curPlay" v-show="playIndex == index">
              <img src="../../../assets/img/playmusic/currentplay.svg" alt="" />
            </div>
          </td>
          <td>
            <img src="../../../assets/img/leftmenu/live.svg" alt="" class="live" />
            <img src="../../../assets/img/leftmenu/xiazai.svg" alt="" class="download" />
          </td>
          <td>{{ item.name }}</td>
          <td>{{ item.song }}</td>
          <td>{{ item.album }}</td>
          <td>{{ item.time }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'MusicItem',
  props: {
    musicList: {
      type: Array,
      default () {
        return []
      }
    }
  },
  computed: {
    ...mapGetters(['getSongListPath'])
  },
  data () {
    return {
      playIndex: ''
    }
  },
  mounted () {
    // 设置下标
    this.$bus.$on('Playing', (path, index) => {
      this.playIndex = index
    })
  },
  methods: {
    // 设置音乐列表的序号
    setSerial (i) {
      return i + 1 <= 9 ? '0' + (i + 1) : i + 1
    },
    // 设置音乐列表的背景
    setBackColor (i) {
      return i % 2 !== 0
    },
    // 音乐条目点击事件
    musicItemClick (index) {
      // 判断是否在同一歌单下面，是则不修改音乐列表，而是切换播放音乐下标
      if (this.$route.path === this.getSongListPath) {
        this.$bus.$emit('playMusicListItem', index) // 触发播放方法，传递index，把播放音乐下标换了
      } else {
        this.$emit('musicItemClick', index) // 触发父组件上面的方法，重新获取音乐
      }
    }
  }
}
</script>
<style lang="less" scoped>
  .music {
    width: 100%;
  }

  .music table {
    width: 100%;
  }

  .music thead {
    color: #0a0a0a;
  }

  .music tbody tr td {
    border: none;
  }

  .musci tr {
    height: 30px;
    text-align: left;
  }

  .music tr:hover {
    color: #0a0a0a;
    background-color: #c9c6c6;
    cursor: pointer;
  }

  .music tr td {
    position: relative;
    border: 1px solid #e9e3e7;
  }

  .music tbody {
    color: #0a0a0a;
  }

  .music tr td:nth-child(1) {
    width: 10%;
    text-align: center;
    color: rgb(36, 199, 240);
  }

  .music tr td:nth-child(2) {
    width: 10%;
    > img {
      width: 20px;
      opacity: 0.9;
    }
  }

  .music tr td .live {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    margin: auto;
  }

  .music tr td .download {
    margin-left: 26px;
  }
  .music tbody tr td:nth-child(3) {
    width: 26%;
    max-width: 190px;
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
  .music tr td:nth-child(5) {
    width: 16%;
    line-height: 30px;
    max-width: 162px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .music tr td:nth-child(6) {
    width: 16%;
  }
</style>
