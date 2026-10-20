'use client';

import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { HeroBanner } from '@/components/home/HeroBanner';
import { StatsSection } from '@/components/home/StatsSection';
import { ProgramsSection } from '@/components/home/ProgramsSection';
import { PrincipalMessage } from '@/components/home/PrincipalMessage';
import { FeaturedTeachers } from '@/components/home/FeaturedTeachers';
import { GalleryPreview } from '@/components/home/GalleryPreview';
import { LatestNotices } from '@/components/home/LatestNotices';
import { AdmissionCTA } from '@/components/home/AdmissionCTA';
import { ContactSection } from '@/components/home/ContactSection';

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <HeroBanner />
        <StatsSection />
        <ProgramsSection />
        <PrincipalMessage />
        <FeaturedTeachers />
        <GalleryPreview />
        <LatestNotices />
        <AdmissionCTA />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
