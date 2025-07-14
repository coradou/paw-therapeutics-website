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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus({ type: null, message: '' })

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
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