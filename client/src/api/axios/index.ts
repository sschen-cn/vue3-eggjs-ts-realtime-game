import axios, { AxiosResponse } from "axios"
import config from './config'

//创建axios的一个实例
const instance = axios.create(config)

instance.interceptors.request.use(config => {
  return config
}, err => {
  // todo request err
  Promise.reject(err)
})

instance.interceptors.response.use((response: AxiosResponse<any>) => {
  // do something pre response
  return response
}, err => {
  console.log(err)

  // todo response err
  Promise.reject(err)
})

export default instance