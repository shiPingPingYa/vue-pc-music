<template>
  <div class="base" v-if="baseInfo!== null">
    <div class="title">
      <img v-if="baseInfo.picUrl!== null" :src="baseInfo.picUrl"  >
      <img v-if="baseInfo.picUrl == null " :src="picUrl" alt="">
    </div>
    <div class="content">
      <div class="top">
        <span class="icon">歌手</span>
        <span>{{baseInfo.name}}</span>
        <span class="right">收藏</span>
      </div>
      <div class="center">
        <div class="play">
          <img src="../../../assets/img/leftmenu/music.svg" alt="">
          单曲数:{{baseInfo.musicSize}}
        </div>
        <div class="album">
          <img src="../../../assets/img/artist/album.svg" alt="">
          专辑数:{{baseInfo.albumSize}}
        </div>
      </div>
      <div class="describe">
        <div class="introduce">
          个人介绍:
          <span>{{desc}}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { _getArtistDetail } from '../../../network/artist'
export default {
  name: 'ArtistBaseInfo',
  props: {
    desc: {
      type: String,
      default () {
        return ''
      }
    },
    baseInfo: {
      type: [Object, String],
      defaul () {
        return {}
      }
    }
  },
  data () {
    return {
      picUrl: ''
    }
  },
  async created () {
    if (this.baseInfo.picUrl === null || this.baseInfo.picUrl === undefined) {
      await _getArtistDetail(this.baseInfo.id).then(res => {
        this.picUrl = res.data.data.artist.cover
      })
    }
  }
}
</script>
<style lang="less" scoped>
.base{
  display: flex;
  width: 100%;
  height: 168px;
}

.title{
  margin-right: 18px;
  width: 200px;
  height: 100%;
  >img{
    width: 100%;
    height: 100%;
    opacity: 0.8;
    background-size: 100%,100%;
  }
}

.content{
  position: relative;
  width: 100%;
  height: 100%;
  > .top{
    padding-top: 8px;
    height: 18%;
    color: #0a0a0a;
    >span{
      font-size: 20px;
    }
    > .icon{
      margin-right: 10px;
      padding: 5px;
      border-radius: 4px;
      border: 1px solid red;
      color: red;
      font-size: 12px;
    }
    > .right{
      float: right;
      display:inline-block;
      width: 8%;
      height: 30px;
      line-height: 30px;
      text-align: center;
      background-color: #eceef1;
      font-size: 14px;
      border-radius: 10px;
      cursor: pointer;
    }
  }
  > .center{
    display: flex;
    margin: 4% 0 5% 0;
    height: 25%;
    align-items: center;
    > div{
        margin-right: 10px;
        padding: 4px 10px;
        background-color: #a6a6ac;
        border-radius: 10px;
        cursor: pointer;
        color: #fff;
    }
    > .play{
      > img{
        width: 18px;
        height: 18px;
        vertical-align: -4px;
      }
    }
    > .album{
      > img{
        width: 18px;
        height: 18px;
        vertical-align: -4px;

      }
    }
  }
  > .describe{
    position: absolute;
    height: 30%;
    font-size: 14px;
    max-height: 46px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    color: #0a0a0a;
    bottom: 0;
    > .introduce {
    padding: 5px 0;
    > span{
      color: #2e6bb0;
      font-size: 14px;
    }
    }
  }

}

</style>
