<template lang="pug">
section.room
  Header(title='tictactoe')
  .room-content
    .op-character-wrapper
      .character-icon(
        :class='{ blue: opCharacter === "O", purple: opCharacter === "X" }'
      ) {{ opCharacter }}
      div opponent's player: {{ $route.params.againstname }}
    .grid-board
      .grid-item(
        v-for='(grid, index) in grids',
        :key='index',
        @click='handleClick(index)',
        :class='{ blue: grid === "O", purple: grid === "X" }'
      ) {{ grid }}
    .name-wrapper
      .character-icon(
        :class='{ blue: character === "O", purple: character === "X" }'
      ) {{ character }}
      .your-name your name: {{ socketController._playerName }}
    .tips-wrapper(v-if='result === ""')
      .character-icon(
        :class='{ blue: moveCharacter === "O", purple: moveCharacter === "X" }'
      ) {{ moveCharacter }}
      .tips {{ tips }}
    .result-wrapper(v-else)
      .result {{ result }}
</template>
<script lang="ts">
import router from '../router'
import { ExchangeEvent, socketController } from '../utils/SocketController'
import {
  computed,
  defineComponent,
  onActivated,
  onBeforeUnmount,
  onMounted,
  reactive,
  toRefs,
  watch,
} from 'vue'
import { useRoute } from 'vue-router'
const RoomComponent = defineComponent({
  name: 'room',
  setup() {
    const route = useRoute()
    interface DataProps {
      grids: Array<string>
      character: string
      resign: boolean
      opCharacter: string
      moveCharacter: string
      canMove: boolean
      tips: string
      result: string
    }
    const data: DataProps = reactive({
      grids: ['', '', '', '', '', '', '', '', ''], // 棋盘数据
      character: route.params.character as string, // 本方执子
      resign: false, // 放弃标记
      opCharacter: computed(() => {
        return data.character === 'O' ? 'X' : 'O'
      }), // 对方执子
      canMove: computed(() => {
        let xcount = data.grids.reduce((a, v) => (v === 'X' ? a + 1 : a + 0), 0)
        let ocount = data.grids.reduce((a, v) => (v === 'O' ? a + 1 : a + 0), 0)
        if (ocount <= xcount) {
          return data.character === 'O'
        } else {
          return data.character === 'X'
        }
      }),
      moveCharacter: computed(() => {
        return data.canMove
          ? data.character
          : data.character === 'O'
          ? 'X'
          : 'O'
      }), // 当前行子
      tips: computed(() => {
        return data.canMove
          ? `(${socketController._playerName}) Your turn`
          : `(${route.params.againstname}) Opponent's turn`
      }),
      result: '',
    })
    const refData = toRefs(data)
    watch(
      () => data.moveCharacter,
      (oldVal, newVal) => {
        let count = data.grids.indexOf('')
        let result = check(data.grids, newVal)
        if (result) {
          if (newVal === data.character) {
            data.result = `You win`
          } else {
            data.result = `Opponent win`
          }
        } else {
          if (count === -1) {
            data.result = `Half a match`
          }
        }
      }
    )
    onMounted(() => {
      if (!socketController._playerName) {
        router.back()
      } else {
        data.resign = true
        socketController.addListener(_onRoomPageReceived)
      }
    })
    onBeforeUnmount(() => {
      if (data.resign) {
        console.log(`放弃`)
        socketController.resign()
      }
      socketController.removeListener(_onRoomPageReceived)
    })
    const _onRoomPageReceived = (msg: string) => {
      const message = JSON.parse(msg)
      const action = message.data.action
      const payload = message.data.payload
      switch (action) {
        case ExchangeEvent.RESIGN:
          console.log(`对方放弃`)
          data.resign = false
          router.back()
          break
        case ExchangeEvent.PLAY:
          data.grids = payload.grids
        default:
          break
      }
    }
    const handleClick = (index: number) => {
      if (data.grids[index] === '' && data.canMove && data.result === '') {
        data.grids[index] = data.character
        socketController.play(data.grids)
      }
    }
    function check(grids: Array<string>, character: string) {
      let r = false
      // 检查横向
      for (let i = 0; i < 9; i = i + 3) {
        if (
          grids[i] == character &&
          grids[i + 1] == character &&
          grids[i + 2] == character
        ) {
          r = true
        }
      }
      // 检查竖向
      for (let i = 0; i < 3; i++) {
        if (
          grids[i] == character &&
          grids[i + 3] == character &&
          grids[i + 6] == character
        ) {
          r = true
        }
      }
      // 检查斜向
      if (
        (grids[0] == character &&
          grids[4] == character &&
          grids[8] == character) ||
        (grids[2] == character &&
          grids[4] == character &&
          grids[6] == character)
      ) {
        r = true
      }
      return r
    }

    return {
      ...refData,
      handleClick,
      socketController,
    }
  },
})
export default RoomComponent
</script>
<style lang="stylus" scope>
.room
  padding-top 72PX
  width 100vw
  height 100vh
  background-color white
.room-content
  max-width 800PX
  margin 0 auto
.op-character-wrapper
  margin-left 20px
  padding 10px
  display flex
  font-size 16px
.grid-board
  margin 0px auto
  width 300px
  height 300px
  display grid
  grid-template-columns 100px 100px 100px
  grid-template-rows 100px 100px 100px
.grid-board .grid-item
  margin 1px
  border-radius 5px
  border 1px solid grey
  text-align center
  line-height 100px
  font-size 64px
.name-wrapper
  margin-right 20px
  padding 10px
  display flex
  justify-content flex-end
  font-size 16px
.tips-wrapper
  margin-top 10px
  display flex
  font-size 16px
  justify-content center
.result-wrapper
  margin-top 10px
  display flex
  font-size 16px
  justify-content center
.your-name
  text-align right
  margin-right 10px
.blue
  color rgb(61, 236, 255)
.purple
  color rgb(183, 101, 233)
.character-icon
  margin 0 5px
</style>
<style scoped>
#s {
  color: rgb(61, 236, 255);
}
</style>
