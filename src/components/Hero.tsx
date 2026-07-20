'use client';

import React from 'react';

interface HeroProps {
  onOpenApply: () => void;
}

export default function Hero({ onOpenApply }: HeroProps) {
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
      <div className="hero-pattern"></div>
      <div className="hero-overlay"></div>
      <div className="container hero-container">
        <div className="hero-content animate-on-scroll slide-up">
          {/* Logo at Top of Hero */}
          <div className="hero-logo-wrapper">
            <img src="/Artboard 1e3.png" alt="DISE Logo" className="logo-img" style={{ height: '80px', width: 'auto', objectFit: 'contain' }} />
          </div>
          
          <div className="hero-badge">
            <span className="animate-blink"></span> Admissions Open for 2026-27
          </div>
          
          <h1>
            Darul Irshad School<span>of Excellence (DISE)</span>
          </h1>
          
          <p className="hero-tagline">
            "Blending Values, Building Excellence"
          </p>
          
          <div className="hero-ctas">
            <button className="btn btn-accent" onClick={onOpenApply}>Apply Now</button>
            <a href="#contact" className="btn btn-outline-blue" onClick={handleContactClick}>Contact Us</a>
          </div>
        </div>

        {/* Right Side: Graphic Islamic Emblem */}
        <div className="hero-visual animate-on-scroll fade-in delay-200">
          <div className="emblem-wrapper">
            <div className="emblem-bg-glow"></div>
            <div className="emblem-svg-container animate-float-med">
              <img 
                src="/Artboard 1e3.png" 
                alt="DISE Emblem" 
                style={{ width: '100%', height: '100%', objectFit: 'contain' }} 
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
