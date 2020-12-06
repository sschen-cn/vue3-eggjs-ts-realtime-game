import { Controller } from 'egg'
import { Player, players } from '../../model/player'

declare module 'egg' {
  interface CustomController {
    tictactoe: tictactoeController
  }
}

export enum ExchangeEvent {
  JOIN = 'join',
  PLAYER_LIST = 'player_list',
  INVITE_GAME = 'invite_game',
  RESIGN = 'resign',
  PLAY = 'play'
}

export default class tictactoeController extends Controller {
  public async exchange() {
    const { ctx, app, logger } = this
    const nsp = app.io.of('/tictactoe')
    const currentId = ctx.socket.id
    // 获取客户端传来的数据包
    let message = ctx.args[0] || {}
    logger.info(`message: ${message}`)
    if (typeof message === 'string') {
      message = JSON.parse(message)
    }
    const target = message.target
    switch (message.action) {
      case ExchangeEvent.JOIN:
        {
          const player = new Player(message.payload.name, currentId)
          players.push(player)
          // 广播成员列表更新
          logger.info(`players: ${JSON.stringify(players)}`)
          const msg = ctx.helper.parseMsg(ExchangeEvent.PLAYER_LIST, players, { target })
          nsp.emit('exchange', JSON.stringify(msg))
        }
        break
      case ExchangeEvent.INVITE_GAME:
        {
          // 绑定对战玩家
          players.forEach(player => {
            if (player.id === currentId) {
              player.setOpponentId(target)
            }
          })

          // 发送邀请玩家消息
          const against = message.payload

          try {
            const msg = ctx.helper.parseMsg(ExchangeEvent.INVITE_GAME, { against })
            nsp.sockets[target].emit('exchange', JSON.stringify(msg))
          } catch (error) {
            logger.error(error)
          }
        }
        break
      case ExchangeEvent.PLAY:
        {
          let against
          players.forEach(player => {
            if (player.id === currentId) {
              against = player.opponentId || ''
            }
          })
          const grids = message.payload

          try {
            const msg = ctx.helper.parseMsg(ExchangeEvent.PLAY, { grids })
            nsp.sockets[against].emit('exchange', JSON.stringify(msg))
          } catch (error) {
            logger.error(error)
          }
        }
        break
      case ExchangeEvent.RESIGN:
        {
          let against
          players.forEach(player => {
            if (player.id === currentId) {
              against = player.opponentId || ''
              player.setOpponentId('')
            }
          })
          try {
            const msg = ctx.helper.parseMsg(ExchangeEvent.RESIGN)
            nsp.sockets[against].emit('exchange', JSON.stringify(msg))
          } catch (error) {
            logger.error(error)
          }
        }
        break
      default:
        break
    }
  }
}
