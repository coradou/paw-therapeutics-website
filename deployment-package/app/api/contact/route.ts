import { NextResponse } from 'next/server'
import sgMail from '@sendgrid/mail'
import { saveContact } from '@/lib/storage'
import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'

// 配置限制
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_FILE_TYPES = ['.pdf', '.doc', '.docx', '.txt', '.jpg', '.jpeg', '.png'];

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const company = formData.get('company') as string
    const message = formData.get('message') as string
    const files = formData.getAll('files') as File[]

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

    // 处理文件上传
    const uploadedFileNames: string[] = []
    if (files && files.length > 0) {
      try {
        // 确保上传目录存在
        const uploadDir = join(process.cwd(), 'data', 'contact-uploads')
        await mkdir(uploadDir, { recursive: true })

        for (const file of files) {
          if (file.size > 0) {
            // 🛡️ 文件大小检查
            if (file.size > MAX_FILE_SIZE) {
              console.warn(`文件 ${file.name} 超过大小限制: ${file.size} bytes`);
              continue; // 跳过过大的文件
            }

            // 🛡️ 文件类型检查
            const fileExtension = '.' + (file.name.split('.').pop()?.toLowerCase() || '');
            if (!ALLOWED_FILE_TYPES.includes(fileExtension)) {
              console.warn(`文件 ${file.name} 类型不允许: ${fileExtension}`);
              continue; // 跳过不允许的文件类型
            }
            
            // 生成唯一文件名
            const timestamp = Date.now()
            const random = Math.random().toString(36).substring(2, 8)
            const uniqueFileName = `${timestamp}_${random}${fileExtension}`
            
            // 🛡️ 安全的文件保存
            const filePath = join(uploadDir, uniqueFileName)
            
            try {
              const bytes = await file.arrayBuffer()
              const buffer = Buffer.from(bytes)
              await writeFile(filePath, buffer)
              uploadedFileNames.push(uniqueFileName)
            } catch (fileWriteError) {
              console.error(`保存文件 ${file.name} 失败:`, fileWriteError);
              // 继续处理其他文件
            }
          }
        }
      } catch (fileError) {
        console.error('文件上传失败:', fileError)
        // 文件上传失败不影响联系信息提交
      }
    }

    // 保存联系信息到本地存储（主要功能）
    try {
      await saveContact({
        name,
        email,
        company,
        message,
        attachments: uploadedFileNames
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

        const attachmentsList = uploadedFileNames.length > 0 
          ? `<p><strong>附件 (${uploadedFileNames.length}个):</strong> ${uploadedFileNames.join(', ')}</p>`
          : ''

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
              ${attachmentsList}
              <hr style="border: none; border-top: 1px solid #eee;" />
              <p><strong>留言:</strong></p>
              <p style="background-color: #f9f9f9; padding: 15px; border-radius: 5px;">${message}</p>
              <hr style="border: none; border-top: 1px solid #eee;" />
              <p style="color: #666; font-size: 12px;">此消息已自动保存到管理后台</p>
            </div>
          `,
        }

        // 🛡️ 添加邮件发送超时
        const emailPromise = sgMail.send(msg);
        const timeoutPromise = new Promise((_, reject) => 
          setTimeout(() => reject(new Error('邮件发送超时')), 10000)
        );
        
        await Promise.race([emailPromise, timeoutPromise]);
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
    const successMessage = uploadedFileNames.length > 0 
      ? `感谢您的留言，我们会尽快回复！已成功上传 ${uploadedFileNames.length} 个附件。`
      : '感谢您的留言，我们会尽快回复！'

    return NextResponse.json(
      { 
        message: successMessage,
        emailSent: emailSent,
        attachmentsUploaded: uploadedFileNames.length
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