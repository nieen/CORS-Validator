'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ShieldCheck, Settings, FileText, Layers } from 'lucide-react';
import { useLanguage } from '../../hooks/useAppState';

interface MenuItem {
  id: string;
  title: string;
  icon: React.ReactNode;
  href: string;
}

const Sidebar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const { language } = useLanguage();

  const t = (key: string) => {
    const translations = {
      zh: {
        toolSet: 'Tool Set',
        toolsetDesc: '工具集',
        corsValidator: 'CORS 验证器',
        wangeditorTest: 'wangeditor 验证',
        stateTest: '状态管理测试',
        settings: '设置',
        copyright: '© 2025 Tool Set'
      },
      en: {
        toolSet: 'Tool Set',
        toolsetDesc: 'Tools',
        corsValidator: 'CORS Validator',
        wangeditorTest: 'WangEditor Validator',
        stateTest: 'State Management Test',
        settings: 'Settings',
        copyright: '© 2025 Tool Set'
      }
    };
    return translations[language as keyof typeof translations]?.[key as keyof typeof translations.zh] || key;
  };

  const menuItems: MenuItem[] = [
    {
      id: 'cors-validator',
      title: t('corsValidator'),
      icon: <ShieldCheck size={20} />,
      href: '/cors-validator',
    },
    {
      id: 'wangeditor-test',
      title: t('wangeditorTest'),
      icon: <FileText size={20} />,
      href: '/wangeditor-test',
    },
    {
      id: 'state-test',
      title: t('stateTest'),
      icon: <Layers size={20} />,
      href: '/state-test',
    },
    {
      id: 'settings',
      title: t('settings'),
      icon: <Settings size={20} />,
      href: '/settings',
    },
  ];

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* 移动端触发按钮 */}
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-50 p-2 rounded-md bg-surface border border-border shadow-md md:hidden transition-theme"
        aria-label="Toggle sidebar"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* 侧边栏遮罩层（移动端） */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* 侧边栏 */}
      <aside 
        className={`fixed top-0 left-0 h-full bg-surface border-r border-border shadow-lg z-40 transform transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:h-[calc(100vh-2rem)] md:my-4 md:ml-4 md:rounded-lg ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } w-64 transition-theme`}
      >
        <div className="flex flex-col h-full">
          {/* 侧边栏头部 */}
          <div className="p-4 border-b border-border">
            <h2 className="text-xl font-bold text-text">{t('toolSet')}</h2>
            <p className="text-sm text-textSecondary">{t('toolsetDesc')}</p>
          </div>

          {/* 菜单列表 */}
          <nav className="flex-1 overflow-y-auto py-4">
            <ul className="space-y-1 px-2">
              {menuItems.map((item) => (
                <li key={item.id}>
                  <Link
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                      pathname === item.href
                        ? 'bg-primary text-white'
                        : 'text-text hover:bg-surfaceHover'
                    }`}
                  >
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* 侧边栏底部 */}
          <div className="p-4 border-t border-border text-center">
            <p className="text-xs text-textSecondary">{t('copyright')}</p>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;