import { NextRequest, NextResponse } from 'next/server';
import { validateAuthFromRequest } from '../../../../lib/auth';
import { getAllResumes, getResumeStats, updateResume } from '../../../../lib/storage';

export async function GET(request: NextRequest) {
  const auth = validateAuthFromRequest(request);
  
  if (!auth.isAuthenticated) {
    return NextResponse.json({ error: '未授权访问' }, { status: 401 });
  }

  try {
    const url = new URL(request.url);
    const includeStats = url.searchParams.get('stats') === 'true';

    const resumes = await getAllResumes();
    
    if (includeStats) {
      const stats = await getResumeStats();
      return NextResponse.json({ resumes, stats });
    }

    return NextResponse.json({ resumes });
  } catch (error) {
    console.error('Error fetching resumes:', error);
    return NextResponse.json(
      { error: '获取简历数据失败' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  const auth = validateAuthFromRequest(request);
  
  if (!auth.isAuthenticated) {
    return NextResponse.json({ error: '未授权访问' }, { status: 401 });
  }

  try {
    const { id, ...updates } = await request.json();

    if (!id) {
      return NextResponse.json({ error: '缺少简历ID' }, { status: 400 });
    }

    const updatedResume = await updateResume(id, updates);
    
    if (!updatedResume) {
      return NextResponse.json({ error: '简历不存在' }, { status: 404 });
    }

    return NextResponse.json({ 
      success: true, 
      resume: updatedResume 
    });
  } catch (error) {
    console.error('Error updating resume:', error);
    return NextResponse.json(
      { error: '更新简历失败' },
      { status: 500 }
    );
  }
} 