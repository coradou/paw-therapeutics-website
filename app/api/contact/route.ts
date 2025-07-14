import { NextResponse } from 'next/server'
import sgMail from '@sendgrid/mail'
import { saveContact } from '@/lib/storage'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, company, message } = body

    // 验证必填字段
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: '请填写所有必填字段' },
        { status: 400 }
      )
    }

    // 验证邮箱格式
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: '请输入有效的邮箱地址' },
        { status: 400 }
      )
    }

    // 保存联系信息到本地存储（主要功能）
    try {
      await saveContact({
        name,
        email,
        company,
        message
      });
      console.log('联系信息已保存到后台');
    } catch (storageError) {
      console.error('保存联系信息失败:', storageError);
      // 如果保存失败，返回错误
      return NextResponse.json(
        { error: '系统错误，请稍后重试' },
        { status: 500 }
      )
    }

    // 尝试发送邮件通知（可选功能）
    let emailSent = false;
    if (process.env.SENDGRID_API_KEY) {
      try {
        sgMail.setApiKey(process.env.SENDGRID_API_KEY)
        
        const toEmail = 'coradou@pawmed.cn'
        const fromEmail = process.env.SENDGRID_FROM_EMAIL || 'no-reply@pawmed.cn'

        const msg = {
          to: toEmail,
          from: {
            name: '爪子制药官网',
            email: fromEmail
          },
          replyTo: email,
          subject: `新的联系表单提交 - ${name}`,
          html: `
            <div style="font-family: Arial, sans-serif; color: #333;">
              <h2 style="color: #007C8C;">新的联系表单提交</h2>
              <p><strong>姓名:</strong> ${name}</p>
              <p><strong>邮箱:</strong> <a href="mailto:${email}">${email}</a></p>
              <p><strong>公司:</strong> ${company || '未提供'}</p>
              <hr style="border: none; border-top: 1px solid #eee;" />
              <p><strong>留言:</strong></p>
              <p style="background-color: #f9f9f9; padding: 15px; border-radius: 5px;">${message}</p>
              <hr style="border: none; border-top: 1px solid #eee;" />
              <p style="color: #666; font-size: 12px;">此消息已自动保存到管理后台</p>
            </div>
          `,
        }

        await sgMail.send(msg)
        emailSent = true;
        console.log('邮件通知已发送');
      } catch (emailError) {
        console.error('邮件发送失败:', emailError);
        // 邮件发送失败不影响整体成功响应
      }
    } else {
      console.log('SENDGRID_API_KEY is not set - 跳过邮件发送');
    }

    // 返回成功响应（联系信息已保存）
    return NextResponse.json(
      { 
        message: '感谢您的留言，我们会尽快回复！',
        emailSent: emailSent
      },
      { status: 200 }
    )

  } catch (error: any) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: '发送失败，请稍后重试' },
      { status: 500 }
    )
  }
} 