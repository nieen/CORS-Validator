'use client'

import React from 'react'
import { useTheme, useLanguage, useCorsTest } from '../hooks/useAppState'

/**
 * 状态管理测试组件
 * 用于验证 Zustand 和 Jotai 状态管理系统的基本功能
 */
export const StateTest: React.FC = () => {
  const { theme, setTheme } = useTheme()
  const { language, setLanguage } = useLanguage()
  const {
    apiUrl,
    setApiUrl,
    httpMethod,
    setHttpMethod,
    requestBody,
    setRequestBody,
    isLoading,
    testResult,
    canStartTest,
    showRequestBody,
    executeTest,
    resetConfig
  } = useCorsTest()

  const t = (key: string) => {
    const translations = {
      zh: {
        stateManagementTest: '状态管理系统测试',
        globalStateTest: '全局状态测试 (Zustand)',
        themeSetting: '主题设置:',
        languageSetting: '语言设置:',
        currentTheme: '当前主题:',
        currentLanguage: '当前语言:',
        atomicStateTest: '原子状态测试 (Jotai)',
        apiUrl: 'API URL:',
        httpMethod: 'HTTP 方法:',
        requestBody: '请求体:',
        startTest: '开始测试',
        resetConfig: '重置配置',
        testResult: '测试结果:',
        deriveStateTest: '派生状态测试:',
        canStartTest: '可以开始测试:',
        showRequestBody: '显示请求体:',
        loadingStatus: '加载状态:',
        yes: '是',
        no: '否',
        loading: '加载中',
        idle: '空闲',
        chinese: '中文',
        english: 'English'
      },
      en: {
        stateManagementTest: 'State Management System Test',
        globalStateTest: 'Global State Test (Zustand)',
        themeSetting: 'Theme Setting:',
        languageSetting: 'Language Setting:',
        currentTheme: 'Current Theme:',
        currentLanguage: 'Current Language:',
        atomicStateTest: 'Atomic State Test (Jotai)',
        apiUrl: 'API URL:',
        httpMethod: 'HTTP Method:',
        requestBody: 'Request Body:',
        startTest: 'Start Test',
        resetConfig: 'Reset Configuration',
        testResult: 'Test Result:',
        deriveStateTest: 'Derived State Test:',
        canStartTest: 'Can Start Test:',
        showRequestBody: 'Show Request Body:',
        loadingStatus: 'Loading Status:',
        yes: 'Yes',
        no: 'No',
        loading: 'Loading',
        idle: 'Idle',
        chinese: '中文',
        english: 'English'
      }
    }
    return translations[language as keyof typeof translations]?.[key as keyof typeof translations.zh] || key
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">{t('stateManagementTest')}</h2>
      
      {/* 全局状态测试 - Zustand */}
      <div className="mb-8 p-4 border rounded-lg">
        <h3 className="text-lg font-semibold mb-4">{t('globalStateTest')}</h3>
        
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">{t('themeSetting')}</label>
          <div className="flex gap-2">
            {(['light', 'dark', 'blue'] as const).map((themeValue) => (
              <button
                key={themeValue}
                onClick={() => setTheme(themeValue)}
                className={`px-3 py-1 rounded ${
                  theme === themeValue
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {themeValue}
              </button>
            ))}
          </div>
          <p className="text-sm text-gray-600 mt-1">{t('currentTheme')} {theme}</p>
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">{t('languageSetting')}</label>
          <div className="flex gap-2">
            {(['zh', 'en'] as const).map((lang) => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                className={`px-3 py-1 rounded ${
                  language === lang
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {lang === 'zh' ? t('chinese') : t('english')}
              </button>
            ))}
          </div>
          <p className="text-sm text-gray-600 mt-1">{t('currentLanguage')} {language}</p>
        </div>
      </div>
      
      {/* 原子状态测试 - Jotai */}
      <div className="mb-8 p-4 border rounded-lg">
        <h3 className="text-lg font-semibold mb-4">{t('atomicStateTest')}</h3>
        
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">{t('apiUrl')}</label>
          <input
            type="text"
            value={apiUrl}
            onChange={(e) => setApiUrl(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
            placeholder="输入 API URL"
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">{t('httpMethod')}</label>
          <select
            value={httpMethod}
            onChange={(e) => setHttpMethod(e.target.value as 'GET' | 'POST' | 'PUT' | 'DELETE')}
            className="px-3 py-2 border rounded-md"
          >
            <option value="GET">GET</option>
            <option value="POST">POST</option>
            <option value="PUT">PUT</option>
            <option value="DELETE">DELETE</option>
          </select>
        </div>
        
        {showRequestBody && (
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">{t('requestBody')}</label>
            <textarea
              value={requestBody}
              onChange={(e) => setRequestBody(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
              rows={3}
              placeholder="输入请求体 JSON"
            />
          </div>
        )}
        
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => executeTest()}
            disabled={!canStartTest}
            className={`px-4 py-2 rounded ${
              canStartTest
                ? 'bg-blue-500 text-white hover:bg-blue-600'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {isLoading ? `${t('startTest')}...` : t('startTest')}
          </button>
          
          <button
            onClick={resetConfig}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            {t('resetConfig')}
          </button>
        </div>
        
        {testResult && (
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">{t('testResult')}</label>
            <pre className="bg-gray-100 p-3 rounded text-sm overflow-auto">
              {testResult}
            </pre>
          </div>
        )}
        
        <div className="text-sm text-gray-600">
          <p>{t('deriveStateTest')}</p>
          <ul className="list-disc list-inside ml-4">
            <li>{t('canStartTest')} {canStartTest ? t('yes') : t('no')}</li>
            <li>{t('showRequestBody')} {showRequestBody ? t('yes') : t('no')}</li>
            <li>{t('loadingStatus')} {isLoading ? t('loading') : t('idle')}</li>
          </ul>
        </div>
      </div>
    </div>
  )
}