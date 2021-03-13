<template>
  <div class="left-menu" v-if="list !== null">
    <dl>
      <router-link :to="item.link" v-for="(item, index) in list" :key="index">
        <dd :class="{title:item.icon,action:currentIndex == index}"
        @click="checkClick(index)">
          <div>
            <i :class="item.class" ></i>
            {{item.title}}
          </div>
        </dd>
      </router-link>
    </dl>
  </div>
</template>
<script>
export default {
  name: 'LeftMenu',
  data () {
    return {
      currentIndex: 1,
      list: [
        { link: '', class: '', title: '推荐', icon: true, transform: false },
        {
          link: '/discover',
          class: 'el-icon-bell',
          title: '发现音乐',
          icon: false,
          transform: false
        },
        {
          link: '/allmv',
          class: 'el-icon-video-camera-solid',
          title: '全部MV',
          icon: false,
          transform: false
        },
        {
          link: '/directSeeding',
          class: 'el-icon-collection-tag',
          title: 'LOOK直播',
          icon: false,
          transform: 'rotate'
        },
        {
          link: '/video',
          class: 'el-icon-video-camera',
          title: '视频',
          icon: false,
          transform: false
        },
        {
          link: '/friend',
          class: 'el-icon-s-custom',
          title: '朋友',
          icon: false,
          transform: false
        },
        { link: '/mymusic', class: '', title: '我的音乐', icon: true, transform: false },
        {
          link: '/localmusic',
          class: 'el-icon-question',
          title: '本地音乐',
          icon: false,
          transform: false
        },
        {
          link: '/downloadmusic',
          class: 'el-icon-download',
          title: '下载音乐',
          icon: false,
          transform: false
        },
        {
          link: '/musicclouddisk',
          class: 'el-icon-upload',
          title: '我的音乐云盘',
          icon: false,
          transform: false
        },
        { link: '/allmv', class: '', title: '我的歌单', icon: true, transform: false }

      ]
    }
  },
  created () {
    var that = this
    for (var i in this.list) {
      (function (e) {
        if (that.list[e].link === that.$route.path) {
          setTimeout(() => {
            that.checkClick(e)
          }, 100)
        }
      })(i)
    }
  },
  methods: {
    checkClick (index) {
      if (this.list[index].icon) return
      this.currentIndex = index
    }
  }
}
</script>
<style lang="less" scoped>
.left-menu{
  width: 18%;
  height: 100%;
  background-color: #191b1f;
  // background-color: #fff;

  color: #fff;
}

dl{
  width: 100%;
  height: 100%;
}

dl a{
  color: #fff;
  text-decoration: none;
}

.title{
  margin-top: 10px;
  padding-left: 10px;
  font-size: 14px;
  opacity: 0.6;
}

dd{
  display: flex;
  padding: 5px 15px;
  height: 30px;
  line-height: 30px;
  font-size: 14px;
  opacity: 0.6;
  align-items: center;
}

dd:hover{
  background-color: #26282c;
  opacity: 1;
}
dd > div{
  > i{
      width: 20px;
      height: 20px;
  }

}

.action{
  background-color: #26282c;
  border-left: 4px solid #b82525;
}

#rotate{
  transform: rotate(90deg);
}
</style>
