# 🚀 Vercel 部署指南

## 快速部署步骤

### 1. 推送代码到GitHub
```bash
# 如果还没有远程仓库，创建一个新的GitHub仓库
git remote add origin https://github.com/您的用户名/paw-therapeutics-website.git
git branch -M main
git push -u origin main
```

### 2. 部署到Vercel

#### 方式1：通过Vercel官网 (推荐)
1. 访问 [vercel.com](https://vercel.com)
2. 使用GitHub账号登录
3. 点击 "New Project"
4. 选择您的GitHub仓库
5. 配置部署设置：
   - **Framework Preset**: Next.js
   - **Root Directory**: ./
   - **Build Command**: `npm run build`
   - **Output Directory**: Leave empty (Next.js default)
   - **Install Command**: `npm install`

#### 方式2：使用Vercel CLI
```bash
# 安装Vercel CLI
npm i -g vercel

# 部署
vercel

# 生产环境部署
vercel --prod
```

### 3. 环境变量配置 (可选)

在Vercel项目设置中添加环境变量：

| 变量名 | 说明 | 必需 |
|--------|------|------|
| `NODE_ENV` | 环境类型 | 否 (自动设置) |
| `NEXT_PUBLIC_SITE_URL` | 网站URL | 否 |
| `SENDGRID_API_KEY` | 邮件服务密钥 | 否 |
| `SENDGRID_FROM_EMAIL` | 发件人邮箱 | 否 |
| `ADMIN_USERNAME` | 管理员用户名 | 否 |
| `ADMIN_PASSWORD` | 管理员密码 | 否 |

### 4. 自定义域名 (可选)

1. 在Vercel项目设置中点击 "Domains"
2. 添加您的自定义域名
3. 按照提示配置DNS记录

## 部署特性

✅ **自动构建**: 推送到main分支自动部署  
✅ **预览环境**: PR自动生成预览链接  
✅ **全球CDN**: 自动分发到全球节点  
✅ **HTTPS**: 自动SSL证书  
✅ **性能优化**: 图片优化、代码分割  
✅ **流式加载**: 渐进式内容加载  

## 优化配置

项目已包含以下Vercel优化：

- 🌏 **区域设置**: 香港、新加坡节点 (适合亚洲用户)
- ⚡ **缓存策略**: 图片和静态资源长期缓存
- 🔒 **安全头**: XSS防护、内容类型保护
- 📦 **代码分割**: 自动优化包大小
- 🖼️ **图片优化**: WebP/AVIF格式支持

## 监控和维护

- **性能监控**: Vercel Analytics (可选启用)
- **错误追踪**: 查看Vercel Functions日志
- **构建日志**: 在Vercel Dashboard查看构建详情

## 故障排除

### 构建失败
```bash
# 本地测试构建
npm run build

# 检查依赖
npm audit fix
```

### 环境变量问题
确保在Vercel项目设置中正确配置所有必需的环境变量

### 路由问题
Next.js App Router已正确配置，如有问题检查 `app/` 目录结构

---

🎉 部署完成后，您的网站将在几分钟内全球可访问！ 