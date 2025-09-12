# CORS Validator

![CORS Validator](https://img.shields.io/badge/CORS-Validator-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-15.5.2-black.svg)
![React](https://img.shields.io/badge/React-19.1.0-blue.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.x-38B2AC.svg)

A professional Cross-Origin Resource Sharing (CORS) configuration validation tool that helps developers quickly test and debug API endpoint CORS settings.

## 🌟 Features

- 🚀 **Multiple HTTP Methods Support**: GET, POST, PUT, DELETE, OPTIONS
- 📝 **Request Body Support**: Support for JSON format request body sending
- 🔍 **Smart Response Parsing**: Automatically identify and parse JSON and text format responses
- 📊 **Detailed Test Results**: Display status codes, response headers, response content and other detailed information
- 🎨 **Modern UI**: Responsive design based on Tailwind CSS
- ⚡ **Real-time Validation**: Instant CORS configuration testing, quickly locate issues
- 🛡️ **Error Handling**: Comprehensive error catching and user-friendly error messages
- 📱 **Responsive Design**: Support for desktop and mobile access
- 🔥 **Live Updates**: Project is under development, contributions and feedback welcome

## 🛠️ Tech Stack

### Frontend Framework
- **[Next.js 15.5.2](https://nextjs.org/)** - React full-stack framework
- **[React 19.1.0](https://reactjs.org/)** - User interface library
- **[TypeScript 5.x](https://www.typescriptlang.org/)** - Type-safe JavaScript

### State Management
- **[Zustand](https://zustand-demo.pmnd.rs/)** - Lightweight global state management (theme, language, user preferences)
- **[Jotai](https://jotai.org/)** - Atomic state management (CORS test configuration and state)
- **State Persistence** - Automatically save user configuration to localStorage/sessionStorage

### Styling and UI
- **[Tailwind CSS 3.x](https://tailwindcss.com/)** - Utility-first CSS framework
- **Responsive Design** - Adapt to various screen sizes
- **Modern Components** - Beautiful user interface components

### Development Tools
- **[ESLint](https://eslint.org/)** - Code quality checking
- **[PostCSS](https://postcss.org/)** - CSS processing tool
- **[Turbopack](https://turbo.build/pack)** - High-performance build tool

### Deployment and Build
- **Vercel** - Recommended deployment platform
- **Node.js** - Runtime environment
- **npm/yarn/pnpm** - Package managers

## 🚀 Quick Start

### Requirements

- Node.js 18.0 or higher
- npm, yarn, pnpm, or bun package manager

### Installation

1. **Clone the project**
```bash
git clone <repository-url>
cd cors-validator
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

3. **Start development server**
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

4. **Access the application**

Open your browser and visit [http://localhost:3000](http://localhost:3000)

## 📖 Usage

### Basic Usage

1. **Enter API Address**
   - Enter the API endpoint you want to test in the "API Address" input field
   - Example: `http://localhost:8002/api/v1/settings`

2. **Select Request Method**
   - Choose HTTP method from the dropdown menu (GET, POST, PUT, DELETE, OPTIONS)
   - Default is GET method

3. **Configure Request Body** (Optional)
   - For POST, PUT, DELETE methods, you can add JSON format request body
   - The tool will automatically validate JSON format correctness

4. **Execute Test**
   - Click the "Start Test" button
   - View detailed test results

### Understanding Test Results

#### Successful Response
```
✅ CORS test successful!
Request Method: GET
Status Code: 200
Content Type: application/json
Response Data: {"status": "ok"}
```

#### Failed Response
```
❌ CORS Error: Failed to fetch

This usually means:
1. Target server has not properly configured CORS headers
2. Server does not allow request method (POST) from current domain
3. Server is not running at specified address
```

### Common CORS Configuration Examples

#### Express.js Server Configuration
```javascript
const express = require('express');
const cors = require('cors');
const app = express();

// Allow all origins (development only)
app.use(cors());

// Or specify specific configuration
app.use(cors({
  origin: ['http://localhost:3000', 'https://yourdomain.com'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
```

#### Nginx Configuration
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

## 🔧 Development Guide

### Project Structure
```
cors-validator/
├── src/
│   ├── app/
│   │   ├── globals.css           # Global styles and theme variables
│   │   ├── layout.tsx            # Root layout component
│   │   ├── page.tsx              # Main page component (CORS test interface)
│   │   ├── theme-switcher.tsx    # Theme switcher component
│   │   └── language-switcher.tsx # Language switcher component
│   ├── stores/
│   │   ├── index.ts              # State management exports
│   │   └── globalStore.ts        # Zustand global state (theme, language, preferences)
│   ├── atoms/
│   │   └── corsTestAtoms.ts      # Jotai atomic state (CORS test configuration)
│   ├── hooks/
│   │   ├── index.ts              # Hooks exports
│   │   └── useAppState.ts        # State management hooks
│   └── types/
│       └── state.ts              # TypeScript type definitions
├── public/                       # Static assets
├── package.json                 # Project configuration
├── next.config.ts               # Next.js configuration
├── tailwind.config.ts           # Tailwind CSS configuration
└── tsconfig.json                # TypeScript configuration
```

### Available Scripts

```bash
# Development mode
npm run dev

# Build production version
npm run build

# Start production server
npm run start

# Code linting
npm run lint
```

### Custom Configuration

You can customize the application by modifying the following files:

- `src/app/page.tsx` - Main application logic and UI
- `src/app/globals.css` - Global styles
- `tailwind.config.ts` - Tailwind CSS configuration
- `next.config.ts` - Next.js configuration

## 🚀 Deployment

### Vercel Deployment (Recommended)

1. Push code to GitHub repository
2. Import project on [Vercel](https://vercel.com)
3. Vercel will automatically detect Next.js project and deploy

### Other Deployment Options

- **Netlify**: Supports Next.js static export
- **Docker**: Use official Next.js Docker image
- **Traditional Server**: Deploy to Node.js server after build

### Docker Deployment

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

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork this repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 FAQ

### Q: Why do tests always fail?
A: Please check:
- Whether the target API server is running
- Whether the API address is correct
- Whether the server has configured correct CORS headers

### Q: How to test APIs that require authentication?
A: The current version does not support custom request headers, this feature will be added in future versions.

### Q: What response formats are supported?
A: Supports JSON and plain text formats, automatically detects and parses appropriately.

## 📞 Contact

If you have questions or suggestions, please contact us through:

- Submit [Issue](https://github.com/your-username/cors-validator/issues)
- Send email to: your-email@example.com

---

⭐ If this project helps you, please give it a star!