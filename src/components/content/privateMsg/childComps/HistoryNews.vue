<template>
  <div class="history_news" v-if="historyList.length !== 0">
    <div class="new_headers">
      <div @click="prePrivateDetail">
        <img src="../../../../assets/img/privateNews/pre.svg" alt="" />
      </div>
      <div>
        {{ historyList[0].nickname }}
      </div>
      <div @click="cancelHistory">
        <img src="../../../../assets/img/privateNews/replay_privateNews.svg" alt="" />
      </div>
    </div>
    <div class="new_container">
      <scroll
        ref="history_news_scroll"
        class="history_news_scroll"
        :pullDownRefresh="true"
        scrollbar
        @pullingDown="pullingDown"
      >
        <div
          class="history_news_list"
          v-for="(item, index) in historyList"
          :key="index"
        >
          <div class="history_time">{{ handleHistoryTime(item.time) }}</div>
          <div class="history_img">
            <img :src="item.avatarUrl + '?param=40y40'" alt="" />
          </div>
          <div class="history_container">
            <div class="share_title">
              <span v-show="item.text">{{ item.text }}:</span
              >{{ item.shareTitle }}
            </div>
            <div
              class="share_event_mv"
              v-if="item.type === 7"
              @click="goPlayMV(item.mvId)"
            >
              <img :src="item.userImage" alt="" />
              <div class="share_event_mv_content">
                <div class="mv_content_title">
                  <div>
                    <span>{{ item.tag }}</span> {{ item.contentTitle }}
                  </div>
                </div>
                <div class="mv_content_play">
                  <i class="el-icon-video-play" v-show="!isPlay"></i>
                  <i class="el-icon-video-pause" v-show="isPlay"></i>
                </div>
                <div class="mv_content_playNum">
                  <div>{{ item.playCount }}</div>
                  <div>{{ item.duration }}</div>
                </div>
              </div>
            </div>
            <div
              class="share_event"
              v-else
              @click="goPlayMusic(item.type, item.id)"
            >
              <div class="share_event_image">
                <img :src="item.userImage + '?param=40y40'" alt="" />
              </div>
              <div class="share_event_content">
                <div
                  class="user_share_title"
                  style="height: 54px; overflow: hidden"
                >
                  {{ item.title }}
                  <div
                    class="user_share_name"
                    v-show="item.type === 1 || item.type === 2"
                  >
                    {{ item.nickname }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </scroll>
    </div>
  </div>
</template>
<script>
import Scroll from '../../../common/scroll/Scroll.vue'
import { SongDetail, _getSongsDetail } from '../../../../network/detail'
import { formDate } from '../../../../assets/common/tool'
import { indexMixin } from '../../../../views/musicListDetail/indexMixin'
export default {
  name: 'HistoryNews',
  props: {
    historyList: {
      type: Array,
      default () {
        return []
      }
    },
    more: {
      type: Boolean,
      default () {
        return false
      }
    }
  },
  data () {
    return {
      isPlay: false,
      musicList: []
    }
  },
  components: { Scroll },
  mixins: [indexMixin],
  methods: {
    prePrivateDetail () {
      this.$emit('prePrivateDetail')
    },
    cancelHistory () {
      this.$emit('cancelHistory')
    },
    pullingDown () {
      if (!this.more) return this.$message.info('没有更多历史记录了')
      else {
      }
      this.$refs.history_news_scroll.finishPullDown()
      console.log('history', '获取更多历史记录')
    },
    handleHistoryTime (time) {
      return formDate(new Date(time), 'f:mm:dd-hh:mm')
    },
    goPlayMV (id) {
      this.$router.push('/playmv/' + id)
      this.$emit('hideStatus')
    },
    goPlayMusic (type, id) {
      if (type === 12 || type === 23) return true
      // 12和23是网易云推出活动不用管，1歌曲，7mv，2专辑
      switch (type) {
        case 1:
          _getSongsDetail(id).then((res) => {
            this.musicList.push(new SongDetail(res.data.songs))
            this.playMusic()
          })
          break
        case 2:
          this.$router.push('/artist/albumDetail/' + id)
      }
    }
  },
  mounted () {
    if (this.$refs.history_news_scroll !== undefined) {
      const maxY = this.$refs.history_news_scroll.getMaxScrollY()
      this.$refs.history_news_scroll.scrollTo(0, maxY, 0)
    }
  }
}
</script>
<style lang="less" scoped>
  .history_news {
    width: 40%;
    height: 88%;
    box-shadow: 0 1px 8px black;
    .new_headers {
      display: flex;
      justify-content: space-between;
      height: 50px;
      padding: 6px 10px;
      line-height: 50px;
      text-align: top;
      background: #e9eaeb;
      div img {
        width: 20px;
        height: 20px;
        &:hover {
          cursor: pointer;
        }
      }
    }
    .new_container {
      height: 100%;
      background: #fff;
      overflow: hidden;
    }
  }
  .history_news_scroll {
    height: 100%;
    overflow: hidden;
  }

  .history_news_list {
    display: flex;
    width: 100%;
    padding: 10px;
    justify-content: flex-start;
    flex-wrap: wrap;
    .history_time {
      width: 100%;
      height: 30px;
      margin: 10px 30%;
      text-align: center;
      line-height: 30px;
      color: rgb(153, 150, 150);
      background: rgb(243, 241, 241);
      border-radius: 10px;
    }
    .history_img {
      width: 16%;
      padding: 0 6px 0 20px;
      img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
      }
    }
    .history_container {
      flex: 1;
      margin-right: 18%;
      padding: 6px;
      background: rgb(243, 241, 241);
      .share_event {
        display: flex;
        margin: 10px 0 10px 0;
        padding: 20px;
        justify-content: flex-start;
        height: 80px;
        background: #fff;
        .share_event_image {
          width: 40px;
          height: 40px;
          img {
            width: 40px;
            height: 40px;
          }
        }
        .share_event_content {
          flex: 1;
          padding-left: 10px;
          font-size: 14px !important;
        }
        &:hover {
          cursor: pointer;
        }
      }
    }
  }
  .user_share_name {
    padding-top: 6px;
  }

  .share_event_mv {
    position: relative;
    width: 232px;
    height: 160px;
    margin: 10px 0 0 6px;
    color: #fff;
    background: rgb(223, 222, 222);
    img {
      width: 100%;
      height: 100%;
    }
    .share_event_mv_content {
      position: absolute;
      top: 0;
      right: 0;
      width: 100%;
      height: 100%;
      padding: 10px;
      &:hover {
        cursor: pointer;
      }
      .mv_content_title {
        height: 20%;
        span {
          padding: 2px;
          border: 1px solid #fff;
          font-size: 14px !important;
        }
      }
      .mv_content_play {
        height: 60%;
        line-height: 80px;
        text-align: center;
        font-size: 40px;
      }
      .mv_content_playNum {
        display: flex;
        justify-content: space-between;
        height: 20%;
      }
    }
  }
</style>
