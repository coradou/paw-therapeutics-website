import { NextRequest, NextResponse } from 'next/server';
import { validateAuthFromRequest } from '../../../../../lib/auth';
import { getResumeById, updateResume } from '../../../../../lib/storage';

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

    return NextResponse.json({ resume });
  } catch (error) {
    console.error('Error fetching resume:', error);
    return NextResponse.json(
      { error: '获取简历详情失败' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const auth = validateAuthFromRequest(request);
  
  if (!auth.isAuthenticated) {
    return NextResponse.json({ error: '未授权访问' }, { status: 401 });
  }

  try {
    const updates = await request.json();
    const updatedResume = await updateResume(params.id, updates);
    
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