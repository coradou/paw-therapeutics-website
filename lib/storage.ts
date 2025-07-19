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
    skills: string[];
    experience: string;
    education: string;
    summary: string;
    score: number;
    suggestions: string[];
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

// 确保数据目录存在
async function ensureDataDir() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.mkdir(UPLOADS_DIR, { recursive: true });
  } catch (error) {
    console.error('Error creating data directory:', error);
  }
}

// 读取所有简历数据
export async function getAllResumes(): Promise<ResumeData[]> {
  try {
    await ensureDataDir();
    const data = await fs.readFile(RESUMES_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    // 文件不存在时返回空数组
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
  await fs.writeFile(RESUMES_FILE, JSON.stringify(resumes, null, 2));
  
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
  await fs.writeFile(RESUMES_FILE, JSON.stringify(resumes, null, 2));
  
  return resumes[index];
}

// 根据ID获取简历
export async function getResumeById(id: string): Promise<ResumeData | null> {
  const resumes = await getAllResumes();
  return resumes.find(resume => resume.id === id) || null;
}

// 保存简历文件
export async function saveResumeFile(file: File, resumeId: string): Promise<string> {
  await ensureDataDir();
  
  const fileExtension = path.extname(file.name);
  const fileName = `${resumeId}${fileExtension}`;
  const filePath = path.join(UPLOADS_DIR, fileName);
  
  const buffer = await file.arrayBuffer();
  await fs.writeFile(filePath, Buffer.from(buffer));
  
  return fileName;
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
    const data = await fs.readFile(CONTACTS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    // 文件不存在时返回空数组
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
  await fs.writeFile(CONTACTS_FILE, JSON.stringify(contacts, null, 2));
  
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
  await fs.writeFile(CONTACTS_FILE, JSON.stringify(contacts, null, 2));
  
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
    const data = await fs.readFile(INTERVIEWS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    // 文件不存在时返回空数组
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
  await fs.writeFile(INTERVIEWS_FILE, JSON.stringify(interviews, null, 2));
  
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
  
  await ensureDataDir();
  await fs.writeFile(INTERVIEWS_FILE, JSON.stringify(interviews, null, 2));
  
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