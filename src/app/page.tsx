'use client';

import { useState } from 'react';
import { ThemeSwitcher } from './theme-switcher';

/**
 * CORS测试页面组件
 * 用于验证API接口的跨域设置是否生效
 */
export default function CorsTestPage() {
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
          setTestResult(`❌ 请求体JSON格式错误: ${jsonError}`);
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
              responseData = '(空响应)';
            } else {
              // 尝试解析为JSON，如果失败则保持为文本
              try {
                responseData = JSON.parse(textData);
              } catch {
                responseData = textData;
              }
            }
          }
        } catch (parseError: any) {
          // JSON解析失败，尝试获取原始文本
          try {
            responseData = await response.text();
            if (!responseData.trim()) {
              responseData = '(空响应)';
            }
          } catch {
            responseData = '(无法解析响应内容)';
          }
        }
        
        setTestResult(`✅ CORS测试成功！\n请求方法: ${httpMethod}\n状态码: ${response.status}\n内容类型: ${contentType || '未指定'}\n响应数据: ${typeof responseData === 'string' ? responseData : JSON.stringify(responseData, null, 2)}`);
      } else {
        // 处理非成功状态码
        let errorData;
        try {
          const textData = await response.text();
          errorData = textData.trim() || '(无错误详情)';
        } catch {
          errorData = '(无法获取错误详情)';
        }
        
        setTestResult(`⚠️ 请求失败\n请求方法: ${httpMethod}\n状态码: ${response.status}\n状态文本: ${response.statusText}\n错误详情: ${errorData}`);
      }
    } catch (error: any) {
      // 处理CORS错误或网络错误
      if (error.message.includes('CORS') || error.message.includes('fetch')) {
        setTestResult(`❌ CORS错误: ${error.message}\n\n这通常意味着：\n1. 目标服务器未正确配置CORS头\n2. 服务器不允许来自当前域的请求方法 (${httpMethod})\n3. 服务器未运行在指定地址`);
      } else {
        setTestResult(`❌ 网络错误: ${error.message}`);
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
                CORS Validator
              </h1>
              <p className="text-textSecondary">
                专业的跨域资源共享(CORS)配置验证工具
              </p>
            </div>
            <div className="flex justify-end">
              <ThemeSwitcher />
            </div>
          </div>
        </div>

        {/* 测试配置区域 */}
        <div className="card rounded-lg shadow-md p-6 mb-6 transition-theme">
          <h2 className="text-xl font-semibold text-text mb-4">测试配置</h2>
          
          <div className="mb-4">
            <label htmlFor="api-url" className="block text-sm font-medium text-text mb-2">
              API地址:
            </label>
            <input
              id="api-url"
              type="text"
              value={apiUrl}
              onChange={(e) => setApiUrl(e.target.value)}
              className="input w-full px-3 py-2 rounded-md transition-theme"
              placeholder="请输入要测试的API地址"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="http-method" className="block text-sm font-medium text-text mb-2">
              请求方法:
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
                请求体 (JSON格式):
              </label>
              <textarea
                id="request-body"
                value={requestBody}
                onChange={(e) => setRequestBody(e.target.value)}
                className="textarea w-full px-3 py-2 rounded-md font-mono transition-theme"
                placeholder='例如: {"key": "value"}'
                rows={6}
              />
            </div>
          )}

          <button
            onClick={testCors}
            disabled={isLoading || !apiUrl.trim()}
            className="btn-primary font-medium py-2 px-6 rounded-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? '测试中...' : '开始测试'}
          </button>
        </div>

        {/* 测试结果区域 */}
        {testResult && (
          <div className="card rounded-lg shadow-md p-6 transition-theme">
            <h2 className="text-xl font-semibold text-text mb-4">测试结果</h2>
            <pre className="bg-surface p-4 rounded-md text-sm overflow-x-auto whitespace-pre-wrap text-text font-mono border border-border transition-theme">
              {testResult}
            </pre>
          </div>
        )}

        {/* 使用说明 */}
        <div className="bg-surface border border-border rounded-lg p-6 mt-6 transition-theme">
          <h2 className="text-xl font-semibold text-primary mb-4">使用说明</h2>
          <ul className="text-textSecondary space-y-2">
            <li>• 确保目标API服务器正在运行</li>
            <li>• 支持 GET、POST、PUT、DELETE、OPTIONS 五种HTTP请求方法</li>
            <li>• POST、PUT、DELETE 方法可以发送JSON格式的请求体</li>
            <li>• 如果测试失败，检查服务器是否配置了正确的CORS头</li>
            <li>• 常见的CORS头包括: Access-Control-Allow-Origin, Access-Control-Allow-Methods, Access-Control-Allow-Headers等</li>
            <li>• 对于非简单请求，浏览器会先发送OPTIONS预检请求</li>
            <li>• 开发环境中可以使用 '*' 作为 Access-Control-Allow-Origin 的值进行测试</li>
            <li>• 右上角可以切换浅色、深色、蓝色三种主题风格</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
