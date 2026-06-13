import React from 'react';

export default function Loading() {
  return (
    <div 
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: '#F8FAFC',
        gap: '16px',
      }}
    >
      <div 
        style={{
          width: '60px',
          height: '60px',
          border: '4px solid #F6C400',
          borderTopColor: '#0D4EA3',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
        }}
      ></div>
      <p 
        style={{
          fontFamily: 'var(--font-heading), sans-serif',
          fontWeight: 700,
          color: '#0D4EA3',
          letterSpacing: '1px',
        }}
      >
        LOADING DISE...
      </p>
      
      {/* Inline styles for keyframe spinning */}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
