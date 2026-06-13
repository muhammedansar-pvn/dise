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
            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="logo-svg animate-pulse-logo">
              {/* Outer 8-Point Star */}
              <path 
                d="M 50.00,6.00 L 59.96,15.96 L 74.04,15.96 L 74.04,30.04 L 84.00,40.00 L 74.04,49.96 L 74.04,64.04 L 59.96,64.04 L 50.00,74.00 L 40.04,64.04 L 25.96,64.04 L 25.96,49.96 L 16.00,40.00 L 25.96,30.04 L 25.96,15.96 L 40.04,15.96 Z" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="1.2"
              />
              {/* Inner 8-Point Star */}
              <path 
                d="M 50.00,9.50 L 58.93,18.44 L 71.57,18.43 L 71.56,31.07 L 80.50,40.00 L 71.56,48.93 L 71.57,61.57 L 58.93,61.56 L 50.00,70.50 L 41.07,63.56 L 28.43,63.57 L 28.44,48.93 L 19.50,40.00 L 28.44,31.07 L 28.43,18.43 L 41.07,18.44 Z" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="1.8"
              />
              
              {/* Domes (Mosque Minarets) */}
              <g fill="none" stroke="currentColor" strokeWidth="1.5">
                {/* Left Dome */}
                <path d="M 33 50.5 C 33 40, 34.5 33, 37.5 31 C 40.5 33, 42 40, 42 51.5" />
                <line x1="37.5" y1="31" x2="37.5" y2="51" />
                
                {/* Right Dome */}
                <path d="M 58 51.5 C 58 40, 59.5 33, 62.5 31 C 65.5 33, 67 40, 67 50.5" />
                <line x1="62.5" y1="31" x2="62.5" y2="51" />
                
                {/* Center Dome */}
                <path d="M 42 51.5 C 42 36, 45 25, 50 22 C 55 25, 58 36, 58 51.5" strokeWidth="1.8" />
                <line x1="50" y1="22" x2="50" y2="52" strokeWidth="1.8" />
              </g>
              
              {/* Open Book */}
              <g>
                {/* Book Pages Fill & Outline */}
                <path 
                  className="logo-book" 
                  d="M 50 52 Q 39 46, 28 50 L 28 70 Q 39 66, 50 75 Q 61 66, 72 70 L 72 50 Q 61 46, 50 52 Z" 
                  fill="var(--logo-bg, #ffffff)" 
                  stroke="currentColor" 
                  strokeWidth="1.8" 
                />
                {/* Book Spine Fold */}
                <line 
                  x1="50" 
                  y1="52" 
                  x2="50" 
                  y2="75" 
                  stroke="currentColor" 
                  strokeWidth="1.8" 
                />
              </g>
              
              {/* Dots at 5 outer points (Top, Top-Right, Right, Left, Top-Left) */}
              <g fill="currentColor" className="logo-dots">
                <circle cx="50.00" cy="6.00" r="2.2" />
                <circle cx="74.04" cy="15.96" r="2.2" />
                <circle cx="84.00" cy="40.00" r="2.2" />
                <circle cx="16.00" cy="40.00" r="2.2" />
                <circle cx="25.96" cy="15.96" r="2.2" />
              </g>
            </svg>
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
