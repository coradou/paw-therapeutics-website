module.exports = {
  apps: [
    {
      name: 'paw-therapeutics-website',
      script: 'server.js',
      instances: 'max', // 使用所有CPU核心
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'development',
        PORT: 3000
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 3000
      },
      // 自动重启配置
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      
      // 错误重启配置
      max_restarts: 10,
      min_uptime: '10s',
      restart_delay: 4000,
      
      // 日志配置
      log_file: './logs/combined.log',
      out_file: './logs/out.log',
      error_file: './logs/error.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      
      // 监控配置
      source_map_support: true,
      instance_var: 'INSTANCE_ID',
      
      // 进程管理
      kill_timeout: 5000,
      listen_timeout: 3000,
      
      // 自动恢复
      ignore_watch: ['node_modules', 'logs', '.next'],
      watch_options: {
        followSymlinks: false
      }
    }
  ],
  
  // 部署配置
  deploy: {
    production: {
      user: 'root',
      host: ['服务器IP'],
      ref: 'origin/main',
      repo: 'https://github.com/coradou/paw-therapeutics-website.git',
      path: '/var/www/paw-therapeutics',
      'post-deploy': 'npm install && npm run build && pm2 reload ecosystem.config.js --env production',
      'pre-setup': 'apt update && apt install nodejs npm -y'
    }
  }
}; 