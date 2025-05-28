'use client';

import { useState } from 'react';

export default function Home() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('');

  const handleCall = () => {
    if (phoneNumber.trim()) {
      setMessage('Calling you now...');
      // Here you’ll later integrate Vapi API call
    } else {
      setMessage('Please enter a valid number.');
    }
  };

  return (
    <main style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Therapy Voice AI Bot</h1>
      <p>Enter your phone number to receive a call from our therapy bot.</p>
      
      <input
        type="tel"
        placeholder="Enter phone number"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        style={{
          padding: '0.5rem',
          fontSize: '1rem',
          marginRight: '1rem',
          width: '250px'
        }}
      />
      <button
        onClick={handleCall}
        style={{
          padding: '0.5rem 1rem',
          fontSize: '1rem',
          cursor: 'pointer'
        }}
      >
        Call Me
      </button>

      {message && <p style={{ marginTop: '1rem' }}>{message}</p>}
    </main>
  );
}
