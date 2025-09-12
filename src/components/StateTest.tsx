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

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">状态管理系统测试</h2>
      
      {/* 全局状态测试 - Zustand */}
      <div className="mb-8 p-4 border rounded-lg">
        <h3 className="text-lg font-semibold mb-4">全局状态测试 (Zustand)</h3>
        
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">主题设置:</label>
          <div className="flex gap-2">
            {(['light', 'dark', 'blue'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTheme(t)}
                className={`px-3 py-1 rounded ${
                  theme === t
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
          <p className="text-sm text-gray-600 mt-1">当前主题: {theme}</p>
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">语言设置:</label>
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
                {lang === 'zh' ? '中文' : 'English'}
              </button>
            ))}
          </div>
          <p className="text-sm text-gray-600 mt-1">当前语言: {language}</p>
        </div>
      </div>
      
      {/* 原子状态测试 - Jotai */}
      <div className="mb-8 p-4 border rounded-lg">
        <h3 className="text-lg font-semibold mb-4">原子状态测试 (Jotai)</h3>
        
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">API URL:</label>
          <input
            type="text"
            value={apiUrl}
            onChange={(e) => setApiUrl(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
            placeholder="输入 API URL"
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">HTTP 方法:</label>
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
            <label className="block text-sm font-medium mb-2">请求体:</label>
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
            {isLoading ? '测试中...' : '开始测试'}
          </button>
          
          <button
            onClick={resetConfig}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            重置配置
          </button>
        </div>
        
        {testResult && (
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">测试结果:</label>
            <pre className="bg-gray-100 p-3 rounded text-sm overflow-auto">
              {testResult}
            </pre>
          </div>
        )}
        
        <div className="text-sm text-gray-600">
          <p>派生状态测试:</p>
          <ul className="list-disc list-inside ml-4">
            <li>可以开始测试: {canStartTest ? '是' : '否'}</li>
            <li>显示请求体: {showRequestBody ? '是' : '否'}</li>
            <li>加载状态: {isLoading ? '加载中' : '空闲'}</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default StateTest