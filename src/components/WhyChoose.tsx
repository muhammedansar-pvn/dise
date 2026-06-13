import React from 'react';

export default function WhyChoose() {
  return (
    <section id="why-choose" className="why-choose-section section-padding">
      <div className="container">
        <div className="section-header text-center animate-on-scroll slide-up">
          <h2>Why Choose DISE?</h2>
          <p>We provide a nurturing environment that integrates home comfort with career readiness.</p>
        </div>

        <div className="grid grid-3 animate-on-scroll slide-up delay-100">
          {/* Card 1 */}
          <div className="why-card">
            <div className="why-icon">
              {/* Home Icon */}
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" style={{ width: '28px', height: '28px' }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>
            <h3>Residential Comforts at Home</h3>
            <p>Students enjoy a structured, holistic residential system while remaining closely connected with family values and support.</p>
          </div>

          {/* Card 2 */}
          <div className="why-card">
            <div className="why-icon">
              {/* Briefcase Icon */}
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" style={{ width: '28px', height: '28px' }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3>Endless Career Opportunities</h3>
            <p>Our dual-curriculum opens up careers in public service, administration, corporate systems, global research, and religious sectors.</p>
          </div>

          {/* Card 3 */}
          <div className="why-card">
            <div className="why-icon">
              {/* Shield Check Icon */}
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" style={{ width: '28px', height: '28px' }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3>Expert Academic Supervision</h3>
            <p>Monitored and guided by veteran academics, religious scholars, and active career consultants throughout the program.</p>
          </div>

          {/* Card 4 */}
          <div className="why-card">
            <div className="why-icon">
              {/* Sparkles Icon */}
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" style={{ width: '28px', height: '28px' }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
            </div>
            <h3>Dual-Stream Excellence</h3>
            <p>A finely calibrated schedule that balances religious sciences (Shari'ah) and state degree certifications without academic overload.</p>
          </div>

          {/* Card 5 */}
          <div className="why-card">
            <div className="why-icon">
              {/* Users Icon */}
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" style={{ width: '28px', height: '28px' }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <h3>Individual Attention</h3>
            <p>Maintained through optimal teacher-student ratios and targeted mentoring schemes to identify and elevate potential.</p>
          </div>
        </div>

        {/* Stats Banner */}
        <div className="stats-banner animate-on-scroll slide-up">
          <div className="container stats-grid">
            <div className="stat-item">
              <h4>8+</h4>
              <p>Years Program</p>
            </div>
            <div className="stat-item">
              <h4>100%</h4>
              <p>Moral & Safe Campus</p>
            </div>
            <div className="stat-item">
              <h4>15+</h4>
              <p>Expert Faculty</p>
            </div>
            <div className="stat-item">
              <h4>3+</h4>
              <p>Language Focus</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
