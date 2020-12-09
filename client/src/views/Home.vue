<template lang="pug">
section.login
  Header(title='tictactoe')
  .login-content(v-if='!socketController._playerName')
    .input-main
      img(src='@/assets/images/user.svg')
      input(type='text', v-model='username', placeholder='enter name')
    iButton(:text='!loginState ? "Join" : "leave"', @click='handleClickLogin')
  .player-list-wrapper
    .title list of players
    ul.player-list
      li.player-content(v-for='(player, idx) in player_list') 
        .player-name {{ player.name }}
        iButton(
          text='Play',
          width='80',
          height='30',
          v-if='player.name != socketController._playerName',
          @click='handleClickInvite(player)'
        )
</template>

<script lang="ts">
import {
  defineComponent,
  onBeforeUnmount,
  onMounted,
  reactive,
  ref,
  toRefs,
} from 'vue'
import router from '../router'
import {
  ExchangeEvent,
  Player,
  socketController,
} from '../utils/SocketController'
export default {
  name: 'Login',
  setup() {
    interface DataProps {
      username: string
      loginState: boolean
      player_list: Array<Player>
    }
    const data: DataProps = reactive({
      username: '',
      loginState: false,
      player_list: [],
    })

    const handleClickLogin = async () => {
      await socketController.linkStart(data.username)
    }

    const handleClickInvite = async (player: Player) => {
      socketController.inviteGame(player)
      router.push({
        name: 'Room',
        params: { againstname: player.name, character: 'O' },
      })
    }

    const _onHomePageReceived = (msg: string) => {
      const message = JSON.parse(msg)
      const action = message.data.action
      const payload = message.data.payload
      switch (action) {
        case ExchangeEvent.PLAYER_LIST:
          data.player_list = payload
          break
        case ExchangeEvent.INVITE_GAME:
          const againstPlayer = payload.against
          router.push({
            name: 'Room',
            params: { againstname: againstPlayer.name, character: 'X' },
          })
        default:
          break
      }
    }

    onMounted(() => {
      socketController.addListener(_onHomePageReceived)
    })
    onBeforeUnmount(() => {
      socketController.removeListener(_onHomePageReceived)
    })

    const refData = toRefs(data)

    return {
      ...refData,
      handleClickLogin,
      handleClickInvite,
      socketController,
    }
  },
}
</script>

<style lang="stylus" scoped>
.login
  padding-top 72PX
.login .input-main
  display flex
  padding 10px
.login .input-main input
  height 36px
  width 100%
  border-radius 17px
  padding 0 20px
  font-size 18px
.login .input-main img
  margin 5px
  width 24px
  height 24px
.login .login-content .button
  margin 0 auto
.player-list-wrapper
  margin 10px auto 0
  padding 10px
  max-width 800PX
.player-list-wrapper .title
  text-align center
  font-size 20px
.player-content
  padding 0 10px
  display flex
  justify-content space-between
  align-items center
  height 48px
  border-bottom grey solid 1px
  font-size 18px
.player-content .player-name
  padding 10px
.player-content .button
  width 80px
</style>
