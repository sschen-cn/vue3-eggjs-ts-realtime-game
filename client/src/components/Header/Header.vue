<template lang="pug">
section.header
  .back-icon
    img.icon(
      src='@/assets/images/back.svg',
      v-if='!isIndex',
      @click='handleclick'
    )
  .title {{ title }}
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, reactive, toRefs } from 'vue'
import router from '../../router'

const HeaderComponent = defineComponent({
  name: 'Header',
  props: {
    title: {
      type: String,
      default: 'Header',
    },
  },
  setup() {
    interface DataProps {
      isIndex: boolean
    }
    const data: DataProps = reactive({
      isIndex: router.currentRoute.value.path === '/' ? true : false,
    })

    const refData = toRefs(data)
    const handleclick = () => {
      router.back()
    }
    return {
      ...refData,
      handleclick,
    }
  },
})
export default HeaderComponent
</script>

<style lang="stylus" scoped>
.header
  position fixed
  top 0
  display flex
  height 72PX
  width 100%
  background linear-gradient(45deg, #42b9ff 0%, #42b983 100%)
.header .back-icon
  width 20%
.header .title
  color white
  font-size 28px
  text-align left
  line-height 72PX
.header .back-icon
  text-align center
  line-height 72PX
  padding-right 10px
.header .icon
  width 28px
  height 28px
</style>