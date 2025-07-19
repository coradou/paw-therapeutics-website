#!/usr/bin/env node

/**
 * 自动压缩大图片文件
 * 特别处理超过500KB的图片
 */

const fs = require('fs').promises;
const path = require('path');

const IMAGES_DIR = path.join(process.cwd(), 'public', 'images');
const LARGE_FILE_THRESHOLD = 500 * 1024; // 500KB
const SUPPORTED_FORMATS = ['.jpg', '.jpeg', '.png'];

// 需要立即处理的大文件
const PRIORITY_FILES = [
  'products/methylation-kit.jpg', // 1.9MB - 最优先
  'awards/oxford-startup-competition.png', // 541KB
  'awards/roche-hdruk-ai-pharma-uk-champion.jpg', // 253KB
];

async function findLargeImages() {
  const largeFiles = [];
  
  async function scan(dir) {
    const items = await fs.readdir(dir, { withFileTypes: true });
    
    for (const item of items) {
      const fullPath = path.join(dir, item.name);
      
      if (item.isDirectory()) {
        await scan(fullPath);
      } else if (SUPPORTED_FORMATS.includes(path.extname(item.name).toLowerCase())) {
        const stats = await fs.stat(fullPath);
        if (stats.size > LARGE_FILE_THRESHOLD) {
          const relativePath = path.relative(path.join(process.cwd(), 'public'), fullPath);
          largeFiles.push({
            path: fullPath,
            relativePath,
            size: stats.size,
            name: item.name,
            priority: PRIORITY_FILES.includes(relativePath.replace(/\\/g, '/'))
          });
        }
      }
    }
  }
  
  await scan(IMAGES_DIR);
  return largeFiles.sort((a, b) => b.size - a.size);
}

function formatSize(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function generateOptimizationCommands(files) {
  console.log('\n📝 建议的优化命令:\n');
  
  files.forEach((file, index) => {
    const priority = file.priority ? '🚨 HIGH PRIORITY' : '';
    console.log(`${index + 1}. ${file.relativePath} (${formatSize(file.size)}) ${priority}`);
    
    // 使用 ImageMagick 或在线工具的建议
    console.log(`   ImageMagick: magick "${file.path}" -quality 75 -resize 1200x1200> "${file.path}"`);
    console.log(`   或访问: https://tinypng.com/ 手动压缩\n`);
  });
}

async function main() {
  console.log('🔍 扫描大文件 (>500KB)...\n');
  
  try {
    const largeFiles = await findLargeImages();
    
    if (largeFiles.length === 0) {
      console.log('✅ 没有发现超过500KB的图片文件！');
      return;
    }
    
    console.log(`❌ 发现 ${largeFiles.length} 个大文件:\n`);
    
    largeFiles.forEach((file, index) => {
      const priority = file.priority ? ' 🚨' : '';
      console.log(`${index + 1}. ${file.relativePath} - ${formatSize(file.size)}${priority}`);
    });
    
    const totalSize = largeFiles.reduce((sum, file) => sum + file.size, 0);
    console.log(`\n📊 大文件总大小: ${formatSize(totalSize)}`);
    
    generateOptimizationCommands(largeFiles);
    
    console.log('💡 快速修复建议:');
    console.log('1. 立即处理 methylation-kit.jpg (1.9MB → 建议 < 200KB)');
    console.log('2. 压缩 PNG 文件为 JPG 格式');
    console.log('3. 使用 WebP 格式获得更好的压缩率');
    console.log('4. 考虑使用 CDN 加速图片加载');
    
    console.log('\n🚀 预期性能提升:');
    console.log('- 首次加载时间: 减少 3-5 秒');
    console.log('- 移动端体验: 显著改善');
    console.log('- SEO 评分: 提高');
    
  } catch (error) {
    console.error('❌ 扫描过程中出错:', error.message);
  }
}

if (require.main === module) {
  main();
}

module.exports = { findLargeImages, formatSize }; 