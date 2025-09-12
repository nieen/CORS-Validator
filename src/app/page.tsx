'use client';

import React, { memo } from 'react';
import { CompactThemeSwitcher } from './theme-switcher';
import { CompactLanguageSwitcher } from './language-switcher';
import { useLanguage, useCorsTestConfig, useCorsTestState } from '../hooks/useAppState';
import { Language, HttpMethod } from '../types/state';

/**
 * CORS测试页面组件
 * 用于验证API接口的跨域设置是否生效
 */
const CorsTestPage = memo(() => {
  // 使用新的状态管理 hooks - 基于 Jotai 和 Zustand 的重构实现
  const { language } = useLanguage(); // 全局语言状态
  const { 
    apiUrl, setApiUrl,           // API 地址状态（持久化）
    httpMethod, setHttpMethod,   // HTTP 方法状态（持久化）
    requestBody, setRequestBody  // 请求体状态（持久化）
  } = useCorsTestConfig();
  const { 
    isLoading, setIsLoading,     // 加载状态（临时）
    testResult, setTestResult,   // 测试结果状态（临时）
    canStartTest,                // 派生状态：是否可以开始测试
    showRequestBody              // 派生状态：是否显示请求体输入框
  } = useCorsTestState();
  
  /**
   * 国际化翻译函数 - 支持中英文切换
   * @param key 翻译键名
   * @returns 对应语言的翻译文本
   */
  const t = (key: string) => {
    const translations = {
      zh: {
        title: 'CORS 验证器',
        description: '测试您的 API 是否正确配置了 CORS 策略',
        testConfig: '测试配置',
        apiUrl: 'API URL',
        apiUrlPlaceholder: '请输入要测试的API地址',
        httpMethod: 'HTTP 方法',
        requestBody: '请求体',
        requestBodyPlaceholder: '请输入JSON格式的请求体（可选）',
        testSuccess: 'CORS测试成功',
        requestMethod: '请求方法',
        statusCode: '状态码',
        contentType: '内容类型',
        responseData: '响应数据',
        requestFailed: '请求失败',
        statusText: '状态文本',
        errorDetails: '错误详情',
        corsError: 'CORS错误',
        networkError: '网络错误',
        jsonFormatError: '请求体JSON格式错误',
        emptyResponse: '(空响应)',
        unableToParseResponse: '(无法解析响应内容)',
        noErrorDetails: '(无错误详情)',
        unableToGetErrorDetails: '(无法获取错误详情)',
        notSpecified: '未指定',
        startTest: '开始测试',
        testing: '测试中...',
        testResult: '测试结果',
        usageInstructions: '使用说明',
        instructions: {
          item1: '1. 在API URL字段中输入要测试的接口地址',
          item2: '2. 选择合适的HTTP方法（GET、POST、PUT、DELETE、OPTIONS）',
          item3: '3. 如果是POST、PUT、DELETE请求，可以在请求体中输入JSON数据',
          item4: '4. 点击"开始测试"按钮发送请求',
          item5: '5. 查看测试结果，了解CORS配置是否正确',
          item6: '6. 如果出现CORS错误，请检查服务器的CORS配置',
          item7: '7. 确保目标服务器正在运行并且可以访问',
          item8: '8. 可以切换主题和语言来获得更好的使用体验'
        },
        corsErrorExplanation: {
          line1: '1. 目标服务器未正确配置CORS头',
          line2: '2. 服务器不允许来自当前域的请求方法',
          line3: '3. 服务器未在指定地址运行'
        }
      },
      en: {
        title: 'CORS Validator',
        description: 'Test if your API is properly configured with CORS policy',
        testConfig: 'Test Configuration',
        apiUrl: 'API URL',
        apiUrlPlaceholder: 'Please enter the API URL to test',
        httpMethod: 'HTTP Method',
        requestBody: 'Request Body',
        requestBodyPlaceholder: 'Please enter JSON format request body (optional)',
        testSuccess: 'CORS test successful',
        requestMethod: 'Request Method',
        statusCode: 'Status Code',
        contentType: 'Content Type',
        responseData: 'Response Data',
        requestFailed: 'Request failed',
        statusText: 'Status Text',
        errorDetails: 'Error Details',
        corsError: 'CORS Error',
        networkError: 'Network Error',
        jsonFormatError: 'Request body JSON format error',
        emptyResponse: '(Empty Response)',
        unableToParseResponse: '(Unable to parse response)',
        noErrorDetails: '(No error details)',
        unableToGetErrorDetails: '(Unable to get error details)',
        notSpecified: 'Not specified',
        startTest: 'Start Test',
        testing: 'Testing...',
        testResult: 'Test Result',
        usageInstructions: 'Usage Instructions',
        instructions: {
          item1: '1. Enter the API URL you want to test in the API URL field',
          item2: '2. Select the appropriate HTTP method (GET, POST, PUT, DELETE, OPTIONS)',
          item3: '3. For POST, PUT, DELETE requests, you can enter JSON data in the request body',
          item4: '4. Click the "Start Test" button to send the request',
          item5: '5. Check the test results to see if CORS is configured correctly',
          item6: '6. If you encounter CORS errors, please check your server\'s CORS configuration',
          item7: '7. Make sure the target server is running and accessible',
          item8: '8. You can switch themes and languages for a better user experience'
        },
        corsErrorExplanation: {
          line1: '1. Target server has not properly configured CORS headers',
          line2: '2. Server does not allow the request method from current domain',
          line3: '3. Server is not running at the specified address'
        }
      }
    }
    const translation = translations[language] as Record<string, any>
    return translation?.[key] || key
  }




  /**
   * 测试CORS设置的核心函数
   * 发送请求到指定的API地址并处理各种响应情况
   * 包括成功响应、错误响应、CORS错误和网络错误的处理
   */
  const testCors = async () => {
    setIsLoading(true);
    setTestResult('');

    try {
      // 构建请求配置
      const requestConfig: RequestInit = {
        method: httpMethod,
        headers: {
          'Content-Type': 'application/json',
        },
      };

      // 如果是POST、PUT、DELETE方法且有请求体，添加body
      if (['POST', 'PUT', 'DELETE'].includes(httpMethod) && requestBody.trim()) {
        try {
          // 验证JSON格式
          JSON.parse(requestBody);
          requestConfig.body = requestBody;
        } catch (jsonError) {
          setTestResult(`❌ ${t('jsonFormatError')}: ${jsonError}`);
          setIsLoading(false);
          return;
        }
      }

      // 发送请求测试CORS
      const response = await fetch(apiUrl, requestConfig);

      if (response.ok) {
        let responseData;
        const contentType = response.headers.get('content-type');
        
        try {
          // 尝试解析为JSON
          if (contentType && contentType.includes('application/json')) {
            responseData = await response.json();
          } else {
            // 先获取文本内容
            const textData = await response.text();
            // 如果文本为空，显示特殊提示
            if (!textData.trim()) {
              responseData = t('emptyResponse');
            } else {
              // 尝试解析为JSON，如果失败则保持为文本
              try {
                responseData = JSON.parse(textData);
              } catch {
                responseData = textData;
              }
            }
          }
        } catch {
          // JSON解析失败，尝试获取原始文本
          try {
            responseData = await response.text();
            if (!responseData.trim()) {
              responseData = t('emptyResponse');
            }
          } catch {
            responseData = t('unableToParseResponse');
          }
        }
        
        setTestResult(`✅ ${t('testSuccess')}\n${t('requestMethod')}: ${httpMethod}\n${t('statusCode')}: ${response.status}\n${t('contentType')}: ${contentType || t('notSpecified')}\n${t('responseData')}: ${typeof responseData === 'string' ? responseData : JSON.stringify(responseData, null, 2)}`);
      } else {
        // 处理非成功状态码
        let errorData;
        try {
          const textData = await response.text();
          errorData = textData.trim() || t('noErrorDetails');
        } catch {
          errorData = t('unableToGetErrorDetails');
        }
        
        setTestResult(`⚠️ ${t('requestFailed')}\n${t('requestMethod')}: ${httpMethod}\n${t('statusCode')}: ${response.status}\n${t('statusText')}: ${response.statusText}\n${t('errorDetails')}: ${errorData}`);
      }
    } catch (error: unknown) {
      // 处理CORS错误或网络错误
      const errorMessage = error instanceof Error ? error.message : String(error);
      if (errorMessage.includes('CORS') || errorMessage.includes('fetch')) {
        const corsExplanation = t('corsErrorExplanation') as {
          line1: string;
          line2: string;
          line3: string;
        };
        setTestResult(`❌ ${t('corsError')}: ${errorMessage}\n\n${language === 'zh' ? '这通常意味着：' : 'This usually means:'}\n${corsExplanation.line1}\n${corsExplanation.line2} (${httpMethod})\n${corsExplanation.line3}`);
      } else {
        setTestResult(`❌ ${t('networkError')}: ${errorMessage}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background py-8 px-4 transition-theme">
      <div className="max-w-4xl mx-auto">
        {/* 页面标题和主题切换器 */}
        <div className="text-center mb-8">
          <div className="flex justify-between items-start mb-4">
            <div></div> {/* 左侧占位 */}
            <div className="text-center">
              <h1 className="text-3xl font-bold text-text mb-2">
                {t('title')}
              </h1>
              <p className="text-textSecondary">
                {t('description')}
              </p>
            </div>
            <div className="flex justify-end items-center space-x-2">
              <CompactLanguageSwitcher />
              <div className="h-4 w-px bg-border"></div>
              <CompactThemeSwitcher />
            </div>
          </div>
        </div>

        {/* 测试配置区域 */}
        <div className="card rounded-lg shadow-md p-6 mb-6 transition-theme">
          <h2 className="text-xl font-semibold text-text mb-4">{t('testConfig')}</h2>
          
          <div className="mb-4">
            <label htmlFor="api-url" className="block text-sm font-medium text-text mb-2">
              {t('apiUrl')}
            </label>
            <input
              id="api-url"
              type="text"
              value={apiUrl}
              onChange={(e) => setApiUrl(e.target.value)}
              className="input w-full px-3 py-2 rounded-md transition-theme"
              placeholder={t('apiUrlPlaceholder') as string}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="http-method" className="block text-sm font-medium text-text mb-2">
              {t('httpMethod')}
            </label>
            <select
              id="http-method"
              value={httpMethod}
              onChange={(e) => setHttpMethod(e.target.value as HttpMethod)}
              className="select w-full px-3 py-2 rounded-md transition-theme"
            >
              <option value="GET">GET</option>
              <option value="POST">POST</option>
              <option value="PUT">PUT</option>
              <option value="DELETE">DELETE</option>
              <option value="OPTIONS">OPTIONS</option>
            </select>
          </div>

          {/* 请求体输入区域 - 使用派生状态优化渲染 */}
          {showRequestBody && (
            <div className="mb-4">
              <label htmlFor="request-body" className="block text-sm font-medium text-text mb-2">
                {t('requestBody')}
              </label>
              <textarea
                id="request-body"
                value={requestBody}
                onChange={(e) => setRequestBody(e.target.value)}
                className="textarea w-full px-3 py-2 rounded-md font-mono transition-theme"
                placeholder={t('requestBodyPlaceholder') as string}
                rows={6}
              />
            </div>
          )}

          <button
            onClick={testCors}
            disabled={!canStartTest}
            className="btn-primary font-medium py-2 px-6 rounded-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? t('testing') : t('startTest')}
          </button>
        </div>

        {/* 测试结果区域 */}
        {testResult && (
          <div className="card rounded-lg shadow-md p-6 transition-theme">
            <h2 className="text-xl font-semibold text-text mb-4">{t('testResult')}</h2>
            <pre className="bg-surface p-4 rounded-md text-sm overflow-x-auto whitespace-pre-wrap text-text font-mono border border-border transition-theme">
              {testResult}
            </pre>
          </div>
        )}

        {/* 使用说明 */}
        <div className="bg-surface border border-border rounded-lg p-6 mt-6 transition-theme">
          <h2 className="text-xl font-semibold text-primary mb-4">{t('usageInstructions')}</h2>
          <ul className="text-textSecondary space-y-2">
            <li>{(t('instructions') as {
              item1: string; item2: string; item3: string; item4: string;
              item5: string; item6: string; item7: string; item8: string;
            }).item1}</li>
            <li>{(t('instructions') as {
              item1: string; item2: string; item3: string; item4: string;
              item5: string; item6: string; item7: string; item8: string;
            }).item2}</li>
            <li>{(t('instructions') as {
              item1: string; item2: string; item3: string; item4: string;
              item5: string; item6: string; item7: string; item8: string;
            }).item3}</li>
            <li>{(t('instructions') as {
              item1: string; item2: string; item3: string; item4: string;
              item5: string; item6: string; item7: string; item8: string;
            }).item4}</li>
            <li>{(t('instructions') as {
              item1: string; item2: string; item3: string; item4: string;
              item5: string; item6: string; item7: string; item8: string;
            }).item5}</li>
            <li>{(t('instructions') as {
              item1: string; item2: string; item3: string; item4: string;
              item5: string; item6: string; item7: string; item8: string;
            }).item6}</li>
            <li>{(t('instructions') as {
              item1: string; item2: string; item3: string; item4: string;
              item5: string; item6: string; item7: string; item8: string;
            }).item7}</li>
            <li>{(t('instructions') as {
              item1: string; item2: string; item3: string; item4: string;
              item5: string; item6: string; item7: string; item8: string;
            }).item8}</li>
          </ul>
        </div>
      </div>
    </div>
  );
});

CorsTestPage.displayName = 'CorsTestPage';

export default CorsTestPage;
