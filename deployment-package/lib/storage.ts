import { promises as fs } from 'fs';
import path from 'path';

export interface ResumeData {
  id: string;
  name: string;
  email: string;
  position: string;
  message: string;
  resumeFileName: string;
  resumeContent?: string; // 简历内容文本
  aiAnalysis?: {
    score: number;
    strengths: string[];
    weaknesses: string[];
    recommendation: 'recommended' | 'consider' | 'not_recommended';
    summary: string;
    technicalSkills: string[];
    experience: string;
    education: string;
    fitForPosition: string;
    analyzedAt: string;
  };
  submittedAt: string;
  status: 'new' | 'reviewed' | 'contacted' | 'rejected';
  notes?: string;
}

// 联系信息接口
export interface ContactData {
  id: string;
  name: string;
  email: string;
  company?: string;
  message: string;
  attachments?: string[]; // 附件文件名数组
  submittedAt: string;
  status: 'new' | 'read' | 'replied' | 'archived';
  notes?: string;
  repliedAt?: string;
}

// 面试数据接口
export interface InterviewData {
  id: string;
  candidateInfo: {
    name?: string;
    email?: string;
    position?: string;
  };
  jobId: string;
  jobTitle: string;
  chatHistory: Array<{
    role: 'ai' | 'user';
    content: string;
    timestamp: Date;
  }>;
  evaluation: {
    overallScore: number;
    technicalScore: number;
    communicationScore: number;
    experienceScore: number;
    strengths: string[];
    weaknesses: string[];
    summary: string;
    recommendation: 'recommended' | 'consider' | 'not_recommended';
    suggestions: string[];
  };
  interviewDuration: number; // 面试时长（秒）
  interviewedAt: string;
  status: 'new' | 'reviewed' | 'contacted' | 'rejected';
  notes?: string;
}

const DATA_DIR = path.join(process.cwd(), 'data');
const RESUMES_FILE = path.join(DATA_DIR, 'resumes.json');
const CONTACTS_FILE = path.join(DATA_DIR, 'contacts.json');
const INTERVIEWS_FILE = path.join(DATA_DIR, 'interviews.json');
const UPLOADS_DIR = path.join(DATA_DIR, 'uploads');
const CONTACT_UPLOADS_DIR = path.join(DATA_DIR, 'contact-uploads');

// 🛡️ 文件操作锁，防止竞态条件
const fileLocks = new Map<string, Promise<any>>();

// 🛡️ 安全的JSON解析
function safeJSONParse<T>(data: string, fallback: T): T {
  try {
    const parsed = JSON.parse(data);
    return parsed as T;
  } catch (error) {
    console.error('JSON解析失败:', error);
    return fallback;
  }
}

// 🛡️ 安全的文件读取
async function safeReadFile(filePath: string, fallback: string = '[]'): Promise<string> {
  try {
    const data = await fs.readFile(filePath, 'utf-8');
    return data || fallback;
  } catch (error) {
    if ((error as any).code === 'ENOENT') {
      // 文件不存在，返回默认值
      return fallback;
    }
    console.error('文件读取失败:', error);
    throw error;
  }
}

// 🛡️ 安全的文件写入（带锁）
async function safeWriteFile(filePath: string, data: string): Promise<void> {
  // 使用文件路径作为锁的key
  const lockKey = filePath;
  
  // 如果已有操作在进行，等待完成
  if (fileLocks.has(lockKey)) {
    await fileLocks.get(lockKey);
  }
  
  // 创建新的写入操作
  const writeOperation = async () => {
    try {
      // 确保目录存在
      await fs.mkdir(path.dirname(filePath), { recursive: true });
      
      // 原子性写入：先写入临时文件，再重命名
      const tempFile = `${filePath}.tmp`;
      await fs.writeFile(tempFile, data, 'utf-8');
      await fs.rename(tempFile, filePath);
    } catch (error) {
      console.error('文件写入失败:', error);
      throw error;
    }
  };
  
  const operation = writeOperation();
  fileLocks.set(lockKey, operation);
  
  try {
    await operation;
  } finally {
    fileLocks.delete(lockKey);
  }
}

// 确保数据目录存在
async function ensureDataDir() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.mkdir(UPLOADS_DIR, { recursive: true });
    await fs.mkdir(CONTACT_UPLOADS_DIR, { recursive: true });
    
    // 检查目录权限
    try {
      await fs.access(DATA_DIR, fs.constants.W_OK);
      await fs.access(UPLOADS_DIR, fs.constants.W_OK);
      await fs.access(CONTACT_UPLOADS_DIR, fs.constants.W_OK);
    } catch (permError: any) {
      console.warn('⚠️ 目录权限可能不足:', permError.message);
    }
  } catch (error) {
    console.error('❌ 创建数据目录失败:', error);
    throw new Error('无法创建必要的数据目录，请检查文件系统权限');
  }
}

// 读取所有简历数据
export async function getAllResumes(): Promise<ResumeData[]> {
  try {
    await ensureDataDir();
    const data = await safeReadFile(RESUMES_FILE);
    return safeJSONParse(data, []);
  } catch (error) {
    console.error('获取简历数据失败:', error);
    return [];
  }
}

// 保存简历数据
export async function saveResume(resume: Omit<ResumeData, 'id' | 'submittedAt' | 'status'>): Promise<ResumeData> {
  await ensureDataDir();
  
  const resumes = await getAllResumes();
  const newResume: ResumeData = {
    ...resume,
    id: generateId(),
    submittedAt: new Date().toISOString(),
    status: 'new'
  };
  
  resumes.push(newResume);
  await safeWriteFile(RESUMES_FILE, JSON.stringify(resumes, null, 2));
  
  return newResume;
}

// 更新简历数据
export async function updateResume(id: string, updates: Partial<ResumeData>): Promise<ResumeData | null> {
  const resumes = await getAllResumes();
  const index = resumes.findIndex(resume => resume.id === id);
  
  if (index === -1) {
    return null;
  }
  
  resumes[index] = { ...resumes[index], ...updates };
  await safeWriteFile(RESUMES_FILE, JSON.stringify(resumes, null, 2));
  
  return resumes[index];
}

// 根据ID获取简历
export async function getResumeById(id: string): Promise<ResumeData | null> {
  const resumes = await getAllResumes();
  return resumes.find(resume => resume.id === id) || null;
}

// 🛡️ 安全的简历文件保存
export async function saveResumeFile(file: File, resumeId: string): Promise<string> {
  await ensureDataDir();
  
  // 🛡️ 文件大小限制
  const MAX_RESUME_SIZE = 20 * 1024 * 1024; // 20MB
  if (file.size > MAX_RESUME_SIZE) {
    throw new Error(`简历文件过大，最大允许${MAX_RESUME_SIZE / 1024 / 1024}MB`);
  }
  
  const fileExtension = path.extname(file.name);
  const fileName = `${resumeId}${fileExtension}`;
  const filePath = path.join(UPLOADS_DIR, fileName);
  
  try {
    const buffer = await file.arrayBuffer();
    await fs.writeFile(filePath, Buffer.from(buffer));
    return fileName;
  } catch (error) {
    console.error('保存简历文件失败:', error);
    throw new Error('简历文件保存失败');
  }
}

// 获取简历文件路径
export function getResumeFilePath(fileName: string): string {
  return path.join(UPLOADS_DIR, fileName);
}

// === 联系信息相关函数 ===

// 读取所有联系信息
export async function getAllContacts(): Promise<ContactData[]> {
  try {
    await ensureDataDir();
    const data = await safeReadFile(CONTACTS_FILE);
    return safeJSONParse(data, []);
  } catch (error) {
    console.error('获取联系信息失败:', error);
    return [];
  }
}

// 保存联系信息
export async function saveContact(contact: Omit<ContactData, 'id' | 'submittedAt' | 'status'>): Promise<ContactData> {
  await ensureDataDir();
  
  const contacts = await getAllContacts();
  const newContact: ContactData = {
    ...contact,
    id: generateId(),
    submittedAt: new Date().toISOString(),
    status: 'new'
  };
  
  contacts.unshift(newContact); // 新消息排在前面
  await safeWriteFile(CONTACTS_FILE, JSON.stringify(contacts, null, 2));
  
  return newContact;
}

// 更新联系信息
export async function updateContact(id: string, updates: Partial<ContactData>): Promise<ContactData | null> {
  const contacts = await getAllContacts();
  const index = contacts.findIndex(contact => contact.id === id);
  
  if (index === -1) {
    return null;
  }
  
  contacts[index] = { ...contacts[index], ...updates };
  await safeWriteFile(CONTACTS_FILE, JSON.stringify(contacts, null, 2));
  
  return contacts[index];
}

// 根据ID获取联系信息
export async function getContactById(id: string): Promise<ContactData | null> {
  const contacts = await getAllContacts();
  return contacts.find(contact => contact.id === id) || null;
}

// 联系信息统计
export async function getContactStats() {
  const contacts = await getAllContacts();
  
  return {
    total: contacts.length,
    new: contacts.filter(c => c.status === 'new').length,
    read: contacts.filter(c => c.status === 'read').length,
    replied: contacts.filter(c => c.status === 'replied').length,
    archived: contacts.filter(c => c.status === 'archived').length,
  };
}

// 生成唯一ID
function generateId(): string {
  return Math.random().toString(36).substr(2, 15);
}

// 统计数据
export async function getResumeStats() {
  const resumes = await getAllResumes();
  
  return {
    total: resumes.length,
    new: resumes.filter(r => r.status === 'new').length,
    reviewed: resumes.filter(r => r.status === 'reviewed').length,
    contacted: resumes.filter(r => r.status === 'contacted').length,
    rejected: resumes.filter(r => r.status === 'rejected').length,
    analyzed: resumes.filter(r => r.aiAnalysis).length,
  };
}

// === 面试数据相关函数 ===

// 读取所有面试数据
export async function getAllInterviews(): Promise<InterviewData[]> {
  try {
    await ensureDataDir();
    const data = await safeReadFile(INTERVIEWS_FILE);
    return safeJSONParse(data, []);
  } catch (error) {
    console.error('获取面试数据失败:', error);
    return [];
  }
}

// 保存面试数据
export async function saveInterviewData(interviewData: Omit<InterviewData, 'id' | 'status'>): Promise<InterviewData> {
  const interviews = await getAllInterviews();
  
  const newInterview: InterviewData = {
    ...interviewData,
    id: generateId(),
    status: 'new'
  };
  
  interviews.push(newInterview);
  await safeWriteFile(INTERVIEWS_FILE, JSON.stringify(interviews, null, 2));
  
  return newInterview;
}

// 更新面试数据
export async function updateInterview(id: string, updates: Partial<InterviewData>): Promise<InterviewData | null> {
  const interviews = await getAllInterviews();
  const index = interviews.findIndex(interview => interview.id === id);
  
  if (index === -1) {
    return null;
  }
  
  interviews[index] = { ...interviews[index], ...updates };
  await safeWriteFile(INTERVIEWS_FILE, JSON.stringify(interviews, null, 2));
  
  return interviews[index];
}

// 根据ID获取面试数据
export async function getInterviewById(id: string): Promise<InterviewData | null> {
  const interviews = await getAllInterviews();
  return interviews.find(interview => interview.id === id) || null;
}

// 获取面试统计数据
export async function getInterviewStats() {
  const interviews = await getAllInterviews();
  const total = interviews.length;
  const newCount = interviews.filter(i => i.status === 'new').length;
  const reviewedCount = interviews.filter(i => i.status === 'reviewed').length;
  const contactedCount = interviews.filter(i => i.status === 'contacted').length;
  
  // 计算平均分数
  const scores = interviews.map(i => i.evaluation.overallScore).filter(score => score > 0);
  const averageScore = scores.length > 0 ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0;
  
  // 统计推荐状态
  const recommended = interviews.filter(i => i.evaluation.recommendation === 'recommended').length;
  const consider = interviews.filter(i => i.evaluation.recommendation === 'consider').length;
  const notRecommended = interviews.filter(i => i.evaluation.recommendation === 'not_recommended').length;
  
  return {
    total,
    new: newCount,
    reviewed: reviewedCount,
    contacted: contactedCount,
    rejected: interviews.filter(i => i.status === 'rejected').length,
    averageScore,
    recommendations: {
      recommended,
      consider,
      notRecommended
    }
  };
} 