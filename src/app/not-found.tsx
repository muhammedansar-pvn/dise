import React from 'react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div 
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: '#0B192C', // Deep navy
        color: '#FFFFFF',
        padding: '24px',
        textAlign: 'center',
      }}
    >
      <h1 
        style={{
          fontSize: '6rem',
          fontWeight: 800,
          color: '#F6C400', // Gold accent
          lineHeight: 1,
          marginBottom: '16px',
          fontFamily: 'var(--font-heading), sans-serif',
        }}
      >
        404
      </h1>
      <h2 
        style={{
          fontSize: '2rem',
          fontWeight: 700,
          marginBottom: '16px',
          fontFamily: 'var(--font-heading), sans-serif',
        }}
      >
        Page Not Found
      </h2>
      <p 
        style={{
          color: '#94A3B8',
          maxWidth: '500px',
          marginBottom: '32px',
          lineHeight: 1.6,
          fontSize: '1.05rem',
        }}
      >
        The page you are looking for does not exist or has been moved. Return to our homepage to explore Darul Irshad School of Excellence.
      </p>
      <Link 
        href="/" 
        style={{
          backgroundColor: '#F6C400',
          color: '#062F68',
          padding: '14px 28px',
          borderRadius: '8px',
          fontWeight: 600,
          fontSize: '1rem',
          boxShadow: '0 4px 14px rgba(246, 196, 0, 0.3)',
          textDecoration: 'none',
          display: 'inline-block',
          transition: 'all 0.3s ease',
        }}
      >
        Go Back Home
      </Link>
    </div>
  );
}
