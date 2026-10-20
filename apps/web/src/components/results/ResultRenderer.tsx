'use client';

import React from 'react';
import { ClassicTemplate } from './ClassicTemplate';
import { ModernTemplate } from './ModernTemplate';
import { PremiumTemplate } from './PremiumTemplate';

interface ResultRendererProps {
  templateId?: 'classic' | 'modern' | 'premium';
  data: any;
}

export function ResultRenderer({ templateId = 'classic', data }: ResultRendererProps) {
  switch (templateId) {
    case 'modern':
      return <ModernTemplate data={data} />;
    case 'premium':
      return <PremiumTemplate data={data} />;
    case 'classic':
    default:
      return <ClassicTemplate data={data} />;
  }
}
