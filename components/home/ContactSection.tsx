import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useI18n } from '../../lib/i18n';
import ScrollAnimatedElement from '../ui/ScrollAnimatedElement';

type Inputs = {
  name: string;
  email: string;
  company?: string;
  message: string;
};

export default function ContactSection() {
  const { t } = useI18n();
  const { register, handleSubmit, formState: { errors }, reset } = useForm<Inputs>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);
  const [submitMessage, setSubmitMessage] = useState('');

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus('success');
        setSubmitMessage(result.message);
        reset();
      } else {
        setSubmitStatus('error');
        setSubmitMessage(result.error || '发送失败，请稍后重试');
      }
    } catch (error) {
      setSubmitStatus('error');
      setSubmitMessage('网络错误，请检查您的连接');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <section id="contact" className="py-16 md:py-24 bg-gradient-to-br from-paw-light to-white">
      <div className="container-custom">
        <ScrollAnimatedElement animation="fade-up" className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">{t.contact.title}</span>
          </h1>
          <p className="text-xl text-paw-dark/80">{t.contact.subtitle}</p>
        </ScrollAnimatedElement>
        
        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* 左侧：联系表单 */}
          <ScrollAnimatedElement animation="slide-left" delay={100}>
            <div className="bg-white rounded-3xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-paw-primary mb-6">{t.contact.form.title}</h2>
              
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <ScrollAnimatedElement animation="fade-up" delay={200}>
                  <div>
                    <label className="block text-sm font-medium text-paw-dark mb-2">{t.contact.form.name}</label>
                    <input
                      {...register('name', { required: '姓名不能为空' })}
                      type="text"
                      placeholder={t.contact.form.placeholder.name}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent ${errors.name ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-paw-primary'}`}
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                  </div>
                </ScrollAnimatedElement>
                
                <ScrollAnimatedElement animation="fade-up" delay={250}>
                  <div>
                    <label className="block text-sm font-medium text-paw-dark mb-2">{t.contact.form.email}</label>
                    <input
                      {...register('email', { 
                        required: '邮箱不能为空',
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: '请输入有效的邮箱地址'
                        }
                      })}
                      type="email"
                      placeholder={t.contact.form.placeholder.email}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent ${errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-paw-primary'}`}
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                  </div>
                </ScrollAnimatedElement>
                
                <ScrollAnimatedElement animation="fade-up" delay={300}>
                  <div>
                    <label className="block text-sm font-medium text-paw-dark mb-2">{t.contact.form.company}</label>
                    <input
                      {...register('company')}
                      type="text"
                      placeholder={t.contact.form.placeholder.company}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-paw-primary focus:border-transparent"
                    />
                  </div>
                </ScrollAnimatedElement>
                
                <ScrollAnimatedElement animation="fade-up" delay={350}>
                  <div>
                    <label className="block text-sm font-medium text-paw-dark mb-2">{t.contact.form.message}</label>
                    <textarea
                      {...register('message', { required: t.validation.messageRequired })}
                      rows={4}
                      placeholder={t.contact.form.placeholder.message}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent ${errors.message ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-paw-primary'}`}
                    ></textarea>
                    {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>}
                  </div>
                </ScrollAnimatedElement>
                
                <ScrollAnimatedElement animation="fade-up" delay={400}>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-paw-primary text-white py-3 px-6 rounded-lg font-semibold hover:bg-paw-deep transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? '发送中...' : t.contact.form.submit}
                  </button>
                </ScrollAnimatedElement>
                
                {submitStatus && (
                  <div className={`mt-4 p-4 rounded-lg text-center ${submitStatus === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {submitMessage}
                  </div>
                )}
              </form>
            </div>
          </ScrollAnimatedElement>
          
          {/* 右侧：联系信息 */}
          <div className="space-y-8">
            {/* 公司信息 */}
            <ScrollAnimatedElement animation="slide-right" delay={100}>
              <div className="bg-white rounded-3xl shadow-xl p-8">
                <h2 className="text-2xl font-bold text-paw-primary mb-6">{t.contact.info.title}</h2>
                
                <div className="space-y-6">
                  <ScrollAnimatedElement animation="fade-up" delay={200}>
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-paw-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg className="w-6 h-6 text-paw-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-semibold text-paw-dark mb-1">{t.contact.info.address.title}</h3>
                        <p className="text-paw-dark/70" dangerouslySetInnerHTML={{ __html: t.contact.info.addressValue.replace(/\n/g, '<br/>') }}></p>
                      </div>
                    </div>
                  </ScrollAnimatedElement>
                  
                  <ScrollAnimatedElement animation="fade-up" delay={250}>
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-paw-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg className="w-6 h-6 text-paw-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-semibold text-paw-dark mb-1">{t.contact.info.email.title}</h3>
                        <p className="text-paw-dark/70">{t.contact.info.email.value}</p>
                      </div>
                    </div>
                  </ScrollAnimatedElement>
                  
                  <ScrollAnimatedElement animation="fade-up" delay={300}>
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-paw-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg className="w-6 h-6 text-paw-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-semibold text-paw-dark mb-1">{t.contact.info.phone.title}</h3>
                        <p className="text-paw-dark/70">{t.contact.info.phone.value}</p>
                      </div>
                    </div>
                  </ScrollAnimatedElement>
                </div>
              </div>
            </ScrollAnimatedElement>
            
            {/* 社交媒体 */}
            <ScrollAnimatedElement animation="slide-right" delay={200}>
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="font-semibold text-paw-dark mb-4">{t.contact.social.title}</h3>
                <div className="space-y-3">
                  {t.contact.social.platforms.map((platform: any, index: number) => (
                    <ScrollAnimatedElement key={index} animation="fade-up" delay={400 + index * 50}>
                      <a
                        href={platform.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-3 text-paw-dark/70 hover:text-paw-primary transition-colors"
                      >
                        <span className="text-xl">{platform.icon}</span>
                        <span>{platform.name}</span>
                      </a>
                    </ScrollAnimatedElement>
                  ))}
                </div>
              </div>
            </ScrollAnimatedElement>
          </div>
        </div>
      </div>
    </section>
  );
} 