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

const DATA_DIR = path.join(process.cwd(), 'data');
const RESUMES_FILE = path.join(DATA_DIR, 'resumes.json');
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

// 生成唯一ID
function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
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