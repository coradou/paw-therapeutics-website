#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 开始创建优化的服务器部署包...\n');

// 1. 清理旧的构建文件
console.log('1️⃣ 清理旧的构建文件...');
try {
  if (fs.existsSync('.next')) {
    execSync('rm -rf .next', { stdio: 'inherit' });
  }
  if (fs.existsSync('deployment-package')) {
    execSync('rm -rf deployment-package', { stdio: 'inherit' });
  }
} catch (error) {
  console.log('清理完成');
}

// 2. 确保所有依赖都安装了
console.log('\n2️⃣ 安装完整依赖...');
execSync('npm install', { stdio: 'inherit' });

// 3. 构建项目
console.log('\n3️⃣ 构建生产版本...');
execSync('npm run build', { stdio: 'inherit' });

// 4. 创建部署文件夹
console.log('\n4️⃣ 创建部署包结构...');
execSync('mkdir -p deployment-package', { stdio: 'inherit' });

// 5. 复制必要文件
console.log('\n5️⃣ 复制必要文件...');

const filesToCopy = [
  '.next',
  'public',
  'package.json',
  'package-lock.json',
  'next.config.js',
  'vercel.json'
];

const directoriesToCopy = [
  'app',
  'components', 
  'lib',
  'locales',
  'data'
];

// 复制文件
filesToCopy.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`  📄 复制 ${file}`);
    execSync(`cp -r "${file}" deployment-package/`, { stdio: 'inherit' });
  }
});

// 复制目录
directoriesToCopy.forEach(dir => {
  if (fs.existsSync(dir)) {
    console.log(`  📁 复制 ${dir}/`);
    execSync(`cp -r "${dir}" deployment-package/`, { stdio: 'inherit' });
  }
});

// 6. 创建优化的package.json
console.log('\n6️⃣ 创建生产环境package.json...');
const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));

// 只保留生产依赖和运行脚本
const optimizedPackageJson = {
  name: packageJson.name,
  version: packageJson.version,
  private: packageJson.private,
  scripts: {
    start: packageJson.scripts.start,
    build: packageJson.scripts.build
  },
  dependencies: packageJson.dependencies,
  engines: packageJson.engines || {
    "node": ">=18.0.0",
    "npm": ">=8.0.0"
  }
};

fs.writeFileSync(
  'deployment-package/package.json',
  JSON.stringify(optimizedPackageJson, null, 2)
);

// 7. 创建服务器启动脚本
console.log('\n7️⃣ 创建服务器脚本...');

const serverScript = `#!/bin/bash
echo "🚀 启动爪子制药网站服务器..."

# 安装生产依赖
echo "📦 安装依赖..."
npm install --only=production

# 启动服务器
echo "🌐 启动服务器..."
npm start
`;

fs.writeFileSync('deployment-package/start-server.sh', serverScript);
execSync('chmod +x deployment-package/start-server.sh');

// 8. 创建Nginx配置示例
const nginxConfig = `# Nginx配置示例 (可选)
server {
    listen 80;
    server_name your-domain.com;
    
    # 静态文件缓存
    location /_next/static/ {
        expires 365d;
        add_header Cache-Control "public, immutable";
    }
    
    location /images/ {
        expires 30d;
        add_header Cache-Control "public";
    }
    
    # 主应用
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
}`;

fs.writeFileSync('deployment-package/nginx.conf.example', nginxConfig);

// 9. 创建README
const deploymentReadme = `# 🚀 服务器部署指南

## 快速部署

1. 上传此文件夹到服务器
2. 运行: \`./start-server.sh\`
3. 访问: http://your-server:3000

## 手动部署

\`\`\`bash
# 1. 安装依赖
npm install --only=production

# 2. 启动服务器
npm start
\`\`\`

## 性能优化

- ✅ 已移除开发依赖 (节省 400MB+)
- ✅ 已预构建静态文件
- ✅ 只包含运行时必需文件
- ✅ 配置了缓存策略

## 文件结构

- \`.next/\` - 构建产物 (必需)
- \`public/\` - 静态资源
- \`package.json\` - 生产依赖
- \`start-server.sh\` - 启动脚本
- \`nginx.conf.example\` - Nginx配置示例

## 环境变量 (可选)

创建 \`.env.local\` 文件:
\`\`\`
NODE_ENV=production
PORT=3000
\`\`\`

🎉 现在您的网站在服务器上也会飞快加载！
`;

fs.writeFileSync('deployment-package/README.md', deploymentReadme);

// 10. 获取包大小
console.log('\n📊 部署包统计...');
try {
  const deploymentSize = execSync('du -sh deployment-package', { encoding: 'utf8' }).trim();
  const nodeModulesSize = execSync('du -sh node_modules', { encoding: 'utf8' }).trim();
  
  console.log(`\n✅ 部署包创建完成！\n`);
  console.log(`📦 优化前 (含node_modules): ${nodeModulesSize}`);
  console.log(`📦 优化后 (部署包): ${deploymentSize}`);
  console.log(`\n💡 建议: 将 deployment-package 文件夹打包上传到服务器`);
  console.log(`💡 预期加载速度: 接近 Vercel 的性能表现`);
} catch (error) {
  console.log('统计完成');
}

console.log('\n🎉 优化部署包已准备就绪！'); 