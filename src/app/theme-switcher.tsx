'use client';

import React from 'react';
import { useTheme, Theme } from './theme-context';

// 主题图标组件
const ThemeIcon = ({ theme }: { theme: Theme }) => {
  switch (theme) {
    case 'light':
      return (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      );
    case 'dark':
      return (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      );
    case 'blue':
      return (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
        </svg>
      );
    default:
      return null;
  }
};

// 主题切换器组件
export function ThemeSwitcher() {
  const { theme, setTheme, availableThemes, themeConfig } = useTheme();

  return (
    <div className="relative">
      {/* 主题切换按钮 */}
      <div className="flex items-center space-x-2 bg-surface border border-border rounded-lg p-1">
        {availableThemes.map((themeOption) => {
          const isActive = theme === themeOption;
          const config = themeConfig;
          
          return (
            <button
              key={themeOption}
              onClick={() => setTheme(themeOption)}
              className={`
                flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200
                ${isActive 
                  ? 'bg-primary text-white shadow-sm' 
                  : 'text-textSecondary hover:text-text hover:bg-background'
                }
              `}
              title={`切换到${themeOption === 'light' ? '浅色' : themeOption === 'dark' ? '深色' : '蓝色'}主题`}
            >
              <ThemeIcon theme={themeOption} />
              <span className="hidden sm:inline">
                {themeOption === 'light' ? '浅色' : themeOption === 'dark' ? '深色' : '蓝色'}
              </span>
            </button>
          );
        })}
      </div>
      
      {/* 当前主题指示器 */}
      <div className="absolute -bottom-8 left-0 text-xs text-textSecondary">
        当前: {themeConfig.displayName}
      </div>
    </div>
  );
}

// 简化版主题切换器（仅图标）
export function CompactThemeSwitcher() {
  const { theme, setTheme, availableThemes } = useTheme();

  return (
    <div className="flex items-center space-x-1 bg-surface border border-border rounded-lg p-1">
      {availableThemes.map((themeOption) => {
        const isActive = theme === themeOption;
        
        return (
          <button
            key={themeOption}
            onClick={() => setTheme(themeOption)}
            className={`
              p-2 rounded-md transition-all duration-200
              ${isActive 
                ? 'bg-primary text-white shadow-sm' 
                : 'text-textSecondary hover:text-text hover:bg-background'
              }
            `}
            title={`切换到${themeOption === 'light' ? '浅色' : themeOption === 'dark' ? '深色' : '蓝色'}主题`}
          >
            <ThemeIcon theme={themeOption} />
          </button>
        );
      })}
    </div>
  );
}

// 下拉式主题切换器
export function DropdownThemeSwitcher() {
  const { theme, setTheme, availableThemes, themeConfig } = useTheme();
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="relative">
      {/* 触发按钮 */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 bg-surface border border-border rounded-lg text-sm font-medium text-text hover:bg-background transition-colors duration-200"
      >
        <ThemeIcon theme={theme} />
        <span>{themeConfig.displayName}</span>
        <svg 
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* 下拉菜单 */}
      {isOpen && (
        <>
          {/* 遮罩层 */}
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* 菜单内容 */}
          <div className="absolute top-full left-0 mt-1 w-full bg-surface border border-border rounded-lg shadow-lg z-20">
            {availableThemes.map((themeOption) => {
              const isActive = theme === themeOption;
              const displayName = themeOption === 'light' ? '浅色主题' : themeOption === 'dark' ? '深色主题' : '蓝色主题';
              
              return (
                <button
                  key={themeOption}
                  onClick={() => {
                    setTheme(themeOption);
                    setIsOpen(false);
                  }}
                  className={`
                    w-full flex items-center space-x-3 px-3 py-2 text-sm text-left transition-colors duration-200
                    ${isActive 
                      ? 'bg-primary text-white' 
                      : 'text-text hover:bg-background'
                    }
                    ${themeOption === availableThemes[0] ? 'rounded-t-lg' : ''}
                    ${themeOption === availableThemes[availableThemes.length - 1] ? 'rounded-b-lg' : ''}
                  `}
                >
                  <ThemeIcon theme={themeOption} />
                  <span>{displayName}</span>
                  {isActive && (
                    <svg className="w-4 h-4 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}