'use client';

import React, { useState, useEffect } from 'react';

export default function Schedule() {
  const [isOpen, setIsOpen] = useState<boolean | null>(null); // null means "Checking..."
  const [statusText, setStatusText] = useState('Calculating status...');
  const [activePeriod, setActivePeriod] = useState<string | null>(null);

  useEffect(() => {
    const updateScheduleStatus = () => {
      const now = new Date();
      const currentDay = now.getDay(); // 0: Sunday, 1: Mon, etc.
      const currentHour = now.getHours();
      const currentMinute = now.getMinutes();
      const currentTimeInMinutes = currentHour * 60 + currentMinute;

      // Operating Hours: 7:30 AM (450 mins) to 8:30 PM (1230 mins)
      const openTime = 7 * 60 + 30; // 450
      const closeTime = 20 * 60 + 30; // 1230
      const isSunday = currentDay === 0;

      let openState = false;

      if (!isSunday && currentTimeInMinutes >= openTime && currentTimeInMinutes < closeTime) {
        openState = true;
      }

      setIsOpen(openState);

      if (openState) {
        setStatusText('Active now (Classes & Study ongoing)');
        
        // Timeline block highlights
        if (currentTimeInMinutes >= 450 && currentTimeInMinutes < 510) {
          setActivePeriod('period-1');
        } else if (currentTimeInMinutes >= 510 && currentTimeInMinutes < 750) {
          setActivePeriod('period-2');
        } else if (currentTimeInMinutes >= 750 && currentTimeInMinutes < 810) {
          setActivePeriod('period-3');
        } else if (currentTimeInMinutes >= 810 && currentTimeInMinutes < 990) {
          setActivePeriod('period-4');
        } else if (currentTimeInMinutes >= 990 && currentTimeInMinutes < 1050) {
          setActivePeriod('period-5');
        } else if (currentTimeInMinutes >= 1050 && currentTimeInMinutes < 1230) {
          setActivePeriod('period-6');
        } else {
          setActivePeriod(null);
        }
      } else {
        setActivePeriod(null);
        if (isSunday) {
          setStatusText('Weekly Holiday (Sunday)');
        } else {
          setStatusText('Outside operational hours (Open Mon-Sat 7:30 AM - 8:30 PM)');
        }
      }
    };

    updateScheduleStatus();
    const timer = setInterval(updateScheduleStatus, 60000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section id="schedule" className="schedule-section section-padding">
      <div className="container">
        <div className="section-header text-center animate-on-scroll slide-up">
          <h2>Our Daily Schedule</h2>
          <p>A structured routine designed to balance intellectual work, devotions, and healthy recreation.</p>
        </div>

        <div className="schedule-card animate-on-scroll slide-up delay-150">
          <div className="schedule-grid">
            <div className="schedule-info">
              <h3>Routine Breakdown</h3>
              <p>Our program operates on a structured schedule designed to develop academic discipline and consistent worship habits.</p>
              
              {/* Live Status Widget */}
              <div className="schedule-status-widget">
                {isOpen === null ? (
                  <div className="status-badge closed" style={{ backgroundColor: 'rgba(226, 232, 240, 0.4)', color: '#64748b' }}>
                    <span className="status-dot" style={{ backgroundColor: '#64748b' }}></span>Checking Status...
                  </div>
                ) : isOpen ? (
                  <div className="status-badge open" id="schedule-status">
                    <span className="status-dot"></span>In Session
                  </div>
                ) : (
                  <div className="status-badge closed" id="schedule-status">
                    <span className="status-dot"></span>Closed
                  </div>
                )}
                <p id="status-time-text" style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--color-text-muted)', margin: 0 }}>
                  {statusText}
                </p>
              </div>

              <div className="schedule-meta">
                <div className="meta-row">
                  <div className="meta-icon">
                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="meta-details">
                    <span>Class Hours</span>
                    <p>7:30 AM - 8:30 PM</p>
                  </div>
                </div>
                <div className="meta-row">
                  <div className="meta-icon">
                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="meta-details">
                    <span>Weekly Holiday</span>
                    <p>Sunday</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Vertical Timeline of Schedule */}
            <div className="timeline">
              <div className={`timeline-item ${activePeriod === 'period-1' ? 'active' : ''}`} id="period-1">
                <div className="timeline-time">07:30 AM - 08:30 AM</div>
                <div className="timeline-title">Morning Spiritual Majlis</div>
                <div className="timeline-desc">Congregational morning prayers, Quran recitation, and spiritual development session.</div>
              </div>
              <div className={`timeline-item ${activePeriod === 'period-2' ? 'active' : ''}`} id="period-2">
                <div className="timeline-time">08:30 AM - 12:30 PM</div>
                <div className="timeline-title">Kerala State Academic Classes</div>
                <div className="timeline-desc">Core sciences, mathematics, social studies, and language arts sessions.</div>
              </div>
              <div className={`timeline-item ${activePeriod === 'period-3' ? 'active' : ''}`} id="period-3">
                <div className="timeline-time">12:30 PM - 01:30 PM</div>
                <div className="timeline-title">Lunch & Dhuhr Prayer Break</div>
                <div className="timeline-desc">Nutritious hot lunch followed by congregational prayers and rest.</div>
              </div>
              <div className={`timeline-item ${activePeriod === 'period-4' ? 'active' : ''}`} id="period-4">
                <div className="timeline-time">01:30 PM - 04:30 PM</div>
                <div className="timeline-title">Academic Secondary Session</div>
                <div className="timeline-desc">Practical labs, creative writing workshops, and state curriculum studies.</div>
              </div>
              <div className={`timeline-item ${activePeriod === 'period-5' ? 'active' : ''}`} id="period-5">
                <div className="timeline-time">04:30 PM - 05:30 PM</div>
                <div className="timeline-title">Asr Prayer, Tea & Sports</div>
                <div className="timeline-desc">Evening prayers, tea break, and martial arts/recreation activities.</div>
              </div>
              <div className={`timeline-item ${activePeriod === 'period-6' ? 'active' : ''}`} id="period-6">
                <div className="timeline-time">05:30 PM - 08:30 PM</div>
                <div className="timeline-title">Islamic Studies & Languages</div>
                <div className="timeline-desc">Fiqh, Hadith, Arabic/Urdu drills, followed by Maghrib & Isha prayers.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
