# 🚀 服务器部署指南

## 快速部署

1. 上传此文件夹到服务器
2. 运行: `./start-server.sh`
3. 访问: http://your-server:3000

## 手动部署

```bash
# 1. 安装依赖
npm install --only=production

# 2. 启动服务器
npm start
```

## 性能优化

- ✅ 已移除开发依赖 (节省 400MB+)
- ✅ 已预构建静态文件
- ✅ 只包含运行时必需文件
- ✅ 配置了缓存策略

## 文件结构

- `.next/` - 构建产物 (必需)
- `public/` - 静态资源
- `package.json` - 生产依赖
- `start-server.sh` - 启动脚本
- `nginx.conf.example` - Nginx配置示例

## 环境变量 (可选)

创建 `.env.local` 文件:
```
NODE_ENV=production
PORT=3000
```

🎉 现在您的网站在服务器上也会飞快加载！
