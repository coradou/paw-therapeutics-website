import React from 'react';
import { useI18n } from '../../lib/i18n';
import ScrollAnimatedElement from '../ui/ScrollAnimatedElement';

export default function StatsSection() {
  const { t } = useI18n();
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      {/* 背景动画 */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 tech-pattern opacity-5"></div>
        <ScrollAnimatedElement animation="scale" className="absolute top-0 left-1/4 w-96 h-96 bg-paw-primary/10 rounded-full blur-3xl floating">
          <div className="w-full h-full"></div>
        </ScrollAnimatedElement>
        <ScrollAnimatedElement animation="scale" delay={2000} className="absolute bottom-0 right-1/4 w-96 h-96 bg-paw-primary/10 rounded-full blur-3xl floating">
          <div className="w-full h-full"></div>
        </ScrollAnimatedElement>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollAnimatedElement animation="fade-up" className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-paw-primary">{t.stats.title}</h2>
          <p className="text-xl font-medium text-paw-primary">{t.stats.subtitle}</p>
        </ScrollAnimatedElement>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* 化合物筛选 */}
          <ScrollAnimatedElement animation="scale" delay={100}>
            <div className="text-center group">
              <div className="relative inline-block">
                <div className="text-5xl md:text-6xl font-extrabold mb-2 text-paw-primary">{t.stats.compounds.value}</div>
                <div className="absolute -inset-4 bg-paw-primary/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
              <div className="text-lg font-semibold text-paw-primary">{t.stats.compounds.label}</div>
              <div className="w-20 h-1 bg-gradient-to-r from-transparent via-paw-primary to-transparent mx-auto mt-4"></div>
            </div>
          </ScrollAnimatedElement>
          
          {/* 预测准确率 */}
          <ScrollAnimatedElement animation="scale" delay={200}>
            <div className="text-center group">
              <div className="relative inline-block">
                <div className="text-5xl md:text-6xl font-extrabold mb-2 text-paw-primary">{t.stats.accuracy.value}</div>
                <div className="absolute -inset-4 bg-paw-primary/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
              <div className="text-lg font-semibold text-paw-primary">{t.stats.accuracy.label}</div>
              <div className="w-20 h-1 bg-gradient-to-r from-transparent via-paw-primary to-transparent mx-auto mt-4"></div>
            </div>
          </ScrollAnimatedElement>
          
          {/* 研发时间缩短 */}
          <ScrollAnimatedElement animation="scale" delay={300}>
            <div className="text-center group">
              <div className="relative inline-block">
                <div className="text-5xl md:text-6xl font-extrabold mb-2 text-paw-primary">{t.stats.time.value}</div>
                <div className="absolute -inset-4 bg-paw-primary/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
              <div className="text-lg font-semibold text-paw-primary">{t.stats.time.label}</div>
              <div className="w-20 h-1 bg-gradient-to-r from-transparent via-paw-primary to-transparent mx-auto mt-4"></div>
            </div>
          </ScrollAnimatedElement>
          
          {/* 合作伙伴 */}
          <ScrollAnimatedElement animation="scale" delay={400}>
            <div className="text-center group">
              <div className="relative inline-block">
                <div className="text-5xl md:text-6xl font-extrabold mb-2 text-paw-primary">{t.stats.partners.value}</div>
                <div className="absolute -inset-4 bg-paw-primary/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
              <div className="text-lg font-semibold text-paw-primary">{t.stats.partners.label}</div>
              <div className="w-20 h-1 bg-gradient-to-r from-transparent via-paw-primary to-transparent mx-auto mt-4"></div>
            </div>
          </ScrollAnimatedElement>
        </div>
      </div>
    </section>
  );
} 