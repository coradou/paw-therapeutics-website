import { NextRequest, NextResponse } from 'next/server';
import { saveResume, saveResumeFile, updateResume } from '../../../lib/storage';
import { analyzeResumeWithDeepseek } from '../../../lib/deepseek';

// 🛡️ 配置限制
const MAX_RESUME_SIZE = 20 * 1024 * 1024; // 20MB
const ALLOWED_RESUME_TYPES = ['.pdf', '.doc', '.docx'];

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const position = formData.get('position') as string;
    const message = formData.get('message') as string || '';
    const resume = formData.get('resume');

    // 🛡️ 基础验证
    if (!name || !email || !position) {
      return NextResponse.json({ 
        error: '请填写姓名、邮箱和申请岗位' 
      }, { status: 400 });
    }

    if (!(resume instanceof File)) {
      return NextResponse.json({ 
        error: '请上传简历文件' 
      }, { status: 400 });
    }

    // 🛡️ 文件大小检查
    if (resume.size > MAX_RESUME_SIZE) {
      return NextResponse.json({ 
        error: `简历文件过大，最大允许${MAX_RESUME_SIZE / 1024 / 1024}MB` 
      }, { status: 400 });
    }

    // 🛡️ 文件类型检查
    const fileExtension = '.' + (resume.name.split('.').pop()?.toLowerCase() || '');
    if (!ALLOWED_RESUME_TYPES.includes(fileExtension)) {
      return NextResponse.json({ 
        error: '仅支持PDF、DOC、DOCX格式的简历文件' 
      }, { status: 400 });
    }

    // 🛡️ 邮箱格式验证
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ 
        error: '请输入有效的邮箱地址' 
      }, { status: 400 });
    }

    console.log('📝 收到简历投递:', { name, email, position, resumeName: resume.name });
    
    // 保存简历数据到存储系统
    const savedResume = await saveResume({
      name,
      email,
      position,
      message,
      resumeFileName: resume.name
    });

    // 保存简历文件
    const savedFileName = await saveResumeFile(resume, savedResume.id);
    
    // 提取简历文本内容用于AI分析
    const resumeText = `姓名: ${name}\n邮箱: ${email}\n申请岗位: ${position}\n自我介绍: ${message}\n简历文件: ${resume.name}`;
    
    // 🛡️ 后台异步进行AI分析（修复动态require问题）
    analyzeResumeWithDeepseek(resumeText, position)
      .then(analysis => {
        // 异步更新简历数据，添加AI分析结果
        updateResume(savedResume.id, {
          aiAnalysis: {
            ...analysis,
            analyzedAt: new Date().toISOString()
          },
          resumeContent: resumeText
        }).then(() => {
          console.log('✅ AI分析完成:', savedResume.id);
        }).catch(updateError => {
          console.error('❌ 更新AI分析结果失败:', updateError);
        });
      })
      .catch(error => {
        console.error('❌ AI分析失败:', error);
      });

    console.log('✅ 简历已保存，请在管理后台查看');

    return NextResponse.json({ 
      success: true, 
      message: '简历投递成功！我们会尽快与您联系。',
      resumeId: savedResume.id
    });

  } catch (error) {
    console.error('❌ 处理简历投递时发生错误:', error);
    return NextResponse.json({ 
      error: '提交失败，请稍后重试' 
    }, { status: 500 });
  }
} 