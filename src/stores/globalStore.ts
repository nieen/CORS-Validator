import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { Theme, Language, UserPreferences } from '../types/state'

// 全局状态接口定义
interface GlobalState {
  // 主题相关状态
  theme: Theme
  setTheme: (theme: Theme) => void
  
  // 语言相关状态
  language: Language
  setLanguage: (language: Language) => void
  
  // 用户偏好设置
  preferences: UserPreferences
  updatePreferences: (preferences: Partial<UserPreferences>) => void
}

// 创建全局状态管理 store
export const useGlobalStore = create<GlobalState>()(
  persist(
    (set) => ({
      // 初始状态
      theme: 'light',
      language: 'zh',
      preferences: {
        autoSaveConfig: true,
        showAdvancedOptions: false,
      },
      
      // 主题设置方法
      setTheme: (theme) => {
        set({ theme })
        // 应用主题到 DOM 元素
        if (typeof document !== 'undefined') {
          document.documentElement.className = `theme-${theme}`
        }
      },
      
      // 语言设置方法
      setLanguage: (language) => {
        set({ language })
        // 更新 HTML lang 属性
        if (typeof document !== 'undefined') {
          document.documentElement.lang = language === 'zh' ? 'zh-CN' : 'en-US'
        }
      },
      
      // 用户偏好更新方法
      updatePreferences: (newPreferences) => {
        set((state) => ({
          preferences: { ...state.preferences, ...newPreferences }
        }))
      },
    }),
    {
      name: 'cors-validator-global', // localStorage 中的键名
      storage: createJSONStorage(() => localStorage),
      // 只持久化需要的状态
      partialize: (state) => ({
        theme: state.theme,
        language: state.language,
        preferences: state.preferences,
      }),
    }
  )
)