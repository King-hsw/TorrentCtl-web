import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, } from "axios"
import axios from "axios"

// 自定义 Axios 实例接口，让 get/post 直接返回 T 而不是 AxiosResponse<T>
interface ServiceInstance extends AxiosInstance {
  get<T = any>(url : string, config? : AxiosRequestConfig) : Promise<T>;

  post<T = any>(url : string, data? : any, config? : AxiosRequestConfig) : Promise<T>;

  put<T = any>(url : string, data? : any, config? : AxiosRequestConfig) : Promise<T>;

  delete<T = any>(url : string, config? : AxiosRequestConfig) : Promise<T>;
}

// 创建 Axios 实例
const service : ServiceInstance = axios.create({
  baseURL: '/api',  // 根据你的项目改
  timeout: 5000,
}) as ServiceInstance
//

// 请求拦截器

// 响应拦截器
service.interceptors.response.use(
  (response : AxiosResponse) => {
    // 后端约定的数据结构可以在这里统一处理
    return response.data
  },
  (error) => {
    console.error("请求出错:", error)
    return Promise.reject(error)
  }
)

export default service
