import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg'

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1606212319441_7014'

  // add your egg config in here
  config.middleware = []

  // add your special config in here
  const bizConfig = {
    redis: {
      client: {
        port: 6379,
        host: '127.0.0.1',
        password: '',
        db: 0,
      },
    },
    io: {
      init: {
        wsEngine: 'ws',
      },
      redis: {
        host: '127.0.0.1',
        port: 6379,
      },
      namespace: {
        '/tictactoe': {
          connectionMiddleware: [ 'auth' ],
          packetMiddleware: [],
        },
      },
    },
  }

  // the return config will combines to EggAppConfig
  return {
    ...config,
    ...bizConfig,
  }
}
