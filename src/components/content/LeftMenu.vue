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
      <div class="title" @click.stop="isMML(isSongList)">
        <div class="icon">我的歌单 <i v-show="$store.state.user !== null" :class="{ 'el-icon-bottom':icon, 'el-icon-right':!icon}"></i></div>

        <keep-alive>
       <my-song-list class="my-song-list" v-show="isSongList"></my-song-list>
        </keep-alive>
      </div>
    </dl>
  </div>
</template>
<script>
import MySongList from './user/MySongList'
import { mapState } from 'vuex'
export default {
  name: 'LeftMenu',
  components: { MySongList },
  data () {
    return {
      currentIndex: 1,
      icon: true,
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
          link: '/transceiver',
          class: 'el-icon-bell',
          title: '电台',
          icon: false,
          transform: 'rotate'
        },
        {
          link: '/video/allvideo',
          class: 'el-icon-video-camera',
          title: '视频',
          icon: false,
          transform: false
        },
        {
          link: '/friend/frienddetail',
          class: 'el-icon-s-custom',
          title: '朋友',
          icon: false,
          transform: false
        }
      ]
    }
  },
  computed: {
    ...mapState(['isSongList'])
  },
  methods: {
    checkClick (index) {
      if (this.list[index].icon) return
      this.currentIndex = index
    },
    // 显示喜欢歌单
    isMML (flag) {
      this.icon = !this.icon
      this.$store.commit('userSongList', !flag)
    }
  }
}
</script>
<style lang="less" scoped>
.left-menu{
  width: 18%;
  height: 100%;
  color: #0a0a0a;
  background:#f5f5f7;;
  user-select: none;
  opacity: 0.8;
}

dl{
  width: 100%;
  height: 100%;
}

dl a{
  color: #0a0a0a;
  text-decoration: none;
}

.title{
  margin-top: 10px;
  padding-left: 10px;
  font-size: 14px;
  color: #000a0d;
  background-color: #f5f5f7;
  cursor: pointer;
  div{
    display: block;
    width: 100%;
    height: 30px;
  }
  > .icon{
    display: flex;
    position: relative;
    align-items: center;
    justify-content: space-between;
    i{
      position: absolute;
      right: 40%;
      vertical-align: -4px;
    }
  }
}

.my-song-list{
  height: calc(100vh - 58px - 59px - 288px)  !important;
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
  background-color: #e6e7eb;
  opacity: 1;
}
dd > div{
  > i{
      width: 20px;
      height: 20px;
  }

}

.action{
  background-color: #e6e7eb;
  border-left: 4px solid #b82525;
}

#rotate{
  transform: rotate(90deg);
}
</style>
