// 导出所有自定义状态管理 hooks
export {
  useTheme,
  useLanguage,
  usePreferences,
  useCorsTestConfig,
  useCorsTestState,
  useCorsTest,
  useAppState
} from './useAppState'

// 导出类型定义
export type {
  Theme,
  Language,
  HttpMethod,
  UserPreferences,
  CorsTestConfig,
  CorsTestState,
  GlobalState,
  AppState,
  StateActions
} from '../types/state'