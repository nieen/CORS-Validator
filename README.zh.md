# Tool Set

![Tool Set](https://img.shields.io/badge/Tool-Set-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-15.5.2-black.svg)
![React](https://img.shields.io/badge/React-19.1.0-blue.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.x-38B2AC.svg)

专业的工具集，帮助开发者快速测试和调试API接口。

## 🌟 功能特性

- 🚀 **多种HTTP方法支持**：GET、POST、PUT、DELETE、OPTIONS
- 📝 **请求体支持**：支持JSON格式的请求体发送
- 🔍 **智能响应解析**：自动识别并解析JSON和文本格式响应
- 📊 **详细测试结果**：显示状态码、响应头、响应内容等详细信息
- 🎨 **现代化UI**：基于Tailwind CSS的响应式设计
- ⚡ **实时验证**：即时测试CORS配置，快速定位问题
- 🛡️ **错误处理**：完善的错误捕获和用户友好的错误提示
- 📱 **响应式设计**：支持桌面端和移动端访问
- 🔥 **实时更新**：项目正在开发中，欢迎贡献和反馈

## 🛠️ 技术栈

### 前端框架
- **[Next.js 15.5.2](https://nextjs.org/)** - React全栈框架
- **[React 19.1.0](https://reactjs.org/)** - 用户界面库
- **[TypeScript 5.x](https://www.typescriptlang.org/)** - 类型安全的JavaScript

### 状态管理
- **[Zustand](https://zustand-demo.pmnd.rs/)** - 轻量级全局状态管理（主题、语言、用户偏好）
- **[Jotai](https://jotai.org/)** - 原子化状态管理（CORS测试配置和状态）
- **状态持久化** - 自动保存用户配置到 localStorage/sessionStorage

### 样式和UI
- **[Tailwind CSS 3.x](https://tailwindcss.com/)** - 实用优先的CSS框架
- **响应式设计** - 适配各种屏幕尺寸
- **现代化组件** - 美观的用户界面组件

### 开发工具
- **[ESLint](https://eslint.org/)** - 代码质量检查
- **[PostCSS](https://postcss.org/)** - CSS处理工具
- **[Turbopack](https://turbo.build/pack)** - 高性能构建工具

### 部署和构建
- **Vercel** - 推荐的部署平台
- **Node.js** - 运行时环境
- **npm/yarn/pnpm** - 包管理器

## 🚀 快速开始

### 环境要求

- Node.js 18.0 或更高版本
- npm、yarn、pnpm 或 bun 包管理器

### 安装步骤

1. **克隆项目**
```bash
git clone <repository-url>
cd tool-set
```

2. **安装依赖**
```bash
npm install
# 或者
yarn install
# 或者
pnpm install
# 或者
bun install
```

3. **启动开发服务器**
```bash
npm run dev
# 或者
yarn dev
# 或者
pnpm dev
# 或者
bun dev
```

4. **访问应用**

打开浏览器访问 [http://localhost:3000](http://localhost:3000)

## 📖 使用方法

### 基本使用

1. **输入API地址**
   - 在"API地址"输入框中输入要测试的API端点
   - 例如：`http://localhost:8002/api/v1/settings`

2. **选择请求方法**
   - 从下拉菜单中选择HTTP方法（GET、POST、PUT、DELETE、OPTIONS）
   - 默认为GET方法

3. **配置请求体**（可选）
   - 对于POST、PUT、DELETE方法，可以添加JSON格式的请求体
   - 工具会自动验证JSON格式的正确性

4. **执行测试**
   - 点击"开始测试"按钮
   - 查看详细的测试结果

### 测试结果解读

#### 成功响应
```
✅ CORS测试成功！
请求方法: GET
状态码: 200
内容类型: application/json
响应数据: {"status": "ok"}
```

#### 失败响应
```
❌ CORS错误: Failed to fetch

这通常意味着：
1. 目标服务器未正确配置CORS头
2. 服务器不允许来自当前域的请求方法 (POST)
3. 服务器未运行在指定地址
```

### 常见CORS配置示例

#### Express.js 服务器配置
```javascript
const express = require('express');
const cors = require('cors');
const app = express();

// 允许所有来源（仅开发环境）
app.use(cors());

// 或者指定特定配置
app.use(cors({
  origin: ['http://localhost:3000', 'https://yourdomain.com'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
```

#### Nginx 配置
```nginx
location /api {
    add_header Access-Control-Allow-Origin "http://localhost:3000";
    add_header Access-Control-Allow-Methods "GET, POST, PUT, DELETE, OPTIONS";
    add_header Access-Control-Allow-Headers "Content-Type, Authorization";
    
    if ($request_method = 'OPTIONS') {
        return 204;
    }
    
    proxy_pass http://backend;
}
```

## 🔧 开发指南

### 项目结构
```
tool-set/
├── src/
│   ├── app/
│   │   ├── globals.css           # 全局样式和主题变量
│   │   ├── layout.tsx            # 根布局组件
│   │   ├── page.tsx              # 主页面组件（CORS测试界面）
│   │   ├── theme-switcher.tsx    # 主题切换组件
│   │   └── language-switcher.tsx # 语言切换组件
│   ├── stores/
│   │   ├── index.ts              # 状态管理导出
│   │   └── globalStore.ts        # Zustand 全局状态（主题、语言、偏好）
│   ├── atoms/
│   │   └── corsTestAtoms.ts      # Jotai 原子状态（CORS测试配置）
│   ├── hooks/
│   │   ├── index.ts              # Hooks 导出
│   │   └── useAppState.ts        # 状态管理 Hooks
│   └── types/
│       └── state.ts              # TypeScript 类型定义
├── public/                       # 静态资源
├── package.json                 # 项目配置
├── next.config.ts               # Next.js 配置
├── tailwind.config.ts           # Tailwind CSS 配置
└── tsconfig.json                # TypeScript 配置
```

### 可用脚本

```bash
# 开发模式
npm run dev

# 构建生产版本
npm run build

# 启动生产服务器
npm run start

# 代码检查
npm run lint
```

### 自定义配置

你可以通过修改以下文件来自定义应用：

- `src/app/page.tsx` - 主要的应用逻辑和UI
- `src/app/globals.css` - 全局样式
- `tailwind.config.ts` - Tailwind CSS 配置
- `next.config.ts` - Next.js 配置

## 🚀 部署

### Vercel 部署（推荐）

1. 将代码推送到 GitHub 仓库
2. 在 [Vercel](https://vercel.com) 上导入项目
3. Vercel 会自动检测 Next.js 项目并进行部署

### 其他部署选项

- **Netlify**: 支持 Next.js 静态导出
- **Docker**: 使用官方 Next.js Docker 镜像
- **传统服务器**: 构建后部署到 Node.js 服务器

### Docker 部署

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

## 🤝 贡献指南

欢迎贡献代码！请遵循以下步骤：

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 📝 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 🆘 常见问题

### Q: 为什么测试总是失败？
A: 请检查：
- 目标API服务器是否正在运行
- API地址是否正确
- 服务器是否配置了正确的CORS头

### Q: 如何测试需要认证的API？
A: 目前版本不支持自定义请求头，这个功能在后续版本中会添加。

### Q: 支持哪些响应格式？
A: 支持JSON和纯文本格式，会自动检测并适当解析。

## 📞 联系方式

如有问题或建议，请通过以下方式联系：

- 提交 [Issue](https://github.com/your-username/tool-set/issues)
- 发送邮件到：your-email@example.com

---

⭐ 如果这个项目对你有帮助，请给它一个星标！
