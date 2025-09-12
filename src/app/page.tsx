'use client';

import { useState } from 'react';
import { CompactThemeSwitcher } from './theme-switcher';
import { CompactLanguageSwitcher } from './language-switcher';
import { useI18n } from './i18n-context';

/**
 * CORS测试页面组件
 * 用于验证API接口的跨域设置是否生效
 */
export default function CorsTestPage() {
  // 国际化
  const { t, language } = useI18n();
  
  // 状态管理
  const [testResult, setTestResult] = useState<string>(''); // 测试结果
  const [isLoading, setIsLoading] = useState<boolean>(false); // 加载状态
  const [apiUrl, setApiUrl] = useState<string>('http://localhost:8002/api/v1/settings'); // API地址
  const [httpMethod, setHttpMethod] = useState<string>('GET'); // HTTP请求方法
  const [requestBody, setRequestBody] = useState<string>(''); // 请求体内容

  /**
   * 测试CORS设置的函数
   * 发送请求到指定的API地址并处理响应
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
              onChange={(e) => setHttpMethod(e.target.value)}
              className="select w-full px-3 py-2 rounded-md transition-theme"
            >
              <option value="GET">GET</option>
              <option value="POST">POST</option>
              <option value="PUT">PUT</option>
              <option value="DELETE">DELETE</option>
              <option value="OPTIONS">OPTIONS</option>
            </select>
          </div>

          {/* 请求体输入区域 - 仅在POST、PUT、DELETE方法时显示 */}
          {['POST', 'PUT', 'DELETE'].includes(httpMethod) && (
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
            disabled={isLoading || !apiUrl.trim()}
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
}
