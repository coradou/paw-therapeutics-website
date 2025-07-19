'use client'

import React from 'react'
import Link from 'next/link'
import { FileText, Download, ExternalLink, Calendar } from 'lucide-react'
import { useI18n } from '../../lib/i18n'

export default function InvestorsPage() {
  const { t } = useI18n()

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="container-custom py-16 md:py-24">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">{t.investors.title}</span>
          </h1>
          <p className="text-xl text-paw-dark/80">{t.investors.subtitle}</p>
          <p className="text-lg text-paw-dark/60 mt-4 max-w-3xl mx-auto">{t.investors.description}</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Government Announcements */}
          <div className="space-y-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-paw-primary mb-6">{t.investors.announcements.title}</h2>
              <p className="text-paw-dark/70 mb-4">{t.investors.announcements.description}</p>
              <div className="bg-gray-50 rounded-lg p-4 text-center">
                <p className="text-paw-dark/60">{t.investors.announcements.coming}</p>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-paw-primary mb-6">{t.investors.reports.title}</h2>
              <p className="text-paw-dark/70 mb-4">{t.investors.reports.description}</p>
              <div className="bg-gray-50 rounded-lg p-4 text-center">
                <p className="text-paw-dark/60">{t.investors.reports.coming}</p>
              </div>
            </div>
          </div>
          
          {/* Company Registration Information */}
          <div className="space-y-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-paw-primary mb-6">{t.investors.registration.title}</h2>
              <div className="space-y-4">
                <div className="flex justify-between py-3 border-b border-gray-100">
                  <span className="text-paw-dark/70">{t.investors.registration.nameZh}</span>
                  <span className="font-medium text-paw-dark">{t.company.nameZhValue}</span>
                </div>
                <div className="flex justify-between py-3 border-b border-gray-100">
                  <span className="text-paw-dark/70">{t.investors.registration.nameEn}</span>
                  <span className="font-medium text-paw-dark">PAW THERAPEUTICS LIMITED</span>
                </div>
                <div className="flex justify-between py-3 border-b border-gray-100">
                  <span className="text-paw-dark/70">{t.investors.registration.regNumber}</span>
                  <span className="font-medium text-paw-dark">79053642-000-11-24-7</span>
                </div>
                <div className="flex justify-between py-3 border-b border-gray-100">
                  <span className="text-paw-dark/70">{t.investors.registration.regDate}</span>
                  <span className="font-medium text-paw-dark">2024-11-22</span>
                </div>
                <div className="flex justify-between py-3 border-b border-gray-100">
                  <span className="text-paw-dark/70">{t.investors.registration.companyType}</span>
                  <span className="font-medium text-paw-dark">{t.company.typeValue}</span>
                </div>
                <div className="flex justify-between py-3">
                  <span className="text-paw-dark/70">{t.investors.registration.status}</span>
                  <span className="font-medium text-green-600">{t.company.statusValue}</span>
                </div>
              </div>
              <a href="https://www.cr.gov.hk/" target="_blank" className="inline-flex items-center text-paw-primary hover:text-paw-deep transition-colors mt-4">
                {t.investors.registration.link}
                <ExternalLink className="w-4 h-4 ml-2" />
              </a>
            </div>
            
            <div className="bg-gradient-to-r from-paw-primary to-paw-deep rounded-2xl p-8 text-white">
              <h2 className="text-2xl font-bold mb-4">{t.investors.contact.title}</h2>
              <p className="mb-6 leading-relaxed">{t.investors.contact.description}</p>
              <div className="space-y-4">
                <a href="mailto:coradou@pawmed.cn" className="inline-flex items-center bg-white text-paw-primary px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors">
                  <FileText className="w-5 h-5 mr-2" />
                  coradou@pawmed.cn
                </a>
                <div className="mt-4 text-white/90">
                  <p className="text-sm font-medium mb-2">{t.company.addressLabel}</p>
                  <p className="text-sm leading-relaxed">{t.company.addressValue}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 