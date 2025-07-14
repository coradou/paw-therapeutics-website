'use client'

import React, { useState, useEffect } from 'react'
import { Eye, EyeOff, Users, FileText, TrendingUp, Clock, CheckCircle, XCircle, Star, Mail, Download, MessageCircle, Reply } from 'lucide-react'

interface ResumeData {
  id: string;
  name: string;
  email: string;
  position: string;
  message: string;
  resumeFileName: string;
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

interface ResumeStats {
  total: number;
  new: number;
  reviewed: number;
  contacted: number;
  rejected: number;
  analyzed: number;
  // 新增面试相关统计
  interviewed: number;
  averageScore: number;
  recommended: number;
  notRecommended: number;
}

// 联系信息接口
interface ContactData {
  id: string;
  name: string;
  email: string;
  company?: string;
  message: string;
  submittedAt: string;
  status: 'new' | 'read' | 'replied' | 'archived';
  notes?: string;
  repliedAt?: string;
}

interface ContactStats {
  total: number;
  new: number;
  read: number;
  replied: number;
  archived: number;
}

export default function AdminPage() {
  // 隐藏导航栏
  React.useEffect(() => {
    // 隐藏导航栏
    const nav = document.querySelector('nav');
    if (nav) {
      nav.style.display = 'none';
    }
    
    // 组件卸载时恢复导航栏
    return () => {
      const nav = document.querySelector('nav');
      if (nav) {
        nav.style.display = '';
      }
    };
  }, []);

  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loginError, setLoginError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  
  // 标签页管理 - 移除interviews选项
  const [activeTab, setActiveTab] = useState<'resumes' | 'contacts'>('resumes')
  
  // 简历相关状态
  const [resumes, setResumes] = useState<ResumeData[]>([])
  const [stats, setStats] = useState<ResumeStats | null>(null)
  const [selectedResume, setSelectedResume] = useState<ResumeData | null>(null)
  const [filterStatus, setFilterStatus] = useState<string>('all')
  
  // 联系信息相关状态
  const [contacts, setContacts] = useState<ContactData[]>([])
  const [contactStats, setContactStats] = useState<ContactStats | null>(null)
  const [selectedContact, setSelectedContact] = useState<ContactData | null>(null)
  const [contactFilterStatus, setContactFilterStatus] = useState<string>('all')

  // 检查登录状态
  useEffect(() => {
    checkAuthStatus()
  }, [])

  const checkAuthStatus = async () => {
    try {
      const response = await fetch('/api/admin/resumes')
      if (response.ok) {
        setIsAuthenticated(true)
        loadResumes()
        loadContacts()
      }
    } catch (error) {
      console.log('Not authenticated')
    }
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setLoginError('')

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      })

      const data = await response.json()

      if (response.ok) {
        setIsAuthenticated(true)
        loadResumes()
        loadContacts()
      } else {
        setLoginError(data.error)
      }
    } catch (error) {
      setLoginError('登录失败，请检查网络连接')
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = async () => {
    setIsAuthenticated(false)
    setResumes([])
    setContacts([])
    setSelectedResume(null)
    setSelectedContact(null)
  }

  const loadResumes = async () => {
    try {
      // 加载简历数据
      const resumeResponse = await fetch('/api/admin/resumes?stats=true')
      if (resumeResponse.ok) {
        const resumeData = await resumeResponse.json()
        
        // 面试数据现在由独立的AI面试系统管理
        // 如需查看面试数据，请访问独立的AI面试系统后台
        
        setResumes(resumeData.resumes)
        setStats(resumeData.stats)
      }
    } catch (error) {
      console.error('Failed to load resumes:', error)
    }
  }

  // 加载联系信息
  const loadContacts = async () => {
    try {
      const response = await fetch('/api/admin/contacts?stats=true')
      if (response.ok) {
        const data = await response.json()
        setContacts(data.contacts)
        setContactStats(data.stats)
      }
    } catch (error) {
      console.error('Failed to load contacts:', error)
    }
  }

  const updateResumeStatus = async (id: string, status: string, notes?: string) => {
    try {
      const response = await fetch(`/api/admin/resumes/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status, notes })
      })

      if (response.ok) {
        // 重新加载数据
        loadResumes()
        
        // 更新选中的简历状态
        if (selectedResume && selectedResume.id === id) {
          setSelectedResume({
            ...selectedResume,
            status: status as any,
            notes: notes || selectedResume.notes
          })
        }
      }
    } catch (error) {
      console.error('Failed to update resume status:', error)
    }
  }

  const toggleResumeStatus = async (id: string, targetStatus: string) => {
    const resume = resumes.find(r => r.id === id)
    if (!resume) return

    const newStatus = resume.status === targetStatus ? 'new' : targetStatus
    await updateResumeStatus(id, newStatus)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800'
      case 'reviewed': return 'bg-yellow-100 text-yellow-800'
      case 'contacted': return 'bg-green-100 text-green-800'
      case 'rejected': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'new': return '新投递'
      case 'reviewed': return '已审核'
      case 'contacted': return '已联系'
      case 'rejected': return '已拒绝'
      default: return '未知'
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600'
    if (score >= 60) return 'text-yellow-600'
    return 'text-red-600'
  }

  const handleEmailCompose = (email: string, name: string, position: string) => {
    const subject = encodeURIComponent(`关于您的${position}职位申请`)
    const body = encodeURIComponent(`亲爱的${name}，\n\n感谢您对我们${position}职位的关注。\n\n\n\n此致敬礼\n招聘团队`)
    window.open(`mailto:${email}?subject=${subject}&body=${body}`, '_blank')
  }

  const handleDownloadResume = (resumeId: string) => {
    window.open(`/api/admin/resumes/${resumeId}/file`, '_blank')
  }

  const updateContactStatus = async (id: string, status: string, notes?: string) => {
    try {
      const response = await fetch(`/api/admin/contacts/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          status, 
          notes,
          ...(status === 'replied' && { repliedAt: new Date().toISOString() })
        })
      })

      if (response.ok) {
        loadContacts()
        
        if (selectedContact && selectedContact.id === id) {
          setSelectedContact({
            ...selectedContact,
            status: status as any,
            notes: notes || selectedContact.notes,
            ...(status === 'replied' && { repliedAt: new Date().toISOString() })
          })
        }
      }
    } catch (error) {
      console.error('Failed to update contact status:', error)
    }
  }

  const handleContactEmailReply = (email: string, name: string, originalMessage: string) => {
    const subject = encodeURIComponent(`回复：您的咨询`)
    const body = encodeURIComponent(`亲爱的${name}，\n\n感谢您的咨询：\n"${originalMessage}"\n\n\n\n此致敬礼\n客服团队`)
    window.open(`mailto:${email}?subject=${subject}&body=${body}`, '_blank')
  }

  // 面试数据相关的辅助函数
  const getRecommendationColor = (recommendation: string) => {
    switch (recommendation) {
      case 'recommended': return 'bg-green-100 text-green-800'
      case 'consider': return 'bg-yellow-100 text-yellow-800'
      case 'not_recommended': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getRecommendationText = (recommendation: string) => {
    switch (recommendation) {
      case 'recommended': return '推荐'
      case 'consider': return '考虑'
      case 'not_recommended': return '不推荐'
      default: return '未知'
    }
  }

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}分${remainingSeconds}秒`
  }

  // 筛选后的简历数据
  const filteredResumes = filterStatus === 'all'
    ? resumes
    : resumes.filter(resume => resume.status === filterStatus)

  // 筛选后的联系信息
  const filteredContacts = contactFilterStatus === 'all'
    ? contacts
    : contacts.filter(contact => contact.status === contactFilterStatus)

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-paw-light to-white flex items-center justify-center">
        <div className="max-w-md w-full mx-4">
          <div className="bg-white p-8 rounded-2xl shadow-xl">
            <div className="text-center mb-8">
              <div className="text-6xl mb-4">🐾</div>
              <h1 className="text-2xl font-bold text-paw-dark mb-2">后台管理系统</h1>
              <p className="text-gray-600">请登录访问管理功能</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  用户名
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-paw-primary focus:border-transparent"
                  placeholder="请输入用户名"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  密码
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-paw-primary focus:border-transparent pr-12"
                    placeholder="请输入密码"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {loginError && (
                <div className="p-3 bg-red-100 border border-red-300 text-red-700 rounded-lg">
                  {loginError}
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-paw-primary text-white py-3 rounded-lg font-semibold hover:bg-paw-secondary transition-colors disabled:opacity-50"
              >
                {isLoading ? '登录中...' : '登录'}
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 头部导航 */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <span className="text-2xl mr-3">🐾</span>
              <h1 className="text-xl font-bold text-paw-dark">人才管理系统</h1>
            </div>
            <button
              onClick={handleLogout}
              className="text-gray-600 hover:text-paw-primary transition-colors"
            >
              退出登录
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 标签页切换 - 移除面试管理标签页 */}
        <div className="flex border-b border-gray-200 mb-6">
          <button
            onClick={() => setActiveTab('resumes')}
            className={`py-4 px-6 text-sm font-medium transition-colors ${
              activeTab === 'resumes'
                ? 'border-b-2 border-paw-primary text-paw-dark'
                : 'text-gray-600 hover:text-paw-primary'
            }`}
          >
            简历与面试管理
          </button>
          <button
            onClick={() => setActiveTab('contacts')}
            className={`py-4 px-6 text-sm font-medium transition-colors ${
              activeTab === 'contacts'
                ? 'border-b-2 border-paw-primary text-paw-dark'
                : 'text-gray-600 hover:text-paw-primary'
            }`}
          >
            联系信息
          </button>
        </div>

        {activeTab === 'resumes' && (
          <>
            {/* 综合统计卡片 - 包含面试数据 */}
            {stats && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 mb-8">
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <div className="flex items-center">
                    <div className="p-3 bg-blue-100 rounded-lg">
                      <FileText className="text-blue-600" size={24} />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold text-gray-900">{stats.total}</h3>
                      <p className="text-gray-600">总简历数</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <div className="flex items-center">
                    <div className="p-3 bg-yellow-100 rounded-lg">
                      <Clock className="text-yellow-600" size={24} />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold text-gray-900">{stats.new}</h3>
                      <p className="text-gray-600">待审核</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <div className="flex items-center">
                    <div className="p-3 bg-green-100 rounded-lg">
                      <CheckCircle className="text-green-600" size={24} />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold text-gray-900">{stats.contacted}</h3>
                      <p className="text-gray-600">已联系</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <div className="flex items-center">
                    <div className="p-3 bg-purple-100 rounded-lg">
                      <MessageCircle className="text-purple-600" size={24} />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold text-gray-900">{stats.interviewed}</h3>
                      <p className="text-gray-600">AI面试数</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <div className="flex items-center">
                    <div className="p-3 bg-orange-100 rounded-lg">
                      <Star className="text-orange-600" size={24} />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold text-gray-900">{stats.averageScore}</h3>
                      <p className="text-gray-600">平均分数</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <div className="flex items-center">
                    <div className="p-3 bg-red-100 rounded-lg">
                      <TrendingUp className="text-red-600" size={24} />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold text-gray-900">{stats.recommended}</h3>
                      <p className="text-gray-600">推荐候选人</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 筛选器 */}
            <div className="bg-white p-4 rounded-xl shadow-sm mb-6">
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium text-gray-700">状态筛选：</span>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-paw-primary focus:border-transparent"
                >
                  <option value="all">全部</option>
                  <option value="new">新投递</option>
                  <option value="reviewed">已审核</option>
                  <option value="contacted">已联系</option>
                  <option value="rejected">已拒绝</option>
                </select>
              </div>
            </div>

            {/* 简历列表 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* 左侧：简历列表 */}
              <div className="bg-white rounded-xl shadow-sm">
                <div className="p-6 border-b">
                  <h2 className="text-lg font-semibold text-gray-900">
                    简历列表 ({filteredResumes.length})
                  </h2>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {filteredResumes.map(resume => (
                    <div
                      key={resume.id}
                      onClick={() => setSelectedResume(resume)}
                      className={`p-4 border-b hover:bg-gray-50 cursor-pointer transition-colors ${
                        selectedResume?.id === resume.id ? 'bg-blue-50' : ''
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h3 className="font-medium text-gray-900">{resume.name}</h3>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(resume.status)}`}>
                              {getStatusText(resume.status)}
                            </span>

                          </div>
                          <p className="text-sm text-gray-600 mb-1">{resume.position}</p>
                          <div className="flex items-center justify-between">
                            <p className="text-sm text-gray-500">{resume.email}</p>
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                handleEmailCompose(resume.email, resume.name, resume.position)
                              }}
                              className="text-blue-600 hover:text-blue-800 transition-colors"
                              title="发送邮件"
                            >
                              <Mail size={16} />
                            </button>
                          </div>
                          <p className="text-xs text-gray-400 mt-1">
                            {new Date(resume.submittedAt).toLocaleString('zh-CN')}
                          </p>
                        </div>
                        <div className="flex flex-col items-end ml-4 space-y-1">
                          {/* AI分析评分 */}
                          {resume.aiAnalysis && (
                            <div className="flex items-center">
                              <Star className="text-yellow-500" size={16} />
                              <span className={`text-sm font-medium ml-1 ${getScoreColor(resume.aiAnalysis.score)}`}>
                                {resume.aiAnalysis.score}
                              </span>
                            </div>
                          )}

                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 右侧：详情面板 */}
              <div className="bg-white rounded-xl shadow-sm">
                {selectedResume ? (
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-6">
                      <div>
                        <h2 className="text-xl font-semibold text-gray-900">{selectedResume.name}</h2>
                        <p className="text-gray-600">{selectedResume.position}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedResume.status)}`}>
                          {getStatusText(selectedResume.status)}
                        </span>
                        {selectedResume.interviewData && (
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getRecommendationColor(selectedResume.interviewData.evaluation.recommendation)}`}>
                            {getRecommendationText(selectedResume.interviewData.evaluation.recommendation)}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="space-y-6">
                      {/* 基本信息 */}
                      <div>
                        <h3 className="font-medium text-gray-900 mb-3">基本信息</h3>
                        <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                          {/* 邮箱行 */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <span className="font-medium">邮箱：</span>
                              <span className="ml-2">{selectedResume.email}</span>
                            </div>
                            <button
                              onClick={() => handleEmailCompose(selectedResume.email, selectedResume.name, selectedResume.position)}
                              className="flex items-center space-x-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors text-sm"
                            >
                              <Mail size={14} />
                              <span>发送邮件</span>
                            </button>
                          </div>

                          <p><span className="font-medium">申请岗位：</span>{selectedResume.position}</p>
                          
                          {/* 简历文件行 */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <span className="font-medium">简历文件：</span>
                              <span className="ml-2">{selectedResume.resumeFileName}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <button
                                onClick={() => handleDownloadResume(selectedResume.id)}
                                className="flex items-center space-x-1 px-3 py-1 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors text-sm"
                              >
                                <Download size={14} />
                                <span>下载</span>
                              </button>
                            </div>
                          </div>

                          <p><span className="font-medium">投递时间：</span>{new Date(selectedResume.submittedAt).toLocaleString('zh-CN')}</p>
                          {selectedResume.message && (
                            <div>
                              <span className="font-medium">自我介绍：</span>
                              <p className="mt-1 text-gray-700">{selectedResume.message}</p>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* AI分析结果 */}
                      {selectedResume.aiAnalysis && (
                        <div>
                          <h3 className="font-medium text-gray-900 mb-3">AI简历分析</h3>
                          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg space-y-4">
                            <div className="flex items-center justify-between">
                              <span className="font-medium">综合评分</span>
                              <span className={`text-2xl font-bold ${getScoreColor(selectedResume.aiAnalysis.score)}`}>
                                {selectedResume.aiAnalysis.score}分
                              </span>
                            </div>
                            
                            <div>
                              <span className="font-medium">技能标签：</span>
                              <div className="flex flex-wrap gap-2 mt-2">
                                {selectedResume.aiAnalysis.skills.map((skill, index) => (
                                  <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                                    {skill}
                                  </span>
                                ))}
                              </div>
                            </div>

                            <div>
                              <span className="font-medium">工作经验：</span>
                              <p className="text-gray-700 mt-1">{selectedResume.aiAnalysis.experience}</p>
                            </div>

                            <div>
                              <span className="font-medium">教育背景：</span>
                              <p className="text-gray-700 mt-1">{selectedResume.aiAnalysis.education}</p>
                            </div>

                            <div>
                              <span className="font-medium">整体评价：</span>
                              <p className="text-gray-700 mt-1">{selectedResume.aiAnalysis.summary}</p>
                            </div>

                            <div>
                              <span className="font-medium">改进建议：</span>
                              <ul className="list-disc list-inside mt-2 space-y-1">
                                {selectedResume.aiAnalysis.suggestions.map((suggestion, index) => (
                                  <li key={index} className="text-gray-700">{suggestion}</li>
                                ))}
                              </ul>
                            </div>

                            <p className="text-xs text-gray-500 mt-4">
                              分析时间：{new Date(selectedResume.aiAnalysis.analyzedAt).toLocaleString('zh-CN')}
                            </p>
                          </div>
                        </div>
                      )}

                      {/* AI面试结果 - 新增部分 */}
                      {selectedResume.interviewData && (
                        <div>
                          <h3 className="font-medium text-gray-900 mb-3">AI面试评估</h3>
                          <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg space-y-4">
                            {/* 评分卡片 */}
                            <div className="grid grid-cols-2 gap-4">
                              <div className="bg-blue-50 p-3 rounded-lg">
                                <span className="text-sm text-blue-600">综合评分</span>
                                <p className="text-2xl font-bold text-blue-700">{selectedResume.interviewData.evaluation.overallScore}</p>
                              </div>
                              <div className="bg-green-50 p-3 rounded-lg">
                                <span className="text-sm text-green-600">技术能力</span>
                                <p className="text-2xl font-bold text-green-700">{selectedResume.interviewData.evaluation.technicalScore}</p>
                              </div>
                              <div className="bg-purple-50 p-3 rounded-lg">
                                <span className="text-sm text-purple-600">沟通能力</span>
                                <p className="text-2xl font-bold text-purple-700">{selectedResume.interviewData.evaluation.communicationScore}</p>
                              </div>
                              <div className="bg-orange-50 p-3 rounded-lg">
                                <span className="text-sm text-orange-600">经验匹配</span>
                                <p className="text-2xl font-bold text-orange-700">{selectedResume.interviewData.evaluation.experienceScore}</p>
                              </div>
                            </div>

                            {/* 面试信息 */}
                            <div className="bg-gray-50 p-3 rounded-lg">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <span className="text-sm text-gray-600">面试时长:</span>
                                  <p className="font-medium">{formatDuration(selectedResume.interviewData.interviewDuration)}</p>
                                </div>
                                <div>
                                  <span className="text-sm text-gray-600">面试时间:</span>
                                  <p className="font-medium">{new Date(selectedResume.interviewData.submittedAt).toLocaleString('zh-CN')}</p>
                                </div>
                              </div>
                            </div>

                            {/* 推荐状态 */}
                            <div className="bg-gray-50 p-4 rounded-lg">
                              <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-600">推荐状态:</span>
                                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getRecommendationColor(selectedResume.interviewData.evaluation.recommendation)}`}>
                                  {getRecommendationText(selectedResume.interviewData.evaluation.recommendation)}
                                </span>
                              </div>
                            </div>

                            {/* 优势和劣势 */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <h4 className="text-sm font-medium text-green-700 mb-2">🎯 优势</h4>
                                <ul className="space-y-1">
                                  {selectedResume.interviewData.evaluation.strengths.map((strength, index) => (
                                    <li key={index} className="text-sm text-gray-600 flex items-start">
                                      <span className="text-green-500 mr-2">•</span>
                                      {strength}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              <div>
                                <h4 className="text-sm font-medium text-red-700 mb-2">⚠️ 待改进</h4>
                                <ul className="space-y-1">
                                  {selectedResume.interviewData.evaluation.weaknesses.map((weakness, index) => (
                                    <li key={index} className="text-sm text-gray-600 flex items-start">
                                      <span className="text-red-500 mr-2">•</span>
                                      {weakness}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>

                            {/* 总结 */}
                            <div>
                              <h4 className="text-sm font-medium text-gray-900 mb-2">📋 面试总结</h4>
                              <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                                {selectedResume.interviewData.evaluation.summary}
                              </p>
                            </div>

                            {/* 建议 */}
                            <div>
                              <h4 className="text-sm font-medium text-gray-900 mb-2">💡 改进建议</h4>
                              <ul className="space-y-1">
                                {selectedResume.interviewData.evaluation.suggestions.map((suggestion, index) => (
                                  <li key={index} className="text-sm text-gray-600 flex items-start">
                                    <span className="text-blue-500 mr-2">•</span>
                                    {suggestion}
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* 面试对话记录 */}
                            <div>
                              <h4 className="text-sm font-medium text-gray-900 mb-2">💬 面试对话记录</h4>
                              <div className="max-h-40 overflow-y-auto bg-white p-3 rounded-lg space-y-2 border">
                                {selectedResume.interviewData.chatHistory.map((message, index) => (
                                  <div
                                    key={index}
                                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                  >
                                    <div
                                      className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
                                        message.role === 'user'
                                          ? 'bg-blue-500 text-white'
                                          : 'bg-gray-100 text-gray-800'
                                      }`}
                                    >
                                      <p className="whitespace-pre-line">{message.content}</p>
                                      <p className="text-xs opacity-75 mt-1">
                                        {new Date(message.timestamp).toLocaleTimeString('zh-CN')}
                                      </p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* 操作按钮 */}
                      <div>
                        <h3 className="font-medium text-gray-900 mb-3">状态操作</h3>
                        <div className="flex flex-wrap gap-2">
                          <button
                            onClick={() => toggleResumeStatus(selectedResume.id, 'reviewed')}
                            className={`px-4 py-2 rounded-lg transition-colors ${
                              selectedResume.status === 'reviewed'
                                ? 'bg-yellow-200 text-yellow-900 border-2 border-yellow-400'
                                : 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                            }`}
                          >
                            {selectedResume.status === 'reviewed' ? '取消已审核' : '标记已审核'}
                          </button>
                          <button
                            onClick={() => toggleResumeStatus(selectedResume.id, 'contacted')}
                            className={`px-4 py-2 rounded-lg transition-colors ${
                              selectedResume.status === 'contacted'
                                ? 'bg-green-200 text-green-900 border-2 border-green-400'
                                : 'bg-green-100 text-green-800 hover:bg-green-200'
                            }`}
                          >
                            {selectedResume.status === 'contacted' ? '取消已联系' : '标记已联系'}
                          </button>
                          <button
                            onClick={() => toggleResumeStatus(selectedResume.id, 'rejected')}
                            className={`px-4 py-2 rounded-lg transition-colors ${
                              selectedResume.status === 'rejected'
                                ? 'bg-red-200 text-red-900 border-2 border-red-400'
                                : 'bg-red-100 text-red-800 hover:bg-red-200'
                            }`}
                          >
                            {selectedResume.status === 'rejected' ? '取消已拒绝' : '标记已拒绝'}
                          </button>
                        </div>
                      </div>

                      {/* 备注 */}
                      <div>
                        <h3 className="font-medium text-gray-900 mb-3">备注</h3>
                        <textarea
                          defaultValue={selectedResume.notes || ''}
                          onBlur={(e) => updateResumeStatus(selectedResume.id, selectedResume.status, e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-paw-primary focus:border-transparent"
                          rows={3}
                          placeholder="添加备注..."
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-6 text-center text-gray-500">
                    <Users size={48} className="mx-auto mb-4 text-gray-300" />
                    <p>请选择一个简历查看详情</p>
                  </div>
                )}
              </div>
            </div>
          </>
        )}

        {activeTab === 'contacts' && (
          <>
            {/* 联系信息统计卡片 */}
            {contactStats && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <div className="flex items-center">
                    <div className="p-3 bg-blue-100 rounded-lg">
                      <MessageCircle className="text-blue-600" size={24} />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold text-gray-900">{contactStats.total}</h3>
                      <p className="text-gray-600">总联系数</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <div className="flex items-center">
                    <div className="p-3 bg-yellow-100 rounded-lg">
                      <Clock className="text-yellow-600" size={24} />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold text-gray-900">{contactStats.new}</h3>
                      <p className="text-gray-600">待回复</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <div className="flex items-center">
                    <div className="p-3 bg-green-100 rounded-lg">
                      <CheckCircle className="text-green-600" size={24} />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold text-gray-900">{contactStats.replied}</h3>
                      <p className="text-gray-600">已回复</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <div className="flex items-center">
                    <div className="p-3 bg-purple-100 rounded-lg">
                      <Reply className="text-purple-600" size={24} />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold text-gray-900">{contactStats.archived}</h3>
                      <p className="text-gray-600">已归档</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 联系信息筛选器 */}
            <div className="bg-white p-4 rounded-xl shadow-sm mb-6">
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium text-gray-700">状态筛选：</span>
                <select
                  value={contactFilterStatus}
                  onChange={(e) => setContactFilterStatus(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-paw-primary focus:border-transparent"
                >
                  <option value="all">全部</option>
                  <option value="new">待回复</option>
                  <option value="replied">已回复</option>
                  <option value="archived">已归档</option>
                </select>
              </div>
            </div>

            {/* 联系信息列表 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* 左侧：联系信息列表 */}
              <div className="bg-white rounded-xl shadow-sm">
                <div className="p-6 border-b">
                  <h2 className="text-lg font-semibold text-gray-900">
                    联系信息列表 ({filteredContacts.length})
                  </h2>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {filteredContacts.map(contact => (
                    <div
                      key={contact.id}
                      onClick={() => setSelectedContact(contact)}
                      className={`p-4 border-b hover:bg-gray-50 cursor-pointer transition-colors ${
                        selectedContact?.id === contact.id ? 'bg-blue-50' : ''
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h3 className="font-medium text-gray-900">{contact.name}</h3>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              contact.status === 'new' ? 'bg-yellow-100 text-yellow-800' :
                              contact.status === 'replied' ? 'bg-green-100 text-green-800' :
                              contact.status === 'archived' ? 'bg-gray-100 text-gray-800' : ''
                            }`}>
                              {contact.status === 'new' ? '待回复' :
                               contact.status === 'replied' ? '已回复' :
                               contact.status === 'archived' ? '已归档' : ''}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mb-1">{contact.email}</p>
                          <p className="text-xs text-gray-400 mt-1">
                            {new Date(contact.submittedAt).toLocaleString('zh-CN')}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 右侧：联系信息详情 */}
              <div className="bg-white rounded-xl shadow-sm">
                {selectedContact ? (
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-6">
                      <div>
                        <h2 className="text-xl font-semibold text-gray-900">{selectedContact.name}</h2>
                        <p className="text-gray-600">{selectedContact.email}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        selectedContact.status === 'new' ? 'bg-yellow-100 text-yellow-800' :
                        selectedContact.status === 'replied' ? 'bg-green-100 text-green-800' :
                        selectedContact.status === 'archived' ? 'bg-gray-100 text-gray-800' : ''
                      }`}>
                        {selectedContact.status === 'new' ? '待回复' :
                         selectedContact.status === 'replied' ? '已回复' :
                         selectedContact.status === 'archived' ? '已归档' : ''}
                      </span>
                    </div>

                    <div className="space-y-6">
                      {/* 基本信息 */}
                      <div>
                        <h3 className="font-medium text-gray-900 mb-3">基本信息</h3>
                        <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                          {/* 邮箱行 */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <span className="font-medium">邮箱：</span>
                              <span className="ml-2">{selectedContact.email}</span>
                            </div>
                            <button
                              onClick={() => handleContactEmailReply(selectedContact.email, selectedContact.name, selectedContact.message)}
                              className="flex items-center space-x-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors text-sm"
                            >
                              <Mail size={14} />
                              <span>回复邮件</span>
                            </button>
                          </div>
                          
                          {selectedContact.company && (
                            <p><span className="font-medium">公司：</span>{selectedContact.company}</p>
                          )}
                          <p><span className="font-medium">投递时间：</span>{new Date(selectedContact.submittedAt).toLocaleString('zh-CN')}</p>
                          {selectedContact.repliedAt && (
                            <p><span className="font-medium">回复时间：</span>{new Date(selectedContact.repliedAt).toLocaleString('zh-CN')}</p>
                          )}
                          {selectedContact.notes && (
                            <div>
                              <span className="font-medium">备注：</span>
                              <p className="mt-1 text-gray-700">{selectedContact.notes}</p>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* 消息内容 */}
                      <div>
                        <h3 className="font-medium text-gray-900 mb-3">消息内容</h3>
                        <div className="bg-gray-50 p-4 rounded-lg text-gray-800">
                          {selectedContact.message}
                        </div>
                      </div>

                      {/* 操作按钮 */}
                      <div>
                        <h3 className="font-medium text-gray-900 mb-3">状态操作</h3>
                        <div className="flex flex-wrap gap-2">
                          <button
                            onClick={() => updateContactStatus(selectedContact.id, 'replied')}
                            className={`px-4 py-2 rounded-lg transition-colors ${
                              selectedContact.status === 'replied'
                                ? 'bg-green-200 text-green-900 border-2 border-green-400'
                                : 'bg-green-100 text-green-800 hover:bg-green-200'
                            }`}
                          >
                            {selectedContact.status === 'replied' ? '取消已回复' : '标记已回复'}
                          </button>
                          <button
                            onClick={() => updateContactStatus(selectedContact.id, 'archived')}
                            className={`px-4 py-2 rounded-lg transition-colors ${
                              selectedContact.status === 'archived'
                                ? 'bg-gray-200 text-gray-900 border-2 border-gray-400'
                                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                            }`}
                          >
                            {selectedContact.status === 'archived' ? '取消已归档' : '标记已归档'}
                          </button>
                        </div>
                      </div>

                      {/* 备注 */}
                      <div>
                        <h3 className="font-medium text-gray-900 mb-3">备注</h3>
                        <textarea
                          defaultValue={selectedContact.notes || ''}
                          onBlur={(e) => updateContactStatus(selectedContact.id, selectedContact.status, e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-paw-primary focus:border-transparent"
                          rows={3}
                          placeholder="添加备注..."
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-6 text-center text-gray-500">
                    <Users size={48} className="mx-auto mb-4 text-gray-300" />
                    <p>请选择一个联系信息查看详情</p>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
} 