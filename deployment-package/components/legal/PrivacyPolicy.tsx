'use client'

import React from 'react';
import { useI18n } from '../../lib/i18n';

export default function PrivacyPolicy() {
  const { t } = useI18n();
  
  return (
    <div className="prose prose-lg max-w-none text-paw-dark">
      <div className="mb-8">
        <h3 className="text-xl font-bold text-paw-primary mb-4">{t.legal.privacyPolicy.title}</h3>
        <p className="text-sm text-gray-600 mb-6">{t.legal.privacyPolicy.lastUpdated}</p>
      </div>

      <div className="space-y-6">
        <section>
          <h4 className="text-lg font-semibold mb-3">{t.legal.privacyPolicy.sections.informationCollection.title}</h4>
          <p className="mb-3">
            {t.legal.privacyPolicy.sections.informationCollection.content}
          </p>
          <ul className="list-disc pl-6 space-y-2">
            {t.legal.privacyPolicy.sections.informationCollection.items.map((item: string, index: number) => (
              <li key={index}><strong>{item.split('：')[0]}：</strong>{item.split('：')[1]}</li>
            ))}
          </ul>
        </section>

        <section>
          <h4 className="text-lg font-semibold mb-3">{t.legal.privacyPolicy.sections.informationUsage.title}</h4>
          <p className="mb-3">{t.legal.privacyPolicy.sections.informationUsage.content}</p>
          <ul className="list-disc pl-6 space-y-2">
            {t.legal.privacyPolicy.sections.informationUsage.items.map((item: string, index: number) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </section>

        {/* Other sections maintain original content, can be gradually translated later */}
        <section>
          <h4 className="text-lg font-semibold mb-3">3. {t.legal.privacyPolicy.sections.informationSharing.title}</h4>
          <p className="mb-3">
            {t.legal.privacyPolicy.sections.informationSharing.content}
          </p>
          <ul className="list-disc pl-6 space-y-2">
            {t.legal.privacyPolicy.sections.informationSharing.items.map((item: string, index: number) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </section>

        {/* Contact Information */}
        <section>
          <h4 className="text-lg font-semibold mb-3">{t.legal.privacyPolicy.sections.contact.title}</h4>
          <p className="mb-3">
            {t.legal.privacyPolicy.sections.contact.content}
          </p>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p><strong>{t.legal.privacyPolicy.sections.contact.email}</strong></p>
            <p><strong>{t.legal.privacyPolicy.sections.contact.address}</strong></p>
            <p className="text-sm">{t.legal.privacyPolicy.sections.contact.details}</p>
          </div>
        </section>
      </div>
    </div>
  );
} 