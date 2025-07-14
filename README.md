# Paw Therapeutics 网站

爪爪医疗官方网站，展示公司业务、产品、团队等信息。

## 主要功能

- 🏢 **公司展示**：关于我们、团队介绍、办公环境
- 🔬 **产品管道**：研发管道、产品介绍  
- 🏆 **获奖展示**：公司荣誉、竞赛获奖
- 📰 **新闻博客**：公司动态、行业新闻
- 💼 **招聘系统**：职位发布、简历投递、AI简历分析
- 🤖 **AI面试系统**：智能面试对话（独立系统）
- 📞 **联系我们**：联系方式、在线表单
- 🔐 **后台管理**：简历管理、联系信息管理

## 技术栈

- **前端**: Next.js 14, React, TypeScript, Tailwind CSS
- **后端**: Next.js API Routes
- **AI服务**: DeepSeek API (简历分析)
- **文件处理**: Multer, PDF解析
- **部署**: Vercel/自托管

## AI面试系统 🆕

### 系统架构

AI面试功能已迁移至独立系统，提供更专业的面试体验：

- **当前网站**：职位展示、简历投递、简历分析
- **独立AI面试系统**：完整的AI面试流程（位于 `/Users/ninglu/Desktop/ai-interview-system`）

### 配置独立AI面试系统

1. **启动AI面试系统**：
```bash
cd /Users/ninglu/Desktop/ai-interview-system
npm install
npm run dev
```

2. **配置环境变量**：
在当前项目根目录创建 `.env.local` 文件：
```env
# AI面试系统API地址
NEXT_PUBLIC_AI_INTERVIEW_API=http://localhost:3000/api/ai-interview
```

3. **API接口说明**：
- `POST /api/ai-interview/start` - 开始面试
- `POST /api/ai-interview/chat` - 面试对话
- `POST /api/ai-interview/voice-recognition` - 语音识别
- `POST /api/ai-interview/end` - 结束面试并生成报告

### 面试流程

1. **候选人**：在招聘页面选择职位，点击"开始AI面试"
2. **系统对接**：前端调用独立AI面试系统API
3. **面试进行**：支持文本输入和语音识别
4. **智能评估**：基于DeepSeek AI生成专业面试报告
5. **数据管理**：面试数据存储在独立系统中

## 快速开始

### 环境要求

- Node.js 18+
- npm 或 yarn

### 安装依赖

```bash
npm install
```

### 环境变量配置

创建 `.env.local` 文件：

```env
# DeepSeek API (用于简历分析)
DEEPSEEK_API_KEY=your_deepseek_api_key

# AI面试系统API地址
NEXT_PUBLIC_AI_INTERVIEW_API=http://localhost:3000/api/ai-interview

# 邮件配置（可选）
SMTP_HOST=your_smtp_host
SMTP_PORT=587
SMTP_USER=your_email
SMTP_PASS=your_password

# 微信通知（可选）
WECOM_WEBHOOK_URL=your_webhook_url
SERVER_CHAN_KEY=your_server_chan_key

# 管理员认证
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your_admin_password
```

### 启动开发服务器

```bash
npm run dev
```

访问 http://localhost:3001 (如果3000端口被AI面试系统占用)

## 部署说明

### 1. 部署当前网站

```bash
npm run build
npm start
```

### 2. 部署AI面试系统

```bash
cd /Users/ninglu/Desktop/ai-interview-system
npm run build
npm start
```

### 3. 配置API连接

确保在生产环境中正确配置 `NEXT_PUBLIC_AI_INTERVIEW_API` 环境变量指向AI面试系统的地址。

## 管理功能

### 后台管理

访问 `/admin` 页面进行后台管理：

- **简历管理**：查看简历、AI分析结果、状态管理
- **联系信息**：处理用户咨询、状态跟踪
- **AI面试数据**：需访问独立AI面试系统的管理后台

### 默认管理员账号

- 用户名：admin
- 密码：请在环境变量中设置

## 功能特点

- ✅ **响应式设计**：适配各种设备
- ✅ **多语言支持**：中英文切换
- ✅ **AI简历分析**：自动评分和建议
- ✅ **智能面试**：独立AI面试系统
- ✅ **文件管理**：简历上传和下载
- ✅ **邮件通知**：自动邮件提醒
- ✅ **微信通知**：企业微信集成
- ✅ **数据统计**：完整的数据分析

## 故障排除

### 常见问题

1. **AI面试无法启动**：
   - 检查独立AI面试系统是否运行
   - 确认API地址配置正确
   - 查看控制台错误信息

2. **简历分析失败**：
   - 检查DEEPSEEK_API_KEY配置
   - 确认文件格式支持（PDF、DOC、DOCX）

3. **端口冲突**：
   - 当前网站：3001端口
   - AI面试系统：3000端口
   - 根据需要调整端口配置

## 开发指南

### 项目结构

```
paw-therapeutics-website/
├── app/                    # Next.js App Router
│   ├── admin/             # 后台管理
│   ├── api/               # API路由
│   ├── careers/           # 招聘页面
│   └── ...
├── components/            # React组件
├── lib/                   # 工具库
├── data/                  # 数据存储
└── public/               # 静态资源
```

### 添加新功能

1. 在 `app/` 目录添加新页面
2. 在 `components/` 添加可复用组件
3. 在 `app/api/` 添加API接口
4. 更新相关类型定义

## 许可证

MIT License

---

**注意**：AI面试功能现在由独立系统提供，确保两个系统都正常运行以获得完整体验。 