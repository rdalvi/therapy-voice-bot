'use client';

import { useState } from 'react';

export default function Home() {
  const [phone, setPhone] = useState('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCall = async () => {
    const trimmed = phone.trim();
    if (!trimmed || !trimmed.match(/^\+1\d{10}$/)) {
      setStatus('⚠️ Please enter a valid US number (e.g., +14155552671)');
      return;
    }

    setLoading(true);
    setStatus('Calling you now…');

    try {
      const res = await fetch('/api/vapi/make-call', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ customerNumber: trimmed }),
      });

      const data = await res.json();

      if (!res.ok || !data.ok) {
        console.error('Call failed', data);
        setStatus('❌ Call failed. Check console for details.');
      } else {
        setStatus('📞 TherapyBot is calling you. Please pick up!');
      }
    } catch (err) {
      console.error(err);
      setStatus('❌ Network error – please try again.');
    }

    setLoading(false);
  };

  return (
    <main style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Therapy Voice AI Bot</h1>
      <p>Enter your phone number and the AI therapist will call you.</p>

      <input
        type="tel"
        placeholder="+1XXXXXXXXXX"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        disabled={loading}
        style={{
          padding: '0.5rem',
          fontSize: '1rem',
          marginRight: '1rem',
          width: '250px',
        }}
      />

      <button
        onClick={handleCall}
        disabled={loading}
        style={{
          padding: '0.5rem 1rem',
          fontSize: '1rem',
          cursor: 'pointer',
        }}
      >
        {loading ? 'Calling…' : 'Call Me'}
      </button>

      {status && (
        <p style={{ marginTop: '1rem', fontWeight: 500 }}>{status}</p>
      )}
    </main>
  );
}
