import { Application } from 'egg'

export default (app: Application) => {
  const { controller, router, io } = app

  router.get('/', controller.home.index)
  io.of('/tictactoe').route('exchange', io.controller.tictactoe.exchange)
}
