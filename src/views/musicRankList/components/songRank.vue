<template>
  <div class='rank-item'>
    <!--卡片区域头部图片 -->
    <div :style="{background:'linear-gradient(to right,'+bgColor[0]+','+bgColor[1]+')'}" class='rank-item-top' @click='goMusicListDetail()'>
      <div class='left'>
        <div class='left-itemF'>
          <i>{{ titleList[0] }}</i>
        </div>
        <div class='set'>
          <div class='left-item'>
            <i>{{ titleList[1] }}</i>
          </div>
          <div class='left-item'>
            <i>{{ titleList[2] }}</i>
          </div>
          <div class='update'>{{ getUpdateTime }}</div>
        </div>
        <div class='right' @click='handlePlayIconClick()'>
          <img alt src='../../../assets/img/playmusic/xibofang.svg' />
        </div>
      </div>
    </div>
    <!--卡片区域的表格-->
    <div class='center'>
      <table cellspacing='0'>
        <tr v-for='(item,index) in musicList' :key='index' :class='{backColor:setMusicItemBack(index)}'>
          <td>{{ setSerial(index) }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.song }}</td>
          <td>{{ item.time }}</td>
        </tr>
      </table>
    </div>

  </div>
</template>
<script>
import { _getMusicListDetail, _getSongsDetail } from 'api/detail';
import { tableMixin } from '@/mixins/tableMixin';
import { mixinsPlayMusic } from '@/mixins/mixinsPlayMusic';
import { formDate } from '@/assets/common/tool';

export default {
  name: 'songRank',
  props: {
    // 排行榜单ID
    rankId: {
      type: Number,
      default: () => 0,
    },
    // 背景颜色
    bgColor: {
      type: Array,
      default: () => [],
    },
    // 标题
    titleList: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      musicList: [],
      musicListDetail: null,
      // 榜单时间
      updateTime: null,
    };
  },
  mixins: [tableMixin, mixinsPlayMusic],
  created() {
    this.initMusicRankList();
  },
  computed: {
    getUpdateTime() {
      return formDate(new Date(this.updateTime), 'mm:dd');
    },
  },
  methods: {
    // 获取音乐榜单数据
    async initMusicRankList() {
      // 根据榜单id获取榜单id和时间
      const {
        data: {
          playlist: { updateTime, trackIds },
        },
      } = await _getMusicListDetail(this.rankId);
      this.updateTime = updateTime;
      // 只获取排行榜前八歌曲，id可以传入id数组
      const ids = trackIds
        .slice(0, 8)
        .map(item => {
          return item.id;
        })
        .join(',');
      const {
        data: { songs },
      } = await _getSongsDetail(ids);
      this.musicList = songs.map(item => {
        return {
          id: item.id,
          name: item.name,
          album: item.al.name,
          song: item.ar[0].name,
          pic: item.al.picUrl,
          time: formDate(new Date(item.dt), 'mm:ss'),
        };
      });
    },
    // 跳转到音乐排行榜单详情页面
    goMusicListDetail() {
      this.$router.push('/musiclistdetail/' + this.rankId);
    },
    // 混入音乐
    handlePlayIconClick() {
      this.playMusic();
    },
    setMusicItemBack(i) {
      return i % 2 !== 0;
    },
  },
};
</script>
<style lang='less' scoped>
  .rank-item {
    margin-right: 15px;
    width: 300px;
    height: 400px;
    color: #01060a;
    cursor: pointer;
  }

  .rank-item-top {
    position: relative;
    width: 100%;
    height: 100px;
    color: #fff;
  }

  .rank-item-top .left {
    padding: 0px 25px;
    padding-top: 10px;
    width: 200px;
    display: flex;
    align-items: center;
  }

  .left-itemF {
    margin-right: 10px;
    font-size: 54px;
  }

  .set {
    position: relative;
    display: flex;
  }

  .update {
    position: absolute;
    left: 5px;
    top: 15px;
    width: 100px;
  }

  .left-item {
    margin-top: -20px;
    font-size: 26px;
  }

  .right {
    position: absolute;
    margin: auto;
    right: 20px;
    top: 0px;
    bottom: 0px;
    width: 50px;
    height: 50px;
  }

  .right img {
    width: 100%;
  }

  .center {
    width: 100%;

    > table {
      width: 100%;
      font-size: 12px;
      color: #01060a;

      > tr {
        width: 100%;
        height: 30px;
        text-align: left;
      }
    }
  }

  .center tr:nth-child(1) td:nth-child(1),
  .center tr:nth-child(2) td:nth-child(1),
  .center tr:nth-child(3) td:nth-child(1) {
    color: #b82525;
  }

  .center tr td:nth-child(2) {
    color: #909192;
  }

  .center tr:hover {
    background-color: #2c2e32;
    color: #fff;
  }

  .center tr td {
    border: none;
    position: relative;
  }
</style>
