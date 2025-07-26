const fs = require('fs-extra');
const path = require('path');
const archiver = require('archiver');

const PROJECT_ROOT = process.cwd();
const DEPLOYMENT_DIR = path.join(PROJECT_ROOT, 'deployment-package');
const VERSION = '1.2';

async function createSimpleDeployment() {
  console.log('🚀 开始创建简化部署包...');
  
  try {
    // 1. 清理旧的部署目录
    if (fs.existsSync(DEPLOYMENT_DIR)) {
      console.log('🧹 清理旧的部署目录...');
      fs.removeSync(DEPLOYMENT_DIR);
    }
    
    // 2. 创建部署目录结构
    console.log('📁 创建部署目录结构...');
    fs.ensureDirSync(DEPLOYMENT_DIR);
    fs.ensureDirSync(path.join(DEPLOYMENT_DIR, 'logs'));
    
    // 3. 复制源文件（不需要预先构建）
    console.log('📋 复制项目文件...');
    
    // 复制基础文件
    const filesToCopy = [
      'package.json',
      'package-lock.json',
      'next.config.js',
      'server.js',
      'ecosystem.config.js',
      'tailwind.config.ts',
      'tsconfig.json',
      'postcss.config.js',
      'README.md'
    ];
    
    filesToCopy.forEach(file => {
      if (fs.existsSync(path.join(PROJECT_ROOT, file))) {
        fs.copySync(
          path.join(PROJECT_ROOT, file),
          path.join(DEPLOYMENT_DIR, file)
        );
        console.log(`  ✅ 复制 ${file}`);
      }
    });
    
    // 复制目录
    const directoriesToCopy = [
      'public',
      'components',
      'app',
      'lib',
      'locales',
      'data',
      'hooks'
    ];
    
    directoriesToCopy.forEach(dir => {
      if (fs.existsSync(path.join(PROJECT_ROOT, dir))) {
        fs.copySync(
          path.join(PROJECT_ROOT, dir),
          path.join(DEPLOYMENT_DIR, dir)
        );
        console.log(`  ✅ 复制 ${dir}/`);
      }
    });
    
    // 4. 创建生产环境配置
    console.log('⚙️ 创建生产环境配置...');
    const envProduction = `# 生产环境配置
NODE_ENV=production
PORT=3000
HOSTNAME=0.0.0.0

# 性能优化
NEXT_TELEMETRY_DISABLED=1
ANALYZE=false

# 缓存配置
CACHE_MAX_AGE=31536000

# 日志级别
LOG_LEVEL=info

# 安全配置
FORCE_HTTPS=true
SECURE_COOKIES=true

# 邮件服务配置（请替换为实际值）
SENDGRID_API_KEY=your_sendgrid_api_key_here
FROM_EMAIL=your_email@domain.com

# 文件上传配置
UPLOAD_MAX_SIZE=10485760
UPLOAD_DIR=./data/uploads
`;
    
    fs.writeFileSync(path.join(DEPLOYMENT_DIR, '.env.production'), envProduction);
    
    // 5. 创建安装和部署脚本
    console.log('📜 创建部署脚本...');
    
    const installScript = `#!/bin/bash
# 一键安装和部署脚本

echo "🚀 开始部署 Paw Therapeutics 网站 v${VERSION}..."

# 检查Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js 未安装，请先安装 Node.js 18+"
    exit 1
fi

echo "📋 Node.js 版本: $(node --version)"

# 检查PM2
if ! command -v pm2 &> /dev/null; then
    echo "📦 安装 PM2..."
    npm install -g pm2
fi

# 创建logs目录
mkdir -p logs

# 安装依赖
echo "📦 安装项目依赖..."
npm install

# 构建项目
echo "🔨 构建生产版本..."
npm run build

# 启动服务
echo "🚀 启动服务..."
pm2 start ecosystem.config.js --env production

echo "✅ 部署完成！"
echo ""
echo "📊 管理命令:"
echo "  查看状态: pm2 status"
echo "  查看日志: pm2 logs"
echo "  重启服务: pm2 restart all"
echo "  停止服务: pm2 stop all"
echo "  删除服务: pm2 delete all"
echo ""
echo "🌐 访问地址: http://localhost:3000"
echo "🔍 健康检查: http://localhost:3000/health"
`;
    
    fs.writeFileSync(path.join(DEPLOYMENT_DIR, 'install.sh'), installScript);
    
    // 给脚本执行权限
    try {
      require('child_process').execSync('chmod +x ' + path.join(DEPLOYMENT_DIR, 'install.sh'));
    } catch (e) {
      console.log('⚠️ 无法设置执行权限，请手动运行: chmod +x install.sh');
    }
    
    // 6. 创建Windows安装脚本
    const installBat = `@echo off
echo 🚀 开始部署 Paw Therapeutics 网站 v${VERSION}...

REM 检查Node.js
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js 未安装，请先安装 Node.js 18+
    pause
    exit /b 1
)

echo 📋 Node.js 版本:
node --version

REM 检查PM2
pm2 --version >nul 2>&1
if errorlevel 1 (
    echo 📦 安装 PM2...
    npm install -g pm2
)

REM 创建logs目录
if not exist logs mkdir logs

REM 安装依赖
echo 📦 安装项目依赖...
npm install

REM 构建项目
echo 🔨 构建生产版本...
npm run build

REM 启动服务
echo 🚀 启动服务...
pm2 start ecosystem.config.js --env production

echo ✅ 部署完成！
echo.
echo 📊 管理命令:
echo   查看状态: pm2 status
echo   查看日志: pm2 logs
echo   重启服务: pm2 restart all
echo   停止服务: pm2 stop all
echo   删除服务: pm2 delete all
echo.
echo 🌐 访问地址: http://localhost:3000
echo 🔍 健康检查: http://localhost:3000/health
pause
`;
    
    fs.writeFileSync(path.join(DEPLOYMENT_DIR, 'install.bat'), installBat);
    
    // 7. 创建详细的README
    const readme = `# Paw Therapeutics 网站部署包 v${VERSION}

## 🚀 快速部署

### Linux/macOS:
\`\`\`bash
chmod +x install.sh
./install.sh
\`\`\`

### Windows:
双击运行 \`install.bat\`

## 📋 手动部署步骤

1. **确保系统要求**
   - Node.js 18+ 和 npm
   - 最少 1GB 内存
   - 最少 1GB 磁盘空间

2. **安装依赖**
   \`\`\`bash
   npm install
   \`\`\`

3. **构建项目**
   \`\`\`bash
   npm run build
   \`\`\`

4. **安装PM2 (全局)**
   \`\`\`bash
   npm install -g pm2
   \`\`\`

5. **启动服务**
   \`\`\`bash
   pm2 start ecosystem.config.js --env production
   \`\`\`

## ⚙️ 环境配置

修改 \`.env.production\` 文件中的配置：

- \`PORT\`: 服务端口 (默认: 3000)
- \`SENDGRID_API_KEY\`: 邮件服务API密钥
- \`FROM_EMAIL\`: 发送邮件的地址

## 🔧 服务管理

### PM2 常用命令

\`\`\`bash
# 查看所有进程状态
pm2 status

# 查看日志
pm2 logs

# 重启所有服务
pm2 restart all

# 停止所有服务
pm2 stop all

# 删除所有服务
pm2 delete all

# 查看特定服务日志
pm2 logs paw-therapeutics-website

# 查看监控界面
pm2 monit
\`\`\`

### 自动启动设置

\`\`\`bash
# 保存当前PM2配置
pm2 save

# 设置开机自启
pm2 startup

# 按提示运行显示的命令
\`\`\`

## 📊 监控和维护

### 健康检查
访问 \`http://localhost:3000/health\` 检查服务状态

### 日志文件位置
- 错误日志: \`logs/error.log\`
- 输出日志: \`logs/out.log\`
- 合并日志: \`logs/combined.log\`

### 性能监控
\`\`\`bash
# 查看进程详情
pm2 show paw-therapeutics-website

# 重载服务（零停机时间）
pm2 reload paw-therapeutics-website
\`\`\`

## 🔒 安全建议

1. **防火墙设置**
   - 只开放必要端口 (3000, 22, 80, 443)
   
2. **SSL证书** (推荐)
   - 使用 Nginx 或 Cloudflare 提供 HTTPS
   
3. **定期更新**
   - 保持 Node.js 和依赖包更新

## 🌐 Nginx配置示例 (可选)

\`\`\`nginx
server {
    listen 80;
    server_name your-domain.com;
    
    # 静态资源缓存
    location /_next/static/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
    
    # 代理到Node.js应用
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
    }
}
\`\`\`

## 🐛 故障排除

### 常见问题

1. **端口被占用**
   - 修改 \`.env.production\` 中的 \`PORT\` 值
   
2. **内存不足**
   - 增加服务器内存或调整 PM2 实例数量
   
3. **构建失败**
   - 检查 Node.js 版本是否 >= 18
   - 清除缓存: \`rm -rf .next node_modules && npm install\`

### 获取帮助

1. 查看详细日志: \`pm2 logs --lines 100\`
2. 检查系统资源: \`pm2 monit\`
3. 重新安装: 删除 \`node_modules\` 后重新运行 \`./install.sh\`

---

**部署完成后访问: http://localhost:3000**
`;
    
    fs.writeFileSync(path.join(DEPLOYMENT_DIR, 'README.md'), readme);
    
    // 8. 创建压缩包
    console.log('📦 创建压缩包...');
    await createZipArchive();
    
    console.log('\n✅ 简化部署包创建完成！');
    console.log(`📁 部署目录: ${DEPLOYMENT_DIR}`);
    console.log(`📦 压缩包: paw-therapeutics-website-v${VERSION}-deployment.zip`);
    console.log('\n📝 说明:');
    console.log('  - 此包含完整源代码，将在服务器上构建');
    console.log('  - 包含PM2守护进程配置');
    console.log('  - 包含自动安装脚本');
    console.log('  - 支持自动重启和错误恢复');
    
  } catch (error) {
    console.error('❌ 创建部署包失败:', error);
    process.exit(1);
  }
}

async function createZipArchive() {
  return new Promise((resolve, reject) => {
    const output = fs.createWriteStream(
      path.join(PROJECT_ROOT, `paw-therapeutics-website-v${VERSION}-deployment.zip`)
    );
    const archive = archiver('zip', { zlib: { level: 9 } });
    
    output.on('close', () => {
      console.log(`📦 压缩包大小: ${(archive.pointer() / 1024 / 1024).toFixed(2)} MB`);
      resolve();
    });
    
    archive.on('error', reject);
    archive.pipe(output);
    archive.directory(DEPLOYMENT_DIR, 'paw-therapeutics-website');
    archive.finalize();
  });
}

// 运行脚本
if (require.main === module) {
  createSimpleDeployment().catch(console.error);
}

module.exports = { createSimpleDeployment }; 