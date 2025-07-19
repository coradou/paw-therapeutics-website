#!/usr/bin/env node

/**
 * 网站性能检测脚本
 * 检测网站加载速度和图片优化状态
 */

const https = require('https');
const fs = require('fs').promises;
const path = require('path');

const WEBSITE_URL = 'www.pawmed.cn';
const MAX_IMAGE_SIZE = 200 * 1024; // 200KB
const TARGET_TTFB = 1000; // 1秒

function measureLoadTime(hostname) {
  return new Promise((resolve, reject) => {
    const startTime = Date.now();
    
    const req = https.get({
      hostname: hostname,
      port: 443,
      path: '/',
      timeout: 10000
    }, (res) => {
      const firstByteTime = Date.now() - startTime;
      
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        const totalTime = Date.now() - startTime;
        resolve({
          ttfb: firstByteTime,
          total: totalTime,
          status: res.statusCode
        });
      });
    });
    
    req.on('timeout', () => {
      req.destroy();
      reject(new Error('请求超时'));
    });
    
    req.on('error', (err) => {
      reject(err);
    });
  });
}

async function checkImages() {
  const imagesDir = path.join(process.cwd(), 'public', 'images');
  const issues = [];
  
  async function scanDir(dir) {
    const items = await fs.readdir(dir, { withFileTypes: true });
    
    for (const item of items) {
      const fullPath = path.join(dir, item.name);
      
      if (item.isDirectory()) {
        await scanDir(fullPath);
      } else if (/\.(jpg|jpeg|png|gif)$/i.test(item.name)) {
        const stats = await fs.stat(fullPath);
        if (stats.size > MAX_IMAGE_SIZE) {
          const relativePath = path.relative(path.join(process.cwd(), 'public'), fullPath);
          issues.push({
            path: relativePath,
            size: stats.size,
            recommended: Math.round(MAX_IMAGE_SIZE / 1024) + 'KB'
          });
        }
      }
    }
  }
  
  await scanDir(imagesDir);
  return issues;
}

function getPerformanceGrade(ttfb, imageIssues) {
  let score = 100;
  
  // TTFB 评分
  if (ttfb > 3000) score -= 40;
  else if (ttfb > 2000) score -= 30;
  else if (ttfb > 1000) score -= 20;
  else if (ttfb > 500) score -= 10;
  
  // 图片评分
  const imagesPenalty = Math.min(imageIssues.length * 10, 40);
  score -= imagesPenalty;
  
  score = Math.max(score, 0);
  
  if (score >= 90) return 'A';
  if (score >= 80) return 'B';
  if (score >= 70) return 'C';
  if (score >= 60) return 'D';
  return 'F';
}

async function main() {
  console.log('🔍 PAW Therapeutics 网站性能检测\n');
  console.log('=' .repeat(50));
  
  try {
    // 检测网站加载速度
    console.log('⏱️  检测网站加载速度...');
    const performance = await measureLoadTime(WEBSITE_URL);
    
    console.log(`\n📊 加载性能报告:`);
    console.log(`   首字节时间 (TTFB): ${performance.ttfb}ms`);
    console.log(`   总加载时间: ${performance.total}ms`);
    console.log(`   HTTP 状态: ${performance.status}`);
    
    // 评估 TTFB
    let ttfbStatus = '✅ 优秀';
    if (performance.ttfb > 2000) ttfbStatus = '❌ 很慢';
    else if (performance.ttfb > 1000) ttfbStatus = '⚠️  较慢';
    else if (performance.ttfb > 500) ttfbStatus = '🟡 一般';
    
    console.log(`   TTFB 评估: ${ttfbStatus}`);
    
    // 检测图片优化状态
    console.log('\n🖼️  检测图片优化状态...');
    const imageIssues = await checkImages();
    
    if (imageIssues.length === 0) {
      console.log('   ✅ 所有图片都已优化！');
    } else {
      console.log(`   ❌ 发现 ${imageIssues.length} 个需要优化的图片:`);
      imageIssues.forEach((issue, index) => {
        const sizeMB = (issue.size / 1024 / 1024).toFixed(2);
        console.log(`   ${index + 1}. ${issue.path} (${sizeMB}MB → 建议 ${issue.recommended})`);
      });
    }
    
    // 综合评分
    const grade = getPerformanceGrade(performance.ttfb, imageIssues);
    console.log(`\n🎯 性能等级: ${grade}`);
    
    // 建议
    console.log('\n💡 优化建议:');
    if (performance.ttfb > 1000) {
      console.log('   📡 优化服务器响应时间');
      console.log('   🔄 考虑使用 CDN');
    }
    if (imageIssues.length > 0) {
      console.log('   🖼️  压缩大图片文件');
      console.log('   ⚡ 使用 WebP 格式');
    }
    if (grade === 'A') {
      console.log('   🎉 网站性能优秀，继续保持！');
    }
    
  } catch (error) {
    console.error('❌ 检测过程中出错:', error.message);
  }
  
  console.log('\n' + '=' .repeat(50));
  console.log('🚀 运行 npm run compress-large 查看详细图片优化建议');
}

if (require.main === module) {
  main();
}

module.exports = { measureLoadTime, checkImages, getPerformanceGrade }; 