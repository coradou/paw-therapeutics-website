import { NextRequest } from 'next/server';

// 简单的管理员认证配置
const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'paw2024admin!' // 在生产环境中应该使用环境变量
};

export interface AuthSession {
  isAuthenticated: boolean;
  username?: string;
  loginTime?: string;
}

// 验证管理员凭据
export function validateAdminCredentials(username: string, password: string): boolean {
  return username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password;
}

// 生成简单的会话token
export function generateSessionToken(username: string): string {
  const payload = {
    username,
    loginTime: new Date().toISOString(),
    exp: Date.now() + (24 * 60 * 60 * 1000) // 24小时过期
  };
  
  // 在生产环境中应该使用更安全的JWT
  return Buffer.from(JSON.stringify(payload)).toString('base64');
}

// 验证会话token
export function validateSessionToken(token: string): AuthSession {
  try {
    const payload = JSON.parse(Buffer.from(token, 'base64').toString());
    
    if (Date.now() > payload.exp) {
      return { isAuthenticated: false };
    }
    
    return {
      isAuthenticated: true,
      username: payload.username,
      loginTime: payload.loginTime
    };
  } catch (error) {
    return { isAuthenticated: false };
  }
}

// 从请求中验证身份
export function validateAuthFromRequest(request: NextRequest): AuthSession {
  const token = request.cookies.get('admin_session')?.value || 
                request.headers.get('Authorization')?.replace('Bearer ', '');
  
  if (!token) {
    return { isAuthenticated: false };
  }
  
  return validateSessionToken(token);
} 