# Paw Therapeutics 网站生产服务器部署包 v1.2

## 📦 部署包信息

- **版本**: v1.2
- **文件名**: `paw-therapeutics-website-v1.2-deployment.zip`
- **大小**: 16MB
- **创建时间**: 2025年
- **Git标签**: `v1.2-deploy`

## 🚀 快速部署指南

### 1. 下载部署包
```bash
# 从GitHub Releases页面下载或使用wget
wget https://github.com/coradou/paw-therapeutics-website/releases/download/v1.2-deploy/paw-therapeutics-website-v1.2-deployment.zip
```

### 2. 解压并部署
```bash
# 解压
unzip paw-therapeutics-website-v1.2-deployment.zip
cd paw-therapeutics-website

# Linux/macOS 一键部署
chmod +x install.sh
./install.sh

# Windows 一键部署
# 双击运行 install.bat
```

### 3. 验证部署
- 访问: http://localhost:3000
- 健康检查: http://localhost:3000/health
- 查看状态: `pm2 status`

## ⚙️ 核心特性

### 🛡️ 守护进程管理 (PM2)
- **自动重启**: 应用崩溃时自动恢复
- **集群模式**: 利用多核CPU提升性能
- **内存监控**: 内存超限自动重启
- **日志管理**: 统一日志收集和轮转
- **零停机重载**: 更新时不中断服务

### 🚀 性能优化
- **代码压缩**: JS/CSS自动压缩
- **图片优化**: WebP/AVIF格式支持
- **缓存策略**: 静态资源长期缓存
- **代码分割**: 按需加载减少首屏时间
- **Gzip压缩**: 网络传输优化

### 📊 监控和日志
- **健康检查端点**: `/health`
- **详细日志**: 错误、访问、性能日志
- **进程监控**: CPU、内存使用情况
- **自动恢复**: 异常情况自动处理

## 🔧 高级配置

### 环境变量配置
编辑 `.env.production` 文件：

```bash
# 基础配置
NODE_ENV=production
PORT=3000
HOSTNAME=0.0.0.0

# 邮件服务 (SendGrid)
SENDGRID_API_KEY=your_api_key_here
FROM_EMAIL=noreply@yourcompany.com

# 安全配置
FORCE_HTTPS=true
SECURE_COOKIES=true

# 文件上传
UPLOAD_MAX_SIZE=10485760
UPLOAD_DIR=./data/uploads
```

### PM2 配置优化
编辑 `ecosystem.config.js`：

```javascript
// 根据服务器配置调整
instances: 'max',  // 或具体数字如 4
max_memory_restart: '1G',  // 根据可用内存调整
```

### Nginx 反向代理 (推荐)
```nginx
server {
    listen 80;
    server_name your-domain.com;
    
    # SSL重定向
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name your-domain.com;
    
    # SSL证书配置
    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;
    
    # 静态资源缓存
    location /_next/static/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
        proxy_pass http://localhost:3000;
    }
    
    # 图片缓存
    location /images/ {
        expires 30d;
        add_header Cache-Control "public";
        proxy_pass http://localhost:3000;
    }
    
    # 主应用代理
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        
        # 超时设置
        proxy_connect_timeout       60s;
        proxy_send_timeout          60s;
        proxy_read_timeout          60s;
    }
}
```

## 📋 运维命令

### PM2 管理
```bash
# 查看状态
pm2 status
pm2 monit

# 日志管理
pm2 logs                    # 实时日志
pm2 logs --lines 100        # 最近100行
pm2 flush                   # 清空日志

# 服务控制
pm2 restart all             # 重启
pm2 reload all              # 零停机重载
pm2 stop all                # 停止
pm2 delete all              # 删除

# 开机自启
pm2 save                    # 保存配置
pm2 startup                 # 设置开机启动
```

### 系统监控
```bash
# 磁盘使用
df -h

# 内存使用
free -h

# 网络连接
netstat -tulnp | grep :3000

# 进程监控
htop
```

### 日志分析
```bash
# 错误日志
tail -f logs/error.log

# 访问日志
tail -f logs/out.log

# 性能分析
pm2 show paw-therapeutics-website
```

## 🔒 安全最佳实践

### 1. 防火墙配置
```bash
# Ubuntu/Debian
sudo ufw allow 22          # SSH
sudo ufw allow 80          # HTTP
sudo ufw allow 443         # HTTPS
sudo ufw allow 3000        # 应用端口(如果直接访问)
sudo ufw enable

# CentOS/RHEL
sudo firewall-cmd --permanent --add-port=22/tcp
sudo firewall-cmd --permanent --add-port=80/tcp
sudo firewall-cmd --permanent --add-port=443/tcp
sudo firewall-cmd --reload
```

### 2. SSL证书 (Let's Encrypt)
```bash
# 安装Certbot
sudo apt install certbot python3-certbot-nginx

# 获取证书
sudo certbot --nginx -d your-domain.com

# 自动续期
sudo crontab -e
# 添加: 0 12 * * * /usr/bin/certbot renew --quiet
```

### 3. 系统更新
```bash
# 定期更新系统
sudo apt update && sudo apt upgrade

# 更新Node.js
sudo npm install -g n
sudo n latest

# 更新PM2
sudo npm install -g pm2@latest
```

## 🐛 故障排除

### 常见问题及解决方案

#### 1. 端口占用
```bash
# 查找占用进程
sudo lsof -i :3000
# 或
sudo netstat -tulnp | grep :3000

# 终止进程
sudo kill -9 <PID>

# 修改端口
# 编辑 .env.production 中的 PORT=3001
```

#### 2. 内存不足
```bash
# 检查内存使用
free -h
pm2 monit

# 解决方案:
# 1. 增加服务器内存
# 2. 减少PM2实例数量
# 3. 调整max_memory_restart值
```

#### 3. 构建失败
```bash
# 清除缓存重新构建
rm -rf .next node_modules package-lock.json
npm install
npm run build
```

#### 4. SSL/HTTPS问题
```bash
# 检查证书状态
sudo certbot certificates

# 强制更新证书
sudo certbot renew --force-renewal

# Nginx配置测试
sudo nginx -t
sudo systemctl reload nginx
```

### 日志调试
```bash
# 查看详细启动日志
pm2 logs paw-therapeutics-website --lines 200

# 查看系统日志
sudo journalctl -u nginx -f
sudo tail -f /var/log/nginx/error.log

# Node.js错误
node --version
npm --version
```

## 📈 性能监控

### 1. 应用监控
```bash
# PM2 Plus (高级监控)
pm2 plus

# 基础监控
pm2 monit
```

### 2. 服务器监控
推荐工具:
- **Netdata**: 实时系统监控
- **Grafana + Prometheus**: 专业监控方案
- **Uptime Robot**: 外部可用性监控

### 3. 性能优化检查
```bash
# 网站速度测试
curl -w "@curl-format.txt" -o /dev/null -s http://localhost:3000

# 创建 curl-format.txt:
cat > curl-format.txt << 'EOF'
     time_namelookup:  %{time_namelookup}\n
        time_connect:  %{time_connect}\n
     time_appconnect:  %{time_appconnect}\n
    time_pretransfer:  %{time_pretransfer}\n
       time_redirect:  %{time_redirect}\n
  time_starttransfer:  %{time_starttransfer}\n
                     ----------\n
          time_total:  %{time_total}\n
EOF
```

## 📞 技术支持

### 获取帮助
1. **查看日志**: `pm2 logs --lines 100`
2. **检查状态**: `pm2 status && pm2 monit`
3. **系统资源**: `htop && df -h`
4. **网络测试**: `curl http://localhost:3000/health`

### 联系方式
- GitHub Issues: https://github.com/coradou/paw-therapeutics-website/issues
- 邮箱: support@pawtherapeutics.com

---

**🎉 部署完成后，你的网站将以生产级性能运行，具备自动恢复、负载均衡和完整监控功能！**

**访问地址: http://your-server-ip:3000** 