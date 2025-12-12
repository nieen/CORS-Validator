'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ShieldCheck, Settings, FileText, Layers } from 'lucide-react';

interface MenuItem {
  id: string;
  title: string;
  icon: React.ReactNode;
  href: string;
}

const Sidebar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const menuItems: MenuItem[] = [
    {
      id: 'cors-validator',
      title: 'CORS 验证器',
      icon: <ShieldCheck size={20} />,
      href: '/',
    },
    {
      id: 'wangeditor-test',
      title: 'wangeditor 验证',
      icon: <FileText size={20} />,
      href: '/wangeditor-test',
    },
    {
      id: 'state-test',
      title: '状态管理测试',
      icon: <Layers size={20} />,
      href: '/state-test',
    },
    {
      id: 'settings',
      title: '设置',
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
            <h2 className="text-xl font-bold text-text">Tool Set</h2>
            <p className="text-sm text-textSecondary">工具集</p>
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
            <p className="text-xs text-textSecondary">© 2025 Tool Set</p>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;