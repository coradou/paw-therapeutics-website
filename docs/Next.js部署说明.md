# Next.js 项目部署说明

## 构建命令

```bash
npm run build
```

## 构建产物说明

Next.js 使用 `next build` 命令构建后，会生成 `.next` 目录（而不是 `dist` 目录）。这是因为 Next.js 是一个**全栈框架**，需要 Node.js 运行时环境，而不是简单的静态文件。

### 生成的主要文件和目录：

```
.next/
├── server/           # 服务端渲染相关文件
├── static/           # 静态资源文件
├── cache/            # 构建缓存
├── BUILD_ID          # 构建版本标识
├── build-manifest.json
├── prerender-manifest.json
└── ... 其他配置文件
```

## 需要上传到服务器的文件

将以下文件和目录上传到服务器的 `/root/pawmed` 目录：

### 必需文件和目录：

1. **`.next/`** - 整个构建输出目录
2. **`public/`** - 静态资源目录（图片、视频等）
3. **`package.json`** - 项目依赖配置
4. **`package-lock.json`** - 依赖版本锁定文件
5. **`next.config.js`** - Next.js 配置文件
6. **`.env.local`** - 环境变量文件（如果有）

### 可选文件（推荐上传）：

7. **`node_modules/`** - 如果本地已经构建，可以直接上传避免服务器再次安装
8. **`ecosystem.config.js`** - PM2 配置文件（用于进程管理）

## 部署步骤

### 1. 本地构建并打包

```bash
# 在项目根目录执行
npm install
npm run build

# 创建部署包（Windows PowerShell）
tar -czf pawmed-deploy.tar.gz .next public package.json package-lock.json next.config.js
```

### 2. 上传到服务器

```bash
# 使用 SCP 上传（在本地执行）
scp pawmed-deploy.tar.gz root@服务器IP:/root/

# 或使用 WinSCP/FileZilla 等工具上传
```

### 3. 在服务器上解压和部署

```bash
# SSH 连接到服务器
ssh root@服务器IP

# 创建项目目录
mkdir -p /root/pawmed
cd /root/pawmed

# 解压文件
tar -xzf /root/pawmed-deploy.tar.gz

# 安装生产依赖（如果没有上传 node_modules）
npm install --production

# 创建 PM2 配置文件
cat > ecosystem.config.js << 'EOF'
module.exports = {
  apps: [{
    name: 'pawmed-website',
    script: 'npm',
    args: 'start',
    cwd: '/root/pawmed',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G'
  }]
}
EOF

# 使用 PM2 启动应用
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

### 4. 配置 Nginx 反向代理

```nginx
server {
    listen 80;
    server_name pawmed.com www.pawmed.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Next.js 静态文件缓存优化
    location /_next/static/ {
        proxy_pass http://localhost:3000;
        add_header Cache-Control "public, max-age=31536000, immutable";
    }

    location /images/ {
        proxy_pass http://localhost:3000;
        add_header Cache-Control "public, max-age=3600";
    }
}
```

## 重要提示

1. **Next.js 不是静态网站生成器**：它需要 Node.js 运行时环境，不能简单地将文件放到 Apache/Nginx 的静态目录。

2. **环境变量**：确保在服务器上设置必要的环境变量（如 SendGrid API Key）。

3. **端口配置**：默认运行在 3000 端口，需要通过 Nginx 反向代理到 80/443 端口。

4. **性能优化**：
   - 使用 PM2 管理进程，支持自动重启
   - 配置 Nginx 缓存静态资源
   - 考虑使用 CDN 加速静态资源

5. **安全建议**：
   - 不要使用 root 用户运行应用
   - 配置防火墙只开放必要端口
   - 定期更新依赖包

## 快速部署脚本

创建 `deploy-to-server.ps1`（Windows PowerShell）：

```powershell
# 构建并打包
Write-Host "构建项目..." -ForegroundColor Green
npm run build

Write-Host "创建部署包..." -ForegroundColor Green
tar -czf pawmed-deploy.tar.gz .next public package.json package-lock.json next.config.js

# 上传到服务器
$serverIP = Read-Host "输入服务器IP"
Write-Host "上传文件到服务器..." -ForegroundColor Green
scp pawmed-deploy.tar.gz root@${serverIP}:/root/

Write-Host "部署完成！请SSH到服务器完成剩余步骤。" -ForegroundColor Green
```

## 验证部署

部署完成后，可以通过以下方式验证：

1. **检查进程状态**：`pm2 status`
2. **查看应用日志**：`pm2 logs pawmed-website`
3. **访问网站**：`http://您的服务器IP:3000` 或配置域名后访问 `http://pawmed.com`

## 常见问题

1. **502 Bad Gateway**：检查 Node.js 应用是否正常运行
2. **静态资源 404**：确保 `public` 目录已正确上传
3. **环境变量未生效**：检查 `.env.local` 文件是否存在 