'use client';

import React, { useState } from 'react';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

// Component Imports
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import About from '@/components/About';
import WhyChoose from '@/components/WhyChoose';
import Programs from '@/components/Programs';
import Curriculum from '@/components/Curriculum';
import Schedule from '@/components/Schedule';
import Admissions from '@/components/Admissions';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import AdmissionsModal from '@/components/AdmissionsModal';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Initialize intersection observer for scroll-triggered slide-up/fade-in animations
  useIntersectionObserver();

  return (
    <>
      <Header onOpenApply={() => setIsModalOpen(true)} />
      <main>
        <Hero onOpenApply={() => setIsModalOpen(true)} />
        <About />
        <WhyChoose />
        <Programs />
        <Curriculum />
        <Schedule />
        <Admissions onOpenApply={() => setIsModalOpen(true)} />
        <Contact />
      </main>
      <Footer />
      
      {/* Admissions Application Form Modal */}
      <AdmissionsModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  );
}
