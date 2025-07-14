'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useI18n } from '../../lib/i18n'
import Modal from '../ui/Modal'
import PrivacyPolicy from '../legal/PrivacyPolicy'
import TermsOfService from '../legal/TermsOfService'

// 与导航栏保持一致的导航项
const navItems = [
  { href: '/', key: 'home' },
  { href: '#about', key: 'about' },
  { href: '#team', key: 'team' },
  { href: '#pipeline', key: 'pipeline' },
  { href: '#products', key: 'products' },
  { href: '#investors', key: 'investors' },
  { href: '#blog', key: 'blog' },
  { href: '#contact', key: 'contact' },
]

export default function Footer() {
  const { t } = useI18n()
  const [showPrivacyModal, setShowPrivacyModal] = useState(false)
  const [showTermsModal, setShowTermsModal] = useState(false)

  return (
    <>
      <footer className="bg-paw-dark text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <div className="grid grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4 lg:gap-8">
            {/* 公司信息 */}
            <div className="space-y-1 md:space-y-4 text-center md:text-left">
              <div className="flex items-center space-x-1 md:space-x-2 justify-center md:justify-start">
                <div className="w-6 h-6 md:w-10 md:h-10 flex items-center justify-center">
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    {/* 爪子脚趾 */}
                    <ellipse cx="35" cy="25" rx="8" ry="12" fill="white"/>
                    <ellipse cx="50" cy="20" rx="8" ry="12" fill="white"/>
                    <ellipse cx="65" cy="25" rx="8" ry="12" fill="white"/>
                    <ellipse cx="25" cy="40" rx="8" ry="12" fill="white"/>
                    <ellipse cx="75" cy="40" rx="8" ry="12" fill="white"/>
                    {/* 爪子掌心 */}
                    <path d="M50 35 Q30 40 25 60 Q25 75 35 80 Q45 85 50 85 Q55 85 65 80 Q75 75 75 60 Q70 40 50 35" fill="white"/>
                    {/* 医疗十字 */}
                    <rect x="46" y="50" width="8" height="20" fill="#007C8C"/>
                    <rect x="40" y="56" width="20" height="8" fill="#007C8C"/>
                  </svg>
                </div>
                <span className="font-bold text-sm md:text-xl">{t.company.name}</span>
              </div>
              <p className="text-gray-400 text-xs md:text-sm hidden md:block">{t.company.tagline}</p>
            </div>
            
            {/* 主导航链接 */}
            <div className="text-center md:text-left">
              <h3 className="font-semibold mb-1 md:mb-4 text-xs md:text-base">{t.footer?.sections?.company || "公司"}</h3>
              <ul className="space-y-0.5 md:space-y-2">
                {navItems.slice(0, 4).map((item) => (
                  <li key={item.key}>
                    <Link href={item.href} className="text-gray-400 hover:text-white transition-colors text-xs md:text-base">
                      {t.nav[item.key as keyof typeof t.nav]}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* 产品与服务 */}
            <div className="text-center md:text-left">
              <h3 className="font-semibold mb-1 md:mb-4 text-xs md:text-base">{t.footer?.sections?.products || "产品与服务"}</h3>
              <ul className="space-y-0.5 md:space-y-2">
                {navItems.slice(4, 6).map((item) => (
                  <li key={item.key}>
                    <Link href={item.href} className="text-gray-400 hover:text-white transition-colors text-xs md:text-base">
                      {t.nav[item.key as keyof typeof t.nav]}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link href="/careers" className="text-gray-400 hover:text-white transition-colors text-xs md:text-base">
                    {t.footer.links.careers}
                  </Link>
                </li>
              </ul>
            </div>
            
            {/* 资源与支持 */}
            <div className="text-center md:text-left">
              <h3 className="font-semibold mb-1 md:mb-4 text-xs md:text-base">{t.footer?.sections?.resources || "资源与支持"}</h3>
              <ul className="space-y-0.5 md:space-y-2">
                {navItems.slice(6).map((item) => (
                  <li key={item.key}>
                    <Link href={item.href} className="text-gray-400 hover:text-white transition-colors text-xs md:text-base">
                      {t.nav[item.key as keyof typeof t.nav]}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link href="/awards" className="text-gray-400 hover:text-white transition-colors text-xs md:text-base">
                    {t.footer.links.awards}
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          

          
          {/* 底部栏 */}
          <div className="mt-4 md:mt-8 pt-4 md:pt-8 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-xs md:text-sm text-center md:text-left">{t.footer.copyright}</p>
            <div className="flex items-center space-x-4 md:space-x-6 mt-2 md:mt-0">
              <button 
                onClick={() => setShowPrivacyModal(true)}
                className="text-gray-400 hover:text-white text-xs md:text-sm transition-colors"
              >
                {t.footer.legal.privacy}
              </button>
              <button 
                onClick={() => setShowTermsModal(true)}
                className="text-gray-400 hover:text-white text-xs md:text-sm transition-colors"
              >
                {t.footer.legal.terms}
              </button>
              <a href="https://www.linkedin.com/company/paw-therapeutics" target="_blank" className="text-gray-400 hover:text-white transition-colors">
                <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
            </div>
          </div>
          
          {/* 招聘信息和版权 */}
          <div className="mt-6 md:mt-12 pt-4 md:pt-6 border-t border-gray-800 text-center">
            <div className="mb-3 md:mb-4">
              <h4 className="text-gray-300 font-medium mb-1 md:mb-2 text-xs md:text-sm">{t.footer.careers.title}</h4>
              <div className="flex flex-wrap justify-center gap-2 md:gap-4 text-xs">
                <Link href="/careers" className="text-gray-500 hover:text-gray-300 transition-colors">{t.footer.careers.pawCareers}</Link>
                <span className="text-gray-600">|</span>
                <Link href="/careers#campus" className="text-gray-500 hover:text-gray-300 transition-colors">{t.footer.careers.campusRecruitment}</Link>
                <span className="text-gray-600">|</span>
                <Link href="/careers#global" className="text-gray-500 hover:text-gray-300 transition-colors">{t.footer.careers.globalRecruitment}</Link>
              </div>
            </div>
            <p className="text-xs text-gray-600">
              Copyright © 2025 Paw Therapeutics. All Rights Reserved. 爪子制药有限公司 版权所有
            </p>
          </div>
        </div>
      </footer>

      {/* 隐私政策模态框 */}
      <Modal 
        isOpen={showPrivacyModal} 
        onClose={() => setShowPrivacyModal(false)}
        title={t.footer.legal.privacy}
      >
        <PrivacyPolicy />
      </Modal>

      {/* 使用条款模态框 */}
      <Modal 
        isOpen={showTermsModal} 
        onClose={() => setShowTermsModal(false)}
        title={t.footer.legal.terms}
      >
        <TermsOfService />
      </Modal>
    </>
  )
} 