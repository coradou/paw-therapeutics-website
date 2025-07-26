#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');
const { execSync } = require('child_process');
const archiver = require('archiver');

const PROJECT_ROOT = process.cwd();
const DEPLOYMENT_DIR = path.join(PROJECT_ROOT, 'deployment-package');
const VERSION = '1.2';

async function createDeploymentPackage() {
  console.log('🚀 开始创建部署包...');
  
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
    
    // 3. 构建生产版本
    console.log('🔨 构建生产版本...');
    execSync('npm run build', { stdio: 'inherit' });
    
    // 4. 复制必要文件
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
      'postcss.config.js'
    ];
    
    filesToCopy.forEach(file => {
      if (fs.existsSync(path.join(PROJECT_ROOT, file))) {
        fs.copySync(
          path.join(PROJECT_ROOT, file),
          path.join(DEPLOYMENT_DIR, file)
        );
      }
    });
    
    // 复制目录
    const directoriesToCopy = [
      '.next',
      'public',
      'components',
      'app',
      'lib',
      'locales',
      'data'
    ];
    
    directoriesToCopy.forEach(dir => {
      if (fs.existsSync(path.join(PROJECT_ROOT, dir))) {
        fs.copySync(
          path.join(PROJECT_ROOT, dir),
          path.join(DEPLOYMENT_DIR, dir)
        );
      }
    });
    
    // 5. 创建生产环境配置
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
    
    // 6. 创建部署脚本
    console.log('📜 创建部署脚本...');
    
    const deployScript = `#!/bin/bash
# 部署脚本

echo "🚀 开始部署 Paw Therapeutics 网站 v${VERSION}..."

# 检查Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js 未安装，请先安装 Node.js 18+"
    exit 1
fi

# 检查PM2
if ! command -v pm2 &> /dev/null; then
    echo "📦 安装 PM2..."
    npm install -g pm2
fi

# 创建logs目录
mkdir -p logs

# 安装依赖（仅生产依赖）
echo "📦 安装生产依赖..."
npm ci --only=production

# 启动服务
echo "🚀 启动服务..."
pm2 start ecosystem.config.js --env production

echo "✅ 部署完成！"
echo "📊 查看状态: pm2 status"
echo "📋 查看日志: pm2 logs"
echo "🔄 重启服务: pm2 restart all"
echo "⛔ 停止服务: pm2 stop all"
echo "🌐 访问地址: http://localhost:3000"
`;
    
    fs.writeFileSync(path.join(DEPLOYMENT_DIR, 'deploy.sh'), deployScript);
    
    // 给部署脚本执行权限
    try {
      execSync('chmod +x ' + path.join(DEPLOYMENT_DIR, 'deploy.sh'));
    } catch (e) {
      console.log('⚠️ 无法设置执行权限，请手动运行: chmod +x deploy.sh');
    }
    
    // 7. 创建Windows部署脚本
    const deployBat = `@echo off
echo 🚀 开始部署 Paw Therapeutics 网站 v${VERSION}...

REM 检查Node.js
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js 未安装，请先安装 Node.js 18+
    pause
    exit /b 1
)

REM 检查PM2
pm2 --version >nul 2>&1
if errorlevel 1 (
    echo 📦 安装 PM2...
    npm install -g pm2
)

REM 创建logs目录
if not exist logs mkdir logs

REM 安装依赖
echo 📦 安装生产依赖...
npm ci --only=production

REM 启动服务
echo 🚀 启动服务...
pm2 start ecosystem.config.js --env production

echo ✅ 部署完成！
echo 📊 查看状态: pm2 status
echo 📋 查看日志: pm2 logs
echo 🔄 重启服务: pm2 restart all
echo ⛔ 停止服务: pm2 stop all
echo 🌐 访问地址: http://localhost:3000
pause
`;
    
    fs.writeFileSync(path.join(DEPLOYMENT_DIR, 'deploy.bat'), deployBat);
    
    // 8. 创建README
    const readme = `# Paw Therapeutics 网站部署包 v${VERSION}

## 快速部署

### Linux/Mac:
\`\`\`bash
chmod +x deploy.sh
./deploy.sh
\`\`\`

### Windows:
双击运行 \`deploy.bat\`

## 手动部署

1. 确保已安装 Node.js 18+ 和 npm
2. 安装依赖: \`npm ci --only=production\`
3. 全局安装 PM2: \`npm install -g pm2\`
4. 启动服务: \`pm2 start ecosystem.config.js --env production\`

## 服务管理

- 查看状态: \`pm2 status\`
- 查看日志: \`pm2 logs\`
- 重启服务: \`pm2 restart all\`
- 停止服务: \`pm2 stop all\`
- 删除服务: \`pm2 delete all\`

## 环境配置

复制 \`.env.production\` 并根据实际情况修改配置。

## 系统要求

- Node.js 18+
- 内存: 最少 512MB，推荐 1GB+
- 磁盘: 最少 500MB 可用空间
- 端口: 3000 (可在 .env.production 中修改)

## 性能优化

- 启用了 Gzip 压缩
- 图片优化和缓存
- CSS/JS 压缩和分割
- PM2 集群模式
- 自动重启和错误恢复

## 健康检查

访问 \`http://localhost:3000/health\` 检查服务状态。

## 技术支持

如遇问题，请检查日志文件：
- \`logs/error.log\` - 错误日志
- \`logs/out.log\` - 输出日志
- \`logs/combined.log\` - 合并日志
`;
    
    fs.writeFileSync(path.join(DEPLOYMENT_DIR, 'README.md'), readme);
    
    // 9. 创建压缩包
    console.log('📦 创建压缩包...');
    await createZipArchive();
    
    console.log('✅ 部署包创建完成！');
    console.log(`📁 部署目录: ${DEPLOYMENT_DIR}`);
    console.log(`📦 压缩包: paw-therapeutics-website-v${VERSION}-deployment.zip`);
    
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
  createDeploymentPackage().catch(console.error);
}

module.exports = { createDeploymentPackage }; 