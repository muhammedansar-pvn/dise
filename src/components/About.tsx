'use client';

import React from 'react';

export default function About() {
  const handleWhyClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const whySection = document.getElementById('why-choose');
    if (whySection) {
      window.scrollTo({
        top: whySection.offsetTop - 80,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section id="about" className="about-section section-padding">
      <div className="container">
        <div className="about-grid">
          <div className="about-text animate-on-scroll slide-left">
            <div className="section-header">
              <h2>About Our Institution</h2>
              <p>Fostering academic brilliance and spiritual depth hand in hand.</p>
            </div>
            <p>
              Darul Irshad School of Excellence (DISE) is a premium Islamic educational academy dedicated to shaping the future leaders of our community. We believe in providing holistic growth by merging the treasures of profound religious sciences with state-of-the-art academic curriculum.
            </p>
            <p>
              Located in the peaceful town of Chelembra, Kerala, DISE provides a sanctuary of learning that matches world-class secondary and higher secondary education with deep ethical values.
            </p>
            <a href="#why-choose" className="btn btn-outline-blue" onClick={handleWhyClick}>Why Choose Us</a>
          </div>

          <div className="vision-mission-cards animate-on-scroll slide-right delay-200">
            {/* Vision Card */}
            <div className="vm-card vision">
              <div className="vm-icon-box">
                {/* Eye Icon SVG */}
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <div className="vm-content">
                <h4>Our Vision</h4>
                <p>"To nurture a generation rooted in moral values and equipped with world-class academic excellence."</p>
              </div>
            </div>

            {/* Mission Card */}
            <div className="vm-card mission">
              <div className="vm-icon-box">
                {/* Target Icon SVG */}
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div className="vm-content">
                <h4>Our Mission</h4>
                <p>"A unique 8-year comprehensive program integrating profound Islamic knowledge with modern degree education."</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
