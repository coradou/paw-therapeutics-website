import { NextRequest, NextResponse } from 'next/server';
import { validateAuthFromRequest } from '../../../../lib/auth';
import { getAllContacts, getContactStats, updateContact } from '../../../../lib/storage';

export async function GET(request: NextRequest) {
  const auth = validateAuthFromRequest(request);
  
  if (!auth.isAuthenticated) {
    return NextResponse.json({ error: '未授权访问' }, { status: 401 });
  }

  try {
    const url = new URL(request.url);
    const includeStats = url.searchParams.get('stats') === 'true';

    const contacts = await getAllContacts();
    
    if (includeStats) {
      const stats = await getContactStats();
      return NextResponse.json({ contacts, stats });
    }

    return NextResponse.json({ contacts });
  } catch (error) {
    console.error('Error fetching contacts:', error);
    return NextResponse.json(
      { error: '获取联系信息失败' },
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
    const { id, status, notes, repliedAt } = await request.json();

    if (!id) {
      return NextResponse.json(
        { error: '缺少联系信息ID' },
        { status: 400 }
      );
    }

    const updates: any = {};
    if (status) updates.status = status;
    if (notes !== undefined) updates.notes = notes;
    if (repliedAt) updates.repliedAt = repliedAt;

    const updatedContact = await updateContact(id, updates);
    
    if (!updatedContact) {
      return NextResponse.json(
        { error: '联系信息不存在' },
        { status: 404 }
      );
    }

    return NextResponse.json({ contact: updatedContact });
  } catch (error) {
    console.error('Error updating contact:', error);
    return NextResponse.json(
      { error: '更新联系信息失败' },
      { status: 500 }
    );
  }
} 