import { NextResponse } from 'next/server'
import sgMail from '@sendgrid/mail'

// 注意：实际使用时需要安装并配置 SendGrid
// import sgMail from '@sendgrid/mail'

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

    // 配置 SendGrid
    if (!process.env.SENDGRID_API_KEY) {
      console.error('SENDGRID_API_KEY is not set')
      return NextResponse.json(
        { error: '服务器配置错误' },
        { status: 500 }
      )
    }
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
    
    const toEmail = 'coradou@pawmed.cn'
    const fromEmail = process.env.SENDGRID_FROM_EMAIL || 'no-reply@pawmed.cn' // 使用环境变量或默认值

    const msg = {
      to: toEmail,
      from: {
        name: '爪子制药官网',
        email: fromEmail
      },
      replyTo: email, // 将回复地址设为用户的邮箱
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
        </div>
      `,
    }

    await sgMail.send(msg)

    return NextResponse.json(
      { message: '感谢您的留言，我们会尽快回复！' },
      { status: 200 }
    )
  } catch (error: any) {
    console.error('Contact form error:', error)
    if (error.response) {
      console.error(error.response.body)
    }
    return NextResponse.json(
      { error: '发送失败，请稍后重试' },
      { status: 500 }
    )
  }
} 