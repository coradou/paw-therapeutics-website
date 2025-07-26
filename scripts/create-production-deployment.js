#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');
const archiver = require('archiver');
const { execSync } = require('child_process');

const PROJECT_ROOT = process.cwd();
const DEPLOYMENT_DIR = path.join(PROJECT_ROOT, 'production-deployment');
const VERSION = '1.2.1';

console.log('🚀 开始创建生产级部署包...\n');

async function createProductionDeployment() {
  try {
    // 1. 清理旧的部署目录
    if (fs.existsSync(DEPLOYMENT_DIR)) {
      console.log('🧹 清理旧的部署包...');
      fs.removeSync(DEPLOYMENT_DIR);
    }

    // 2. 创建部署目录结构
    console.log('📁 创建部署包结构...');
    fs.ensureDirSync(DEPLOYMENT_DIR);
    fs.ensureDirSync(path.join(DEPLOYMENT_DIR, 'logs'));

    // 3. 复制核心文件
    console.log('📋 复制项目文件...');
    
    const filesToCopy = [
      'package.json',
      'package-lock.json', 
      'next.config.js',
      'tailwind.config.ts',
      'tsconfig.json',
      'postcss.config.js',
      'server.js',
      'ecosystem.config.js'
    ];

    filesToCopy.forEach(file => {
      if (fs.existsSync(path.join(PROJECT_ROOT, file))) {
        fs.copySync(
          path.join(PROJECT_ROOT, file),
          path.join(DEPLOYMENT_DIR, file)
        );
        console.log(`  ✅ ${file}`);
      }
    });

    // 4. 复制源代码目录
    const directoriesToCopy = [
      'app',
      'components', 
      'lib',
      'locales',
      'data',
      'public',
      'hooks'
    ];

    directoriesToCopy.forEach(dir => {
      if (fs.existsSync(path.join(PROJECT_ROOT, dir))) {
        fs.copySync(
          path.join(PROJECT_ROOT, dir),
          path.join(DEPLOYMENT_DIR, dir)
        );
        console.log(`  ✅ ${dir}/`);
      }
    });

    // 5. 创建生产环境配置
    console.log('⚙️ 创建环境配置...');
    const envConfig = `# 生产环境配置 
NODE_ENV=production
PORT=3000
HOSTNAME=0.0.0.0

# 性能配置
NEXT_TELEMETRY_DISABLED=1

# 邮件配置 (请替换为实际值)
SENDGRID_API_KEY=your_api_key_here
FROM_EMAIL=support@pawtherapeutics.com

# 文件上传配置
UPLOAD_MAX_SIZE=10485760
UPLOAD_DIR=./data/uploads
`;

    fs.writeFileSync(path.join(DEPLOYMENT_DIR, '.env.production'), envConfig);

    // 6. 创建部署脚本
    console.log('📜 创建安装脚本...');
    
    const installScript = `#!/bin/bash

echo "🚀 开始部署 Paw Therapeutics 网站 v${VERSION}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# 检查系统要求
echo "🔍 检查系统要求..."

if ! command -v node &> /dev/null; then
    echo "❌ Node.js 未安装，请先安装 Node.js 18+"
    exit 1
fi

NODE_VERSION=$(node --version | cut -d 'v' -f 2 | cut -d '.' -f 1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js 版本过低，需要 v18+，当前版本: $(node --version)"
    exit 1
fi

echo "✅ Node.js 版本: $(node --version)"

# 检查PM2
if ! command -v pm2 &> /dev/null; then
    echo "📦 安装 PM2..."
    npm install -g pm2
    if [ $? -ne 0 ]; then
        echo "❌ PM2 安装失败"
        exit 1
    fi
fi

echo "✅ PM2 版本: $(pm2 --version)"

# 创建目录
mkdir -p logs

# 安装依赖
echo "📦 安装项目依赖..."
npm ci --only=production
if [ $? -ne 0 ]; then
    echo "❌ 依赖安装失败"
    exit 1
fi

# 构建项目
echo "🔨 构建生产版本..."
npm run build
if [ $? -ne 0 ]; then
    echo "❌ 项目构建失败"
    exit 1
fi

# 停止旧服务
echo "🛑 停止旧服务..."
pm2 delete all 2>/dev/null || true

# 启动新服务
echo "🚀 启动服务..."
pm2 start ecosystem.config.js --env production

# 保存PM2配置
pm2 save

echo ""
echo "✅ 部署完成！"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🌐 访问地址: http://localhost:3000"
echo "🔍 健康检查: http://localhost:3000/health"
echo ""
echo "📊 管理命令:"
echo "  查看状态: pm2 status"
echo "  查看日志: pm2 logs"
echo "  重启服务: pm2 restart all"
echo "  停止服务: pm2 stop all"
echo "  监控界面: pm2 monit"
echo ""
echo "📋 设置开机自启:"
echo "  pm2 startup"
echo "  # 然后运行显示的命令"
`;

    fs.writeFileSync(path.join(DEPLOYMENT_DIR, 'install.sh'), installScript);

    // 7. 创建Windows安装脚本
    const installBat = `@echo off
chcp 65001 > nul
echo 🚀 开始部署 Paw Therapeutics 网站 v${VERSION}
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

echo 🔍 检查系统要求...
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js 未安装，请先安装 Node.js 18+
    pause
    exit /b 1
)

echo ✅ Node.js 版本:
node --version

pm2 --version >nul 2>&1
if errorlevel 1 (
    echo 📦 安装 PM2...
    npm install -g pm2
)

echo ✅ PM2 版本:
pm2 --version

if not exist logs mkdir logs

echo 📦 安装项目依赖...
npm ci --only=production
if errorlevel 1 (
    echo ❌ 依赖安装失败
    pause
    exit /b 1
)

echo 🔨 构建生产版本...
npm run build
if errorlevel 1 (
    echo ❌ 项目构建失败
    pause
    exit /b 1
)

echo 🛑 停止旧服务...
pm2 delete all 2>nul

echo 🚀 启动服务...
pm2 start ecosystem.config.js --env production

pm2 save

echo.
echo ✅ 部署完成！
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo 🌐 访问地址: http://localhost:3000
echo 🔍 健康检查: http://localhost:3000/health
echo.
echo 📊 管理命令:
echo   查看状态: pm2 status
echo   查看日志: pm2 logs  
echo   重启服务: pm2 restart all
echo   停止服务: pm2 stop all
echo   监控界面: pm2 monit
pause
`;

    fs.writeFileSync(path.join(DEPLOYMENT_DIR, 'install.bat'), installBat);

    // 8. 创建README
    console.log('📖 创建说明文档...');
    const readme = `# Paw Therapeutics 网站生产部署包 v${VERSION}

## 🚀 快速部署

### Linux/macOS
\`\`\`bash
chmod +x install.sh
./install.sh
\`\`\`

### Windows  
双击运行 \`install.bat\`

## 📋 系统要求

- **Node.js**: v18.0+
- **内存**: 最少 1GB，推荐 2GB+
- **磁盘**: 最少 1GB 可用空间
- **端口**: 3000 (可配置)

## ⚙️ 环境配置

部署前请编辑 \`.env.production\` 文件：

\`\`\`bash
# 邮件服务配置
SENDGRID_API_KEY=your_actual_api_key
FROM_EMAIL=your_email@domain.com

# 端口配置 (可选)
PORT=3000
\`\`\`

## 🛡️ 守护进程特性

- **自动重启**: 应用崩溃时立即恢复
- **集群模式**: 利用多核CPU提升性能  
- **内存监控**: 超过1GB自动重启
- **日志管理**: 统一收集错误和访问日志
- **健康检查**: \`/health\` 端点监控

## 🔧 服务管理

\`\`\`bash
# 查看服务状态
pm2 status

# 查看实时日志
pm2 logs

# 重启所有服务
pm2 restart all

# 停止所有服务  
pm2 stop all

# 查看监控界面
pm2 monit

# 设置开机自启
pm2 startup
pm2 save
\`\`\`

## 📊 监控和调试

### 健康检查
\`\`\`bash
curl http://localhost:3000/health
\`\`\`

### 日志位置
- 错误日志: \`logs/error.log\`
- 输出日志: \`logs/out.log\`
- 合并日志: \`logs/combined.log\`

### 性能测试
\`\`\`bash
curl -w "@-" -o /dev/null -s http://localhost:3000 <<'EOF'
     时间_DNS解析:  %{time_namelookup}s\\n
       时间_连接:  %{time_connect}s\\n  
      时间_传输:  %{time_pretransfer}s\\n
   时间_首字节:  %{time_starttransfer}s\\n
     总时间:  %{time_total}s\\n
EOF
\`\`\`

## 🔒 安全建议

1. **防火墙配置**
   \`\`\`bash
   sudo ufw allow 22    # SSH
   sudo ufw allow 80    # HTTP  
   sudo ufw allow 443   # HTTPS
   sudo ufw enable
   \`\`\`

2. **定期更新**
   \`\`\`bash
   npm update
   pm2 update
   \`\`\`

3. **备份重要数据**
   \`\`\`bash
   cp -r data/ backup/data-$(date +%Y%m%d)/
   \`\`\`

## 🆘 故障排除

### 端口被占用
\`\`\`bash
sudo lsof -i :3000
# 编辑 .env.production 修改端口
\`\`\`

### 内存不足
\`\`\`bash
# 检查内存使用
free -h
pm2 monit

# 调整PM2实例数量
# 编辑 ecosystem.config.js 中的 instances 值
\`\`\`

### 构建失败
\`\`\`bash
rm -rf .next node_modules
npm install
npm run build
\`\`\`

---

**部署完成后访问: http://localhost:3000** 🎉
`;

    fs.writeFileSync(path.join(DEPLOYMENT_DIR, 'README.md'), readme);

    // 9. 创建压缩包
    console.log('📦 创建压缩包...');
    await createZipArchive();

    console.log('\n✅ 生产部署包创建完成！');
    console.log(`📁 部署目录: ${DEPLOYMENT_DIR}`);
    console.log(`📦 压缩包: paw-therapeutics-v${VERSION}-production.zip`);
    console.log('\n🎯 特性:');
    console.log('  ✅ PM2守护进程 - 自动重启和崩溃恢复');
    console.log('  ✅ 集群模式 - 多核性能优化');
    console.log('  ✅ 健康监控 - /health端点');
    console.log('  ✅ 完整日志 - 错误和访问记录');
    console.log('  ✅ 一键部署 - install.sh/install.bat');

  } catch (error) {
    console.error('❌ 创建部署包失败:', error);
    process.exit(1);
  }
}

async function createZipArchive() {
  return new Promise((resolve, reject) => {
    const output = fs.createWriteStream(
      path.join(PROJECT_ROOT, `paw-therapeutics-v${VERSION}-production.zip`)
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
  createProductionDeployment().catch(console.error);
}

module.exports = { createProductionDeployment }; 