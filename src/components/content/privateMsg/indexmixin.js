import {
  formDate
} from '../../../assets/common/tool'
export const privateDetailMixin = {
  methods: {
    // 处理时间
    handlePrivateTime (time) {
      return formDate(new Date(time), 'ff:mm:dd')
    }
  }
}
