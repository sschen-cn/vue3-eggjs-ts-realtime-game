import router from "@/router"
import { socket, ExchangeMsg } from "./WebSocketHelper"

enum ExchangeEvent {
  JOIN = 'join',
  PLAYER_LIST = 'player_list',
  INVITE_GAME = 'invite_game',
  RESIGN = 'resign',
  PLAY = 'play'
}

class Player {
  name: string
  id: string
  constructor(name: string = '', id: string = '') {
    this.id = id
    this.name = name
  }
  /**
   * toString
   */
  public toString() {
    const data = {
      name: this.name,
      id: this.id,
    }
    return JSON.stringify(data)
  }

  /**
   * fromJsonString
   */
  public fromJsonString(jsonString: string) {
    const data = JSON.parse(jsonString)
    return new Player(data.name, data.id)
  }
}

class SocketController {
  private static _socketController: SocketController

  // 初始化之前，玩家没有提供昵称
  _playerName: string = ""

  // 初始化之前，玩家没有唯一的ID,连接建立后，该id绑定在socket上，与服务端一致
  private _playerID: string = ""

  private _isOn: boolean = false

  private eventList: Object = {}

  private constructor() { }

  public static getInstance(): SocketController {
    if (!SocketController._socketController) {
      SocketController._socketController = new SocketController()
    }
    return SocketController._socketController
  }

  /**
   * linkStart
   */
  public async linkStart(name: string) {
    if (!this._isOn) {
      await socket.initCommunication()
      // 监听连接建立成功的事件
      socket.onMessageReceived('connect', () => {
        this._playerName = name !== '' ? name : this.randomString(8)
        this._playerID = socket.id
        this._isOn = true
        console.log(`socket连接已建立成功 socketid: ${socket.id} \n playerName:${this._playerName}`)
        socket.onExchangeMsgReceived()
        this.join()
      })
      socket.onMessageReceived('disconnect', () => {
        router.replace('/')
      })
    } else {
      console.log(`socket连接已建立成功 socketid: ${socket.id} \n playerName:${this._playerName}`)
    }
  }

  /**
   * join
   * 
   * 加入房间,传入玩家输入的playername
   */
  public join() {
    socket.exchange(new ExchangeMsg(ExchangeEvent.JOIN, { name: this._playerName }))
  }

  /**
   * inviteGame
   * 
   * 邀请游戏
   */
  public inviteGame(player: Player) {
    socket.exchange(new ExchangeMsg(ExchangeEvent.INVITE_GAME, new Player(this._playerName, this._playerID), player.id))
  }

  /**
   * resign
   * 
   * 认输
   */
  public resign() {
    socket.exchange(new ExchangeMsg(ExchangeEvent.RESIGN))
  }

  /**
   * play
   */
  public play(grid: Array<string>) {
    socket.exchange(new ExchangeMsg(ExchangeEvent.PLAY, grid))
  }

  /**
   * addListener
   */
  public addListener(callback: Function) {
    socket.addListener(callback)
  }

  /**
   * removeListener
   */
  public removeListener(callback: Function) {
    socket.removeListener(callback)
  }

  // 随机字符串
  private randomString(e: number) {
    e = e || 32
    var t = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678",
      a = t.length,
      n = ""
    for (let i = 0; i < e; i++) n += t.charAt(Math.floor(Math.random() * a))
    return n
  }

}

const socketController = SocketController.getInstance()

export { socketController, ExchangeEvent, Player }