import iDialog from './iDialog.vue'

export default {
  extends: iDialog,
  computed: {
    style () {
      return {
        postion: 'fixed',
        right: '0',
        left: '0',
        top: '0',
        bottom: '0'
      }
    }
  }
}