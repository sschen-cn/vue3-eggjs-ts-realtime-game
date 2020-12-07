# vue3 + eggjs 构建实时小游戏
主要是用于学习eggjs和vue3的练手项目，同时也使用了Typescript帮助规范开发。

## 预览

客户端：http://game.artifact4u.com

服务端：http://ws.game.artifact4u.com

![previw](http://img.artifact4u.com/gif/preview.gif)

## 主要依赖

- socket.io

  socket.io不同于websocket，它有自己的协议，可以使用websocket模式，可以理解为websocket的超集。服务端和客户端必须同时使用它的服务。本项目中使用了服务端 `egg-socket.io`和客户端 `@types/socket.io-client`

- TypeScript

  工作中，项目庞大后，如果没有强类型语言的溯源，后期维护起来是非常累人的，就算不是typescript也会有其他的出现，毕竟需求和趋势在。本项目中，因为vue3官方也是用ts重构过的，ts用起来很顺利，eggjs目前体验不是很好。

