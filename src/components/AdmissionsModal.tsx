'use client';

import React, { useState, useEffect } from 'react';

interface AdmissionsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AdmissionsModal({ isOpen, onClose }: AdmissionsModalProps) {
  const [studentName, setStudentName] = useState('');
  const [applyingClass, setApplyingClass] = useState('');
  const [guardianName, setGuardianName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [previousSchool, setPreviousSchool] = useState('');
  const [additionalNotes, setAdditionalNotes] = useState('');

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Lock background scroll when modal is active
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/admissions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          studentName,
          applyingClass,
          guardianName,
          contactPhone,
          previousSchool,
          additionalNotes,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Something went wrong. Please try again.');
      }

      setIsSubmitted(true);
      console.log('Admission inquiry submitted successfully:', result.data);

      // Clear fields
      setStudentName('');
      setApplyingClass('');
      setGuardianName('');
      setContactPhone('');
      setPreviousSchool('');
      setAdditionalNotes('');
    } catch (err: any) {
      setError(err.message || 'Failed to submit application. Please check your network.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    onClose();
    // Reset submission screen after transition completes
    setTimeout(() => {
      setIsSubmitted(false);
      setError(null);
    }, 300);
  };

  return (
    <div 
      className={`modal-overlay ${isOpen ? 'active' : ''}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      <div className="modal-container">
        <div className="modal-header">
          <h3>Admission Inquiry Form</h3>
          <button className="modal-close" onClick={handleClose} aria-label="Close modal">×</button>
        </div>
        <div className="modal-body">
          
          {!isSubmitted ? (
            <div id="modal-form-fields">
              <p>Please provide the basic candidate details below. Our admissions coordinator will review and contact you within 2 working days.</p>
              
              {error && (
                <div className="error-message" style={{
                  padding: '12px',
                  backgroundColor: '#FEE2E2',
                  border: '1px solid #FCA5A5',
                  color: '#991B1B',
                  borderRadius: '8px',
                  marginBottom: '16px',
                  fontSize: '0.9rem'
                }}>
                  {error}
                </div>
              )}

              <form id="admission-form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="student-name" className="form-label">Student's Full Name</label>
                    <input 
                      type="text" 
                      id="student-name" 
                      className="form-control" 
                      placeholder="Enter student's name" 
                      required 
                      value={studentName}
                      onChange={(e) => setStudentName(e.target.value)}
                      disabled={isLoading}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="admission-class" className="form-label">Applying Class</label>
                    <select 
                      id="admission-class" 
                      className="form-control" 
                      required 
                      value={applyingClass}
                      onChange={(e) => setApplyingClass(e.target.value)}
                      disabled={isLoading}
                    >
                      <option value="" disabled>Select Class</option>
                      <option value="7">7th Class</option>
                      <option value="8">8th Class</option>
                    </select>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="guardian-name" className="form-label">Parent / Guardian Name</label>
                    <input 
                      type="text" 
                      id="guardian-name" 
                      className="form-control" 
                      placeholder="Enter guardian name" 
                      required 
                      value={guardianName}
                      onChange={(e) => setGuardianName(e.target.value)}
                      disabled={isLoading}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="contact-phone" className="form-label">Contact Phone Number</label>
                    <input 
                      type="tel" 
                      id="contact-phone" 
                      className="form-control" 
                      placeholder="Enter phone number" 
                      required 
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                      disabled={isLoading}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="previous-school" className="form-label">Previous School & Curriculum</label>
                  <input 
                    type="text" 
                    id="previous-school" 
                    className="form-control" 
                    placeholder="E.g., Chelembra Secondary School, Kerala State" 
                    required 
                    value={previousSchool}
                    onChange={(e) => setPreviousSchool(e.target.value)}
                    disabled={isLoading}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="additional-notes" className="form-label">Additional Questions / Information</label>
                  <textarea 
                    id="additional-notes" 
                    className="form-control" 
                    placeholder="Mention any academic/spiritual milestones, languages spoken, etc."
                    value={additionalNotes}
                    onChange={(e) => setAdditionalNotes(e.target.value)}
                    disabled={isLoading}
                  ></textarea>
                </div>

                <div className="submit-btn-row">
                  <button type="submit" className="btn btn-primary" disabled={isLoading}>
                    {isLoading ? 'Submitting...' : 'Submit Application'}
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div id="modal-thank-you" className="thank-you-screen" style={{ display: 'block' }}>
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" style={{ display: 'inline-block' }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h4>Application Received!</h4>
              <p>Thank you for choosing DISE. Your admission request has been logged successfully. An officer from Kuttippala Office will contact you shortly.</p>
              <button className="btn btn-outline-blue" onClick={handleClose}>Close Window</button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
