'use client';

import React, { useState, useEffect } from 'react';

export default function Footer() {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const target = document.getElementById(id);
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 80,
        behavior: 'smooth',
      });
    }
  };

  return (
    <>
      <footer>
        <div className="container footer-grid">
          {/* About/Logo */}
          <div className="footer-about">
            <a href="#hero" className="logo-link" onClick={(e) => handleLinkClick(e, 'hero')}>
              <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="logo-svg" style={{ height: '40px' }}>
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
              <div className="logo-text">
                DISE
                <span>Darul Irshad</span>
              </div>
            </a>
            <p>A pathbreaking institution integrating pure academic streams with comprehensive moral values and Islamic scholarship.</p>
            <div className="footer-socials">
              <a href="#" className="social-icon" aria-label="Facebook">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.8c4.56-.93 8-4.96 8-9.8z"/></svg>
              </a>
              <a href="#" className="social-icon" aria-label="Twitter">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M23.95 4.57a10 10 0 0 1-2.82.77 4.96 4.96 0 0 0 2.16-2.72c-.95.55-2 .95-3.12 1.18a4.92 4.92 0 0 0-8.38 4.48A14 14 0 0 1 1.64 3.16a4.93 4.93 0 0 0 1.52 6.57 4.9 4.9 0 0 1-2.23-.61v.06a4.92 4.92 0 0 0 3.95 4.8 4.9 4.9 0 0 1-2.21.08 4.93 4.93 0 0 0 4.6 3.42A9.87 9.87 0 0 1 0 19.54a13.94 13.94 0 0 0 7.55 2.21c9.14 0 14.3-7.72 14.07-14.88A10 10 0 0 0 24 4.58z"/></svg>
              </a>
              <a href="#" className="social-icon" aria-label="YouTube">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M23.5 6.25a3 3 0 0 0-2.1-2.1C19.55 3.5 12 3.5 12 3.5s-7.55 0-9.4.65a3 3 0 0 0-2.1 2.1C0 8.1 0 12 0 12s0 3.9.5 5.75a3 3 0 0 0 2.1 2.1c1.85.65 9.4.65 9.4.65s7.55 0 9.4-.65a3 3 0 0 0 2.1-2.1C24 15.9 24 12 24 12s0-3.9-.5-5.75zM9.5 15.5V8.5l6.5 3.5-6.5 3.5z"/></svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-links-col">
            <h4>Quick Links</h4>
            <div className="footer-links">
              <a href="#hero" onClick={(e) => handleLinkClick(e, 'hero')}>Home Base</a>
              <a href="#about" onClick={(e) => handleLinkClick(e, 'about')}>Our Identity</a>
              <a href="#why-choose" onClick={(e) => handleLinkClick(e, 'why-choose')}>Why DISE</a>
              <a href="#programs" onClick={(e) => handleLinkClick(e, 'programs')}>Courses Offered</a>
              <a href="#curriculum" onClick={(e) => handleLinkClick(e, 'curriculum')}>Learning System</a>
              <a href="#schedule" onClick={(e) => handleLinkClick(e, 'schedule')}>Daily Routine</a>
            </div>
          </div>

          {/* Contact Info */}
          <div className="footer-contact-col">
            <h4>Get In Touch</h4>
            <div className="footer-contact-info">
              <div className="footer-contact-item">
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                </svg>
                <p>Irshad Nagar, Chelembra,<br />Kuttippala, Kerala, India</p>
              </div>
              <div className="footer-contact-item">
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <p>+91 94955 74831<br />+91 62825 38776</p>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright details */}
        <div className="container footer-bottom">
          <p>Copyright &copy; 2026 Darul Irshad School of Excellence. All Rights Reserved.</p>
          <div className="footer-bottom-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms & Conditions</a>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      <button 
        className={`back-to-top ${showBackToTop ? 'show' : ''}`} 
        onClick={scrollToTop} 
        aria-label="Scroll back to top"
      >
        <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7"/>
        </svg>
      </button>
    </>
  );
}
