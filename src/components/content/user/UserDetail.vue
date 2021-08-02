<template>
  <el-container class="p-30">
    <el-header class="el_header">
      <el-row type="flex" justify="space-between">
        <el-col :span="4">
          <img
            class="user_image"
            :src="getUserImage + '?param=200y200'"
            alt=""
          />
        </el-col>
        <el-col :span="19" :offset="1">
          <el-row class="header" type="flex" justify="space-between">
            <el-col class="user_name" :span="10"
              >{{ userName }}
              <i :class="{ 'el-icon-male': userGender == 2 }"></i>
              <i
                :class="{ 'el-icon-female': userGender == 1 }"
                style="color: #f50707"
              ></i>
              <label class="user_level">Lv.{{ level }}</label>
            </el-col>
            <el-col class="user_icon t_r" :span="9"
              ><el-button>编辑个人信息</el-button>
            </el-col>
          </el-row>
          <el-row type="flex" justify="start">
            <el-col class="b-r" :span="4">
              <div class="user_name">{{ userEventCount }}</div>
              <div class="user_size">动态</div>
            </el-col>
            <el-col class="b-r" :span="4">
              <div class="user_name">{{ userFollows }}</div>
              <div class="user_size">关注</div>
            </el-col>
            <el-col class="b-r" :span="4">
              <div class="user_name">{{ userFolloweds }}</div>
              <div class="user_size">粉丝</div>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </el-header>
    <el-main>
      <el-row class="b-a" type="flex" justify="space-between">
        <el-col :span="4">我创建的歌单</el-col>
        <el-col class="t_r" :span="8" :offset="12">
          <label
            :class="[
              'table-item',
              tableImageIcon === index ? 'is-table-item' : '',
            ]"
            v-for="(item, index) in tableImageList"
            :key="index"
            @click="tableImageChange(index)"
          >
            <img :src="item.img" alt="" />
          </label>
        </el-col>
      </el-row>
      <me-song-list
        :songList="userSongList"
        :isTable="tableImageIcon"
      ></me-song-list>
    </el-main>
  </el-container>
</template>
<script>
// 解析vuex的state
import { mapState, mapGetters } from 'vuex'
const MeSongList = () => import('./childComps/MeSongList.vue')
export default {
  name: 'UserDetail',
  components: { MeSongList },
  data () {
    return {
      createSongList: [],
      collectSongList: [],
      tableImageList: [
        {
          img: require('../../../assets/img/table01.svg')
        },
        {
          img: require('../../../assets/img/table02.svg')
        },
        {
          img: require('../../../assets/img/table03.svg')
        }
      ],
      tableImageIndex: -1,
      tableImageIcon: 0
    }
  },
  computed: {
    ...mapState([
      'userName',
      'userGender',
      'userFollows',
      'userFolloweds',
      'userEventCount',
      'level',
      'userSongList'
    ]),
    ...mapGetters(['getUserImage'])
  },
  methods: {
    tableImageChange (i) {
      this.tableImageIcon = i
    }
  }
}
</script>
<style lang="less" scoped>
  .p-30 {
    padding: 30px;
  }
  .header {
    padding-bottom: 6px;
    border-bottom: 3px solid #828385;
  }
  .user_image {
    width: 100%;
    height: 100%;
  }
  .user_name {
    font-size: 26px;
  }
  .user_icon {
    font-size: 26px;
  }
  .t_r {
    text-align: right;
  }
  .user_level {
    display: inline-block;
    width: 60px;
    height: 30px;
    border: 0.8px solid red;
    text-align: center;
    line-height: 30px;
    font-weight: bold;
    color: red;
    font-size: 16px;
    border-radius: 16px;
    &:hover {
      cursor: pointer;
    }
  }
  .user_size {
    font-size: 14px;
    color: #828385;
  }
  .el_header {
    height: 150px !important;
    margin-bottom: 60px;
  }
  .b-a {
    padding: 10px 0;
    margin-bottom: 10px;
    border: 1px solid #828385;
    border-left: 0;
    border-right: 0;
  }
  .table-item {
    display: inline-block;
    margin-left: 10px;
    &:hover {
      cursor: pointer;
    }
    img {
      width: 20px;
      height: 20px;
      background-size: 100%;
    }
    img:nth-child(2) {
      width: 18px !important;
      height: 18px !important;
      background-size: 100%;
    }
  }
  .is-table-item {
    color: white;
    background-color: #dfd9d9;
  }
</style>
