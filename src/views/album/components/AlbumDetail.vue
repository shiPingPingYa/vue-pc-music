<template>
  <div class="album_detail">
    <h3>专辑介绍</h3>
    <div class="album_detail_content" v-for="(item, index) in description" :key="index">
      <p>{{ item }}</p>
    </div>
  </div>
</template>
<script>
export default {
  name: 'AlbumDetail',
  props: {
    albumDescription: {
      type: String,
      default() {
        return '';
      }
    }
  },
  data() {
    return {
      description: []
    };
  },
  watch: {
    albumDescription(val) {
      if (val !== '') {
        this.formText(val);
      }
    }
  },
  methods: {
    formText(text) {
      text.split('\n').forEach(item => {
        if (item !== '') {
          this.description.push(item);
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.album_detail {
  width: 100%;
  height: 100%;
  padding: 20px;
  .album_detail_content {
    padding: 8px 4px 8px 30px;
    color: rgb(110, 109, 109);
  }
}
</style>
