'use client';

import { StateTest } from '../../components/StateTest';
import { useLanguage } from '../../hooks/useAppState';

/**
 * 状态管理系统测试页面
 * 用于验证 Zustand + Jotai 状态管理重构的功能
 */
export default function StateTestPage() {
  const { language } = useLanguage();

  const t = (key: string) => {
    const translations = {
      zh: {
        title: '状态管理系统测试',
        description: '验证 Zustand 全局状态和 Jotai 原子状态的功能'
      },
      en: {
        title: 'State Management System Test',
        description: 'Verify the functionality of Zustand global state and Jotai atomic state'
      }
    };
    return translations[language as keyof typeof translations]?.[key as keyof typeof translations.zh] || key;
  };

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-text mb-2">
            {t('title')}
          </h1>
          <p className="text-textSecondary">
            {t('description')}
          </p>
        </div>
        
        <StateTest />
      </div>
    </div>
  );
}