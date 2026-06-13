import React from 'react';

export default function Programs() {
  return (
    <section id="programs" className="programs-section section-padding">
      <div className="container">
        <div className="section-header text-center animate-on-scroll slide-up">
          <h2>Our Integrated Programs</h2>
          <p>Highlighting the pillars of our unique 8-year educational model.</p>
        </div>

        <div className="grid grid-2 animate-on-scroll slide-up delay-150">
          {/* Program Card 1 */}
          <div className="program-card">
            <div className="program-image">
              <span className="program-badge">Islamic Stream</span>
              <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <path d="M50 15 L80 35 V70 L50 90 L20 70 V35 Z" fill="none" stroke="currentColor" strokeWidth="3"/>
              </svg>
            </div>
            <div className="program-body">
              <h3>Comprehensive Islamic Studies</h3>
              <p>A rigorous curriculum integrating Qur'anic Sciences, Hadith theology, Islamic Jurisprudence (Fiqh), Arabic Language grammar, and moral philosophy to develop authentic religious leadership.</p>
              <div className="program-features">
                <div className="program-feature-item">
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                  Tafseer & Hadith Studies
                </div>
                <div className="program-feature-item">
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                  Spiritual Majlis & Ethics
                </div>
              </div>
            </div>
          </div>

          {/* Program Card 2 */}
          <div className="program-card">
            <div className="program-image">
              <span className="program-badge">Academic Stream</span>
              <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <polygon points="50,15 90,35 50,55 10,35" fill="none" stroke="currentColor" strokeWidth="3"/>
                <line x1="90" y1="35" x2="90" y2="65" stroke="currentColor" strokeWidth="3"/>
                <path d="M25 50 V70 C25 80 50 85 50 85 C50 85 75 80 75 70 V50" fill="none" stroke="currentColor" strokeWidth="3"/>
              </svg>
            </div>
            <div className="program-body">
              <h3>Kerala State Academic Curriculum</h3>
              <p>Providing formal secondary and higher secondary school courses under standard state guidelines, establishing strong scientific and humanities foundations.</p>
              <div className="program-features">
                <div className="program-feature-item">
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                  Secondary & Senior Secondary Streams
                </div>
                <div className="program-feature-item">
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                  Formal Degree Certifications
                </div>
              </div>
            </div>
          </div>

          {/* Program Card 3 */}
          <div className="program-card">
            <div className="program-image">
              <span className="program-badge">Foundation Course</span>
              <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <rect x="20" y="20" width="60" height="60" rx="10" fill="none" stroke="currentColor" strokeWidth="3"/>
                <line x1="50" y1="20" x2="50" y2="80" stroke="currentColor" strokeWidth="1.5"/>
                <line x1="20" y1="50" x2="80" y2="50" stroke="currentColor" strokeWidth="1.5"/>
              </svg>
            </div>
            <div className="program-body">
              <h3>Preparatory & Foundation Course</h3>
              <p>Designed for younger entrants to bridge the transition into comprehensive Islamic learning, strengthening language arts and fundamental theology logic.</p>
              <div className="program-features">
                <div className="program-feature-item">
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                  Primary Language Bridge (English, Arabic)
                </div>
                <div className="program-feature-item">
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                  Focus on Basic Moral Sciences
                </div>
              </div>
            </div>
          </div>

          {/* Program Card 4 */}
          <div className="program-card">
            <div className="program-image">
              <span className="program-badge">Integrative Stream</span>
              <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <circle cx="50" cy="50" r="35" fill="none" stroke="currentColor" strokeWidth="3"/>
                <circle cx="50" cy="50" r="15" fill="currentColor"/>
              </svg>
            </div>
            <div className="program-body">
              <h3>8-Year Integrated Degree</h3>
              <p>Our flagship track merging structured religious coursework with full university degrees. Delivers a complete moral scholar equipped with modern professional capabilities.</p>
              <div className="program-features">
                <div className="program-feature-item">
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                  University Bachelor Degrees
                </div>
                <div className="program-feature-item">
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                  Simultaneous Classical Islamic Sanad
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
