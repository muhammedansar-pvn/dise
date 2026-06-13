'use client';

import React from 'react';

interface AdmissionsProps {
  onOpenApply: () => void;
}

export default function Admissions({ onOpenApply }: AdmissionsProps) {
  return (
    <section id="admissions" className="admissions-section section-padding">
      <div className="container">
        <div className="admissions-banner animate-on-scroll slide-up">
          <div className="admissions-pattern"></div>
          <div className="admissions-content">
            <span className="admission-badge">Admissions Open</span>
            <h3>7th & 8th Classes</h3>
            <p>Enroll your child in our flagship 8-year comprehensive course. <span className="text-accent font-bold">Limited seats available</span> for the upcoming batch.</p>
            <button className="btn btn-accent" onClick={onOpenApply}>Apply Online Now</button>
          </div>
          <div className="admissions-action">
            {/* Large floating graduation symbol */}
            <svg width="140" height="140" viewBox="0 0 24 24" fill="none" stroke="#F6C400" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="animate-on-scroll fade-in" style={{ opacity: 0.15 }}>
              <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
              <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5"/>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
