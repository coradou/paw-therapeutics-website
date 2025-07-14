"use client";

import React from 'react';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/home/HeroSection';
import FeaturesSection from '@/components/home/FeaturesSection';
import StatsSection from '@/components/home/StatsSection';
import AboutSection from '@/components/home/AboutSection';
import TeamSection from '@/components/home/TeamSection';
import PipelineSection from '@/components/home/PipelineSection';
import ProductsSection from '@/components/home/ProductsSection';
import InvestorsSection from '@/components/home/InvestorsSection';
import NewsSection from '@/components/home/NewsSection';
import ContactSection from '@/components/home/ContactSection';

export default function HomePage() {
  return (
    <>
      <div className="min-h-screen">
        {/* Hero Section */}
        <HeroSection />
        
        {/* Features Section */}
        <FeaturesSection />
        
        {/* Statistics Section */}
        <StatsSection />
        
        {/* About Us Section */}
        <AboutSection />
        
        {/* Core Team Section */}
        <TeamSection />
        
        {/* R&D Pipeline Section */}
        <PipelineSection />
        
        {/* Products & Services Section */}
        <ProductsSection />
        
        {/* Investor Relations Section */}
        <InvestorsSection />
        
        {/* Insights & News Section */}
        <NewsSection />
        
        {/* Contact Us Section */}
        <ContactSection />
      </div>
      <Footer />
    </>
  );
} 