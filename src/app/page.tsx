'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '../hooks/useAppState';
import { ShieldCheck, FileText, Layers, Settings } from 'lucide-react';

/**
 * 欢迎页面
 * 展示应用的主要功能和导航
 */
export default function HomePage() {
  const { language } = useLanguage();

  const t = (key: string) => {
    const translations = {
      zh: {
        title: 'Tool Set - 专业工具集',
        subtitle: '一站式开发工具解决方案',
        description: '集成了多个实用工具的功能测试平台，帮助开发者快速验证和调试各种功能',
        features: '主要功能',
        getStarted: '开始使用',
        learnMore: '了解更多',
        corsValidator: 'CORS 验证器',
        corsDesc: '测试 API 是否正确配置了 CORS 策略，支持多种 HTTP 方法',
        wangeditorTest: 'WangEditor 验证',
        wangeditorDesc: '验证富文本编辑器的 JSON 和 HTML 格式转换功能',
        stateTest: '状态管理测试',
        stateDesc: '测试 Zustand 全局状态和 Jotai 原子状态的功能',
        settings: '设置',
        settingsDesc: '调整应用主题、语言等个性化设置',
        welcome: '欢迎使用',
        fullName: 'Tool Set',
      },
      en: {
        title: 'Tool Set - Professional Tools',
        subtitle: 'One-stop development tool solution',
        description: 'An integrated functional testing platform with multiple practical tools to help developers quickly verify and debug various features',
        features: 'Main Features',
        getStarted: 'Get Started',
        learnMore: 'Learn More',
        corsValidator: 'CORS Validator',
        corsDesc: 'Test if your API is properly configured with CORS policy, supports multiple HTTP methods',
        wangeditorTest: 'WangEditor Validator',
        wangeditorDesc: 'Verify the JSON and HTML format conversion functions of the rich text editor',
        stateTest: 'State Management Test',
        stateDesc: 'Test the functionality of Zustand global state and Jotai atomic state',
        settings: 'Settings',
        settingsDesc: 'Adjust app theme, language and other personalized settings',
        welcome: 'Welcome to',
        fullName: 'Tool Set',
      }
    };
    return translations[language as keyof typeof translations]?.[key as keyof typeof translations.zh] || key;
  };

  const tools = [
    {
      id: 'cors-validator',
      title: t('corsValidator'),
      description: t('corsDesc'),
      icon: <ShieldCheck size={32} />,
      href: '/cors-validator',
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 'wangeditor',
      title: t('wangeditorTest'),
      description: t('wangeditorDesc'),
      icon: <FileText size={32} />,
      href: '/wangeditor-test',
      color: 'from-purple-500 to-purple-600'
    },
    {
      id: 'state-test',
      title: t('stateTest'),
      description: t('stateDesc'),
      icon: <Layers size={32} />,
      href: '/state-test',
      color: 'from-green-500 to-green-600'
    },
    {
      id: 'settings',
      title: t('settings'),
      description: t('settingsDesc'),
      icon: <Settings size={32} />,
      href: '/settings',
      color: 'from-orange-500 to-orange-600'
    }
  ];

  return (
    <div className="min-h-screen bg-background transition-theme">
      {/* 头部 */}
      <div className="bg-gradient-to-r from-primary to-primary/80 text-white py-16 px-4 transition-theme">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-2">{t('welcome')} {t('fullName')}</h1>
          <p className="text-xl text-white/80 mb-4">{t('subtitle')}</p>
          <p className="text-white/70 max-w-3xl mx-auto">{t('description')}</p>
        </div>
      </div>

      {/* 主容器 */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* 功能卡片网格 */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-text mb-8 text-center">{t('features')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tools.map((tool) => (
              <Link key={tool.id} href={tool.href}>
                <div className="h-full p-6 rounded-lg border border-border hover:shadow-lg transition-all duration-300 bg-surface hover:bg-surfaceHover cursor-pointer group">
                  {/* 图标 */}
                  <div className={`inline-block p-3 rounded-lg bg-gradient-to-br ${tool.color} text-white mb-4 group-hover:scale-110 transition-transform`}>
                    {tool.icon}
                  </div>

                  {/* 标题 */}
                  <h3 className="text-lg font-semibold text-text mb-2">{tool.title}</h3>

                  {/* 描述 */}
                  <p className="text-sm text-textSecondary mb-4 line-clamp-2">{tool.description}</p>

                  {/* 点击提示 */}
                  <div className="flex items-center text-primary font-medium text-sm group-hover:translate-x-1 transition-transform">
                    {t('learnMore')}
                    <span className="ml-2">→</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* 快速开始 */}
        <div className="bg-surface border border-border rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-text mb-4">{t('getStarted')}</h2>
          <p className="text-textSecondary mb-6">
            {language === 'zh' 
              ? '从上面的功能卡片中选择一个工具开始使用，或访问设置调整您的偏好设置。'
              : 'Select a tool from the feature cards above to get started, or visit settings to adjust your preferences.'
            }
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/cors-validator">
              <button className="px-8 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium">
                {t('corsValidator')}
              </button>
            </Link>
            <Link href="/settings">
              <button className="px-8 py-3 border border-border text-text rounded-lg hover:bg-surfaceHover transition-colors font-medium">
                {t('settings')}
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
