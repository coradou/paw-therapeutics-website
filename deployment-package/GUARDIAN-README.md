# 🛡️ 爪子制药网站守护进程系统

## 📋 功能概述

守护进程系统为您的网站提供全方位的监控和自动恢复功能，确保前后端服务始终稳定运行。

### ✨ 核心功能

- **🔍 全方位监控**: PM2进程、端口监听、HTTP响应、API端点
- **🔄 自动重启**: 检测到故障时自动重启服务
- **🚨 实时通知**: 支持企业微信和Server酱通知
- **📊 系统监控**: 内存、磁盘使用率监控
- **🛠️ 紧急修复**: 多级修复策略，包括清理僵尸进程、修复权限等
- **📝 详细日志**: 完整的运行和故障日志记录

## 🚀 快速开始

### 1. 基础启动
```bash
# 启动网站服务
./start-server.sh

# 启动守护进程（推荐）
./manage-guardian.sh start
```

### 2. 系统服务安装（推荐生产环境）
```bash
# 安装为系统服务（开机自启）
sudo ./manage-guardian.sh install-service

# 启动系统服务
sudo ./manage-guardian.sh service-start
```

## 📖 命令详解

### 管理命令
```bash
# 查看状态（最常用）
./manage-guardian.sh status

# 手动启动守护进程
./manage-guardian.sh start

# 停止守护进程
./manage-guardian.sh stop

# 重启守护进程
./manage-guardian.sh restart
```

### 系统服务命令
```bash
# 安装为系统服务
sudo ./manage-guardian.sh install-service

# 卸载系统服务
sudo ./manage-guardian.sh uninstall-service

# 启动系统服务
sudo ./manage-guardian.sh service-start

# 停止系统服务
sudo ./manage-guardian.sh service-stop
```

### 日志和诊断
```bash
# 查看守护进程日志
./manage-guardian.sh logs

# 清理旧日志文件
./manage-guardian.sh clean-logs

# 诊断502错误
./diagnose-502.sh
```

## 🔧 故障排查

### 常见问题

**1. 502错误怎么办？**
```bash
# 运行诊断工具
./diagnose-502.sh

# 如果守护进程未运行，启动它
./manage-guardian.sh start
```

**2. 如何查看服务状态？**
```bash
# 查看完整状态
./manage-guardian.sh status

# 查看PM2状态
pm2 status

# 查看端口监听
netstat -tlnp | grep :3000
```

**3. 内存使用过高怎么办？**
- 守护进程会自动监控内存使用率
- 超过设定阈值会自动重启服务
- 可以通过ecosystem.config.js调整内存限制

**4. 如何查看日志？**
```bash
# 守护进程日志
./manage-guardian.sh logs

# PM2服务日志
pm2 logs paw-website

# 系统服务日志（如果使用systemd）
sudo journalctl -u paw-website -f
```

## ⚙️ 配置选项

### 环境变量配置
在 `.env.local` 文件中配置通知服务：

```env
# 企业微信通知
WECHAT_WEBHOOK_URL=https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=your_key

# Server酱通知
SERVER_CHAN_KEY=your_server_chan_key
```

### 守护进程配置
在 `guardian-daemon.sh` 中可以调整：

```bash
HEALTH_CHECK_INTERVAL=30     # 健康检查间隔（秒）
MAX_RESTART_ATTEMPTS=5       # 最大重启尝试次数
```

### PM2配置
在 `ecosystem.config.js` 中调整：

```javascript
max_memory_restart: '500M'   # 内存超过500M自动重启
instances: 1                 # 进程实例数
```

## 📊 监控指标

守护进程会监控以下指标：

- **PM2进程状态**: 检查进程是否在线
- **端口监听**: 检查3000端口是否可用
- **HTTP响应**: 检查网站是否可访问
- **API端点**: 检查关键API是否正常
- **系统资源**: 内存和磁盘使用率
- **进程健康**: 检测僵尸进程和异常情况

## 🚨 通知功能

### 通知事件
- 守护进程启动/停止
- 服务故障检测
- 自动恢复成功/失败
- 资源使用率警告
- 紧急故障需要人工干预

### 配置通知
1. **企业微信**（推荐）：创建群机器人获取Webhook URL
2. **Server酱**：绑定微信获取SendKey

## 🎯 最佳实践

### 生产环境建议
1. **使用系统服务**: `sudo ./manage-guardian.sh install-service`
2. **配置通知**: 设置企业微信或Server酱通知
3. **定期检查**: 每周查看 `./manage-guardian.sh status`
4. **日志轮转**: 定期运行 `./manage-guardian.sh clean-logs`

### 开发环境建议
1. **手动启动**: `./manage-guardian.sh start`
2. **实时监控**: `./manage-guardian.sh logs` 查看日志
3. **快速诊断**: 遇到问题时运行 `./diagnose-502.sh`

## 📈 性能优化

### 内存优化
- PM2自动重启内存超限进程
- 守护进程监控系统内存使用
- 可调整 `max_memory_restart` 参数

### 故障恢复
- 5级故障恢复策略
- 从轻量级重启到深度清理
- 超过重试次数时人工干预

### 日志管理
- 自动日志轮转
- 保留关键错误信息
- 支持远程日志查看

## 🔒 安全说明

- 守护进程以非root权限运行（建议）
- 系统服务配置了安全限制
- 日志文件权限控制
- 环境变量安全加载

## 🆘 获取帮助

```bash
# 查看完整帮助
./manage-guardian.sh help

# 查看诊断信息
./diagnose-502.sh

# 查看实时状态
./manage-guardian.sh status
```

---

**💡 提示**: 首次部署后建议立即运行 `./manage-guardian.sh start` 启动守护进程，确保服务稳定性。 