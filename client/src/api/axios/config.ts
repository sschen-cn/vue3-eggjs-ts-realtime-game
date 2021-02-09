import Axios, { AxiosRequestConfig, } from "axios"
const cancelToken = Axios.CancelToken
let source = cancelToken.source()


const DEV_SERVER_ADDRESS = 'http://127.0.0.1:3000'
const PROD_SERVER_ADDRESS = ''

export default <AxiosRequestConfig>{
  // 默认post请求
  method: 'post',
  // 默认请求baseurl
  baseURL: process.env.NODE_ENV === 'development' ? DEV_SERVER_ADDRESS : process.env.NODE_ENV === 'production' ? PROD_SERVER_ADDRESS : DEV_SERVER_ADDRESS,
  // 请求头信息
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  },
  // 参数
  data: {},
  // 设置超时时间
  timeout: 5000,
  // 携带凭证
  withCredentials: false,
  // 返回数据类型
  responseType: 'json',
  cancelToken: source.token
}