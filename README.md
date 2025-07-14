# PAW Therapeutics Website

A modern, responsive website for PAW Therapeutics built with Next.js 13+ and TypeScript.

## Features

- 🎯 Modern React 18 with Next.js 13+ App Router
- 🎨 Tailwind CSS for styling
- 🌐 Internationalization (i18n) support
- 📱 Fully responsive design
- 🚀 Optimized performance
- 🔒 Type-safe development with TypeScript

## Getting Started

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

- `app/` - Next.js 13+ App Router pages and API routes
- `components/` - Reusable React components
- `hooks/` - Custom React hooks
- `lib/` - Utility functions and configurations
- `locales/` - Translation files
- `public/` - Static assets

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🎤 语音识别功能配置

### 1. 创建环境变量文件

在项目根目录创建 `.env.local` 文件，添加以下配置：

```bash
# 阿里云语音识别配置
ALIYUN_ACCESS_KEY_ID=your_access_key_id
ALIYUN_ACCESS_KEY_SECRET=your_access_key_secret
SPEECH_PROVIDER=aliyun

# 可选：如果有NLS应用的话
# ALIYUN_NLS_APP_KEY=your_app_key
# ALIYUN_ACCESS_TOKEN=your_access_token
```

### 2. 配置说明

- **ALIYUN_ACCESS_KEY_ID**: 阿里云访问密钥ID
- **ALIYUN_ACCESS_KEY_SECRET**: 阿里云访问密钥Secret
- **SPEECH_PROVIDER**: 语音识别提供商，目前支持 `aliyun` 和 `baidu`

### 3. 开发环境特性

在开发环境下，如果未配置完整的阿里云API凭证，系统会自动使用智能模拟识别：

- 🔇 自动检测静音和噪音
- 🎯 根据音频长度模拟不同长度的识别结果
- 📊 提供合理的置信度分数
- 🔄 支持持续监听模式

### 4. 使用方法

1. 在招聘页面点击"开始面试"
2. 允许浏览器访问麦克风权限
3. 开始语音对话，系统会自动识别您的语音
4. 支持持续监听模式，无需重复点击

### 5. 故障排除

如果遇到语音识别问题：

1. 检查浏览器是否允许麦克风权限
2. 确认 `.env.local` 文件配置正确
3. 重新启动开发服务器：`npm run dev`
4. 打开浏览器开发者工具查看控制台日志

## Deployment

The website is optimized for deployment on Vercel, but can be deployed to any platform that supports Next.js.

## License

This project is proprietary and confidential. 