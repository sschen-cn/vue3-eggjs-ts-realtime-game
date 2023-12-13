<template lang="pug">
.main
  router-view(v-slot='{ Component }')
    transition(:name='transitionName')
      keep-alive(include="home")
        component(:is='Component')
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, watch } from 'vue'
import router from './router'

export default defineComponent({
  name: 'app',
  setup() {
    interface DataProps {
      transitionName: string
    }
    const data: DataProps = reactive({
      transitionName: '',
    })
    router.afterEach((to, from) => {
      if (to.meta.index !== undefined && from.meta.index !== undefined) {
        if (to.meta.index > from.meta.index) {
          data.transitionName = 'slideIn'
        } else if (to.meta.index < from.meta.index) {
          data.transitionName = 'slideOut'
        } else {
          data.transitionName = ''
        }
      }
    })
    const refData = toRefs(data)
    return {
      ...refData,
    }
  },
})
</script>

<style lang="stylus">
@import 'assets/styles/reset.styl'
@import 'assets/styles/global.styl'
</style>
