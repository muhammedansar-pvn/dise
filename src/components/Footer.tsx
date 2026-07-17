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
              <img src="/Artboard 1e3.png" alt="DISE Logo" className="logo-img" style={{ height: '40px', width: 'auto', objectFit: 'contain' }} />
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
