import { NextRequest, NextResponse } from 'next/server';
import sgMail from '@sendgrid/mail';
import { saveResume, saveResumeFile } from '../../../lib/storage';
import { analyzeResumeWithDeepseek } from '../../../lib/deepseek';

// 发送企业微信通知
async function sendWeChatNotification(name: string, email: string, position: string, resumeName: string, message: string) {
  const webhookUrl = process.env.WECHAT_WEBHOOK_URL;
  
  if (!webhookUrl) {
    console.warn('⚠️ 未配置企业微信Webhook URL，跳过微信通知');
    return false;
  }

  const now = new Date().toLocaleString('zh-CN', { 
    timeZone: 'Asia/Shanghai',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });

  const wechatMessage = `📄 收到新简历投递\n👤 姓名：${name}\n📧 邮箱：${email}\n💼 岗位：${position}\n📎 简历：${resumeName}\n💬 留言：${message || '无'}\n⏰ 时间：${now}\n---\n请及时查看邮箱获取简历附件`;

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        msgtype: 'text',
        text: {
          content: wechatMessage
        }
      })
    });

    if (response.ok) {
      console.log('✅ 企业微信通知发送成功');
      return true;
    } else {
      console.error('❌ 企业微信通知发送失败:', await response.text());
      return false;
    }
  } catch (error) {
    console.error('❌ 企业微信通知发送异常:', error);
    return false;
  }
}

// 发送Server酱通知（个人微信）
async function sendServerChanNotification(name: string, email: string, position: string, resumeName: string, message: string) {
  const serverChanKey = process.env.SERVER_CHAN_KEY;
  
  if (!serverChanKey) {
    console.warn('⚠️ 未配置Server酱Key，跳过个人微信通知');
    return false;
  }

  const now = new Date().toLocaleString('zh-CN', { 
    timeZone: 'Asia/Shanghai',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });

  const title = `📄 收到新简历投递 - ${name}`;
  const content = `## 简历投递详情\n\n**👤 姓名：** ${name}\n\n**📧 邮箱：** ${email}\n\n**💼 岗位：** ${position}\n\n**📎 简历：** ${resumeName}\n\n**💬 留言：** ${message || '无'}\n\n**⏰ 时间：** ${now}\n\n---\n\n请及时查看邮箱获取简历附件`;

  try {
    const response = await fetch(`https://sctapi.ftqq.com/${serverChanKey}.send`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: title,
        desp: content
      })
    });

    if (response.ok) {
      const result = await response.json();
      if (result.code === 0) {
        console.log('✅ Server酱通知发送成功');
        return true;
      } else {
        console.error('❌ Server酱通知发送失败:', result.message);
        return false;
      }
    } else {
      console.error('❌ Server酱通知发送失败:', await response.text());
      return false;
    }
  } catch (error) {
    console.error('❌ Server酱通知发送异常:', error);
    return false;
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const position = formData.get('position') as string;
    const message = formData.get('message') as string || '';
    const resume = formData.get('resume');

    if (!(resume instanceof File)) {
      return NextResponse.json({ error: '请上传简历文件' }, { status: 400 });
    }

    const now = new Date().toLocaleString('zh-CN', { 
      timeZone: 'Asia/Shanghai',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });

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
    let resumeText = `姓名: ${name}\n邮箱: ${email}\n申请岗位: ${position}\n自我介绍: ${message}\n简历文件: ${resume.name}`;
    
    // 后台异步进行AI分析（不阻塞用户响应）
    analyzeResumeWithDeepseek(resumeText, position)
      .then(analysis => {
        // 异步更新简历数据，添加AI分析结果
        const { updateResume } = require('../../../lib/storage');
        updateResume(savedResume.id, {
          aiAnalysis: {
            ...analysis,
            analyzedAt: new Date().toISOString()
          },
          resumeContent: resumeText
        });
        console.log('✅ AI分析完成:', savedResume.id);
      })
      .catch(error => {
        console.error('❌ AI分析失败:', error);
      });
    
    // 暂时跳过邮件发送，专注于微信通知
    console.log('📧 暂时跳过邮件发送，专注于微信通知');

    // 发送微信通知（优先企业微信，备选Server酱）
    const wechatSuccess = await sendWeChatNotification(name, email, position, resume.name, message);
    let notificationSent = wechatSuccess;
    
    if (!wechatSuccess) {
      notificationSent = await sendServerChanNotification(name, email, position, resume.name, message);
    }

    // 构建响应消息
    let responseMessage = '简历投递成功！';
    if (notificationSent) {
      responseMessage += '已发送微信通知。';
    } else {
      responseMessage += '通知发送可能有延迟。';
    }
    responseMessage += '我们会尽快与您联系。AI分析正在后台进行中。';

    return NextResponse.json({ 
      success: true, 
      message: responseMessage,
      resumeId: savedResume.id
    });

  } catch (error) {
    console.error('❌ 处理简历投递时发生错误:', error);
    return NextResponse.json({ 
      error: '提交失败，请稍后重试' 
    }, { status: 500 });
  }
} 