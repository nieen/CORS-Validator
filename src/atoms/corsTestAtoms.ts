import { atom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'
import { HttpMethod } from '../types/state'

// API 配置原子（持久化到 sessionStorage）
export const apiUrlAtom = atomWithStorage(
  'cors-api-url',
  'http://localhost:8002/api/v1/settings'
)

// HTTP 方法原子
export const httpMethodAtom = atomWithStorage<HttpMethod>(
  'cors-http-method',
  'GET'
)

// 请求体原子
export const requestBodyAtom = atomWithStorage(
  'cors-request-body',
  ''
)

// 测试状态原子（临时状态，不持久化）
export const isLoadingAtom = atom(false)
export const testResultAtom = atom('')

// 派生状态原子 - 判断是否可以开始测试
export const canStartTestAtom = atom((get) => {
  const apiUrl = get(apiUrlAtom)
  const isLoading = get(isLoadingAtom)
  return apiUrl.trim() !== '' && !isLoading
})

// 派生状态原子 - 判断是否显示请求体输入框
export const showRequestBodyAtom = atom((get) => {
  const method = get(httpMethodAtom)
  return ['POST', 'PUT', 'DELETE'].includes(method)
})

// 复合操作原子 - 重置测试配置
export const resetTestConfigAtom = atom(
  null, // 读取值（不使用）
  (get, set) => {
    // 重置所有配置到默认值
    set(apiUrlAtom, 'http://localhost:8002/api/v1/settings')
    set(httpMethodAtom, 'GET')
    set(requestBodyAtom, '')
    set(testResultAtom, '')
    set(isLoadingAtom, false)
  }
)

// 测试执行原子 - 封装测试逻辑
export const executeTestAtom = atom(
  null,
  async (get, set) => {
    const apiUrl = get(apiUrlAtom)
    const httpMethod = get(httpMethodAtom)
    const requestBody = get(requestBodyAtom)
    
    // 设置加载状态
    set(isLoadingAtom, true)
    set(testResultAtom, '')
    
    try {
      const requestOptions: RequestInit = {
        method: httpMethod,
        headers: {
          'Content-Type': 'application/json',
        },
      }
      
      // 如果是需要请求体的方法，添加请求体
      if (['POST', 'PUT', 'DELETE'].includes(httpMethod) && requestBody) {
        requestOptions.body = requestBody
      }
      
      const response = await fetch(apiUrl, requestOptions)
      const result = await response.text()
      
      // 设置测试结果
      set(testResultAtom, `状态码: ${response.status}\n响应内容: ${result}`)
    } catch (error) {
      // 处理错误情况
      if (error instanceof Error) {
        set(testResultAtom, `错误: ${error.message}`)
      } else {
        set(testResultAtom, '未知错误')
      }
    } finally {
      // 清除加载状态
      set(isLoadingAtom, false)
    }
  }
)