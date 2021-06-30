<template>
  <div class="desc-detail" v-if="descDetail!= null">
    <div class="desc">
      <h3>{{artist.name}} 简介 </h3>
      <p>{{descDetail.briefDesc}} </p>
    </div>
    <div class="content">
      <div class="intro-item" v-for="(item,index) in descDetail.introduction" :key="index">
        <h3>{{item.ti}} </h3>
        <div>
          <p v-for="(item,index) in formatText(item.txt)" :key="index">
            {{item}}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { _getArtistDescDetail } from '../../../network/artist'
export default {
  name: 'AristDescDetail',
  data () {
    return {
      descDetail: null,
      artist: null
    }
  },
  async created () {
    // 获取请求数据用户
    this.artist = JSON.parse(localStorage.getItem('artist'))
    if (this.artist !== null) {
      // 根据用户id请求数据
      await _getArtistDescDetail(this.artist.id).then(res => {
        this.descDetail = res.data
      })
    }
  },
  methods: {
    formatText (text) {
      if (text !== null) {
        const newText = text.split('\n')
        return newText
      }
    }
  }
}
</script>
<style lang="less" scoped>
.desc-detail{
  padding-right: 20px;
  width: 100%;
}

.desc-detail h3{
  padding: 10px 0px;
  color: #0a0a0a;

}

.desc-detail p{
  margin-top: 10px;
  text-indent: 35px;
  line-height: 30px;
  font-size: 14px;
  color: #747577;
}
</style>
