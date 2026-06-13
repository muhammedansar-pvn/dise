'use client';

import React, { useState, useEffect } from 'react';

interface HeaderProps {
  onOpenApply: () => void;
}

export default function Header({ onOpenApply }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  // Handle scroll events: Sticky nav background & Scroll Spy active highlighting
  useEffect(() => {
    const handleScroll = () => {
      // 1. Sticky background check
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // 2. Active section highlight (Scroll Spy)
      const sections = ['hero', 'about', 'why-choose', 'programs', 'curriculum', 'schedule', 'contact'];
      const scrollPosition = window.scrollY + 150; // offset for nav header

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setIsMenuOpen(false);
    const target = document.getElementById(id);
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 80, // Adjust header padding
        behavior: 'smooth',
      });
    }
  };

  return (
    <header className={isScrolled ? 'scrolled' : ''}>
      <div className="container navbar-container">
        <a href="#hero" className="logo-link" id="nav-logo" onClick={(e) => handleLinkClick(e, 'hero')}>
          {/* DISE Custom Logo SVG */}
          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="logo-svg">
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

        {/* Hamburger Menu */}
        <button 
          className={`hamburger ${isMenuOpen ? 'active' : ''}`} 
          id="hamburger-menu" 
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Navigation Links */}
        <nav className={`nav-menu ${isMenuOpen ? 'active' : ''}`} id="nav-menu">
          <a href="#hero" className={`nav-link ${activeSection === 'hero' ? 'active' : ''}`} onClick={(e) => handleLinkClick(e, 'hero')}>Home</a>
          <a href="#about" className={`nav-link ${activeSection === 'about' ? 'active' : ''}`} onClick={(e) => handleLinkClick(e, 'about')}>About</a>
          <a href="#why-choose" className={`nav-link ${activeSection === 'why-choose' ? 'active' : ''}`} onClick={(e) => handleLinkClick(e, 'why-choose')}>Why Choose Us</a>
          <a href="#programs" className={`nav-link ${activeSection === 'programs' ? 'active' : ''}`} onClick={(e) => handleLinkClick(e, 'programs')}>Programs</a>
          <a href="#curriculum" className={`nav-link ${activeSection === 'curriculum' ? 'active' : ''}`} onClick={(e) => handleLinkClick(e, 'curriculum')}>Curriculum</a>
          <a href="#schedule" className={`nav-link ${activeSection === 'schedule' ? 'active' : ''}`} onClick={(e) => handleLinkClick(e, 'schedule')}>Schedule</a>
          <a href="#contact" className={`nav-link ${activeSection === 'contact' ? 'active' : ''}`} onClick={(e) => handleLinkClick(e, 'contact')}>Contact</a>
          <div className="nav-cta">
            <button className="btn btn-accent" onClick={onOpenApply}>Apply Now</button>
          </div>
        </nav>
      </div>
    </header>
  );
}
