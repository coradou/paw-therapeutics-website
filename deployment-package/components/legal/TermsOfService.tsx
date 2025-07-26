'use client'

import React from 'react';
import { useI18n } from '../../lib/i18n';

export default function TermsOfService() {
  const { t } = useI18n();
  
  return (
    <div className="prose prose-lg max-w-none text-paw-dark">
      <div className="mb-8">
        <h3 className="text-xl font-bold text-paw-primary mb-4">{t.legal.termsOfService.title}</h3>
        <p className="text-sm text-gray-600 mb-6">{t.legal.termsOfService.lastUpdated}</p>
      </div>

      <div className="space-y-6">
        <section>
          <h4 className="text-lg font-semibold mb-3">{t.legal.termsOfService.sections.acceptance.title}</h4>
          <p>
            {t.legal.termsOfService.sections.acceptance.content}
          </p>
        </section>

        <section>
          <h4 className="text-lg font-semibold mb-3">{t.legal.termsOfService.sections.websiteUsage.title}</h4>
          <p className="mb-3">{t.legal.termsOfService.sections.websiteUsage.content}</p>
          <ul className="list-disc pl-6 space-y-2">
            {t.legal.termsOfService.sections.websiteUsage.items.map((item: string, index: number) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
          <p className="mt-3">
            {t.legal.termsOfService.sections.websiteUsage.restriction}
          </p>
        </section>

        {/* 其他章节保持原始内容，可以后续逐步添加翻译 */}
        <section>
          <h4 className="text-lg font-semibold mb-3">3. 知识产权</h4>
          <p className="mb-3">
            本网站及其内容（包括但不限于文本、图像、视频、音频、软件、设计）均受知识产权法保护：
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>版权：</strong>所有内容均为爪子制药或其许可方的财产</li>
            <li><strong>商标：</strong>爪子制药、PAW Therapeutics等商标均为我们的注册商标</li>
            <li><strong>专利：</strong>我们的技术可能受专利保护</li>
            <li><strong>商业秘密：</strong>某些信息可能构成商业秘密</li>
          </ul>
          <p className="mt-3">
            未经我们明确书面许可，您不得复制、分发、修改或创建衍生作品。
          </p>
        </section>

        {/* 跳转到联系方式 */}
        <section>
          <h4 className="text-lg font-semibold mb-3">{t.legal.termsOfService.sections.contact.title}</h4>
          <p className="mb-3">
            {t.legal.termsOfService.sections.contact.content}
          </p>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p><strong>{t.legal.termsOfService.sections.contact.email}</strong></p>
            <p><strong>{t.legal.termsOfService.sections.contact.address}</strong></p>
            <p className="text-sm">{t.legal.termsOfService.sections.contact.details}</p>
          </div>
        </section>

        <section>
          <h4 className="text-lg font-semibold mb-3">13. 生效日期</h4>
          <p>
            本使用条款自2024年12月1日起生效。
          </p>
        </section>
      </div>
    </div>
  );
} 