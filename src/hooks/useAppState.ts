import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import { useGlobalStore } from '../stores/globalStore'
import {
  apiUrlAtom,
  httpMethodAtom,
  requestBodyAtom,
  isLoadingAtom,
  testResultAtom,
  canStartTestAtom,
  showRequestBodyAtom,
  resetTestConfigAtom,
  executeTestAtom
} from '../atoms/corsTestAtoms'

// 全局主题状态 hook
export const useTheme = () => {
  const theme = useGlobalStore((state) => state.theme)
  const setTheme = useGlobalStore((state) => state.setTheme)
  return { theme, setTheme }
}

// 全局语言状态 hook
export const useLanguage = () => {
  const language = useGlobalStore((state) => state.language)
  const setLanguage = useGlobalStore((state) => state.setLanguage)
  return { language, setLanguage }
}

// 用户偏好设置 hook
export const usePreferences = () => {
  const preferences = useGlobalStore((state) => state.preferences)
  const updatePreferences = useGlobalStore((state) => state.updatePreferences)
  return { preferences, updatePreferences }
}

// CORS 测试配置状态 hook
export const useCorsTestConfig = () => {
  const [apiUrl, setApiUrl] = useAtom(apiUrlAtom)
  const [httpMethod, setHttpMethod] = useAtom(httpMethodAtom)
  const [requestBody, setRequestBody] = useAtom(requestBodyAtom)
  const resetConfig = useSetAtom(resetTestConfigAtom)
  
  return {
    apiUrl,
    setApiUrl,
    httpMethod,
    setHttpMethod,
    requestBody,
    setRequestBody,
    resetConfig
  }
}

// CORS 测试状态 hook
export const useCorsTestState = () => {
  const [isLoading, setIsLoading] = useAtom(isLoadingAtom)
  const [testResult, setTestResult] = useAtom(testResultAtom)
  const canStartTest = useAtomValue(canStartTestAtom)
  const showRequestBody = useAtomValue(showRequestBodyAtom)
  const executeTest = useSetAtom(executeTestAtom)
  
  return {
    isLoading,
    setIsLoading,
    testResult,
    setTestResult,
    canStartTest,
    showRequestBody,
    executeTest
  }
}

// 组合 hook - 提供完整的 CORS 测试功能
export const useCorsTest = () => {
  const config = useCorsTestConfig()
  const state = useCorsTestState()
  
  return {
    // 配置相关
    ...config,
    // 状态相关
    ...state,
  }
}

// 完整的应用状态 hook
export const useAppState = () => {
  const theme = useTheme()
  const language = useLanguage()
  const preferences = usePreferences()
  const corsTest = useCorsTest()
  
  return {
    theme,
    language,
    preferences,
    corsTest
  }
}