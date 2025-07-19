import { NextRequest, NextResponse } from 'next/server';
import { validateAdminCredentials, generateSessionToken } from '../../../../lib/auth';

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json(
        { error: '用户名和密码不能为空' },
        { status: 400 }
      );
    }

    if (!validateAdminCredentials(username, password)) {
      return NextResponse.json(
        { error: '用户名或密码错误' },
        { status: 401 }
      );
    }

    const token = generateSessionToken(username);
    
    const response = NextResponse.json({
      success: true,
      message: '登录成功',
      token
    });

    // 设置Cookie
    response.cookies.set('admin_session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 // 24小时
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: '登录失败，请重试' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  // 登出
  const response = NextResponse.json({ message: '已登出' });
  response.cookies.delete('admin_session');
  return response;
} 