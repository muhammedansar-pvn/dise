'use client';

import React, { useState } from 'react';

export default function Contact() {
  const [isSent, setIsSent] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && email.trim() && message.trim()) {
      setIsSent(true);
      console.log('Contact message submitted successfully.');
    }
  };

  return (
    <section id="contact" className="contact-section section-padding">
      <div className="container">
        <div className="section-header text-center animate-on-scroll slide-up">
          <h2>Contact Us</h2>
          <p>Get in touch with us for admissions, general inquiries, or campus visits.</p>
        </div>

        <div className="contact-grid">
          {/* Contact Details */}
          <div className="contact-info-panel animate-on-scroll slide-left">
            <h3>Institutional Office</h3>
            <p style={{ color: 'var(--color-text-muted)', marginBottom: '20px' }}>
              Feel free to call our office lines or visit our peaceful campus during visiting hours (Monday-Saturday: 9:00 AM - 5:00 PM).
            </p>

            {/* Address Card */}
            <div className="contact-detail-card">
              <div className="contact-card-icon">
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div className="contact-card-content">
                <h4>School Campus Address</h4>
                <p>Irshad Nagar, Chelembra,<br />Kuttippala, Kerala, India</p>
              </div>
            </div>

            {/* Phone Card */}
            <div className="contact-detail-card">
              <div className="contact-card-icon">
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div className="contact-card-content">
                <h4>Admissions Helpline</h4>
                <a href="tel:+919495574831">+91 94955 74831</a>
                <a href="tel:+916282538776">+91 62825 38776</a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="contact-form-wrapper animate-on-scroll slide-right delay-200">
            <h3>Send an Inquiry</h3>
            {!isSent ? (
              <form id="contact-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="contact-name" className="form-label">Full Name</label>
                  <input 
                    type="text" 
                    id="contact-name" 
                    className="form-control" 
                    placeholder="Enter your full name" 
                    required 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="contact-email" className="form-label">Email Address</label>
                  <input 
                    type="email" 
                    id="contact-email" 
                    className="form-control" 
                    placeholder="Enter your email" 
                    required 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="contact-message" className="form-label">Inquiry Details</label>
                  <textarea 
                    id="contact-message" 
                    className="form-control" 
                    placeholder="Tell us how we can help you..." 
                    required 
                    value={message} 
                    onChange={(e) => setMessage(e.target.value)} 
                  />
                </div>

                <div className="submit-btn-row">
                  <button type="submit" className="btn btn-primary">Send Message</button>
                </div>
              </form>
            ) : (
              <div className="text-center animate-on-scroll fade-in visible" style={{ padding: '20px 0' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ margin: '0 auto 16px auto' }}>
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
                <h4 style={{ marginBottom: '8px', color: 'var(--color-primary-dark)' }}>Message Sent!</h4>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem' }}>Thank you for contacting us. We will get back to you shortly.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
