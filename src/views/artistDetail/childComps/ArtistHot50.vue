<template>
  <div class="artist-album" v-if="musicList.length !== 0">
    <p class="top">热门50首</p>
    <div class="hot50">
      <!-- 左边内容区域 -->
      <div class="left">
        <!-- //专辑图片 -->
        <div class="icon">
          <img :src="musicList[0].pic" alt="">
        </div>
      </div>
      <!-- 右边内容区域 -->
      <div class="right">
        <!-- 通过下面toggle-fold来动态切换类名fold(flold写死了高320) -->
        <div class="music" :class="{fold:fold}">
          <table>
            <tbody>
              <tr v-for="(item,index) in musicList" :key="index"
              :class="{backColor:setBackColor(index)}"
              @dblclick="handleCurrentIndex(index)">
                <td :class="{curFont:playIndex == index}">
                  {{setSerial(index)}}
                  <div class="curPlay" v-show="playIndex == index">
                    <img src="../../../assets/img/playmusic/currentplay.svg" alt="">
                  </div>
                </td>
                <td>
                    <img src="../../../assets/img/leftmenu/live.svg" alt class="live" />
                  <img src="../../../assets/img/leftmenu/xiazai.svg" alt class="download" />
                </td>
                <td>{{item.name}}</td>
                <td>{{item.album}} </td>
                <td>{{item.time}} </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="toggle-fold" @click="handleFold()">
          <span v-if="fold">查看全部</span>
          <span v-if="!fold">收起</span>
        </div>
      </div>
<div class="clear"></div>
    </div>
  </div>
</template>
<script>
import { tableMixin } from '../../musicListDetail/tableMixin'
import { playMinxin } from '../../musicListDetail/playMixin'
import { indexMixin } from '../../musicListDetail/indexMixin'
export default {
  name: 'ArtistHot',
  props: {
    musicList: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      fold: true
    }
  },
  mixins: [tableMixin, playMinxin, indexMixin],
  methods: {
    // 动态处理fold
    handleFold () {
      this.fold = !this.fold
    },
    // 处理音乐小喇叭
    handleCurrentIndex (i) {
      this.playMusic(i)
    }
  }
}
</script>
<style lang="less" scoped>
.artist-album{
  width: 100%;
  > .top{
    padding-left: 26%;
    display: block;
    height: 20px;
    color: #e5e5e5;
    font-size: 14px;
  }
  > .hot50{
    display: flex;
    width: 100%;
    justify-content: flex-start;
    >.left{
      width: 20%;
      > .icon{
        width: 100%;
        > img{
          padding: 0 0 0 20px;
          width: 100%;
        }
      }
    }
    > .right{
      position: relative;
      margin-left: 40px;
      width: 75%;
    }
  }
}

.music > table{
  margin-top: 4px;
  width: 100%;
  border: 1px solid #2c2e32;
}

.music tbody {
  color: #575757;
}
.music tbody tr td{
    border: none;
}

.music tr td{
  position: relative;
  border: 1px solid #23262c;
}

.musci tr{
  height: 30px;
  text-align: left;
}

.music tr:hover{
  color: #fff;
  background-color: #2c2e32;
  cursor: pointer;
}

.music tr td:nth-child(1){
  width: 10%;
  text-align: center;
  color: rgb(36, 199, 240);
}

.music tr td:nth-child(2){
  width: 12%;
  >img{
    width: 20px;
    opacity: 0.4;
  }
}

.music tr td .live{
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    margin: auto;
}

.music tr td .download{
    margin-left: 26px;
}
.music tbody tr td:nth-child(3){
    width: 24%;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    color: #fff;
}

.music tr td:nth-child(4){
    width: 16%;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
}
.music tr td:nth-child(5){
    width: 16%;
}
.music tr td:nth-child(6){
    width: 16%;
}

.live{
  width: 20px !important;
  height: 26px  !important;
  vertical-align: 2px;
}
.download{
  width: 20px  !important;
  height: 26px  !important;
}

.fold{
  height: 320px;
  overflow: hidden;
}

.toggle-fold{
  position: absolute;
  bottom: -30px;
  color: #828385;
  cursor: pointer;
}

.toggle-fold:hover{
  color: whitesmoke;
}

</style>
