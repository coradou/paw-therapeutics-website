#!/bin/bash

echo "🔍 爪子制药网站 502 错误诊断工具"
echo "=================================="

# 检查Node.js进程
echo ""
echo "📋 1. 检查Node.js进程状态:"
if pgrep -f "node\|next" > /dev/null; then
    echo "✅ 发现Node.js进程运行中"
    ps aux | grep -E "node|next" | grep -v grep
else
    echo "❌ 没有发现Node.js进程！这是502错误的主要原因"
fi

# 检查端口占用
echo ""
echo "📋 2. 检查端口3000状态:"
if netstat -tlnp 2>/dev/null | grep :3000 > /dev/null; then
    echo "✅ 端口3000有服务监听"
    netstat -tlnp | grep :3000
else
    echo "❌ 端口3000没有服务监听！"
fi

# 检查PM2状态
echo ""
echo "📋 3. 检查PM2进程管理器:"
if command -v pm2 &> /dev/null; then
    echo "✅ PM2已安装"
    pm2 status 2>/dev/null || echo "❌ PM2没有运行的应用"
else
    echo "⚠️ PM2未安装，建议安装: npm install -g pm2"
fi

# 检查内存使用
echo ""
echo "📋 4. 检查系统内存:"
free -h
echo ""
echo "📋 5. 检查是否有进程被系统kill:"
if dmesg | grep -i "killed process" | tail -5 | grep -q .; then
    echo "❌ 发现进程被系统kill记录:"
    dmesg | grep -i "killed process" | tail -5
else
    echo "✅ 没有发现进程被kill的记录"
fi

# 检查磁盘空间
echo ""
echo "📋 6. 检查磁盘空间:"
df -h .

# 检查data目录权限
echo ""
echo "📋 7. 检查data目录状态:"
if [ -d "data" ]; then
    echo "✅ data目录存在"
    ls -la data/
    if [ -w "data" ]; then
        echo "✅ data目录可写"
    else
        echo "❌ data目录不可写！"
    fi
else
    echo "❌ data目录不存在！"
fi

# 检查nginx状态
echo ""
echo "📋 8. 检查nginx状态:"
if systemctl is-active nginx &>/dev/null; then
    echo "✅ nginx服务运行中"
elif service nginx status &>/dev/null; then
    echo "✅ nginx服务运行中"
else
    echo "⚠️ 无法确定nginx状态，请手动检查"
fi

echo ""
echo "🔧 建议的修复步骤:"
echo "1. 如果没有Node.js进程，运行: ./start-server.sh"
echo "2. 如果内存不足，升级服务器配置或重启系统"
echo "3. 如果磁盘空间不足，清理无用文件"
echo "4. 如果权限问题，运行: sudo chown -R \$(whoami):\$(whoami) data/"
echo "5. 使用PM2管理: pm2 start ecosystem.config.js"
echo "6. 查看实时日志: pm2 logs paw-website" 