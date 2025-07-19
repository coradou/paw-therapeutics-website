#!/bin/bash
echo "🚀 启动爪子制药网站服务器..."

# 安装生产依赖
echo "📦 安装依赖..."
npm install --only=production

# 启动服务器
echo "🌐 启动服务器..."
npm start
