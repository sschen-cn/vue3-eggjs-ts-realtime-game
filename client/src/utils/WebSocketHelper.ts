import socketio from 'socket.io-client'

const DEV_SERVER_ADDRESS: string = "http://127.0.0.1:7001/tictactoe"
const PROD_SERVER_ADDRESS: string = "http://game.artifact4u.com/tictactoe"
const _SERVER_ADDRESS = process.env.NODE_ENV === 'development' ? DEV_SERVER_ADDRESS : process.env.NODE_ENV === 'production' ? PROD_SERVER_ADDRESS : DEV_SERVER_ADDRESS

class ExchangeMsg {
  _action: string = ''
  _payload: object = {}
  _target: string = 'all'
  constructor(action: string, payload: object = {}, target: string = 'all') {
    this._action = action
    this._payload = payload
    this._target = target
  }

  /**
   * toJsonString
   */
  public toJsonString() {
    const data = {
      action: this._action,
      target: this._target,
      payload: this._payload
    }
    return JSON.stringify(data)
  }
}

class SocketNotifications {
  private static _sockets: SocketNotifications
  // Socket 连接实例
  private static _ws: SocketIOClient.Socket
  // Socket 连接是否建立
  private static _isOn: boolean = false
  public get id(): string {
    return SocketNotifications._ws.id
  }

  /**
   * getInstance
   * 
   * 单例模式创建实例
   */
  public getInstance() {
    if (!SocketNotifications._sockets) {
      SocketNotifications._sockets = new SocketNotifications()
    }
    return SocketNotifications._sockets
  }
  /**
   * initCommunication
   * 
   * 初始化 Socket 连接
   */
  public async initCommunication() {
    // 关闭之前的 Socket 连接
    this.reset()
    // 开启新的 Socket 连接
    console.log(`建立socket连接: ${_SERVER_ADDRESS}`)
    try {
      SocketNotifications._ws = socketio.connect(_SERVER_ADDRESS, {
        transports: ['websocket']
      })
      SocketNotifications._isOn = true
    } catch (error) {
      console.log(`建立socket连接失败，原因：${error}`)
    }
  }

  /**
   * reset
   * 
   * 关闭 Socket 连接
   */
  public reset() {
    if (SocketNotifications._ws != null) {
      SocketNotifications._ws.close()
      SocketNotifications._isOn = false
    }
  }
  /**
   * send
   * 
   * 发送独立事件消息
   */
  public emit(event: string, ...args: any[]) {
    if (SocketNotifications._ws != null && SocketNotifications._isOn) {
      SocketNotifications._ws.emit(event, ...args)
    }
  }

  /**
   * exchange
   * 
   * exchange事件消息
   */
  public exchange(exchangeMsg: ExchangeMsg) {
    SocketNotifications._ws.emit('exchange', exchangeMsg.toJsonString())
  }

  /**
   * onMessage
   * 
   * 监听服务端发送的独立事件消息
   * @param e event name
   * @param callback event callback
   */
  public onMessageReceived(e: string, callback: Function) {
    SocketNotifications._ws.on(e, callback)
  }

  /**
   * onExchangeMsg
   */
  public onExchangeMsgReceived() {
    SocketNotifications._ws.on('exchange', (msg: string) => {
      console.log(`exchange message: ${msg}`)
      this._listeners.forEach((callback: Function) => {
        callback(msg)
      })
    })
  }

  private _listeners: Array<Function> = []

  /**
   * addListener
   */
  public addListener(callback: Function) {
    const index = this._listeners.indexOf(callback)
    if (index === -1) {
      this._listeners[this._listeners.length] = callback
    }
  }

  /**
   * removeListener
   */
  public removeListener(callback: Function) {
    this._listeners.forEach((listener, index) => {
      if (listener === callback) {
        this._listeners.splice(index, 1)
      }
    })
  }
}

const socket = new SocketNotifications().getInstance()

export { socket, ExchangeMsg }