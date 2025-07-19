import React, { useState, useEffect } from 'react';
import { useI18n } from '../../lib/i18n';
import ScrollAnimatedElement from '../ui/ScrollAnimatedElement';

export default function NewsSection() {
  const { t } = useI18n();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showExtraNews, setShowExtraNews] = useState(false);
  
  // 所有新闻数据
  const allNews = [
    // 前3个新闻（默认显示）
    {
      category: t.news.latest.items[0].category,
      date: t.news.latest.items[0].date,
      title: t.news.latest.items[0].title,
      summary: t.news.latest.items[0].summary,
      link: "https://www.sohu.com/a/831971058_120088173"
    },
    {
      category: t.news.latest.items[1].category,
      date: t.news.latest.items[1].date,
      title: t.news.latest.items[1].title,
      summary: t.news.latest.items[1].summary,
      link: "https://cn.chinadaily.com.cn/a/202405/29/WS665721a5a3109f7860de0066.html"
    },
    {
      category: t.news.latest.items[2].category,
      date: t.news.latest.items[2].date,
      title: t.news.latest.items[2].title,
      summary: t.news.latest.items[2].summary,
      link: "https://www.linkedin.com/posts/paw-therapeutics_petlongevity-aiinbiotech-veterinaryinnovation-activity-7336176955270090752-qxQy"
    },
    // 额外的新闻内容
    ...t.news.extraNews.map((news: any) => ({
      ...news,
      link: "#"
    }))
  ];
  
  const handleToggle = () => {
    if (isAnimating) return; // 防止动画期间重复点击
    
    setIsAnimating(true);
    
    if (isExpanded) {
      // 收起动画
      setIsExpanded(false);
      setTimeout(() => {
        setShowExtraNews(false);
        setIsAnimating(false);
      }, 500); // 等待收起动画完成
    } else {
      // 展开动画
      setShowExtraNews(true);
      setTimeout(() => {
        setIsExpanded(true);
        setIsAnimating(false);
      }, 50); // 短暂延迟后开始展开动画
    }
  };
  
  return (
    <section id="blog" className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollAnimatedElement animation="fade-up" className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-paw-dark">{t.news.title}</span>
          </h1>
          <p className="text-lg text-paw-dark/70">{t.news.subtitle}</p>
        </ScrollAnimatedElement>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* 前3个新闻（始终显示） */}
          {allNews.slice(0, 3).map((news, index) => (
            <ScrollAnimatedElement 
              key={`news-${index}`} 
              animation="fade-up" 
              delay={100 + index * 100}
            >
              <div className="glass-card hover:scale-[1.02] transition-all duration-300">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-paw-primary font-medium">{news.category}</span>
                    <span className="text-sm text-gray-500">{news.date}</span>
                  </div>
                  <h3 className="text-xl font-bold text-paw-dark mb-3">
                    {news.title}
                  </h3>
                  <p className="text-paw-dark/70 mb-4">
                    {news.summary}
                  </p>
                  <a 
                    href={news.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-paw-primary hover:text-paw-deep transition-colors font-medium"
                  >
                    {t.news.latest.readMore}
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                    </svg>
                  </a>
                </div>
              </div>
            </ScrollAnimatedElement>
          ))}
          
          {/* 额外的新闻（展开时显示） */}
          {showExtraNews && allNews.slice(3).map((news, index) => (
            <div
              key={`extra-news-${index}`}
              className={`glass-card hover:scale-[1.02] transition-all duration-500 ${
                isExpanded 
                  ? 'opacity-100 transform translate-y-0 scale-100' 
                  : 'opacity-0 transform translate-y-8 scale-95'
              }`}
              style={{
                animationDelay: `${400 + index * 100}ms`,
                transitionDelay: isExpanded ? `${index * 100}ms` : '0ms'
              }}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-paw-primary font-medium">{news.category}</span>
                  <span className="text-sm text-gray-500">{news.date}</span>
                </div>
                <h3 className="text-xl font-bold text-paw-dark mb-3">
                  {news.title}
                </h3>
                <p className="text-paw-dark/70 mb-4">
                  {news.summary}
                </p>
                <a 
                  href={news.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-paw-primary hover:text-paw-deep transition-colors font-medium"
                >
                  {t.news.latest.readMore}
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
        
        {/* 展开/收起按钮 */}
        <ScrollAnimatedElement animation="fade-up" delay={400} className="text-center mt-12">
          <button 
            onClick={handleToggle}
            disabled={isAnimating}
            className="bg-white border-2 border-paw-primary text-paw-primary px-8 py-3 rounded-full font-semibold hover:bg-paw-primary hover:text-white transition-all duration-300 inline-flex items-center group disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isExpanded ? '收起' : t.news.latest.cta}
            <svg 
              className={`w-5 h-5 ml-2 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </button>
        </ScrollAnimatedElement>
      </div>
      
      {/* 添加自定义动画样式 */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeOutDown {
          from {
            opacity: 1;
            transform: translateY(0);
          }
          to {
            opacity: 0;
            transform: translateY(20px);
          }
        }
      `}</style>
    </section>
  );
} 