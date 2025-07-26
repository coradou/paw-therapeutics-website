import React from 'react';
import { useI18n } from '../../lib/i18n';
import Image from 'next/image';
import ScrollAnimatedElement from '../ui/ScrollAnimatedElement';

export default function TeamSection() {
  const { t } = useI18n();

  const teamMembers = [
    {
      key: "zhaosimiao",
      image: "/images/team/zhaosimiao.jpg.png"
    },
    {
      key: "zengjingkun",
      image: "/images/team/zenjingkun.png"
    },
    {
      key: "zhangying",
      image: "/images/team/zhangyin.png"
    },
    {
      key: "douqianyu",
      image: "/images/team/douqianyu.jpg"
    },
    {
      key: "shenjiashu",
      image: "/images/team/shenjiashu.jpg"
    },
    {
      key: "lihangpeng",
      image: "/images/team/lihangpeng.jpg"
    }
  ];

  return (
    <section id="team" className="py-16 md:py-24 bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 relative overflow-hidden">
      {/* 优雅的背景装饰 */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
      <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-gray-200/50 to-transparent"></div>
      <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-gray-200/50 to-transparent"></div>
      
      {/* 柔和的光影效果 */}
      <ScrollAnimatedElement animation="scale" className="absolute top-20 left-20 w-80 h-80 bg-gradient-to-br from-blue-100/30 to-indigo-100/20 rounded-full blur-3xl">
        <div></div>
      </ScrollAnimatedElement>
      <ScrollAnimatedElement animation="scale" delay={200} className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-br from-indigo-100/20 to-purple-100/15 rounded-full blur-3xl">
        <div></div>
      </ScrollAnimatedElement>
      
      {/* 专业几何装饰 */}
      <div className="absolute top-1/2 left-8 w-2 h-2 bg-paw-primary/20 rounded-full animate-pulse"></div>
      <div className="absolute top-1/3 right-8 w-3 h-3 bg-paw-primary/15 rotate-45 animate-pulse" style={{animationDelay: '1s'}}></div>
      <div className="absolute bottom-1/3 left-12 w-1 h-1 bg-paw-primary/25 rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollAnimatedElement animation="fade-up" className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="text-paw-dark">{t.team.title}</span>
          </h1>
          <p className="text-xl text-paw-dark/80 mb-2">
            {t.team.subtitle}
          </p>
          <p className="text-xl text-paw-dark/80">
            {t.team.subtitle2}
          </p>
        </ScrollAnimatedElement>
        
        {/* 单行展示所有成员 */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-3 max-w-7xl mx-auto items-stretch">
          {teamMembers.map((member, index) => {
            const memberData = t.teamMembers[member.key];
            return (
              <ScrollAnimatedElement key={index} animation="scale" delay={100 + index * 50}>
                <div className="glass-card p-4 hover:scale-105 transition-all duration-300 text-center group h-full">
                  <div>
                    <div className="w-24 h-24 lg:w-28 lg:h-28 rounded-full mx-auto mb-3 overflow-hidden ring-2 ring-white shadow-lg group-hover:ring-4 group-hover:ring-paw-primary/30 transition-all">
                      <Image src={member.image} alt={memberData.name} width={112} height={112} className="w-full h-full object-cover"/>
                    </div>
                    <h3 className="text-lg font-bold text-paw-dark">{memberData.name}</h3>
                    <p className="text-sm text-paw-primary font-semibold">{memberData.role}</p>
                    <p className="text-xs text-gray-600 mt-2 px-1 leading-relaxed" dangerouslySetInnerHTML={{ __html: memberData.description }}></p>
                  </div>
                </div>
              </ScrollAnimatedElement>
            );
          })}
        </div>
      </div>
    </section>
  );
} 