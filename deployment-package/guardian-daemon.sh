#!/bin/bash

# 爪子制药网站守护进程
# 功能：监控前后端服务状态，自动重启故障服务

LOG_FILE="logs/guardian.log"
HEALTH_CHECK_INTERVAL=30  # 健康检查间隔（秒）
SERVICE_NAME="paw-website"
SERVICE_URL="http://localhost:3000"
MAX_RESTART_ATTEMPTS=5
RESTART_ATTEMPTS=0

# 创建日志目录
mkdir -p logs

# 日志函数
log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" | tee -a "$LOG_FILE"
}

# 发送通知函数
send_notification() {
    local status="$1"
    local message="$2"
    
    # 如果配置了企业微信webhook，发送通知
    if [ ! -z "$WECHAT_WEBHOOK_URL" ]; then
        curl -s -X POST "$WECHAT_WEBHOOK_URL" \
            -H "Content-Type: application/json" \
            -d "{\"msgtype\":\"text\",\"text\":{\"content\":\"🚨 爪子制药网站状态: $status\n$message\n时间: $(date)\"}}" \
            > /dev/null 2>&1
    fi
    
    # 如果配置了Server酱，发送通知
    if [ ! -z "$SERVER_CHAN_KEY" ]; then
        curl -s -X POST "https://sctapi.ftqq.com/$SERVER_CHAN_KEY.send" \
            -H "Content-Type: application/json" \
            -d "{\"title\":\"网站状态: $status\",\"desp\":\"$message\"}" \
            > /dev/null 2>&1
    fi
}

# 健康检查函数
health_check() {
    local check_name="$1"
    local command="$2"
    
    if eval "$command" > /dev/null 2>&1; then
        return 0  # 健康
    else
        return 1  # 不健康
    fi
}

# 检查端口是否监听
check_port() {
    local port="$1"
    netstat -tlnp 2>/dev/null | grep ":$port " > /dev/null
}

# 检查HTTP响应
check_http() {
    local url="$1"
    local timeout=10
    
    curl -s --max-time $timeout "$url" > /dev/null 2>&1
}

# 检查进程是否存在
check_process() {
    local process_name="$1"
    pgrep -f "$process_name" > /dev/null
}

# 重启服务函数
restart_service() {
    log "🔄 尝试重启服务..."
    
    # 停止现有服务
    pm2 delete "$SERVICE_NAME" 2>/dev/null || true
    
    # 等待端口释放
    sleep 5
    
    # 重新启动服务
    if [ -f ecosystem.config.js ]; then
        pm2 start ecosystem.config.js
    else
        pm2 start npm --name "$SERVICE_NAME" -- start
    fi
    
    # 等待服务启动
    sleep 10
    
    # 验证启动是否成功
    if check_port 3000 && check_http "$SERVICE_URL"; then
        log "✅ 服务重启成功"
        RESTART_ATTEMPTS=0
        send_notification "恢复正常" "服务已成功重启并正常运行"
        return 0
    else
        log "❌ 服务重启失败"
        RESTART_ATTEMPTS=$((RESTART_ATTEMPTS + 1))
        return 1
    fi
}

# 紧急修复函数
emergency_fix() {
    log "🚨 执行紧急修复措施..."
    
    # 1. 清理僵尸进程
    pkill -f "node.*next" 2>/dev/null || true
    
    # 2. 清理PM2进程
    pm2 kill 2>/dev/null || true
    
    # 3. 等待端口释放
    sleep 10
    
    # 4. 检查并修复文件权限
    chmod -R 755 data/ 2>/dev/null || true
    
    # 5. 清理临时文件
    rm -rf .next/cache/* 2>/dev/null || true
    
    # 6. 重新安装依赖（如果需要）
    if [ ! -d node_modules ]; then
        log "📦 重新安装依赖..."
        npm install --only=production
    fi
    
    # 7. 重新启动服务
    restart_service
}

# 系统资源检查
check_system_resources() {
    # 检查内存使用率
    local memory_usage=$(free | grep Mem | awk '{printf("%.1f"), $3/$2 * 100.0}')
    if (( $(echo "$memory_usage > 90" | bc -l) )); then
        log "⚠️ 内存使用率过高: ${memory_usage}%"
        send_notification "资源警告" "内存使用率达到 ${memory_usage}%"
    fi
    
    # 检查磁盘空间
    local disk_usage=$(df . | tail -1 | awk '{print $5}' | sed 's/%//')
    if [ "$disk_usage" -gt 85 ]; then
        log "⚠️ 磁盘使用率过高: ${disk_usage}%"
        send_notification "资源警告" "磁盘使用率达到 ${disk_usage}%"
    fi
}

# 主监控循环
monitor_service() {
    log "🚀 启动爪子制药网站守护进程..."
    send_notification "守护进程启动" "网站监控服务已启动"
    
    while true; do
        local service_healthy=true
        local error_messages=""
        
        # 1. 检查PM2进程状态
        if ! health_check "PM2进程" "pm2 status | grep -q '$SERVICE_NAME.*online'"; then
            service_healthy=false
            error_messages="$error_messages\n- PM2进程异常"
        fi
        
        # 2. 检查端口监听
        if ! health_check "端口3000" "check_port 3000"; then
            service_healthy=false
            error_messages="$error_messages\n- 端口3000未监听"
        fi
        
        # 3. 检查HTTP响应
        if ! health_check "HTTP响应" "check_http '$SERVICE_URL'"; then
            service_healthy=false
            error_messages="$error_messages\n- HTTP响应异常"
        fi
        
        # 4. 检查关键API端点
        if ! health_check "API端点" "check_http '$SERVICE_URL/api/contact'"; then
            service_healthy=false
            error_messages="$error_messages\n- API端点异常"
        fi
        
        # 5. 检查系统资源
        check_system_resources
        
        # 如果服务不健康，尝试修复
        if [ "$service_healthy" = false ]; then
            log "❌ 检测到服务异常:$error_messages"
            
            if [ $RESTART_ATTEMPTS -lt $MAX_RESTART_ATTEMPTS ]; then
                if restart_service; then
                    log "✅ 服务已自动恢复"
                else
                    log "⚠️ 普通重启失败，执行紧急修复..."
                    emergency_fix
                fi
            else
                log "🚨 超过最大重启次数，需要人工干预"
                send_notification "严重故障" "服务多次重启失败，需要人工检查。错误信息:$error_messages"
                # 重置计数器，继续监控
                RESTART_ATTEMPTS=0
            fi
        else
            # 服务健康，记录状态
            if [ $(($(date +%s) % 300)) -eq 0 ]; then  # 每5分钟记录一次
                log "✅ 服务运行正常 - CPU: $(pm2 show $SERVICE_NAME 2>/dev/null | grep 'cpu' | awk '{print $3}' || echo 'N/A'), 内存: $(pm2 show $SERVICE_NAME 2>/dev/null | grep 'memory' | awk '{print $3}' || echo 'N/A')"
            fi
        fi
        
        # 等待下次检查
        sleep $HEALTH_CHECK_INTERVAL
    done
}

# 信号处理
trap 'log "🛑 收到停止信号，守护进程退出"; send_notification "守护进程停止" "网站监控服务已停止"; exit 0' SIGTERM SIGINT

# 检查是否已有守护进程在运行
if [ -f "logs/guardian.pid" ]; then
    old_pid=$(cat logs/guardian.pid)
    if ps -p $old_pid > /dev/null 2>&1; then
        log "⚠️ 守护进程已在运行 (PID: $old_pid)"
        exit 1
    fi
fi

# 记录当前进程PID
echo $$ > logs/guardian.pid

# 加载环境变量（如果存在）
if [ -f .env.local ]; then
    export $(grep -v '^#' .env.local | xargs)
fi

# 启动监控
monitor_service 