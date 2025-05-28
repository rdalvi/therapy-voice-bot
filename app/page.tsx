'use client';

import { useState } from 'react';

export default function Home() {
  const [phone, setPhone] = useState('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCall = async () => {
    if (!phone.trim().match(/^\+1\d{10}$/)) {
      setStatus('⚠️ Please enter a valid US number (e.g., +14155552671)');
      return;
    }

    setLoading(true);
    setStatus('Calling you now…');

    try {
      const res = await fetch('/api/vapi/make-call', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ customerNumber: phone.trim() }),
      });

      const data = await res.json();

      if (!res.ok || !data.ok) {
        console.error(data);
        setStatus('❌ Call failed. Check console for details.');
      } else {
        setStatus('📞 TherapyBot is calling you now!');
      }
    } catch (err) {
      console.error(err);
      setStatus('❌ Network error – try again.');
    }

    setLoading(false);
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-white p-6">
      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center">
        <h1 className="text-2xl font-bold mb-2">Therapy Voice AI Bot</h1>
        <p className="text-gray-600 mb-6">
          Enter your phone number and our AI therapist will call you.
        </p>

        <div className="flex flex-col items-center space-y-4">
          <input
            type="tel"
            placeholder="+1XXXXXXXXXX"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            disabled={loading}
            className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <button
            onClick={handleCall}
            disabled={loading}
            className={`w-full py-2 rounded-lg text-white font-semibold ${
              loading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-500 hover:bg-blue-600'
            }`}
          >
            {loading ? 'Calling...' : 'Call Me'}
          </button>

          {status && (
            <p
              className={`text-sm ${
                status.startsWith('📞')
                  ? 'text-green-600'
                  : status.startsWith('❌') || status.startsWith('⚠️')
                  ? 'text-red-600'
                  : 'text-gray-600'
              }`}
            >
              {status}
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
