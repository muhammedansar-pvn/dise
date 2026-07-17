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
          <img src="/Artboard 1e3.png" alt="DISE Logo" className="logo-img" style={{ height: '48px', width: 'auto', objectFit: 'contain' }} />
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
