import { NextRequest, NextResponse } from 'next/server';
import { validateAuthFromRequest } from '../../../../../../lib/auth';
import { getResumeById } from '../../../../../../lib/storage';
import { promises as fs } from 'fs';
import path from 'path';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const auth = validateAuthFromRequest(request);
  
  if (!auth.isAuthenticated) {
    return NextResponse.json({ error: '未授权访问' }, { status: 401 });
  }

  try {
    const resume = await getResumeById(params.id);
    
    if (!resume) {
      return NextResponse.json({ error: '简历不存在' }, { status: 404 });
    }

    // 实际保存的文件名是基于ID的，而不是原始文件名
    const fileExtension = path.extname(resume.resumeFileName);
    const actualFileName = `${params.id}${fileExtension}`;
    const filePath = path.join(process.cwd(), 'data', 'uploads', actualFileName);
    
    try {
      const fileBuffer = await fs.readFile(filePath);
      const url = new URL(request.url);
      const action = url.searchParams.get('action'); // 'view' 或 'download'
      
      // 根据文件类型设置正确的MIME类型
      const ext = path.extname(resume.resumeFileName).toLowerCase();
      let contentType = 'application/octet-stream';
      
      switch (ext) {
        case '.pdf':
          contentType = 'application/pdf';
          break;
        case '.doc':
          contentType = 'application/msword';
          break;
        case '.docx':
          contentType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
          break;
        case '.txt':
          contentType = 'text/plain';
          break;
      }

      const response = new NextResponse(fileBuffer);
      response.headers.set('Content-Type', contentType);
      
      if (action === 'download') {
        response.headers.set('Content-Disposition', `attachment; filename="${encodeURIComponent(resume.resumeFileName)}"`);
      } else {
        // 在线查看
        response.headers.set('Content-Disposition', `inline; filename="${encodeURIComponent(resume.resumeFileName)}"`);
      }
      
      return response;
    } catch (fileError) {
      console.error('File not found:', fileError);
      return NextResponse.json({ error: '文件不存在' }, { status: 404 });
    }
  } catch (error) {
    console.error('Error serving file:', error);
    return NextResponse.json(
      { error: '文件服务失败' },
      { status: 500 }
    );
  }
} 