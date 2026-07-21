'use client';

import React, { useState, useEffect } from 'react';

interface HeroProps {
  onOpenApply: () => void;
}

export default function Hero({ onOpenApply }: HeroProps) {
  const [settings, setSettings] = useState({
    startDate: '',
    endDate: '',
    academicYear: '2026-27',
    admissionsEnabled: true,
  });
  const [isOpen, setIsOpen] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAdmissions = async () => {
      try {
        const res = await fetch('/api/admin/settings');
        const result = await res.json();
        if (result.success && result.data) {
          const data = result.data;
          setSettings(data);
          const now = new Date();
          const start = new Date(data.startDate);
          const end = new Date(data.endDate);
          now.setHours(0, 0, 0, 0);
          start.setHours(0, 0, 0, 0);
          end.setHours(23, 59, 59, 999);
          setIsOpen(data.admissionsEnabled && (now >= start && now <= end));
        } else {
          setIsOpen(false);
        }
      } catch (err) {
        console.error('Error fetching admissions status for hero:', err);
        setIsOpen(false);
      }
    };
    checkAdmissions();
  }, []);

  const handleContactClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      window.scrollTo({
        top: contactSection.offsetTop - 80,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section id="hero" className="hero-section">
      {/* Professional Graphic Accents */}
      <div className="hero-dot-grid"></div>
      <div className="hero-glow-blue"></div>
      <div className="hero-glow-gold"></div>
      <div className="hero-overlay"></div>
      
      <div className="container hero-container">
        <div className="hero-content animate-on-scroll slide-up">
          
          {isOpen === null ? (
            <div className="hero-badge" style={{ background: 'rgba(148, 163, 184, 0.1)', border: '1px solid rgba(148, 163, 184, 0.3)', color: '#64748B' }}>
              <span className="animate-pulse" style={{ display: 'inline-block', width: '8px', height: '8px', backgroundColor: '#64748B', borderRadius: '50%', marginRight: '8px' }}></span> 
              Checking Admissions...
            </div>
          ) : isOpen ? (
            <div className="hero-badge">
              <span className="pulse-dot" style={{ marginRight: '8px', backgroundColor: '#10B981' }}></span> 
              Admissions Open for {settings.academicYear}
            </div>
          ) : (
            <div className="hero-badge" style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', color: '#EF4444' }}>
              <span className="pulse-dot" style={{ marginRight: '8px', backgroundColor: '#EF4444' }}></span> 
              Admissions Closed
            </div>
          )}
          
          <h1>
            Darul Irshad School<span>of Excellence (DISE)</span>
          </h1>
          
          <p className="hero-tagline">
            "Blending Values, Building Excellence"
          </p>
          
          <div className="hero-ctas">
            {isOpen === null ? (
              <button className="btn btn-accent" style={{ opacity: 0.8, cursor: 'wait' }} disabled>Checking...</button>
            ) : isOpen ? (
              <button className="btn btn-accent btn-pulse" onClick={onOpenApply}>Apply Now</button>
            ) : (
              <button 
                className="btn btn-accent" 
                style={{ backgroundColor: '#94A3B8', cursor: 'not-allowed', opacity: 0.6, boxShadow: 'none' }} 
                disabled
                title="Admissions are currently closed"
              >
                Admissions Closed
              </button>
            )}
            <a href="#contact" className="btn btn-outline-blue" onClick={handleContactClick}>Contact Us</a>
          </div>
        </div>

        {/* Right Side: Graphic Emblem with Floating Glassmorphism Cards & Orbit Rings */}
        <div className="hero-visual animate-on-scroll fade-in delay-200">
          <div className="emblem-wrapper">
            <div className="emblem-bg-glow"></div>
            
            {/* Spinning Orbit Rings for Modern Tech-Academic Feel */}
            <div className="emblem-ring-outer"></div>
            <div className="emblem-ring-inner"></div>
            
            {/* Floating Card 1: Program Detail */}
            <div className="floating-card card-left">
              <div className="floating-card-icon">
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <div className="floating-card-text">
                8-Year Program
                <span className="floating-card-sub">Integrated Degree</span>
              </div>
            </div>

            {/* Central Main Logo */}
            <div className="emblem-svg-container animate-float-med">
              <img 
                src="/Artboard 1e3.png" 
                alt="DISE Emblem" 
                style={{ width: '100%', height: '100%', objectFit: 'contain' }} 
              />
            </div>

            {/* Floating Card 2: Core Values */}
            <div className="floating-card card-right">
              <div className="floating-card-icon" style={{ backgroundColor: 'rgba(246, 196, 0, 0.1)', color: 'var(--color-accent-dark)' }}>
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div className="floating-card-text">
                Moral Values
                <span className="floating-card-sub">Academic Excellence</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
