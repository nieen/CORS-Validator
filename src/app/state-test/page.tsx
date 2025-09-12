'use client';

import { StateTest } from '../../components/StateTest';

/**
 * 状态管理系统测试页面
 * 用于验证 Zustand + Jotai 状态管理重构的功能
 */
export default function StateTestPage() {
  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-text mb-2">
            状态管理系统测试
          </h1>
          <p className="text-textSecondary">
            验证 Zustand 全局状态和 Jotai 原子状态的功能
          </p>
        </div>
        
        <StateTest />
      </div>
    </div>
  );
}