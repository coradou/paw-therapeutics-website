'use client'

import React, { useState, useEffect } from 'react'
import { Eye, EyeOff, Users, FileText, TrendingUp, Clock, CheckCircle, XCircle, Star, Mail, Download } from 'lucide-react'

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
  const [resumes, setResumes] = useState<ResumeData[]>([])
  const [stats, setStats] = useState<ResumeStats | null>(null)
  const [selectedResume, setSelectedResume] = useState<ResumeData | null>(null)
  const [filterStatus, setFilterStatus] = useState<string>('all')

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
      } else {
        setLoginError(data.error || '登录失败')
      }
    } catch (error) {
      setLoginError('网络错误，请重试')
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = async () => {
    await fetch('/api/admin/login', { method: 'DELETE' })
    setIsAuthenticated(false)
    setUsername('')
    setPassword('')
  }

  const loadResumes = async () => {
    try {
      const response = await fetch('/api/admin/resumes?stats=true')
      if (response.ok) {
        const data = await response.json()
        setResumes(data.resumes)
        setStats(data.stats)
      }
    } catch (error) {
      console.error('Failed to load resumes:', error)
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
        loadResumes()
        if (selectedResume?.id === id) {
          const updatedResume = resumes.find(r => r.id === id)
          if (updatedResume) {
            setSelectedResume({ ...updatedResume, status: status as any, notes })
          }
        }
      }
    } catch (error) {
      console.error('Failed to update resume status:', error)
    }
  }

  // 切换状态函数 - 支持点击取消标记
  const toggleResumeStatus = async (id: string, targetStatus: string) => {
    const currentResume = resumes.find(r => r.id === id)
    if (!currentResume) return

    // 如果当前状态与目标状态相同，则切换回 'new'
    // 否则设置为目标状态
    const newStatus = currentResume.status === targetStatus ? 'new' : targetStatus
    
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
      default: return status
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600'
    if (score >= 60) return 'text-yellow-600'
    return 'text-red-600'
  }

  const handleEmailCompose = (email: string, name: string, position: string) => {
    const subject = encodeURIComponent(`关于您申请的${position}岗位`)
    const body = encodeURIComponent(`亲爱的${name}，\n\n感谢您申请我们的${position}岗位。经过初步审核，我们对您的背景很感兴趣...\n\n请问您是否有时间进行进一步的沟通？\n\n最好的祝愿，\nPaw Therapeutics人力资源部`)
    
    const mailtoUrl = `mailto:${email}?subject=${subject}&body=${body}`
    window.open(mailtoUrl, '_blank')
  }

  const handleDownloadResume = (resumeId: string) => {
    const downloadUrl = `/api/admin/resumes/${resumeId}/file?action=download`
    window.open(downloadUrl, '_blank')
  }

  const filteredResumes = filterStatus === 'all' 
    ? resumes 
    : resumes.filter(resume => resume.status === filterStatus)

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-paw-light to-white flex items-center justify-center">
        <div className="max-w-md w-full mx-4">
          <div className="bg-white p-8 rounded-2xl shadow-xl">
            <div className="text-center mb-8">
              <div className="text-6xl mb-4">🐾</div>
              <h1 className="text-2xl font-bold text-paw-dark mb-2">后台管理系统</h1>
              <p className="text-gray-600">请登录访问简历管理功能</p>
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
              <h1 className="text-xl font-bold text-paw-dark">简历管理系统</h1>
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
        {/* 统计卡片 */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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
                  <TrendingUp className="text-purple-600" size={24} />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900">{stats.analyzed}</h3>
                  <p className="text-gray-600">AI已分析</p>
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
                    {resume.aiAnalysis && (
                      <div className="flex items-center ml-4">
                        <Star className="text-yellow-500" size={16} />
                        <span className={`text-sm font-medium ml-1 ${getScoreColor(resume.aiAnalysis.score)}`}>
                          {resume.aiAnalysis.score}
                        </span>
                      </div>
                    )}
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
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedResume.status)}`}>
                    {getStatusText(selectedResume.status)}
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
                      <h3 className="font-medium text-gray-900 mb-3">AI分析结果</h3>
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
      </div>
    </div>
  )
} 