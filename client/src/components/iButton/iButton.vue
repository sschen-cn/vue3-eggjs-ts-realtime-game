<template lang="pug">
.button(
  :style='{ width: width + "px", height: height + "px", lineHeight: height + "px", fontSize: height / 2 + "px", borderRadius: height / 2 + "px" }'
)
  .content {{ text }}
</template>
<script lang="typescript">
import { defineComponent, h, render } from 'vue'
import Vue from 'vue'

const IButtonComponent = defineComponent({
  name: 'iButton',
  props: {
    text: {
      type: String,
      default: 'default',
    },
    width: {
      type: String,
      default: '120',
    },
    height: {
      type: String,
      default: '36',
    },
  },
  setup() {
    return {}
  },
})
export default IButtonComponent
</script>
<style lang="stylus">
.button
  // width 120px
  // height 36px
  // border-radius 18px
  background-color rgba(79, 118, 245, 1)
  text-align center
  // line-height 36px
  // font-size 18px
  font-weight 500
  color white
.button:active
  background-color rgba(79, 118, 245, 0.76)
</style>