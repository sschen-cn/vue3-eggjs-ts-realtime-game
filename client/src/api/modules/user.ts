import axios from 'axios'
import request from "../axios/index"

/**
 * 获取用户信息
 */
export const getUserInfo = (data?: Object) => {
  return request({
    method: 'get',
    url: '/getUserInfo',
    data
  })
}

/**
 * cancelToken simple
 * @param that 传入一个对象接收取消方法
 */
export const cancelToken = (that: any, data?: Object) => {
  return request({
    method: 'get',
    url: '/',
    data,
    cancelToken: new axios.CancelToken(function executor(c) {
      that.cancel = c
    })
  })
}

/**
 * 用户相关接口
 */
export const user = { getUserInfo, cancelToken }