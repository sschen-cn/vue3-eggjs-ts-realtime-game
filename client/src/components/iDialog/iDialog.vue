<template lang="pug">
.dialog-wrapper
  .dialog
</template>
<script lang="ts">
import { defineComponent } from 'vue'
const iDialogComponent = defineComponent({
  name: 'iDialog',
})
export default iDialogComponent
</script>
<style lang="stylus">
.dialog-wrapper
  position absolute
  top 0
  right 0
  left 0
  bottom 0
  background-color rgba(0, 0, 0, 0.7)
</style>