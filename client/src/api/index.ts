import { AxiosPromise, AxiosRequestConfig } from 'axios'
import config from './axios/config'
import { user } from "./modules/user"

/**
 * api接口集合
 */
export const useApi =  {
  /**
  * 用户相关接口
  */
  user
}

export function useApiConfig(): AxiosRequestConfig {
  return config
}