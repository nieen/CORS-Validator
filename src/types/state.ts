// 主题相关类型
export type Theme = 'light' | 'dark' | 'blue'

// 语言相关类型
export type Language = 'zh' | 'en'

// HTTP 方法类型
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'HEAD' | 'OPTIONS'

// 用户偏好设置类型
export interface UserPreferences {
  autoSaveConfig: boolean
  showAdvancedOptions: boolean
}

// CORS 测试配置类型
export interface CorsTestConfig {
  apiUrl: string
  httpMethod: HttpMethod
  requestBody: string
}

// CORS 测试状态类型
export interface CorsTestState {
  isLoading: boolean
  testResult: string
  canStartTest: boolean
  showRequestBody: boolean
}

// 全局状态类型
export interface GlobalState {
  theme: Theme
  language: Language
  preferences: UserPreferences
}

// 应用完整状态类型
export interface AppState {
  global: GlobalState
  corsTest: CorsTestConfig & CorsTestState
}

// 状态更新动作类型
export interface StateActions {
  setTheme: (theme: Theme) => void
  setLanguage: (language: Language) => void
  updatePreferences: (preferences: Partial<UserPreferences>) => void
  setApiUrl: (url: string) => void
  setHttpMethod: (method: HttpMethod) => void
  setRequestBody: (body: string) => void
  setIsLoading: (loading: boolean) => void
  setTestResult: (result: string) => void
  resetConfig: () => void
  executeTest: () => Promise<void>
}

// 错误类型定义
export interface CorsError {
  type: 'network' | 'cors' | 'json' | 'unknown'
  message: string
  details?: string
}

// 测试结果类型
export interface TestResult {
  success: boolean
  statusCode?: number
  responseText?: string
  error?: CorsError
  timestamp: number
}

// 存储配置类型
export interface StorageConfig {
  key: string
  storage: 'localStorage' | 'sessionStorage'
  serialize?: (value: unknown) => string
  deserialize?: (value: string) => unknown
}