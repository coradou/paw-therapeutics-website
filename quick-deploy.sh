#!/bin/bash

# PAW制药网站 v2.0 快速部署脚本
# 使用方法: ./quick-deploy.sh

set -e

echo "🚀 PAW制药网站 v2.0 快速部署脚本"
echo "=================================="

# 检查是否是root用户
if [ "$EUID" -ne 0 ]; then
    echo "❌ 请使用root权限运行此脚本"
    echo "   sudo ./quick-deploy.sh"
    exit 1
fi

# 检查系统要求
echo "📋 检查系统要求..."

# 检查Node.js
if ! command -v node &> /dev/null; then
    echo "❌ 未找到Node.js，请先安装Node.js 18.0+!"
    exit 1
fi

NODE_VERSION=$(node --version | cut -d'v' -f2)
echo "✅ Node.js版本: $NODE_VERSION"

# 检查npm
if ! command -v npm &> /dev/null; then
    echo "❌ 未找到npm，请先安装npm!"
    exit 1
fi

# 检查PM2
if ! command -v pm2 &> /dev/null; then
    echo "📦 安装PM2..."
    npm install -g pm2
fi

echo "✅ 系统检查完成"

# 设置部署目录
DEPLOY_DIR="/opt/paw-website"
BACKUP_DIR="/opt/paw-website-backup-$(date +%Y%m%d-%H%M%S)"

echo "📁 设置部署目录: $DEPLOY_DIR"

# 备份现有部署（如果存在）
if [ -d "$DEPLOY_DIR" ]; then
    echo "💾 备份现有部署到: $BACKUP_DIR"
    mv "$DEPLOY_DIR" "$BACKUP_DIR"
fi

# 创建部署目录
mkdir -p "$DEPLOY_DIR"
cd "$DEPLOY_DIR"

# 检查部署包是否存在
PACKAGE_FILE="paw-therapeutics-production-v2.tar.gz"
if [ ! -f "$PACKAGE_FILE" ]; then
    echo "❌ 部署包 $PACKAGE_FILE 不存在!"
    echo "   请将部署包放在当前目录: $PWD"
    exit 1
fi

echo "📦 解压部署包..."
tar -xzf "$PACKAGE_FILE"
cd deployment-package/

# 安装依赖
echo "📦 安装Node.js依赖..."
npm install --production

# 构建应用
echo "🔨 构建生产版本..."
npm run build

# 设置权限
echo "🔒 设置文件权限..."
chmod +x *.sh
mkdir -p data/uploads data/contact-uploads logs
chmod 755 data data/uploads data/contact-uploads logs

# 安装守护进程服务
echo "🛡️ 安装守护进程服务..."
./manage-guardian.sh install

# 启动服务
echo "🚀 启动服务..."
./manage-guardian.sh start

# 等待服务启动
echo "⏳ 等待服务启动..."
sleep 5

# 检查服务状态
echo "🔍 检查服务状态..."
if ./manage-guardian.sh status > /dev/null 2>&1; then
    echo "✅ 服务启动成功!"
    
    # 显示服务信息
    echo ""
    echo "🎉 部署完成!"
    echo "========================"
    echo "📍 网站地址: http://localhost:3000"
    echo "📍 管理后台: http://localhost:3000/admin"
    echo "📁 部署目录: $DEPLOY_DIR/deployment-package"
    echo "📝 日志目录: $DEPLOY_DIR/deployment-package/logs"
    echo ""
    echo "🔧 管理命令:"
    echo "   ./manage-guardian.sh status    # 查看状态"
    echo "   ./manage-guardian.sh logs      # 查看日志"  
    echo "   ./manage-guardian.sh restart   # 重启服务"
    echo "   ./manage-guardian.sh stop      # 停止服务"
    echo ""
    echo "🆘 故障诊断:"
    echo "   ./diagnose-502.sh              # 诊断502错误"
    echo ""
    
    # 显示当前状态
    echo "📊 当前状态:"
    ./manage-guardian.sh status
    
else
    echo "❌ 服务启动失败!"
    echo "🔍 请检查日志："
    echo "   cat logs/guardian.log"
    echo "   cat logs/app.log"
    exit 1
fi

echo ""
echo "🎯 接下来您可以："
echo "1. 配置Nginx反向代理 (可选)"
echo "2. 设置防火墙规则"
echo "3. 配置域名解析"
echo "4. 设置SSL证书"
echo ""
echo "📖 详细文档请查看: PRODUCTION-DEPLOYMENT-v2.md" 