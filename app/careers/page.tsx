'use client'

import React, { useState } from 'react'
import { useI18n } from '../../lib/i18n'
import ScrollAnimatedElement from '../../components/ui/ScrollAnimatedElement'
import Modal from '../../components/ui/Modal'
import OptimizedImage from '../../components/ui/OptimizedImage'

interface JobPosition {
  id: string
  titleKey: string
  departmentKey: string
  typeKey: string
  locationKey: string
  requirementsKey: string[]
  responsibilitiesKey: string[]
  benefitsKey: string[]
  descriptionKey: string
}

const jobPositions: JobPosition[] = [
  {
    id: '1',
    titleKey: 'careers.jobPositions.seniorBioinformatics.title',
    departmentKey: 'careers.jobPositions.seniorBioinformatics.department',
    typeKey: 'careers.jobPositions.seniorBioinformatics.type',
    locationKey: 'careers.jobPositions.seniorBioinformatics.location',
    requirementsKey: [
      'careers.jobPositions.seniorBioinformatics.requirements.0',
      'careers.jobPositions.seniorBioinformatics.requirements.1',
      'careers.jobPositions.seniorBioinformatics.requirements.2',
      'careers.jobPositions.seniorBioinformatics.requirements.3',
      'careers.jobPositions.seniorBioinformatics.requirements.4'
    ],
    responsibilitiesKey: [
      'careers.jobPositions.seniorBioinformatics.responsibilities.0',
      'careers.jobPositions.seniorBioinformatics.responsibilities.1',
      'careers.jobPositions.seniorBioinformatics.responsibilities.2',
      'careers.jobPositions.seniorBioinformatics.responsibilities.3'
    ],
    benefitsKey: [
      'careers.jobPositions.commonBenefits.0',
      'careers.jobPositions.commonBenefits.1',
      'careers.jobPositions.commonBenefits.2',
      'careers.jobPositions.commonBenefits.3'
    ],
    descriptionKey: 'careers.jobPositions.seniorBioinformatics.description'
  },
  {
    id: '2',
    titleKey: 'careers.jobPositions.drugChemistry.title',
    departmentKey: 'careers.jobPositions.drugChemistry.department',
    typeKey: 'careers.jobPositions.drugChemistry.type',
    locationKey: 'careers.jobPositions.drugChemistry.location',
    requirementsKey: [
      'careers.jobPositions.drugChemistry.requirements.0',
      'careers.jobPositions.drugChemistry.requirements.1',
      'careers.jobPositions.drugChemistry.requirements.2',
      'careers.jobPositions.drugChemistry.requirements.3',
      'careers.jobPositions.drugChemistry.requirements.4'
    ],
    responsibilitiesKey: [
      'careers.jobPositions.drugChemistry.responsibilities.0',
      'careers.jobPositions.drugChemistry.responsibilities.1',
      'careers.jobPositions.drugChemistry.responsibilities.2',
      'careers.jobPositions.drugChemistry.responsibilities.3'
    ],
    benefitsKey: [
      'careers.jobPositions.commonBenefits.0',
      'careers.jobPositions.commonBenefits.1',
      'careers.jobPositions.commonBenefits.2',
      'careers.jobPositions.commonBenefits.3'
    ],
    descriptionKey: 'careers.jobPositions.drugChemistry.description'
  },
  {
    id: '3',
    titleKey: 'careers.jobPositions.productManager.title',
    departmentKey: 'careers.jobPositions.productManager.department',
    typeKey: 'careers.jobPositions.productManager.type',
    locationKey: 'careers.jobPositions.productManager.location',
    requirementsKey: [
      'careers.jobPositions.productManager.requirements.0',
      'careers.jobPositions.productManager.requirements.1',
      'careers.jobPositions.productManager.requirements.2',
      'careers.jobPositions.productManager.requirements.3',
      'careers.jobPositions.productManager.requirements.4'
    ],
    responsibilitiesKey: [
      'careers.jobPositions.productManager.responsibilities.0',
      'careers.jobPositions.productManager.responsibilities.1',
      'careers.jobPositions.productManager.responsibilities.2',
      'careers.jobPositions.productManager.responsibilities.3'
    ],
    benefitsKey: [
      'careers.jobPositions.commonBenefits.0',
      'careers.jobPositions.commonBenefits.1',
      'careers.jobPositions.commonBenefits.2',
      'careers.jobPositions.commonBenefits.3'
    ],
    descriptionKey: 'careers.jobPositions.productManager.description'
  }
]

// 辅助函数来获取嵌套的翻译文本
const getNestedTranslation = (obj: any, path: string): string => {
  const keys = path.split('.')
  let current = obj
  for (const key of keys) {
    if (current && typeof current === 'object' && key in current) {
      current = current[key]
    } else {
      return path // 如果找不到翻译，返回键名
    }
  }
  return typeof current === 'string' ? current : path
}

export default function CareersPage() {
  const { t } = useI18n()
  const [selectedJob, setSelectedJob] = useState<JobPosition | null>(null)
  const [showJobModal, setShowJobModal] = useState(false)
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  
  const handleJobClick = (job: JobPosition) => {
    setSelectedJob(job)
    setShowJobModal(true)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>, retryCount = 0) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      const formData = new FormData(e.currentTarget);
      const resumeFile = formData.get('resume') as File;
      
      // 验证文件
      if (!resumeFile || resumeFile.size === 0) {
        setSubmitMessage(getNestedTranslation(t, 'careers.resumeForm.validation.fileRequired'));
        setIsSubmitting(false);
        return;
      }
      
      if (resumeFile.size > 10 * 1024 * 1024) { // 10MB
        setSubmitMessage(getNestedTranslation(t, 'careers.resumeForm.validation.fileTooLarge'));
        setIsSubmitting(false);
        return;
      }
      
      // 设置请求超时
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000); // 30秒超时
      
      const response = await fetch('/api/careers', {
        method: 'POST',
        body: formData,
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      const result = await response.json();

      if (response.ok) {
        setSubmitMessage(result.message || getNestedTranslation(t, 'careers.resumeForm.success'));
        
        // 清空表单
        (e.target as HTMLFormElement).reset();
        setResumeFile(null);
        
        // 关闭职位详情模态框
        setShowJobModal(false);
        
        // 提示简历投递成功
        alert(getNestedTranslation(t, 'careers.resumeForm.success'));
      } else {
        setSubmitMessage(result.error || getNestedTranslation(t, 'careers.resumeForm.error'));
      }
    } catch (error: any) {
      console.error('Submit error:', error);
      
      if (error.name === 'AbortError') {
        setSubmitMessage(getNestedTranslation(t, 'careers.resumeForm.timeout'));
      } else if (retryCount < 2) {
        // 自动重试最多2次
        setSubmitMessage(`${getNestedTranslation(t, 'careers.resumeForm.retrying')} (${retryCount + 1}/3)`);
        setTimeout(() => {
          handleSubmit(e, retryCount + 1);
        }, 2000);
        return;
      } else {
        setSubmitMessage(getNestedTranslation(t, 'careers.resumeForm.networkError'));
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* 页面顶部间距 */}
      <div className="h-20"></div>
      
      {/* 标题部分 */}
      <section className="py-20 bg-gradient-to-r from-paw-light to-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <ScrollAnimatedElement>
            <h1 className="text-4xl md:text-6xl font-bold text-paw-dark mb-6">
              {t.careers?.title}
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              {t.careers?.subtitle}
            </p>
          </ScrollAnimatedElement>
          
          {/* 可爱的猫狗背景装饰 */}
          <div className="absolute top-10 left-10 w-32 h-32 opacity-20">
            <div className="text-8xl">🐱</div>
          </div>
          <div className="absolute top-20 right-20 w-32 h-32 opacity-20">
            <div className="text-8xl">🐶</div>
          </div>
          <div className="absolute bottom-10 left-1/4 w-24 h-24 opacity-15">
            <div className="text-6xl">🐾</div>
          </div>
          <div className="absolute bottom-16 right-1/3 w-24 h-24 opacity-15">
            <div className="text-6xl">❤️</div>
          </div>
        </div>
      </section>

      {/* 公司文化 */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimatedElement>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-paw-dark mb-6">
                {t.careers?.culture?.title}
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {t.careers?.culture?.description}
              </p>
            </div>
          </ScrollAnimatedElement>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ScrollAnimatedElement delay={0.1}>
              <div className="text-center p-8 bg-gradient-to-b from-paw-light to-white rounded-2xl shadow-lg relative overflow-hidden">
                <div className="text-4xl mb-4">🚀</div>
                <h3 className="text-xl font-bold text-paw-dark mb-4">{t.careers?.culture?.innovation?.title}</h3>
                <p className="text-gray-600">
                  {t.careers?.culture?.innovation?.description}
                </p>
                <div className="absolute top-2 right-2 text-2xl opacity-30">🐱</div>
              </div>
            </ScrollAnimatedElement>
            
            <ScrollAnimatedElement delay={0.2}>
              <div className="text-center p-8 bg-gradient-to-b from-paw-light to-white rounded-2xl shadow-lg relative overflow-hidden">
                <div className="text-4xl mb-4">🤝</div>
                <h3 className="text-xl font-bold text-paw-dark mb-4">{t.careers?.culture?.collaboration?.title}</h3>
                <p className="text-gray-600">
                  {t.careers?.culture?.collaboration?.description}
                </p>
                <div className="absolute top-2 right-2 text-2xl opacity-30">🐶</div>
              </div>
            </ScrollAnimatedElement>
            
            <ScrollAnimatedElement delay={0.3}>
              <div className="text-center p-8 bg-gradient-to-b from-paw-light to-white rounded-2xl shadow-lg relative overflow-hidden">
                <div className="text-4xl mb-4">🎯</div>
                <h3 className="text-xl font-bold text-paw-dark mb-4">{t.careers?.culture?.excellence?.title}</h3>
                <p className="text-gray-600">
                  {t.careers?.culture?.excellence?.description}
                </p>
                <div className="absolute top-2 right-2 text-2xl opacity-30">🐾</div>
              </div>
            </ScrollAnimatedElement>
          </div>
        </div>
      </section>

      {/* 可爱的猫狗照片展示区 */}
      <section className="py-16 bg-gradient-to-r from-yellow-50 via-pink-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimatedElement>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-paw-dark mb-6">
                {t.careers?.petFriendly?.title} 🐾
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                {t.careers?.petFriendly?.subtitle}
              </p>
            </div>
          </ScrollAnimatedElement>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <ScrollAnimatedElement delay={0.1}>
              <div className="transform hover:scale-110 transition-all duration-300">
                <div className="text-8xl mb-4 animate-bounce">🐱</div>
                <p className="text-sm text-gray-600">{t.careers?.petFriendly?.catColleagues}</p>
              </div>
            </ScrollAnimatedElement>
            
            <ScrollAnimatedElement delay={0.2}>
              <div className="transform hover:scale-110 transition-all duration-300">
                <div className="text-8xl mb-4 animate-bounce" style={{animationDelay: '0.2s'}}>🐶</div>
                <p className="text-sm text-gray-600">{t.careers?.petFriendly?.dogFriends}</p>
              </div>
            </ScrollAnimatedElement>
            
            <ScrollAnimatedElement delay={0.3}>
              <div className="transform hover:scale-110 transition-all duration-300">
                <div className="text-8xl mb-4 animate-bounce" style={{animationDelay: '0.4s'}}>🐾</div>
                <p className="text-sm text-gray-600">{t.careers?.petFriendly?.everyPawprint}</p>
              </div>
            </ScrollAnimatedElement>
            
            <ScrollAnimatedElement delay={0.4}>
              <div className="transform hover:scale-110 transition-all duration-300">
                <div className="text-8xl mb-4 animate-bounce" style={{animationDelay: '0.6s'}}>❤️</div>
                <p className="text-sm text-gray-600">{t.careers?.petFriendly?.connectingLove}</p>
              </div>
            </ScrollAnimatedElement>
          </div>
          
          <ScrollAnimatedElement delay={0.5}>
            <div className="mt-12 text-center bg-white p-8 rounded-3xl shadow-lg">
              <div className="flex justify-center items-center space-x-4 mb-4">
                <span className="text-4xl">🌟</span>
                <h3 className="text-2xl font-bold text-paw-dark">{t.careers?.petFriendly?.petFriendlyOffice}</h3>
                <span className="text-4xl">🌟</span>
              </div>
              <p className="text-gray-600 text-lg">
                {t.careers?.petFriendly?.welcomePets}
              </p>
            </div>
          </ScrollAnimatedElement>
        </div>
      </section>

      {/* 办公环境展示 */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimatedElement>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                🏢 {t.careers?.office?.title}
              </h2>
              <p className="text-xl text-gray-700">
                {t.careers?.office?.subtitle}
              </p>
            </div>
          </ScrollAnimatedElement>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ScrollAnimatedElement delay={0.1}>
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="aspect-w-16 aspect-h-12 h-48 overflow-hidden">
                  <OptimizedImage
                    src="/images/office/office-space-1.jpg"
                    alt="现代化办公空间"
                    width={400}
                    height={300}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">🏢 {t.careers?.office?.space1?.title}</h3>
                  <p className="text-gray-700 text-sm">
                    {t.careers?.office?.space1?.description}
                  </p>
                </div>
              </div>
            </ScrollAnimatedElement>
            
            <ScrollAnimatedElement delay={0.2}>
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="aspect-w-16 aspect-h-12 h-48 overflow-hidden">
                  <OptimizedImage
                    src="/images/office/office-space-2.jpg"
                    alt="协作办公区域"
                    width={400}
                    height={300}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">💻 {t.careers?.office?.space2?.title}</h3>
                  <p className="text-gray-700 text-sm">
                    {t.careers?.office?.space2?.description}
                  </p>
                </div>
              </div>
            </ScrollAnimatedElement>
            
            <ScrollAnimatedElement delay={0.3}>
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="aspect-w-16 aspect-h-12 h-48 overflow-hidden">
                  <OptimizedImage
                    src="/images/office/office-space-3.jpg"
                    alt="办公环境"
                    width={400}
                    height={300}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">🎯 {t.careers?.office?.space3?.title}</h3>
                  <p className="text-gray-700 text-sm">
                    {t.careers?.office?.space3?.description}
                  </p>
                </div>
              </div>
            </ScrollAnimatedElement>
          </div>
          
          <ScrollAnimatedElement delay={0.7}>
            <div className="mt-12 bg-gradient-to-r from-paw-primary/10 to-paw-secondary/10 rounded-2xl p-8">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  📍 {t.careers?.office?.location?.title}
                </h3>
                <p className="text-gray-700">
                  {t.careers?.office?.location?.description}
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div className="bg-white p-4 rounded-xl shadow-sm">
                  <div className="text-2xl mb-2">🚇</div>
                  <h4 className="font-semibold text-gray-900 mb-1">{t.careers?.office?.location?.transportation?.title}</h4>
                  <p className="text-sm text-gray-700">{t.careers?.office?.location?.transportation?.description}</p>
                </div>
                
                <div className="bg-white p-4 rounded-xl shadow-sm">
                  <div className="text-2xl mb-2">🏪</div>
                  <h4 className="font-semibold text-gray-900 mb-1">{t.careers?.office?.location?.facilities?.title}</h4>
                  <p className="text-sm text-gray-700">{t.careers?.office?.location?.facilities?.description}</p>
                </div>
                
                <div className="bg-white p-4 rounded-xl shadow-sm">
                  <div className="text-2xl mb-2">🌳</div>
                  <h4 className="font-semibold text-gray-900 mb-1">{t.careers?.office?.location?.environment?.title}</h4>
                  <p className="text-sm text-gray-700">{t.careers?.office?.location?.environment?.description}</p>
                </div>
              </div>
            </div>
          </ScrollAnimatedElement>
        </div>
      </section>

      {/* 福利待遇 */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimatedElement>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-paw-dark mb-6">
                {t.careers?.benefits?.title}
              </h2>
              <p className="text-xl text-gray-600">
                {t.careers?.benefits?.description}
              </p>
            </div>
          </ScrollAnimatedElement>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: '💰', titleKey: 'careers.benefits.competitiveSalary.title', descKey: 'careers.benefits.competitiveSalary.description' },
              { icon: '📈', titleKey: 'careers.benefits.equityIncentives.title', descKey: 'careers.benefits.equityIncentives.description' },
              { icon: '🎓', titleKey: 'careers.benefits.learningDevelopment.title', descKey: 'careers.benefits.learningDevelopment.description' },
              { icon: '⏰', titleKey: 'careers.benefits.flexibleWork.title', descKey: 'careers.benefits.flexibleWork.description' },
              { icon: '🏥', titleKey: 'careers.benefits.healthInsurance.title', descKey: 'careers.benefits.healthInsurance.description' },
              { icon: '🌟', titleKey: 'careers.benefits.innovativeEnvironment.title', descKey: 'careers.benefits.innovativeEnvironment.description' }
            ].map((benefit, index) => (
              <ScrollAnimatedElement key={benefit.titleKey} delay={index * 0.1}>
                <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden h-48 flex flex-col">
                  <div className="text-3xl mb-4">{benefit.icon}</div>
                  <h3 className="text-lg font-bold text-paw-dark mb-3">
                    {getNestedTranslation(t, benefit.titleKey)}
                  </h3>
                  <p className="text-gray-600 flex-1">
                    {getNestedTranslation(t, benefit.descKey)}
                  </p>
                  {/* 随机分配可爱装饰 */}
                  <div className="absolute -bottom-2 -right-2 text-4xl opacity-10">
                    {index % 3 === 0 ? '🐱' : index % 3 === 1 ? '🐶' : '🐾'}
                  </div>
                </div>
              </ScrollAnimatedElement>
            ))}
          </div>
        </div>
      </section>

      {/* 开放职位 */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimatedElement>
            <div className="text-center mb-20">
              <h2 className="text-5xl md:text-7xl font-black text-transparent bg-gradient-to-r from-paw-primary via-paw-secondary to-paw-deep bg-clip-text mb-8">
                {t.careers?.openPositions?.title}
              </h2>
              <p className="text-xl md:text-2xl text-gray-600 font-medium">
                {t.careers?.openPositions?.subtitle}
              </p>
              <div className="mt-6 flex justify-center">
                <div className="w-32 h-1 bg-gradient-to-r from-paw-primary to-paw-secondary rounded-full"></div>
              </div>
            </div>
          </ScrollAnimatedElement>
          
          {/* 校园招聘 */}
          <div id="campus" className="mb-20">
            <ScrollAnimatedElement>
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-3 mb-4">
                  <span className="text-4xl">🎓</span>
                  <h3 className="text-2xl md:text-3xl font-bold text-paw-dark">{t.careers?.openPositions?.campusRecruitment?.title}</h3>
                  <span className="text-4xl">🌟</span>
                </div>
                <p className="text-lg text-gray-600">
                  {t.careers?.openPositions?.campusRecruitment?.subtitle}
                </p>
                <div className="mt-4 inline-flex items-center gap-2 bg-gradient-to-r from-blue-50 to-purple-50 px-6 py-2 rounded-full">
                  <span className="text-sm text-blue-600 font-medium">🎯 {t.careers?.openPositions?.campusRecruitment?.current}</span>
                </div>
              </div>
            </ScrollAnimatedElement>
            
            <div className="space-y-6">
              {jobPositions.slice(0, 2).map((job, index) => (
                <ScrollAnimatedElement key={job.id} delay={index * 0.1}>
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-200 hover:border-paw-primary"
                       onClick={() => handleJobClick(job)}>
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-4 mb-2">
                          <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                            {t.careers?.openPositions?.campusRecruitment?.title}
                          </span>
                          <h3 className="text-xl font-bold text-paw-dark">
                            {getNestedTranslation(t, job.titleKey)}
                          </h3>
                          <span className="bg-paw-primary text-white px-3 py-1 rounded-full text-sm">
                            {getNestedTranslation(t, job.departmentKey)}
                          </span>
                        </div>
                        <p className="text-gray-600 mb-4">{getNestedTranslation(t, job.descriptionKey)}</p>
                        <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                          <span>📍 {getNestedTranslation(t, job.locationKey)}</span>
                          <span>💼 {getNestedTranslation(t, job.typeKey)}</span>
                          <span>🎓 {t.careers?.openPositions?.campusRecruitment?.freshGradPreferred}</span>
                        </div>
                      </div>
                      <div className="mt-4 md:mt-0 md:ml-6">
                        <button className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-2 rounded-full hover:from-blue-600 hover:to-purple-600 transition-colors">
                          {t.careers?.buttons?.viewDetails}
                        </button>
                      </div>
                    </div>
                  </div>
                </ScrollAnimatedElement>
              ))}
            </div>
            
            {/* 校园招聘特色 */}
            <ScrollAnimatedElement delay={0.3}>
              <div className="mt-8 bg-white p-8 rounded-2xl shadow-lg border border-blue-200">
                <h4 className="text-xl font-bold text-paw-dark mb-6 text-center">🎯 {t.careers?.openPositions?.campusFeatures?.title}</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-3xl mb-3">📚</div>
                    <h5 className="font-semibold text-paw-dark mb-2">{t.careers?.openPositions?.campusFeatures?.comprehensiveTraining?.title}</h5>
                    <p className="text-gray-600 text-sm">{t.careers?.openPositions?.campusFeatures?.comprehensiveTraining?.description}</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl mb-3">🏆</div>
                    <h5 className="font-semibold text-paw-dark mb-2">{t.careers?.openPositions?.campusFeatures?.mentorSystem?.title}</h5>
                    <p className="text-gray-600 text-sm">{t.careers?.openPositions?.campusFeatures?.mentorSystem?.description}</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl mb-3">🚀</div>
                    <h5 className="font-semibold text-paw-dark mb-2">{t.careers?.openPositions?.campusFeatures?.fastPromotion?.title}</h5>
                    <p className="text-gray-600 text-sm">{t.careers?.openPositions?.campusFeatures?.fastPromotion?.description}</p>
                  </div>
                </div>
              </div>
            </ScrollAnimatedElement>
          </div>
          
          {/* 分隔线装饰 */}
          <ScrollAnimatedElement delay={0.4}>
            <div className="relative py-16">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t-2 border-gray-200"></div>
              </div>
              <div className="relative flex justify-center">
                <div className="bg-white px-8 py-4 rounded-full shadow-lg border-2 border-gray-100">
                  <div className="flex items-center space-x-4">
                    <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                    <span className="text-gray-500 font-medium">VS</span>
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  </div>
                </div>
              </div>
              <div className="absolute top-8 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="text-6xl opacity-20 animate-bounce">🎯</div>
              </div>
            </div>
          </ScrollAnimatedElement>
          
          {/* 全球招聘 */}
          <div id="global" className="mb-20">
            <ScrollAnimatedElement>
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-3 mb-4">
                  <span className="text-4xl">🌍</span>
                  <h3 className="text-2xl md:text-3xl font-bold text-paw-dark">{t.careers?.openPositions?.globalRecruitment?.title}</h3>
                  <span className="text-4xl">💼</span>
                </div>
                <p className="text-lg text-gray-600">
                  {t.careers?.openPositions?.globalRecruitment?.subtitle}
                </p>
                <div className="mt-4 inline-flex items-center gap-2 bg-gradient-to-r from-green-50 to-teal-50 px-6 py-2 rounded-full">
                  <span className="text-sm text-green-600 font-medium">🌟 {t.careers?.openPositions?.globalRecruitment?.openYear}</span>
                </div>
              </div>
            </ScrollAnimatedElement>
            
            <div className="space-y-6">
              {jobPositions.slice(2).map((job, index) => (
                <ScrollAnimatedElement key={job.id} delay={index * 0.1}>
                  <div className="bg-gradient-to-r from-green-50 to-teal-50 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-200 hover:border-paw-primary"
                       onClick={() => handleJobClick(job)}>
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-4 mb-2">
                          <span className="bg-gradient-to-r from-green-500 to-teal-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                            {t.careers?.openPositions?.globalRecruitment?.title}
                          </span>
                          <h3 className="text-xl font-bold text-paw-dark">
                            {getNestedTranslation(t, job.titleKey)}
                          </h3>
                          <span className="bg-paw-primary text-white px-3 py-1 rounded-full text-sm">
                            {getNestedTranslation(t, job.departmentKey)}
                          </span>
                        </div>
                        <p className="text-gray-600 mb-4">{getNestedTranslation(t, job.descriptionKey)}</p>
                        <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                          <span>📍 {getNestedTranslation(t, job.locationKey)}</span>
                          <span>💼 {getNestedTranslation(t, job.typeKey)}</span>
                          <span>🌍 {t.careers?.openPositions?.globalRecruitment?.experiencePreferred}</span>
                        </div>
                      </div>
                      <div className="mt-4 md:mt-0 md:ml-6">
                        <button className="bg-gradient-to-r from-green-500 to-teal-500 text-white px-6 py-2 rounded-full hover:from-green-600 hover:to-teal-600 transition-colors">
                          {t.careers?.buttons?.viewDetails}
                        </button>
                      </div>
                    </div>
                  </div>
                </ScrollAnimatedElement>
              ))}
            </div>
            
            {/* 全球招聘特色 */}
            <ScrollAnimatedElement delay={0.3}>
              <div className="mt-8 bg-white p-8 rounded-2xl shadow-lg border border-green-200">
                <h4 className="text-xl font-bold text-paw-dark mb-6 text-center">🌟 {t.careers?.openPositions?.globalFeatures?.title}</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-3xl mb-3">🌍</div>
                    <h5 className="font-semibold text-paw-dark mb-2">{t.careers?.openPositions?.globalFeatures?.internationalTeam?.title}</h5>
                    <p className="text-gray-600 text-sm">{t.careers?.openPositions?.globalFeatures?.internationalTeam?.description}</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl mb-3">💰</div>
                    <h5 className="font-semibold text-paw-dark mb-2">{t.careers?.openPositions?.globalFeatures?.topSalary?.title}</h5>
                    <p className="text-gray-600 text-sm">{t.careers?.openPositions?.globalFeatures?.topSalary?.description}</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl mb-3">🏠</div>
                    <h5 className="font-semibold text-paw-dark mb-2">{t.careers?.openPositions?.globalFeatures?.relocationSupport?.title}</h5>
                    <p className="text-gray-600 text-sm">{t.careers?.openPositions?.globalFeatures?.relocationSupport?.description}</p>
                  </div>
                </div>
              </div>
            </ScrollAnimatedElement>
          </div>
        </div>
      </section>

      {/* 探索更多页面 */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimatedElement>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-paw-dark mb-6">
                {t.careers?.explore?.title} 🔍
              </h2>
              <p className="text-xl text-gray-600">
                {t.careers?.explore?.subtitle}
              </p>
            </div>
          </ScrollAnimatedElement>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ScrollAnimatedElement delay={0.1}>
              <a href="/#about" className="group block bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <div className="text-center">
                  <div className="text-6xl mb-6 group-hover:animate-bounce">🧬</div>
                  <h3 className="text-xl font-bold text-paw-dark mb-4">{t.careers?.explore?.aboutUs?.title}</h3>
                  <p className="text-gray-600 mb-4">{t.careers?.explore?.aboutUs?.description}</p>
                  <span className="inline-flex items-center text-paw-primary font-semibold group-hover:text-paw-secondary">
                    {t.careers?.explore?.aboutUs?.button} →
                  </span>
                </div>
              </a>
            </ScrollAnimatedElement>
            
            <ScrollAnimatedElement delay={0.2}>
              <a href="/#pipeline" className="group block bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <div className="text-center">
                  <div className="text-6xl mb-6 group-hover:animate-bounce">🔬</div>
                  <h3 className="text-xl font-bold text-paw-dark mb-4">{t.careers?.explore?.researchPipeline?.title}</h3>
                  <p className="text-gray-600 mb-4">{t.careers?.explore?.researchPipeline?.description}</p>
                  <span className="inline-flex items-center text-paw-primary font-semibold group-hover:text-paw-secondary">
                    {t.careers?.explore?.researchPipeline?.button} →
                  </span>
                </div>
              </a>
            </ScrollAnimatedElement>
            
            <ScrollAnimatedElement delay={0.3}>
              <a href="/#products" className="group block bg-gradient-to-br from-yellow-50 to-orange-50 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <div className="text-center">
                  <div className="text-6xl mb-6 group-hover:animate-bounce">📦</div>
                  <h3 className="text-xl font-bold text-paw-dark mb-4">{t.careers?.explore?.products?.title}</h3>
                  <p className="text-gray-600 mb-4">{t.careers?.explore?.products?.description}</p>
                  <span className="inline-flex items-center text-paw-primary font-semibold group-hover:text-paw-secondary">
                    {t.careers?.explore?.products?.button} →
                  </span>
                </div>
              </a>
            </ScrollAnimatedElement>
            
            <ScrollAnimatedElement delay={0.4}>
              <a href="/awards" className="group block bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <div className="text-center">
                  <div className="text-6xl mb-6 group-hover:animate-bounce">🏆</div>
                  <h3 className="text-xl font-bold text-paw-dark mb-4">{t.careers?.explore?.milestones?.title}</h3>
                  <p className="text-gray-600 mb-4">{t.careers?.explore?.milestones?.description}</p>
                  <span className="inline-flex items-center text-paw-primary font-semibold group-hover:text-paw-secondary">
                    {t.careers?.explore?.milestones?.button} →
                  </span>
                </div>
              </a>
            </ScrollAnimatedElement>
            
            <ScrollAnimatedElement delay={0.5}>
              <a href="/#investors" className="group block bg-gradient-to-br from-teal-50 to-cyan-50 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <div className="text-center">
                  <div className="text-6xl mb-6 group-hover:animate-bounce">💼</div>
                  <h3 className="text-xl font-bold text-paw-dark mb-4">{t.careers?.explore?.investors?.title}</h3>
                  <p className="text-gray-600 mb-4">{t.careers?.explore?.investors?.description}</p>
                  <span className="inline-flex items-center text-paw-primary font-semibold group-hover:text-paw-secondary">
                    {t.careers?.explore?.investors?.button} →
                  </span>
                </div>
              </a>
            </ScrollAnimatedElement>
            
            <ScrollAnimatedElement delay={0.6}>
              <a href="/#contact" className="group block bg-gradient-to-br from-red-50 to-rose-50 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <div className="text-center">
                  <div className="text-6xl mb-6 group-hover:animate-bounce">📞</div>
                  <h3 className="text-xl font-bold text-paw-dark mb-4">{getNestedTranslation(t, 'contact.title')}</h3>
                  <p className="text-gray-600 mb-4">{getNestedTranslation(t, 'contact.subtitle')}</p>
                  <span className="inline-flex items-center text-paw-primary font-semibold group-hover:text-paw-secondary">
                    {getNestedTranslation(t, 'contact.buttons.contact')} →
                  </span>
                </div>
              </a>
            </ScrollAnimatedElement>
          </div>
          
          {/* 快捷导航栏 */}
          <ScrollAnimatedElement delay={0.7}>
            <div className="mt-16 p-8 bg-gradient-to-r from-paw-light to-gray-50 rounded-3xl">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-paw-dark mb-4">{t.careers?.explore?.quickNav?.title} ⚡</h3>
                <p className="text-gray-600">{t.careers?.explore?.quickNav?.subtitle}</p>
              </div>
              <div className="flex flex-wrap justify-center gap-4">
                <a href="/" className="bg-white text-paw-dark px-6 py-3 rounded-full shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 font-medium">
                  🏠 {t.careers?.explore?.quickNav?.home}
                </a>
                <a href="/#team" className="bg-white text-paw-dark px-6 py-3 rounded-full shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 font-medium">
                  👥 {t.careers?.explore?.quickNav?.coreTeam}
                </a>
                <a href="/#blog" className="bg-white text-paw-dark px-6 py-3 rounded-full shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 font-medium">
                  📰 {t.careers?.explore?.quickNav?.insights}
                </a>
                <a href="mailto:careers@pawmed.com" className="bg-paw-primary text-white px-6 py-3 rounded-full shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 font-medium">
                  ✉️ {getNestedTranslation(t, 'careers.openPositions.directApplication.sendResume')}
                </a>
              </div>
            </div>
          </ScrollAnimatedElement>
        </div>
      </section>

      {/* 联系我们 */}
      <section className="py-20 bg-gradient-to-r from-paw-primary to-paw-secondary relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <ScrollAnimatedElement>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              {t.careers?.openPositions?.directApplication?.title}
            </h2>
            <p className="text-xl text-white mb-8 opacity-90">
              {t.careers?.openPositions?.directApplication?.subtitle} 🐾
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:careers@pawmed.com"
                className="inline-block bg-white text-paw-primary px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
              >
                {t.careers?.openPositions?.directApplication?.sendResume} 📧
              </a>
              <a
                href="/#contact"
                className="inline-block border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-paw-primary transition-colors"
              >
                {t.careers?.openPositions?.directApplication?.contactUs} 💬
              </a>
            </div>
          </ScrollAnimatedElement>
        </div>
        
        {/* 背景装饰 */}
        <div className="absolute top-5 left-5 text-6xl opacity-20 animate-pulse">🐱</div>
        <div className="absolute top-10 right-10 text-6xl opacity-20 animate-pulse" style={{animationDelay: '1s'}}>🐶</div>
        <div className="absolute bottom-5 left-1/4 text-4xl opacity-15 animate-pulse" style={{animationDelay: '2s'}}>🐾</div>
        <div className="absolute bottom-10 right-1/4 text-4xl opacity-15 animate-pulse" style={{animationDelay: '3s'}}>❤️</div>
        <div className="absolute top-1/2 left-0 transform -translate-y-1/2 text-5xl opacity-10 animate-bounce" style={{animationDelay: '0.5s'}}>🌟</div>
        <div className="absolute top-1/2 right-0 transform -translate-y-1/2 text-5xl opacity-10 animate-bounce" style={{animationDelay: '1.5s'}}>🌟</div>
      </section>

      {/* 职位详情模态框 */}
      <Modal
        isOpen={showJobModal}
        onClose={() => setShowJobModal(false)}
        title={selectedJob ? getNestedTranslation(t, selectedJob.titleKey) : ''}
      >
        {selectedJob && (
          <div className="space-y-6">
            <div className="flex flex-wrap gap-4 text-sm">
              <span className="bg-paw-light text-paw-dark px-3 py-1 rounded-full">
                {getNestedTranslation(t, selectedJob.departmentKey)}
              </span>
              <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
                📍 {getNestedTranslation(t, selectedJob.locationKey)}
              </span>
              <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
                💼 {getNestedTranslation(t, selectedJob.typeKey)}
              </span>
            </div>
            
            <div>
              <h3 className="text-lg font-bold text-paw-dark mb-3">{getNestedTranslation(t, 'careers.jobModal.description')}</h3>
              <p className="text-gray-600">{getNestedTranslation(t, selectedJob.descriptionKey)}</p>
            </div>
            
            <div>
              <h3 className="text-lg font-bold text-paw-dark mb-3">{getNestedTranslation(t, 'careers.jobModal.responsibilities')}</h3>
              <ul className="space-y-2">
                {selectedJob.responsibilitiesKey.map((respKey, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-paw-primary mr-2">•</span>
                    <span className="text-gray-600">{getNestedTranslation(t, respKey)}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-bold text-paw-dark mb-3">{getNestedTranslation(t, 'careers.jobModal.requirements')}</h3>
              <ul className="space-y-2">
                {selectedJob.requirementsKey.map((reqKey, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-paw-primary mr-2">•</span>
                    <span className="text-gray-600">{getNestedTranslation(t, reqKey)}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-bold text-paw-dark mb-3">{getNestedTranslation(t, 'careers.jobModal.benefits')}</h3>
              <ul className="space-y-2">
                {selectedJob.benefitsKey.map((benefitKey, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-paw-primary mr-2">•</span>
                    <span className="text-gray-600">{getNestedTranslation(t, benefitKey)}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="pt-4 border-t">
              <h3 className="text-lg font-bold text-paw-dark mb-4">💼 {getNestedTranslation(t, 'careers.resumeForm.title')}</h3>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <input type="hidden" name="position" value={selectedJob ? getNestedTranslation(t, selectedJob.titleKey) : ''} />
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{getNestedTranslation(t, 'careers.resumeForm.name')} *</label>
                  <input 
                    type="text" 
                    name="name" 
                    required 
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-paw-primary focus:border-transparent"
                    placeholder={getNestedTranslation(t, 'careers.resumeForm.placeholders.name')}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{getNestedTranslation(t, 'careers.resumeForm.email')} *</label>
                  <input 
                    type="email" 
                    name="email" 
                    required 
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-paw-primary focus:border-transparent"
                    placeholder={getNestedTranslation(t, 'careers.resumeForm.placeholders.email')}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{getNestedTranslation(t, 'careers.resumeForm.resume')} *</label>
                  <input 
                    type="file" 
                    name="resume" 
                    required 
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => setResumeFile(e.target.files?.[0] || null)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-paw-primary focus:border-transparent"
                  />
                  <p className="text-sm text-gray-500 mt-1">{getNestedTranslation(t, 'careers.resumeForm.fileSupport')}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{getNestedTranslation(t, 'careers.resumeForm.message')}</label>
                  <textarea 
                    name="message" 
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-paw-primary focus:border-transparent"
                    placeholder={getNestedTranslation(t, 'careers.resumeForm.placeholders.message')}
                  />
                </div>
                
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-paw-primary text-white py-3 rounded-full font-semibold hover:bg-paw-secondary transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      {getNestedTranslation(t, 'careers.resumeForm.submitting')}
                    </>
                  ) : (
                    <>
                      <span>📧</span>
                      {getNestedTranslation(t, 'careers.resumeForm.submit')}
                    </>
                  )}
                </button>
                
                {submitMessage && (
                  <div className={`p-3 rounded-lg ${submitMessage.includes(getNestedTranslation(t, 'careers.resumeForm.successKeyword')) ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    <div className="flex items-center justify-between">
                      <span>{submitMessage}</span>
                      {submitMessage.includes(getNestedTranslation(t, 'careers.resumeForm.networkKeyword')) && !isSubmitting && (
                        <button
                          onClick={() => {
                            const form = document.querySelector('form') as HTMLFormElement;
                            if (form) {
                              const event = new Event('submit', { bubbles: true, cancelable: true });
                              form.dispatchEvent(event);
                            }
                          }}
                          className="text-sm bg-red-600 text-white px-3 py-1 rounded-full hover:bg-red-700 transition-colors"
                        >
                          {getNestedTranslation(t, 'careers.resumeForm.retry')}
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </form>
              
              <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">
                  <span className="font-medium">💡 {getNestedTranslation(t, 'careers.resumeForm.tip.label')}</span>
                  {getNestedTranslation(t, 'careers.resumeForm.tip.content')}
                </p>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
} 