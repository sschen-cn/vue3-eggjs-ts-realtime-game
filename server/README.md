### Socket.io实现socket连接客户端

```bash
yarn add egg-socket.io @types/socket.io
```

```typescript
// .../config/plugin.ts
...
io: {
  enable: true,
  package: 'egg-socket.io',
}
```

```typescript
// .../config/config.default.ts
const bizConfig = {
  //...
  io: {
    init: {
      wsEngine: 'ws',
    },
    redis: {
      host: '127.0.0.1',
      port: 6379,
    },
    namespace: {
      '/game': {
        connectionMiddleware: [],
        packetMiddleware: [],
      },
    },
  },
};
```



### Requirement

- Node.js 8.x
- Typescript 2.8+
