# Tool Set

![Tool Set](https://img.shields.io/badge/ToolSet-FE-blue.svg)
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
- 🌍 **多语言支持**：英文和中文语言切换
- 🎭 **主题切换**：支持亮色、深色和蓝色主题
- 📝 **WangEditor集成**：富文本编辑器，支持JSON/HTML格式转换
- 🔄 **状态管理测试**：Zustand全局状态和Jotai原子状态验证
- 🏠 **欢迎仪表盘**：美观的首页，快速导航到所有工具
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
cd toolset-fe
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

### 快速开始

访问应用后，您将看到欢迎仪表盘，快速访问所有可用工具：

1. **CORS 验证器** - 测试 API 的 CORS 配置
2. **WangEditor 验证** - 测试富文本编辑器的 JSON/HTML 转换
3. **状态管理测试** - 验证 Zustand 和 Jotai 状态管理
4. **设置** - 配置主题和语言偏好

### CORS 验证器使用

1. **输入 API 地址**
   - 在 "API URL" 输入框中输入要测试的 API 端点
   - 例如：`http://localhost:3000/api/ping`

2. **选择请求方法**
   - 从下拉菜单中选择 HTTP 方法（GET、POST、PUT、DELETE、OPTIONS）
   - 默认为 GET 方法

3. **配置请求体**（可选）
   - 对于 POST、PUT、DELETE 方法，可以添加 JSON 格式的请求体
   - 工具会自动验证 JSON 格式的正确性

4. **执行测试**
   - 点击 "开始测试" 按钮
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

This usually means:
1. 目标服务器未正确配置CORS响应头
2. 服务器不允许来自当前域的请求方法（如POST）
3. 服务器未在指定地址运行
```

### WangEditor 验证器使用

1. **编辑内容**
   - 使用富文本编辑器输入或编辑内容
   - 支持文本格式化（加粗、斜体、下划线、代码）

2. **获取 JSON 格式**
   - 点击 "获取 JSON 格式内容" 按钮查看编辑器的 JSON 表示形式
   - JSON 遵循 Slate 数据模型结构

3. **设置 JSON 格式**
   - 点击 "设置 JSON 格式内容" 按钮打开输入框
   - 粘贴或输入有效的 JSON 内容
   - 编辑器会自动将 JSON 转换为 HTML

4. **上传图片**
   - 使用编辑器工具栏中的图片上传功能
   - 支持常见的图片格式（PNG、JPG、GIF 等）

### 状态管理测试使用

1. **全局状态测试（Zustand）**
   - 在亮色、深色和蓝色主题间切换
   - 在中文和英文语言间切换
   - 实时查看当前主题和语言

2. **原子状态测试（Jotai）**
   - 输入 API URL（默认：`/api/ping`）
   - 选择 HTTP 方法
   - 为 POST/PUT/DELETE 配置请求体
   - 点击 "开始测试" 执行测试
   - 查看测试结果和响应数据

3. **派生状态测试**
   - 查看是否可以开始测试
   - 查看请求体可见性状态
   - 检查当前加载状态

### 设置使用

1. **语言选择**
   - 在中文和英文之间选择
   - 设置自动保存到 localStorage

2. **主题选择**
   - 在亮色、深色和蓝色主题间选择
   - 主题偏好自动保存

3. **自动保存配置**
   - 切换自动保存配置功能
   - 有助于跨会话保留测试配置

### 常见CORS配置示例

#### Express.js 服务器配置
```
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
```
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
toolset-fe/
├── src/
│   ├── app/
│   │   ├── api/                      # API 路由
│   │   │   ├── upload/               # 图片上传端点
│   │   │   └── ping/                 # 健康检查端点
│   │   ├── components/               # 可复用组件
│   │   │   └── Sidebar.tsx           # 导航侧边栏
│   │   ├── globals.css               # 全局样式和主题变量
│   │   ├── layout.tsx                # 根布局组件
│   │   ├── page.tsx                  # 欢迎页面（首页）
│   │   ├── cors-validator/           # CORS 验证器子路由
│   │   ├── wangeditor-test/          # WangEditor 测试页面
│   │   ├── state-test/               # 状态管理测试页面
│   │   ├── settings/                 # 设置页面
│   │   ├── theme-switcher.tsx        # 主题切换器组件
│   │   └── language-switcher.tsx     # 语言切换器组件
│   ├── stores/
│   │   ├── index.ts                  # 状态管理导出
│   │   └── globalStore.ts            # Zustand 全局状态（主题、语言）
│   ├── atoms/
│   │   └── corsTestAtoms.ts          # Jotai 原子状态（CORS 测试配置）
│   ├── hooks/
│   │   ├── index.ts                  # Hooks 导出
│   │   └── useAppState.ts            # 状态管理 hooks
│   ├── components/                   # 额外组件
│   │   └── StateTest.tsx             # 状态测试组件
│   └── types/
│       └── state.ts                  # TypeScript 类型定义
├── public/                            # 静态资源
├── package.json                       # 项目配置
├── next.config.ts                     # Next.js 配置
├── tailwind.config.ts                 # Tailwind CSS 配置
└── tsconfig.json                      # TypeScript 配置
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

- `src/app/page.tsx` - 欢迎页面和应用主逻辑
- `src/app/globals.css` - 全局样式和主题变量
- `src/stores/globalStore.ts` - Zustand 全局状态配置
- `src/atoms/corsTestAtoms.ts` - Jotai 原子状态配置
- `tailwind.config.ts` - Tailwind CSS 配置
- `next.config.ts` - Next.js 配置
- `src/app/components/Sidebar.tsx` - 侧边栏菜单配置

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

```
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

### Q: 为什么 CORS 测试总是失败？
A: 请检查：
- 目标 API 服务器是否正在运行
- API 地址是否正确
- 服务器是否配置了正确的 CORS 响应头
- 查看浏览器控制台获取具体错误信息

### Q: 如何测试需要认证的 API？
A: 目前版本不支持自定义请求头。您可以：
- 使用公开端点进行测试
- 配置您的 API 允许来自 localhost:3000 的请求
- 这个功能在后续版本中会添加

### Q: 支持哪些响应格式？
A: 支持 JSON 和纯文本格式，会自动检测并适当解析。

### Q: 如何使用 WangEditor 验证器？
A:
- 在富文本编辑器中编辑内容
- 点击 "获取 JSON 格式内容" 查看 JSON 表示
- 点击 "设置 JSON 格式内容" 输入自定义 JSON 并转换为 HTML
- 使用工具栏按钮上传图片

### Q: 如何切换主题和语言？
A:
- 使用右上角的主题切换器
- 使用右上角的语言切换器
- 您的偏好设置会自动保存到 localStorage
- 访问设置页面了解更多配置选项

### Q: 我的设置保存在哪里？
A: 所有设置都保存在：
- `localStorage`：主题偏好、语言偏好
- `sessionStorage` 或 `localStorage`：CORS 测试配置
- 修改设置时会自动持久化

## 📞 联系方式

如果您有任何问题或建议，请通过以下方式与我们联系：

- 提交 [Issue](https://github.com/your-username/toolset-fe/issues)
- 发送邮件到：your-email@example.com

---

⭐ 如果这个项目对你有帮助，请给它一个星标！
