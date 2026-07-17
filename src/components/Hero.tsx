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
            <a href="#contact" className="btn btn-outline" onClick={handleContactClick}>Contact Us</a>
          </div>
        </div>

        {/* Right Side: Graphic Islamic Emblem */}
        <div className="hero-visual animate-on-scroll fade-in delay-200">
          <div className="emblem-wrapper">
            <div className="emblem-bg-glow"></div>
            <div className="emblem-svg-container animate-float-med">
              <svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
                {/* Golden Islamic 8-Point Star Outer Border */}
                <g stroke="#F6C400" strokeWidth="3" fill="none">
                  <rect x="50" y="50" width="200" height="200" transform="rotate(0 150 150)"/>
                  <rect x="50" y="50" width="200" height="200" transform="rotate(45 150 150)"/>
                </g>
                {/* Glowing Cyan/Blue Inner Rings */}
                <circle cx="150" cy="150" r="80" stroke="#1E6BE6" strokeWidth="2" fill="none" opacity="0.6"/>
                <circle cx="150" cy="150" r="95" stroke="#F6C400" strokeWidth="1.5" strokeDasharray="8, 6" fill="none"/>
                {/* Emblem Center Shield */}
                <path d="M150 75 L210 100 V160 C210 205 150 240 150 240 C150 240 90 205 90 160 V100 L150 75 Z" fill="#062F68" stroke="#F6C400" strokeWidth="4"/>
                {/* Inside Shield: Islamic Star and Moon / Knowledge Book */}
                {/* Glowing Book */}
                <path d="M110 170 C125 160 145 160 150 170 C155 160 175 160 190 170 V130 C175 120 155 120 150 130 C145 120 125 120 110 130 Z" fill="#FFFFFF"/>
                <path d="M150 130 V170" stroke="#062F68" strokeWidth="2.5"/>
                {/* Gold Crescent & Star */}
                <path d="M150 90 A 15 15 0 1 0 165 105 A 11 11 0 1 1 150 90 Z" fill="#F6C400"/>
                <polygon points="152,94 154,99 159,99 155,102 157,107 152,104 147,107 149,102 145,99 150,99" fill="#FFFFFF"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
