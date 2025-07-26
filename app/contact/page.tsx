'use client'

import React, { useState } from 'react'
import { useI18n } from '@/lib/i18n'

export default function ContactPage() {
  const { t } = useI18n()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  })
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null
    message: string
  }>({ type: null, message: '' })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files)
      const validFiles = files.filter(file => {
        const validTypes = [
          'application/pdf',
          'application/msword',
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
          'application/vnd.ms-powerpoint',
          'application/vnd.openxmlformats-officedocument.presentationml.presentation'
        ]
        return validTypes.includes(file.type) && file.size <= 10 * 1024 * 1024 // 10MB限制
      })
      
      if (validFiles.length !== files.length) {
        setSubmitStatus({
          type: 'error',
          message: t.contact?.form?.attachments?.validationError || '只支持PDF、Word、PPT格式文件，且文件大小不超过10MB'
        })
        return
      }
      
      setUploadedFiles(prev => [...prev, ...validFiles])
    }
  }

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus({ type: null, message: '' })

    try {
      const formDataWithFiles = new FormData()
      formDataWithFiles.append('name', formData.name)
      formDataWithFiles.append('email', formData.email)
      formDataWithFiles.append('company', formData.company)
      formDataWithFiles.append('message', formData.message)
      
      // 添加文件
      uploadedFiles.forEach((file, index) => {
        formDataWithFiles.append('files', file)
      })

      const response = await fetch('/api/contact', {
        method: 'POST',
        body: formDataWithFiles,
      })

      const data = await response.json()

      if (response.ok) {
        setSubmitStatus({
          type: 'success',
          message: data.message || t.contact?.form?.successMessage || 'Thank you for your message, we will reply soon!'
        })
        // 清空表单
        setFormData({
          name: '',
          email: '',
          company: '',
          message: ''
        })
        setUploadedFiles([])
      } else {
        setSubmitStatus({
          type: 'error',
          message: data.error || t.contact?.form?.errorMessage || 'Send failed, please try again later'
        })
      }
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: t.contact?.form?.networkError || 'Network error, please try again later'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-paw-light py-24">
      <div className="container-custom">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-12">{t.contact?.title}</h1>
        
        <div className="grid md:grid-cols-2 gap-12">
          {/* 联系表单 */}
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold mb-6">{t.contact?.form?.title}</h2>
            
            {submitStatus.type && (
              <div className={`mb-6 p-4 rounded-lg ${
                submitStatus.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
              }`}>
                {submitStatus.message}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-paw-dark mb-2">
                  {t.contact?.form?.name} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-paw-primary"
                  placeholder={t.contact?.form?.placeholder?.name}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-paw-dark mb-2">
                  {t.contact?.form?.email} <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-paw-primary"
                  placeholder={t.contact?.form?.placeholder?.email}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-paw-dark mb-2">
                  {t.contact?.form?.company}
                </label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-paw-primary"
                  placeholder={t.contact?.form?.placeholder?.company}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-paw-dark mb-2">
                  {t.contact?.form?.message} <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-paw-primary"
                  placeholder={t.contact?.form?.placeholder?.message}
                />
              </div>

              {/* 文件上传 */}
              <div>
                <label className="block text-sm font-medium text-paw-dark mb-2">
                  {t.contact?.form?.attachments?.title || '附件上传'} ({t.contact?.form?.attachments?.description || '支持PDF、Word、PPT格式，最大10MB'})
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-paw-primary transition-colors">
                  <input
                    type="file"
                    multiple
                    accept=".pdf,.doc,.docx,.ppt,.pptx"
                    onChange={handleFileChange}
                    className="hidden"
                    id="file-upload"
                  />
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <div className="flex flex-col items-center">
                      <svg className="w-12 h-12 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <span className="text-sm text-gray-600">{t.contact?.form?.attachments?.selectFiles || '点击选择文件或拖拽文件到此处'}</span>
                      <span className="text-xs text-gray-400 mt-1">{t.contact?.form?.attachments?.supportedFormats || '支持PDF、Word、PPT格式'}</span>
                    </div>
                  </label>
                </div>
                
                {/* 已上传文件列表 */}
                {uploadedFiles.length > 0 && (
                  <div className="mt-4 space-y-2">
                    <p className="text-sm font-medium text-paw-dark">{t.contact?.form?.attachments?.selectedFiles || '已选择的文件：'}</p>
                    {uploadedFiles.map((file, index) => (
                      <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                        <div className="flex items-center space-x-2">
                          <svg className="w-5 h-5 text-paw-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          <span className="text-sm text-gray-700">{file.name}</span>
                          <span className="text-xs text-gray-500">({(file.size / 1024 / 1024).toFixed(2)}{t.contact?.form?.attachments?.fileSizeFormat || ' MB'})</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFile(index)}
                          className="text-red-500 hover:text-red-700 transition-colors"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-paw-primary text-white font-semibold py-3 px-6 rounded-lg hover:bg-paw-dark transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (t.contact?.form?.submitting || 'Sending...') : t.contact?.form?.submit}
              </button>
            </form>
          </div>
          
          {/* 联系信息 */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold mb-6">{t.contact?.info?.title}</h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-paw-primary rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{t.contact?.info?.address?.title}</h3>
                    <p className="text-paw-dark/70">{t.contact?.info?.address?.company}</p>
                    <p className="text-paw-dark/60 text-sm mt-1">{t.contact?.info?.address?.details}</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-paw-primary rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{t.contact?.info?.email?.title}</h3>
                    <a href="mailto:coradou@pawmed.cn" className="text-paw-primary hover:text-paw-dark">
                      {t.contact?.info?.email?.value}
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-paw-primary rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{t.contact?.info?.phone?.title}</h3>
                    <a href="tel:+4407762480000" className="text-paw-primary hover:text-paw-dark">
                      {t.contact?.info?.phone?.value}
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            {/* 商务合作部分 */}
            {t.contact?.business && (
              <div>
                <h3 className="text-xl font-bold mb-4">{t.contact.business.title}</h3>
                <p className="text-paw-dark/80 mb-4">
                  {t.contact.business.description}
                </p>
                <p className="text-paw-dark/80">
                  {t.contact.business.email}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
} 