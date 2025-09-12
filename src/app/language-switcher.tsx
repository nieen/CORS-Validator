'use client';

import React, { memo } from 'react';
import { Globe, Languages } from 'lucide-react';
import { Language } from '../types/state';
import { useLanguage } from '../hooks/useAppState';

// 语言图标组件
const LanguageIcon = ({ language }: { language: Language }) => {
  switch (language) {
    case 'zh':
      return (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
        </svg>
      );
    case 'en':
      return (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9m0 9c-5 0-9-4-9-9s4-9 9-9" />
        </svg>
      );
    default:
      return null;
  }
};

// 语言切换器组件
export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();
  // 定义可用语言列表
  const availableLanguages: Language[] = ['zh', 'en'];

  return (
    <div className="relative">
      {/* 语言切换按钮 */}
      <div className="flex items-center space-x-2 bg-surface border border-border rounded-lg p-1">
        {availableLanguages.map((langOption) => {
          const isActive = language === langOption;
          
          return (
            <button
              key={langOption}
              onClick={() => setLanguage(langOption)}
              className={`
                flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200
                ${isActive 
                  ? 'bg-primary text-white shadow-sm' 
                  : 'text-textSecondary hover:text-text hover:bg-background'
                }
              `}
              title={`Switch to ${langOption === 'zh' ? 'Chinese' : 'English'}`}
            >
              <LanguageIcon language={langOption} />
              <span className="hidden sm:inline">
                {langOption === 'zh' ? '中文' : 'English'}
              </span>
            </button>
          );
        })}
      </div>
      
      {/* 当前语言指示器 */}
      <div className="absolute -bottom-8 left-0 text-xs text-textSecondary">
        {language === 'zh' ? '当前: 中文' : 'Current: English'}
      </div>
    </div>
  );
}

// 紧凑版语言切换器（仅图标）
export const CompactLanguageSwitcher = memo(() => {
  const { language, setLanguage } = useLanguage();
  // 定义可用语言列表
  const availableLanguages: Language[] = ['zh', 'en'];

  return (
    <div className="flex items-center space-x-0.5 bg-surface border border-border rounded-md p-0.5">
      {availableLanguages.map((langOption) => {
        const isActive = language === langOption;
        
        return (
          <button
            key={langOption}
            onClick={() => setLanguage(langOption)}
            className={`
              p-1.5 rounded-sm transition-all duration-200 hover:scale-105
              ${
                isActive 
                  ? 'bg-primary text-white shadow-sm' 
                  : 'text-textSecondary hover:text-text hover:bg-background'
              }
            `}
            title={`Switch to ${langOption === 'zh' ? 'Chinese' : 'English'}`}
          >
            <LanguageIcon language={langOption} />
          </button>
        );
      })}
    </div>
  );
});

CompactLanguageSwitcher.displayName = 'CompactLanguageSwitcher';

// 下拉式语言切换器
export function DropdownLanguageSwitcher() {
  const { language, setLanguage } = useLanguage();
  // 定义可用语言列表
  const availableLanguages: Language[] = ['zh', 'en'];
  const [isOpen, setIsOpen] = React.useState(false);

  const getLanguageDisplayName = (lang: Language) => {
    return lang === 'zh' ? '中文' : 'English';
  };

  return (
    <div className="relative">
      {/* 触发按钮 */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 bg-surface border border-border rounded-lg text-sm font-medium text-text hover:bg-background transition-colors duration-200"
      >
        <LanguageIcon language={language} />
        <span>{getLanguageDisplayName(language)}</span>
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
            {availableLanguages.map((langOption) => {
              const isActive = language === langOption;
              const displayName = getLanguageDisplayName(langOption);
              
              return (
                <button
                  key={langOption}
                  onClick={() => {
                    setLanguage(langOption);
                    setIsOpen(false);
                  }}
                  className={`
                    w-full flex items-center space-x-3 px-3 py-2 text-sm text-left transition-colors duration-200
                    ${isActive 
                      ? 'bg-primary text-white' 
                      : 'text-text hover:bg-background'
                    }
                    ${langOption === availableLanguages[0] ? 'rounded-t-lg' : ''}
                    ${langOption === availableLanguages[availableLanguages.length - 1] ? 'rounded-b-lg' : ''}
                  `}
                >
                  <LanguageIcon language={langOption} />
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

// 组合的主题和语言切换器
export function ThemeLanguageSwitcher() {
  return (
    <div className="flex items-center space-x-3">
      <CompactLanguageSwitcher />
      <div className="h-6 w-px bg-border"></div>
      {/* 这里可以导入主题切换器组件 */}
    </div>
  );
}