#!/usr/bin/env node

/**
 * 图片优化脚本
 * 用于压缩和优化项目中的图片文件
 */

const fs = require('fs').promises;
const path = require('path');

const IMAGES_DIR = path.join(process.cwd(), 'public', 'images');
const SUPPORTED_FORMATS = ['.jpg', '.jpeg', '.png'];

async function getImageFiles(dir) {
  const files = [];
  
  async function scan(currentDir) {
    const items = await fs.readdir(currentDir, { withFileTypes: true });
    
    for (const item of items) {
      const fullPath = path.join(currentDir, item.name);
      
      if (item.isDirectory()) {
        await scan(fullPath);
      } else if (SUPPORTED_FORMATS.includes(path.extname(item.name).toLowerCase())) {
        const stats = await fs.stat(fullPath);
        files.push({
          path: fullPath,
          size: stats.size,
          name: item.name
        });
      }
    }
  }
  
  await scan(dir);
  return files;
}

async function main() {
  console.log('📸 扫描图片文件...');
  
  try {
    const imageFiles = await getImageFiles(IMAGES_DIR);
    
    console.log(`\n找到 ${imageFiles.length} 个图片文件:\n`);
    
    let totalSize = 0;
    imageFiles.forEach(file => {
      const sizeKB = (file.size / 1024).toFixed(2);
      const relativePath = path.relative(process.cwd(), file.path);
      console.log(`  ${relativePath} - ${sizeKB}KB`);
      totalSize += file.size;
    });
    
    const totalSizeMB = (totalSize / 1024 / 1024).toFixed(2);
    console.log(`\n总大小: ${totalSizeMB}MB\n`);
    
    // 显示建议
    console.log('💡 优化建议:');
    console.log('1. 使用在线工具压缩图片:');
    console.log('   - TinyPNG (tinypng.com)');
    console.log('   - 智图 (zhitu.isux.us)');
    console.log('   - Squoosh (squoosh.app)');
    console.log('');
    console.log('2. 建议的目标大小:');
    console.log('   - 头像照片: < 30KB');
    console.log('   - 产品图片: < 50KB');
    console.log('   - 背景图片: < 100KB');
    console.log('');
    console.log('3. 考虑转换为WebP格式以获得更小的文件大小');
    
  } catch (error) {
    console.error('❌ 扫描图片时出错:', error.message);
  }
}

if (require.main === module) {
  main();
} 