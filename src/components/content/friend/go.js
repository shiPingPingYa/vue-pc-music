export const goTopicDetailMixin = {
  methods: {
    goTopicDetail (actid) {
      this.$router.push('/topicDetail/' + actid)
    }
  }
}
