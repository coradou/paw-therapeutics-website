'use client';

import React from 'react';
import { useI18n } from '../../lib/i18n';

interface PipelineChartProps {}

export default function PipelineChart({}: PipelineChartProps) {
  const { t } = useI18n();

  // 从timeline中提取特定阶段的年份
  const extractYear = (timeline: string[], stage: string): string => {
    for (const item of timeline) {
      if (item.includes(stage)) {
        const year = item.match(/(\d{4})/)?.[1];
        return year || '';
      }
    }
    return '';
  };

  // 判断是否有特定阶段
  const hasStage = (timeline: string[], stage: string): boolean => {
    return timeline.some(item => item.includes(stage));
  };

  return (
    <section className="pt-6 pb-16 bg-white">
      <div className="container-custom">
        <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 shadow-xl overflow-x-auto">
          <div className="min-w-[800px]">
            {/* Table Headers */}
            <div className="grid grid-cols-5 gap-2 mb-4 text-center">
              {t.pipeline.chartHeaders.map((header: string, index: number) => (
                <div key={index} className="font-bold text-paw-deep text-sm">{header}</div>
              ))}
            </div>
            
            {/* Canine Longevity */}
            <div className="mb-8">
              <div className="bg-paw-primary text-white font-bold p-3 rounded-lg mb-4">
                <div className="flex items-center space-x-2">
                  <svg viewBox="0 0 100 100" className="w-6 h-6">
                    <ellipse cx="35" cy="25" rx="8" ry="12" fill="white"/>
                    <ellipse cx="50" cy="20" rx="8" ry="12" fill="white"/>
                    <ellipse cx="65" cy="25" rx="8" ry="12" fill="white"/>
                    <ellipse cx="25" cy="40" rx="8" ry="12" fill="white"/>
                    <ellipse cx="75" cy="40" rx="8" ry="12" fill="white"/>
                    <path d="M50 35 Q30 40 25 60 Q25 75 35 80 Q45 85 50 85 Q55 85 65 80 Q75 75 75 60 Q70 40 50 35" fill="white"/>
                  </svg>
                  <span>{t.pipeline.dogLongevity}</span>
                </div>
              </div>
              
              {/* PAW-001 */}
              <div className="grid grid-cols-5 gap-2 mb-3 items-center text-center border-b border-gray-100 pb-3">
                <div className="font-semibold text-left">{t.pipeline.projects.paw001.name}</div>
                <div className="text-sm text-gray-600">{t.pipeline.projects.paw001.target}</div>
                <div className="text-sm">
                  {hasStage(t.pipeline.projects.paw001.timeline, '临床前研究') && (
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                      {extractYear(t.pipeline.projects.paw001.timeline, '临床前研究') || '2025'}
                    </span>
                  )}
                </div>
                <div className="text-sm">
                  {hasStage(t.pipeline.projects.paw001.timeline, '临床') && !hasStage(t.pipeline.projects.paw001.timeline, '获证') && (
                    <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">
                      {extractYear(t.pipeline.projects.paw001.timeline, '临床')}
                    </span>
                  )}
                </div>
                <div className="text-sm">
                  {hasStage(t.pipeline.projects.paw001.timeline, '获证') && (
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                      {extractYear(t.pipeline.projects.paw001.timeline, '获证') || '2028'}
                    </span>
                  )}
                </div>
              </div>
              
              {/* PAW-002 */}
              <div className="grid grid-cols-5 gap-2 mb-3 items-center text-center border-b border-gray-100 pb-3">
                <div className="font-semibold text-left">{t.pipeline.projects.paw002.name}</div>
                <div className="text-sm text-gray-600">{t.pipeline.projects.paw002.target}</div>
                <div className="text-sm">
                  {hasStage(t.pipeline.projects.paw002.timeline, '临床前研究') && (
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                      {extractYear(t.pipeline.projects.paw002.timeline, '临床前研究') || '2025'}
                    </span>
                  )}
                </div>
                <div className="text-sm">
                  {hasStage(t.pipeline.projects.paw002.timeline, '临床') && !hasStage(t.pipeline.projects.paw002.timeline, '获证') && (
                    <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">
                      {extractYear(t.pipeline.projects.paw002.timeline, '临床')}
                    </span>
                  )}
                </div>
                <div className="text-sm">
                  {hasStage(t.pipeline.projects.paw002.timeline, '获证') && (
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                      {extractYear(t.pipeline.projects.paw002.timeline, '获证') || '2028'}
                    </span>
                  )}
                </div>
              </div>
              
              {/* PAW-003 */}
              <div className="grid grid-cols-5 gap-2 mb-3 items-center text-center border-b border-gray-100 pb-3">
                <div className="font-semibold text-left">{t.pipeline.projects.paw003.name}</div>
                <div className="text-sm text-gray-600">{t.pipeline.projects.paw003.target}</div>
                <div className="text-sm">
                  {hasStage(t.pipeline.projects.paw003.timeline, '临床前研究') && (
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                      {extractYear(t.pipeline.projects.paw003.timeline, '临床前研究') || '2025'}
                    </span>
                  )}
                </div>
                <div className="text-sm">
                  {hasStage(t.pipeline.projects.paw003.timeline, '临床') && !hasStage(t.pipeline.projects.paw003.timeline, '获证') && (
                    <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">
                      {extractYear(t.pipeline.projects.paw003.timeline, '临床')}
                    </span>
                  )}
                </div>
                <div className="text-sm">
                  {hasStage(t.pipeline.projects.paw003.timeline, '获证') && (
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                      {extractYear(t.pipeline.projects.paw003.timeline, '获证') || '2028'}
                    </span>
                  )}
                </div>
              </div>

              {/* PAW-004 */}
              <div className="grid grid-cols-5 gap-2 mb-3 items-center text-center border-b border-gray-100 pb-3">
                <div className="font-semibold text-left">{t.pipeline.projects.paw004.name}</div>
                <div className="text-sm text-gray-600">{t.pipeline.projects.paw004.target}</div>
                <div className="text-sm">
                  {hasStage(t.pipeline.projects.paw004.timeline, '临床前研究') && (
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                      {extractYear(t.pipeline.projects.paw004.timeline, '临床前研究') || '2025'}
                    </span>
                  )}
                </div>
                <div className="text-sm">
                  {hasStage(t.pipeline.projects.paw004.timeline, '临床') && !hasStage(t.pipeline.projects.paw004.timeline, '获证') && (
                    <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">
                      {extractYear(t.pipeline.projects.paw004.timeline, '临床')}
                    </span>
                  )}
                </div>
                <div className="text-sm">
                  {hasStage(t.pipeline.projects.paw004.timeline, '获证') && (
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                      {extractYear(t.pipeline.projects.paw004.timeline, '获证')}
                    </span>
                  )}
                </div>
              </div>

              {/* PAW-005 */}
              <div className="grid grid-cols-5 gap-2 mb-3 items-center text-center border-b border-gray-100 pb-3">
                <div className="font-semibold text-left">{t.pipeline.projects.paw005.name}</div>
                <div className="text-sm text-gray-600">{t.pipeline.projects.paw005.target}</div>
                <div className="text-sm">
                  {hasStage(t.pipeline.projects.paw005.timeline, '临床前研究') && (
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                      {extractYear(t.pipeline.projects.paw005.timeline, '临床前研究') || '2025'}
                    </span>
                  )}
                </div>
                <div className="text-sm">
                  {hasStage(t.pipeline.projects.paw005.timeline, '临床') && !hasStage(t.pipeline.projects.paw005.timeline, '获证') && (
                    <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">
                      {extractYear(t.pipeline.projects.paw005.timeline, '临床')}
                    </span>
                  )}
                </div>
                <div className="text-sm">
                  {hasStage(t.pipeline.projects.paw005.timeline, '获证') && (
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                      {extractYear(t.pipeline.projects.paw005.timeline, '获证')}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 