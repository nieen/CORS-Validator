'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// 定义支持的语言类型
export type Language = 'zh' | 'en';

// 定义翻译接口
interface Translations {
  // 页面标题和描述
  title: string;
  description: string;
  
  // 测试配置区域
  testConfig: string;
  apiUrl: string;
  apiUrlPlaceholder: string;
  httpMethod: string;
  requestBody: string;
  requestBodyPlaceholder: string;
  startTest: string;
  testing: string;
  
  // 测试结果
  testResult: string;
  testSuccess: string;
  requestMethod: string;
  statusCode: string;
  contentType: string;
  responseData: string;
  requestFailed: string;
  statusText: string;
  errorDetails: string;
  corsError: string;
  networkError: string;
  jsonFormatError: string;
  
  // CORS错误说明
  corsErrorExplanation: {
    line1: string;
    line2: string;
    line3: string;
  };
  
  // 使用说明
  usageInstructions: string;
  instructions: {
    item1: string;
    item2: string;
    item3: string;
    item4: string;
    item5: string;
    item6: string;
    item7: string;
    item8: string;
  };
  
  // 响应状态
  emptyResponse: string;
  unableToParseResponse: string;
  noErrorDetails: string;
  unableToGetErrorDetails: string;
  notSpecified: string;
}

// 中文翻译
const zhTranslations: Translations = {
  title: 'CORS Validator',
  description: '专业的跨域资源共享(CORS)配置验证工具',
  
  testConfig: '测试配置',
  apiUrl: 'API地址:',
  apiUrlPlaceholder: '请输入要测试的API地址',
  httpMethod: '请求方法:',
  requestBody: '请求体 (JSON格式):',
  requestBodyPlaceholder: '例如: {"key": "value"}',
  startTest: '开始测试',
  testing: '测试中...',
  
  testResult: '测试结果',
  testSuccess: 'CORS测试成功！',
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
  
  corsErrorExplanation: {
    line1: '1. 目标服务器未正确配置CORS头',
    line2: '2. 服务器不允许来自当前域的请求方法',
    line3: '3. 服务器未运行在指定地址'
  },
  
  usageInstructions: '使用说明',
  instructions: {
    item1: '• 确保目标API服务器正在运行',
    item2: '• 支持 GET、POST、PUT、DELETE、OPTIONS 五种HTTP请求方法',
    item3: '• POST、PUT、DELETE 方法可以发送JSON格式的请求体',
    item4: '• 如果测试失败，检查服务器是否配置了正确的CORS头',
    item5: '• 常见的CORS头包括: Access-Control-Allow-Origin, Access-Control-Allow-Methods, Access-Control-Allow-Headers等',
    item6: '• 对于非简单请求，浏览器会先发送OPTIONS预检请求',
    item7: '• 开发环境中可以使用 \'*\' 作为 Access-Control-Allow-Origin 的值进行测试',
    item8: '• 右上角可以切换浅色、深色、蓝色三种主题风格和中英文语言'
  },
  
  emptyResponse: '(空响应)',
  unableToParseResponse: '(无法解析响应内容)',
  noErrorDetails: '(无错误详情)',
  unableToGetErrorDetails: '(无法获取错误详情)',
  notSpecified: '未指定'
};

// 英文翻译
const enTranslations: Translations = {
  title: 'CORS Validator',
  description: 'Professional Cross-Origin Resource Sharing (CORS) Configuration Validation Tool',
  
  testConfig: 'Test Configuration',
  apiUrl: 'API URL:',
  apiUrlPlaceholder: 'Enter the API endpoint to test',
  httpMethod: 'HTTP Method:',
  requestBody: 'Request Body (JSON format):',
  requestBodyPlaceholder: 'e.g: {"key": "value"}',
  startTest: 'Start Test',
  testing: 'Testing...',
  
  testResult: 'Test Result',
  testSuccess: 'CORS test successful!',
  requestMethod: 'Request Method',
  statusCode: 'Status Code',
  contentType: 'Content Type',
  responseData: 'Response Data',
  requestFailed: 'Request Failed',
  statusText: 'Status Text',
  errorDetails: 'Error Details',
  corsError: 'CORS Error',
  networkError: 'Network Error',
  jsonFormatError: 'Request body JSON format error',
  
  corsErrorExplanation: {
    line1: '1. Target server has not properly configured CORS headers',
    line2: '2. Server does not allow the request method from current domain',
    line3: '3. Server is not running at the specified address'
  },
  
  usageInstructions: 'Usage Instructions',
  instructions: {
    item1: '• Ensure the target API server is running',
    item2: '• Supports five HTTP request methods: GET, POST, PUT, DELETE, OPTIONS',
    item3: '• POST, PUT, DELETE methods can send JSON format request body',
    item4: '• If test fails, check if server has configured correct CORS headers',
    item5: '• Common CORS headers include: Access-Control-Allow-Origin, Access-Control-Allow-Methods, Access-Control-Allow-Headers, etc.',
    item6: '• For non-simple requests, browser will send OPTIONS preflight request first',
    item7: '• In development environment, you can use \'*\' as the value for Access-Control-Allow-Origin for testing',
    item8: '• Top right corner allows switching between light, dark, blue themes and Chinese/English languages'
  },
  
  emptyResponse: '(Empty Response)',
  unableToParseResponse: '(Unable to parse response content)',
  noErrorDetails: '(No error details)',
  unableToGetErrorDetails: '(Unable to get error details)',
  notSpecified: 'Not specified'
};

// 所有翻译配置
const translations: Record<Language, Translations> = {
  zh: zhTranslations,
  en: enTranslations
};

// 国际化上下文接口
interface I18nContextType {
  language: Language;
  translations: Translations;
  setLanguage: (language: Language) => void;
  availableLanguages: Language[];
  t: <K extends keyof Translations>(key: K) => Translations[K];
}

// 创建国际化上下文
const I18nContext = createContext<I18nContextType | undefined>(undefined);

// 国际化提供者组件属性
interface I18nProviderProps {
  children: ReactNode;
}

// 国际化提供者组件
export function I18nProvider({ children }: I18nProviderProps) {
  const [language, setLanguageState] = useState<Language>('zh');

  // 从本地存储加载语言设置
  useEffect(() => {
    const savedLanguage = localStorage.getItem('cors-validator-language') as Language;
    if (savedLanguage && translations[savedLanguage]) {
      setLanguageState(savedLanguage);
    } else {
      // 根据浏览器语言自动设置
      const browserLang = navigator.language.toLowerCase();
      if (browserLang.includes('zh')) {
        setLanguageState('zh');
      } else {
        setLanguageState('en');
      }
    }
  }, []);

  // 设置语言并保存到本地存储
  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage);
    localStorage.setItem('cors-validator-language', newLanguage);
    
    // 更新HTML lang属性
    document.documentElement.lang = newLanguage === 'zh' ? 'zh-CN' : 'en-US';
  };

  // 翻译函数
  const t = <K extends keyof Translations>(key: K): Translations[K] => {
    return translations[language][key];
  };

  const value: I18nContextType = {
    language,
    translations: translations[language],
    setLanguage,
    availableLanguages: Object.keys(translations) as Language[],
    t
  };

  return (
    <I18nContext.Provider value={value}>
      {children}
    </I18nContext.Provider>
  );
}

// 使用国际化的Hook
export function useI18n() {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
}

// 导出翻译配置供其他组件使用
export { translations };