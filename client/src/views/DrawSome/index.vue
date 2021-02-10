<template lang="pug">
.DrawSome
  video(id='video' autoplay style="width: 600px;height: 400px")
</template>

<script lang="ts">
import { VideoHTMLAttributes } from 'vue'
export default {
  setup() {
    // 获取本地的视频和音频流，{ audio: true, video: true }都是true这两个都获取
    let localStream
    navigator.mediaDevices
      .getUserMedia({ audio: true, video: true })
      .then(stream => {
        localStream = stream
      })
      .catch(err => {
        alert(err)
      })
    // //找到video标签，用一个video来接受流，并且显示
    // let video: VideoHTMLAttributes = document.querySelector('#video') as VideoHTMLAttributes
    // // 使用srcObject给video添加流
    // if (video) {
    //   video.src = localStream
    // }
  },
}
</script>

<style lang="stylus"></style>
