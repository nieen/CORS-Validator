'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// 定义主题类型
export type Theme = 'light' | 'dark' | 'blue';

// 主题配置接口
interface ThemeConfig {
  name: string;
  displayName: string;
  colors: {
    primary: string;
    secondary: string;
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
    border: string;
    success: string;
    error: string;
    warning: string;
  };
}

// 主题配置
const themeConfigs: Record<Theme, ThemeConfig> = {
  light: {
    name: 'light',
    displayName: '浅色主题',
    colors: {
      primary: '#3b82f6',
      secondary: '#64748b',
      background: '#ffffff',
      surface: '#f8fafc',
      text: '#1e293b',
      textSecondary: '#64748b',
      border: '#e2e8f0',
      success: '#10b981',
      error: '#ef4444',
      warning: '#f59e0b'
    }
  },
  dark: {
    name: 'dark',
    displayName: '深色主题',
    colors: {
      primary: '#60a5fa',
      secondary: '#94a3b8',
      background: '#0f172a',
      surface: '#1e293b',
      text: '#f1f5f9',
      textSecondary: '#94a3b8',
      border: '#334155',
      success: '#34d399',
      error: '#f87171',
      warning: '#fbbf24'
    }
  },
  blue: {
    name: 'blue',
    displayName: '蓝色主题',
    colors: {
      primary: '#1e40af',
      secondary: '#3730a3',
      background: '#eff6ff',
      surface: '#dbeafe',
      text: '#1e3a8a',
      textSecondary: '#3730a3',
      border: '#93c5fd',
      success: '#059669',
      error: '#dc2626',
      warning: '#d97706'
    }
  }
};

// 主题上下文接口
interface ThemeContextType {
  theme: Theme;
  themeConfig: ThemeConfig;
  setTheme: (theme: Theme) => void;
  availableThemes: Theme[];
}

// 创建主题上下文
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// 主题提供者组件属性
interface ThemeProviderProps {
  children: ReactNode;
}

// 主题提供者组件
export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>('light');

  // 从本地存储加载主题
  useEffect(() => {
    const savedTheme = localStorage.getItem('cors-validator-theme') as Theme;
    if (savedTheme && themeConfigs[savedTheme]) {
      setThemeState(savedTheme);
    }
  }, []);

  // 应用主题到文档根元素
  useEffect(() => {
    const root = document.documentElement;
    const config = themeConfigs[theme];
    
    // 设置CSS自定义属性
    Object.entries(config.colors).forEach(([key, value]) => {
      root.style.setProperty(`--color-${key}`, value);
    });
    
    // 设置主题类名
    root.className = `theme-${theme}`;
  }, [theme]);

  // 设置主题并保存到本地存储
  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem('cors-validator-theme', newTheme);
  };

  const value: ThemeContextType = {
    theme,
    themeConfig: themeConfigs[theme],
    setTheme,
    availableThemes: Object.keys(themeConfigs) as Theme[]
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

// 使用主题的Hook
export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

// 导出主题配置供其他组件使用
export { themeConfigs };