<template>
  <div class="lyric" v-if="lyric !== ''">
    <scroll ref="scroll" class="lyric-scroll">

    </scroll>
  </div>
</template>
<script>
import Scroll from '../../common/scroll/Scroll'
export default {
  name: 'Lyric',
  components: { Scroll },
  props: {
    lyric: {
      type: String,
      default () {
        return ''
      }
    }
  }
}
</script>
<style lang="less" scoped>

</style>
