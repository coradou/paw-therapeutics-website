# 爪子制药官网部署脚本
# 用于打包 Next.js 项目并上传到阿里云服务器

Write-Host "=== 爪子制药官网部署脚本 ===" -ForegroundColor Cyan
Write-Host "开始时间: $(Get-Date)" -ForegroundColor Gray

# 检查是否在项目根目录
if (-not (Test-Path "package.json")) {
    Write-Host "错误：请在项目根目录运行此脚本！" -ForegroundColor Red
    exit 1
}

# 检查 .next 目录是否存在
$buildExists = Test-Path ".next"

if (-not $buildExists) {
    Write-Host "未找到构建文件，正在构建项目..." -ForegroundColor Yellow
    npm run build
    if ($LASTEXITCODE -ne 0) {
        Write-Host "构建失败！" -ForegroundColor Red
        exit 1
    }
} else {
    $rebuild = Read-Host "发现已有构建文件，是否重新构建？(y/n，默认: n)"
    if ($rebuild -eq "y") {
        Write-Host "重新构建项目..." -ForegroundColor Yellow
        npm run build
        if ($LASTEXITCODE -ne 0) {
            Write-Host "构建失败！" -ForegroundColor Red
            exit 1
        }
    }
}

Write-Host "`n创建部署包..." -ForegroundColor Green

# 定义需要包含的文件和目录
$includeItems = @(
    ".next",
    "public",
    "package.json",
    "package-lock.json",
    "next.config.js"
)

# 检查是否有 .env.local 文件
if (Test-Path ".env.local") {
    $includeEnv = Read-Host "发现 .env.local 文件，是否包含在部署包中？(y/n，默认: y)"
    if ($includeEnv -ne "n") {
        $includeItems += ".env.local"
        Write-Host "已包含 .env.local 文件" -ForegroundColor Yellow
    }
}

# 检查是否有 ecosystem.config.js 文件
if (Test-Path "ecosystem.config.js") {
    $includeItems += "ecosystem.config.js"
}

# 创建临时目录
$tempDir = "pawmed-deploy-temp"
if (Test-Path $tempDir) {
    Remove-Item $tempDir -Recurse -Force
}
New-Item -ItemType Directory -Path $tempDir | Out-Null

# 复制文件到临时目录
Write-Host "准备文件..." -ForegroundColor Gray
foreach ($item in $includeItems) {
    if (Test-Path $item) {
        Write-Host "  - 复制 $item" -ForegroundColor Gray
        Copy-Item $item -Destination $tempDir -Recurse
    }
}

# 创建部署信息文件
$deployInfo = @"
部署信息
========
构建时间: $(Get-Date)
Node 版本: $(node --version)
NPM 版本: $(npm --version)
包含文件: $($includeItems -join ', ')
"@
$deployInfo | Out-File "$tempDir/DEPLOY_INFO.txt"

# 打包文件
$packageName = "pawmed-deploy-$(Get-Date -Format 'yyyyMMdd-HHmmss').tar.gz"
Write-Host "`n创建压缩包: $packageName" -ForegroundColor Green

# 使用 tar 创建压缩包
Push-Location $tempDir
tar -czf "../$packageName" *
Pop-Location

# 清理临时目录
Remove-Item $tempDir -Recurse -Force

# 计算文件大小
$fileSize = [math]::Round((Get-Item $packageName).Length / 1MB, 2)
Write-Host "✓ 部署包创建成功！大小: ${fileSize}MB" -ForegroundColor Green

# 询问是否上传到服务器
Write-Host "`n部署包已准备就绪：$packageName" -ForegroundColor Cyan
$upload = Read-Host "是否现在上传到服务器？(y/n)"

if ($upload -eq "y") {
    $serverIP = Read-Host "请输入服务器 IP 地址"
    $serverUser = Read-Host "请输入服务器用户名 (默认: root)"
    if ($serverUser -eq "") { $serverUser = "root" }
    
    Write-Host "`n上传文件到服务器..." -ForegroundColor Yellow
    scp $packageName "${serverUser}@${serverIP}:/root/"
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✓ 文件上传成功！" -ForegroundColor Green
        
        Write-Host "`n在服务器上执行以下命令完成部署：" -ForegroundColor Cyan
        Write-Host @"
# 1. SSH 连接到服务器
ssh ${serverUser}@${serverIP}

# 2. 解压并部署
cd /root
mkdir -p pawmed
cd pawmed
tar -xzf /root/$packageName
npm install --production
pm2 start npm --name "pawmed-website" -- start
pm2 save
pm2 startup

# 3. 配置 Nginx（如果还没配置）
# 参考 docs/Next.js部署说明.md 中的 Nginx 配置
"@ -ForegroundColor Gray
    }
}

Write-Host "`n部署脚本执行完成！" -ForegroundColor Green
Write-Host "完成时间: $(Get-Date)" -ForegroundColor Gray 