import React from 'react';
import { useI18n } from '../../lib/i18n';
import ScrollAnimatedElement from '../ui/ScrollAnimatedElement';

export default function InvestorsSection() {
  const { t } = useI18n();
  
  return (
    <section id="investors" className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollAnimatedElement animation="fade-up" className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">{t.investors.title}</span>
          </h1>
          <p className="text-xl text-paw-dark/80 mb-2">{t.investors.subtitle}</p>
          <p className="text-paw-dark/70 max-w-3xl mx-auto">
            {t.investors.description}
          </p>
        </ScrollAnimatedElement>
        
        <div className="grid md:grid-cols-2 gap-12">
          {/* 港府公告 */}
          <ScrollAnimatedElement animation="slide-left" delay={100}>
            <div className="bg-paw-light rounded-2xl p-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-paw-primary rounded-lg flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                  </svg>
                </div>
                <h2 className="text-3xl font-bold">{t.investors.announcements.title}</h2>
              </div>
              <p className="text-paw-dark/70 mb-8">{t.investors.announcements.description}</p>
              
              <div className="bg-white rounded-lg p-8 text-center">
                <p className="text-gray-500 text-lg">{t.investors.announcements.coming}</p>
              </div>
            </div>
          </ScrollAnimatedElement>
          
          {/* 年度报告 */}
          <ScrollAnimatedElement animation="slide-right" delay={100}>
            <div className="bg-paw-light rounded-2xl p-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-paw-primary rounded-lg flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18l.01 0"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l.01 0"></path>
                  </svg>
                </div>
                <h2 className="text-3xl font-bold">{t.investors.reports.title}</h2>
              </div>
              <p className="text-paw-dark/70 mb-8">{t.investors.reports.description}</p>
              
              <div className="bg-white rounded-lg p-8 text-center">
                <p className="text-gray-500 text-lg">{t.investors.reports.coming}</p>
              </div>
            </div>
          </ScrollAnimatedElement>
        </div>
        
        {/* 公司注册信息 */}
        <ScrollAnimatedElement animation="scale" delay={200}>
          <div className="mt-12 bg-white rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-center">{t.investors.registration.title}</h2>
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <ScrollAnimatedElement animation="fade-up" delay={300}>
                <div>
                  <p className="text-sm text-gray-500 mb-1">{t.investors.registration.nameZh}</p>
                  <p className="font-semibold">爪子制药发展（深圳）有限公司</p>
                </div>
              </ScrollAnimatedElement>
              <ScrollAnimatedElement animation="fade-up" delay={350}>
                <div>
                  <p className="text-sm text-gray-500 mb-1">{t.investors.registration.nameEn}</p>
                  <p className="font-semibold">Paw Therapeutics Limited</p>
                </div>
              </ScrollAnimatedElement>
              <ScrollAnimatedElement animation="fade-up" delay={400}>
                <div>
                  <p className="text-sm text-gray-500 mb-1">{t.investors.registration.regNumber}</p>
                  <p className="font-semibold">91440300MAEL7Y0G3L</p>
                </div>
              </ScrollAnimatedElement>
              <ScrollAnimatedElement animation="fade-up" delay={450}>
                <div>
                  <p className="text-sm text-gray-500 mb-1">{t.investors.registration.regDate}</p>
                  <p className="font-semibold">2025年05月23日</p>
                </div>
              </ScrollAnimatedElement>
              <ScrollAnimatedElement animation="fade-up" delay={500}>
                <div>
                  <p className="text-sm text-gray-500 mb-1">{t.investors.registration.companyType}</p>
                  <p className="font-semibold">{t.company.typeValue}</p>
                </div>
              </ScrollAnimatedElement>
              <ScrollAnimatedElement animation="fade-up" delay={550}>
                <div>
                  <p className="text-sm text-gray-500 mb-1">{t.investors.registration.status}</p>
                  <p className="font-semibold text-green-600">{t.company.statusValue}</p>
                </div>
              </ScrollAnimatedElement>
            </div>
            <ScrollAnimatedElement animation="fade-up" delay={600} className="text-center mt-6">
              <a href="https://www.tempb.com/company?utm_source=paw-therapeutics-limited" target="_blank" className="inline-flex items-center text-paw-primary hover:text-paw-deep transition-colors font-medium">
                {t.investors.registration.link}
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                </svg>
              </a>
            </ScrollAnimatedElement>
          </div>
        </ScrollAnimatedElement>
        
        {/* 投资者联系 */}
        <ScrollAnimatedElement animation="fade-up" delay={300}>
          <div className="mt-12 bg-gradient-to-r from-paw-primary to-paw-deep rounded-2xl p-8 text-white">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4 text-white">{t.investors.contact.title}</h2>
              <p className="text-xl mb-8 opacity-90">{t.investors.contact.description}</p>
              <div className="grid md:grid-cols-2 gap-6 text-lg">
                <ScrollAnimatedElement animation="fade-up" delay={400}>
                  <div>{t.investors.contact.emailLabel}{t.investors.contact.email}</div>
                </ScrollAnimatedElement>
                <ScrollAnimatedElement animation="fade-up" delay={450}>
                  <div>{t.investors.contact.addressLabel}{t.investors.contact.address}</div>
                </ScrollAnimatedElement>
              </div>
            </div>
          </div>
        </ScrollAnimatedElement>
      </div>
    </section>
  );
} 