import { Context } from 'egg'
import { players, Player } from '../../model/player'
import { ExchangeEvent } from '../controller/tictactoe'

export default function AuthMiddleware() {
  return async (ctx: Context, next: () => Promise<any>) => {
    const { socket, app, logger } = ctx
    const id = socket.id
    const nsp = app.io.of('/tictactoe')
    logger.info(`用户加入id：${id}`)
    // 连接建立
    await next()
    logger.info(`用户离开id：${id}`)
    // 连接断开
    players.forEach((player: Player, index: number) => {
      if (player.id === socket.id) {
        players.splice(index, 1)
        const opponentId = player.opponentId
        if (opponentId !== '' && opponentId !== undefined) {
          player.setOpponentId('')
          try {
            const msg = ctx.helper.parseMsg(ExchangeEvent.RESIGN)
            nsp.sockets[player.opponentId as string].emit('exchange', JSON.stringify(msg))
          } catch (error) {
            logger.error(error)
          }
        }
      }
    })
    // 广播成员列表更新
    logger.info(`players: ${JSON.stringify(players)}`)
    const msg = ctx.helper.parseMsg('player_list', players, { target: 'all' })
    nsp.emit('exchange', JSON.stringify(msg))
  }
}
