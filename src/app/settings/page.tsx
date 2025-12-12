'use client';

import React, { useState } from 'react';
import { useLanguage, useTheme } from '../../hooks/useAppState';
import { CompactThemeSwitcher } from '../theme-switcher';
import { CompactLanguageSwitcher } from '../language-switcher';

const SettingsPage = () => {
  const { language, setLanguage } = useLanguage();
  const { theme, setTheme } = useTheme();
  const [autoSaveConfig, setAutoSaveConfig] = useState(true);
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);

  const t = (key: string) => {
    const translations = {
      zh: {
        title: '设置',
        language: '语言',
        theme: '主题',
        chinese: '中文',
        english: 'English',
        preferences: '偏好设置',
        autoSaveConfig: '自动保存配置',
        showAdvancedOptions: '显示高级选项',
        save: '保存设置',
        reset: '重置设置',
        saved: '设置已保存',
        resetConfirm: '确定要重置所有设置吗？',
      },
      en: {
        title: 'Settings',
        language: 'Language',
        theme: 'Theme',
        chinese: '中文',
        english: 'English',
        preferences: 'Preferences',
        autoSaveConfig: 'Auto-save configuration',
        showAdvancedOptions: 'Show advanced options',
        save: 'Save Settings',
        reset: 'Reset Settings',
        saved: 'Settings saved',
        resetConfirm: 'Are you sure you want to reset all settings?',
      }
    };
    const translation = translations[language] as Record<string, any>;
    return translation?.[key] || key;
  };

  const handleSave = () => {
    alert(t('saved'));
  };

  const handleReset = () => {
    if (confirm(t('resetConfirm'))) {
      setAutoSaveConfig(true);
      setShowAdvancedOptions(false);
      setLanguage('zh');
      setTheme('light');
    }
  };

  return (
    <div className="min-h-screen bg-background py-8 px-4 transition-theme">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-text mb-8">{t('title')}</h1>
        
        <div className="card rounded-lg shadow-md p-6 mb-6 transition-theme">
          <h2 className="text-xl font-semibold text-text mb-4">{t('language')}</h2>
          <div className="flex space-x-4">
            <button
              onClick={() => setLanguage('zh')}
              className={`px-4 py-2 rounded-md transition-theme ${
                language === 'zh'
                  ? 'bg-primary text-white'
                  : 'bg-surface hover:bg-surfaceHover text-text'
              }`}
            >
              {t('chinese')}
            </button>
            <button
              onClick={() => setLanguage('en')}
              className={`px-4 py-2 rounded-md transition-theme ${
                language === 'en'
                  ? 'bg-primary text-white'
                  : 'bg-surface hover:bg-surfaceHover text-text'
              }`}
            >
              {t('english')}
            </button>
          </div>
        </div>
        
        <div className="card rounded-lg shadow-md p-6 mb-6 transition-theme">
          <h2 className="text-xl font-semibold text-text mb-4">{t('theme')}</h2>
          <CompactThemeSwitcher />
        </div>
        
        <div className="card rounded-lg shadow-md p-6 mb-6 transition-theme">
          <h2 className="text-xl font-semibold text-text mb-4">{t('preferences')}</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-text">{t('autoSaveConfig')}</label>
              <div
                onClick={() => setAutoSaveConfig(!autoSaveConfig)}
                className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-theme ${
                  autoSaveConfig ? 'bg-primary' : 'bg-gray-300'
                }`}
              >
                <div
                  className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                    autoSaveConfig ? 'translate-x-6' : ''
                  }`}
                />
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <label className="text-text">{t('showAdvancedOptions')}</label>
              <div
                onClick={() => setShowAdvancedOptions(!showAdvancedOptions)}
                className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-theme ${
                  showAdvancedOptions ? 'bg-primary' : 'bg-gray-300'
                }`}
              >
                <div
                  className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                    showAdvancedOptions ? 'translate-x-6' : ''
                  }`}
                />
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex space-x-4">
          <button
            onClick={handleSave}
            className="btn-primary font-medium py-2 px-6 rounded-md transition-all duration-200"
          >
            {t('save')}
          </button>
          <button
            onClick={handleReset}
            className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-6 rounded-md transition-all duration-200"
          >
            {t('reset')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;