<template>
  <div class="music-base-info" v-if="baseInfo !== null">
      <!-- 歌单信息 -->
    <div class="base">
      <!-- 歌单默认信息图片 -->
      <div class="title">
        <img :src="baseInfo.img" alt="">
      </div>
      <!-- 歌单内容 -->
      <div class="content">
        <!-- 头部榜单和播放数量 -->
        <div class="top">
         <span class="icon">歌单</span>
         <span>
           {{baseInfo.name}}
         </span>
          <div class="right">
            <table>
              <tr>
                <td>歌曲数量
                   <br>
                {{baseInfo.trackCount}}
                </td>
                <td>播放量
                  <br>
                   {{baseInfo.playCount}}
                </td>

              </tr>
            </table>
          </div>
        </div>
        <!-- 中间三按钮 -->
        <div class="center">
          <div class="play">
            <img src="../../../assets/img/playmusic/bofang.svg" alt="">
            播放全部
          </div>
           <div class="collect">
            <i class="el-icon-folder-add"></i>
            收藏
          </div>
           <div class="share">
            <i class="el-icon-share"></i>
            分享
          </div>
        </div>
        <!-- 歌单描述 -->
        <div class="desc">
          <div class="item">标签:</div>
          <div class="desc-item">{{baseInfo.title}}</div>
        </div>
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
      default () {
        return {}
      }
    }
  }
}
</script>
<style lang="less" scoped>
.music-base-info{
  width: 100%;
  height: 200px;
}

.base{
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
}

.title{
  width: 200px;
  height: 100%;
 > img{
    width: 100%;
    height: 100%;
  }
}

.content{
  position: relative;
  padding:0 20px;
  width: 90%;
  height: 100%;
  flex: 1;
  overflow: hidden;
}

.top{
  margin: 6px auto;
  width: 100%;
  height: 30px;
  > .icon{
    padding: 5px;
    border: 1px solid red;
    border-radius: 4px;
    color: red;
    font-size: 12px;
  }
  > span{
    font-size: 26px;
    vertical-align: auto;
  }
  >.right{
    float: right;
    color: #4E4E52;
  td{
    text-align: center;
    font-size: 12px;
    padding: 5px;
    cursor: pointer;
  }
  }

}

.center{
  padding-top: 40px;
  display: flex;
  align-items: center;
  > div{
    margin-right: 10px;
    padding: 5px 10px;
    width: 100px;
    height: 30px;
    text-align: center;
    background-color: #25272b ;
    border-radius: 10px;
    font-size: 14px;
    cursor: pointer;
  }
  > .play{
    background-color: #CD2929;
    img{
    width: 14px;
    height: 14px;
    vertical-align: -2px;
    }
  }

}

.desc{
  position: absolute;
  bottom: 0;
  height: 50px;
  font-size: 14px;
  > .item{
    display: inline-block;
  }
  > .desc-item{
    line-height: 30px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
  }
}
</style>>
