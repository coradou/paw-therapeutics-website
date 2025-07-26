#!/bin/bash

# 爪子制药网站守护进程管理脚本

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SERVICE_NAME="paw-website"
SYSTEMD_SERVICE="/etc/systemd/system/paw-website.service"
GUARDIAN_SCRIPT="$SCRIPT_DIR/guardian-daemon.sh"
PID_FILE="$SCRIPT_DIR/logs/guardian.pid"

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 日志函数
log() {
    echo -e "${GREEN}[$(date '+%Y-%m-%d %H:%M:%S')]${NC} $1"
}

error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

warn() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

# 检查是否为root用户
check_root() {
    if [ "$EUID" -ne 0 ]; then
        error "此操作需要root权限，请使用sudo"
        exit 1
    fi
}

# 检查守护进程状态
check_status() {
    local status="stopped"
    local method=""
    
    # 检查systemd服务状态
    if systemctl is-active --quiet "$SERVICE_NAME" 2>/dev/null; then
        status="running"
        method="systemd"
    # 检查手动启动的进程
    elif [ -f "$PID_FILE" ]; then
        local pid=$(cat "$PID_FILE" 2>/dev/null)
        if [ -n "$pid" ] && ps -p "$pid" > /dev/null 2>&1; then
            status="running"
            method="manual"
        else
            rm -f "$PID_FILE" 2>/dev/null
        fi
    fi
    
    echo "$status:$method"
}

# 显示状态
show_status() {
    local status_info=$(check_status)
    local status=$(echo "$status_info" | cut -d: -f1)
    local method=$(echo "$status_info" | cut -d: -f2)
    
    echo "=================== 守护进程状态 ==================="
    
    if [ "$status" = "running" ]; then
        log "✅ 守护进程正在运行 (通过 $method)"
        
        if [ "$method" = "systemd" ]; then
            echo ""
            systemctl status "$SERVICE_NAME" --no-pager -l
        elif [ "$method" = "manual" ]; then
            local pid=$(cat "$PID_FILE")
            echo "PID: $pid"
            echo "运行时间: $(ps -o etime= -p "$pid" 2>/dev/null | xargs)"
        fi
    else
        warn "❌ 守护进程未运行"
    fi
    
    echo ""
    echo "================= PM2服务状态 =================="
    if command -v pm2 &> /dev/null; then
        pm2 status 2>/dev/null || echo "PM2未运行"
    else
        warn "PM2未安装"
    fi
    
    echo ""
    echo "================= 系统资源 =================="
    echo "内存使用: $(free -h | grep '^Mem:' | awk '{print $3 "/" $2}')"
    echo "磁盘使用: $(df -h . | tail -1 | awk '{print $3 "/" $2 " (" $5 ")"}')"
    
    echo ""
    echo "================= 端口监听 =================="
    if netstat -tlnp 2>/dev/null | grep -q ":3000 "; then
        log "✅ 端口3000正在监听"
        netstat -tlnp | grep ":3000 "
    else
        warn "❌ 端口3000未监听"
    fi
}

# 手动启动守护进程
start_manual() {
    local status_info=$(check_status)
    local status=$(echo "$status_info" | cut -d: -f1)
    
    if [ "$status" = "running" ]; then
        warn "守护进程已在运行"
        return 1
    fi
    
    log "🚀 手动启动守护进程..."
    
    # 确保脚本可执行
    chmod +x "$GUARDIAN_SCRIPT"
    
    # 后台启动守护进程
    nohup "$GUARDIAN_SCRIPT" > logs/guardian-startup.log 2>&1 &
    
    # 等待启动
    sleep 3
    
    local new_status=$(check_status | cut -d: -f1)
    if [ "$new_status" = "running" ]; then
        log "✅ 守护进程启动成功"
        return 0
    else
        error "❌ 守护进程启动失败"
        return 1
    fi
}

# 停止守护进程
stop_guardian() {
    local status_info=$(check_status)
    local status=$(echo "$status_info" | cut -d: -f1)
    local method=$(echo "$status_info" | cut -d: -f2)
    
    if [ "$status" = "stopped" ]; then
        warn "守护进程未运行"
        return 0
    fi
    
    log "🛑 停止守护进程..."
    
    if [ "$method" = "systemd" ]; then
        systemctl stop "$SERVICE_NAME"
    elif [ "$method" = "manual" ]; then
        if [ -f "$PID_FILE" ]; then
            local pid=$(cat "$PID_FILE")
            kill -TERM "$pid" 2>/dev/null
            sleep 3
            if ps -p "$pid" > /dev/null 2>&1; then
                kill -KILL "$pid" 2>/dev/null
            fi
            rm -f "$PID_FILE"
        fi
    fi
    
    log "✅ 守护进程已停止"
}

# 安装为系统服务
install_service() {
    check_root
    
    log "📦 安装爪子制药网站守护进程为系统服务..."
    
    # 更新服务文件中的路径
    local current_path="$SCRIPT_DIR"
    local service_content=$(cat paw-website.service)
    service_content=$(echo "$service_content" | sed "s|/var/www/paw-website|$current_path|g")
    
    # 复制服务文件
    echo "$service_content" > "$SYSTEMD_SERVICE"
    
    # 设置权限
    chmod 644 "$SYSTEMD_SERVICE"
    chmod +x "$GUARDIAN_SCRIPT"
    
    # 重新加载systemd
    systemctl daemon-reload
    
    # 启用服务
    systemctl enable "$SERVICE_NAME"
    
    log "✅ 系统服务安装完成"
    log "💡 使用以下命令管理服务:"
    echo "   启动: sudo systemctl start $SERVICE_NAME"
    echo "   停止: sudo systemctl stop $SERVICE_NAME"
    echo "   状态: sudo systemctl status $SERVICE_NAME"
    echo "   日志: sudo journalctl -u $SERVICE_NAME -f"
}

# 卸载系统服务
uninstall_service() {
    check_root
    
    log "🗑️ 卸载系统服务..."
    
    # 停止并禁用服务
    systemctl stop "$SERVICE_NAME" 2>/dev/null || true
    systemctl disable "$SERVICE_NAME" 2>/dev/null || true
    
    # 删除服务文件
    rm -f "$SYSTEMD_SERVICE"
    
    # 重新加载systemd
    systemctl daemon-reload
    
    log "✅ 系统服务已卸载"
}

# 查看日志
show_logs() {
    echo "=================== 守护进程日志 ==================="
    
    local status_info=$(check_status)
    local method=$(echo "$status_info" | cut -d: -f2)
    
    if [ "$method" = "systemd" ]; then
        echo "📋 SystemD服务日志 (最近50行):"
        journalctl -u "$SERVICE_NAME" --no-pager -n 50
    fi
    
    if [ -f "logs/guardian.log" ]; then
        echo ""
        echo "📋 守护进程日志 (最近50行):"
        tail -50 logs/guardian.log
    fi
    
    if [ -f "logs/guardian-startup.log" ]; then
        echo ""
        echo "📋 启动日志:"
        cat logs/guardian-startup.log
    fi
}

# 清理日志
clean_logs() {
    log "🧹 清理旧日志文件..."
    
    # 保留最近1000行日志
    if [ -f "logs/guardian.log" ]; then
        tail -1000 logs/guardian.log > logs/guardian.log.tmp
        mv logs/guardian.log.tmp logs/guardian.log
    fi
    
    # 删除启动日志
    rm -f logs/guardian-startup.log logs/*.tmp
    
    log "✅ 日志清理完成"
}

# 显示帮助
show_help() {
    echo "爪子制药网站守护进程管理工具"
    echo ""
    echo "用法: $0 <命令> [选项]"
    echo ""
    echo "命令:"
    echo "  status              显示守护进程和服务状态"
    echo "  start               手动启动守护进程"
    echo "  stop                停止守护进程"
    echo "  restart             重启守护进程"
    echo "  install-service     安装为系统服务 (需要root)"
    echo "  uninstall-service   卸载系统服务 (需要root)"
    echo "  service-start       启动系统服务 (需要root)"
    echo "  service-stop        停止系统服务 (需要root)"
    echo "  logs                查看日志"
    echo "  clean-logs          清理旧日志"
    echo "  help                显示此帮助信息"
    echo ""
    echo "示例:"
    echo "  $0 status           # 查看当前状态"
    echo "  $0 start            # 手动启动守护进程"
    echo "  sudo $0 install-service  # 安装为系统服务"
    echo "  sudo $0 service-start    # 启动系统服务"
}

# 主函数
main() {
    case "$1" in
        "status")
            show_status
            ;;
        "start")
            start_manual
            ;;
        "stop")
            stop_guardian
            ;;
        "restart")
            stop_guardian
            sleep 2
            start_manual
            ;;
        "install-service")
            install_service
            ;;
        "uninstall-service")
            uninstall_service
            ;;
        "service-start")
            check_root
            systemctl start "$SERVICE_NAME"
            log "✅ 系统服务已启动"
            ;;
        "service-stop")
            check_root
            systemctl stop "$SERVICE_NAME"
            log "✅ 系统服务已停止"
            ;;
        "logs")
            show_logs
            ;;
        "clean-logs")
            clean_logs
            ;;
        "help"|"--help"|"-h")
            show_help
            ;;
        "")
            show_help
            ;;
        *)
            error "未知命令: $1"
            echo ""
            show_help
            exit 1
            ;;
    esac
}

# 创建日志目录
mkdir -p logs

# 执行主函数
main "$@" 