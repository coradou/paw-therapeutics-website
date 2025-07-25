#!/bin/bash
echo "🚀 启动爪子制药网站服务器..."

# 创建日志目录
mkdir -p logs

# 检查权限
echo "🔒 检查文件权限..."
chmod -R 755 data/ 2>/dev/null || echo "⚠️ 无法设置data目录权限"

# 安装生产依赖
echo "📦 安装依赖..."
npm install --only=production

# 检查PM2是否安装
if ! command -v pm2 &> /dev/null; then
    echo "📦 安装PM2进程管理器..."
    npm install -g pm2
fi

# 停止可能存在的旧进程
echo "🛑 停止旧进程..."
pm2 delete paw-website 2>/dev/null || echo "没有找到旧进程"

# 使用PM2启动服务器
echo "🌐 使用PM2启动服务器..."
if [ -f ecosystem.config.js ]; then
    pm2 start ecosystem.config.js
else
    pm2 start npm --name "paw-website" -- start
fi

# 显示状态
pm2 status

echo "✅ 服务器启动完成！"
echo ""
echo "📊 基本命令:"
echo "  查看实时日志: pm2 logs paw-website"
echo "  查看状态: pm2 status"
echo "  重启服务: pm2 restart paw-website"
echo ""
echo "🛡️ 守护进程功能:"
echo "  查看守护进程状态: ./manage-guardian.sh status"
echo "  启动守护进程: ./manage-guardian.sh start"
echo "  安装为系统服务: sudo ./manage-guardian.sh install-service"
echo ""
echo "🔧 故障排查:"
echo "  诊断502错误: ./diagnose-502.sh"
echo "  查看守护进程日志: ./manage-guardian.sh logs"
echo ""
echo "💡 建议:"
echo "  1. 立即启动守护进程以确保服务稳定: ./manage-guardian.sh start"
echo "  2. 考虑安装为系统服务以开机自启: sudo ./manage-guardian.sh install-service"
