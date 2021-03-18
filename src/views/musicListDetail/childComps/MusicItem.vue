<template>
  <div class="music " v-if="musicList!=null">
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
        <tr v-for="(item,index) in musicList" :key="index"
        :class="{backColor:setBackColor(index)}"
        @dblclick="musicItemClick(index)">
          <td :class="{curFont:playIndex==index}">{{setSerial(index)}}
            <div class="curPlay" v-show="playIndex == index">
              <img src="../../../assets/img/playmusic/currentplay.svg" alt="">
            </div>
          </td>
          <td>
            <img src="../../../assets/img/leftmenu/live.svg" alt="" class="live">
            <img src="../../../assets/img/leftmenu/xiazai.svg" alt="" class="download">
          </td>
          <td>{{item.name}}</td>
          <td>{{item.song}} </td>
          <td>{{item.album}} </td>
          <td>{{item.time}} </td>

        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
// 处理音乐列表的背景和序号
import { tableMixin } from '../tableMixin'
// 音乐的显示与否playIndex
import { playMinxin } from '../playMixin'
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
  mixins: [tableMixin, playMinxin]
}
</script>
<style lang="less" scoped>
.music{
  width: 100%;
}

.music table{
  width: 100%;
}

.music thead{
  color: #828385;
}

.music tbody tr td{
    border: none;
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

.music tr td{
  position: relative;
  border: 1px solid #23262c;
}

.music tbody{
  color: #575757;
}

.music tr td:nth-child(1){
  width: 10%;
  text-align: center;
  color: rgb(36, 199, 240);
}

.music tr td:nth-child(2){
  width: 10%;
  >img{
    width: 20px;
    opacity: .9;
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
    width: 26%;
    max-width: 190px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    color: #dcdde4;
}

.music tr td:nth-child(4){
    width: 16%;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
}
.music tr td:nth-child(5){
    width: 16%;
    line-height: 30px;
    max-width: 162px  ;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
}
.music tr td:nth-child(6){
    width: 16%;
}

</style>
