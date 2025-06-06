"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { withAuth } from '@/hooks/useAuth';

const ChangePassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    if (password.length < 8) {
      setError('Password must be at least 8 characters.');
      setLoading(false);
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      setLoading(false);
      return;
    }
    try {
      const res = await fetch('/api/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Failed to reset password.');
        setLoading(false);
        return;
      }
      setSuccess('Password reset successfully!');
    } catch (err) {
      setError('Something went wrong. Please try again.');
    }
    setLoading(false);
  };  return (
      <div style={{ minHeight: '100vh', background: '#f8f9fb', display: 'flex', flexDirection: 'column' }}>
      {/* Breadcrumb */}
      <div style={{ padding: '32px 0 0 120px', fontSize: 14, color: '#bdbdbd' }}>
        <span>Home</span>
        <span style={{ margin: '0 8px' }}>{'>'}</span>
        <span style={{ color: '#ff9900' }}>Change Password</span>
      </div>

      {/* Centered Card */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ background: '#fff', borderRadius: 16, boxShadow: '0 2px 8px rgba(0,0,0,0.04)', padding: '48px 32px', minWidth: 400, maxWidth: 420, textAlign: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
            <Image src="/icons/changepasswordicon.svg" alt="Change Password Icon" width={56} height={56} />
          </div>
          <h2 style={{ fontWeight: 700, fontSize: 20, marginBottom: 8 }}>Set new password</h2>
          <div style={{ color: '#888', fontSize: 15, marginBottom: 24 }}>
            Your new password must be different to<br />previously used passwords.
          </div>
          <form onSubmit={handleSubmit} style={{ textAlign: 'left' }}>
            <label style={{ fontWeight: 500, fontSize: 15 }}>Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              style={{ width: '100%', margin: '8px 0 0 0', padding: '10px', borderRadius: 6, border: '1px solid #ddd', fontSize: 15 }}
              required
              minLength={8}
            />
            <div style={{ color: '#bdbdbd', fontSize: 13, marginBottom: 16, marginTop: 4 }}>Must be at least 8 characters</div>
            <label style={{ fontWeight: 500, fontSize: 15 }}>Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              style={{ width: '100%', margin: '8px 0 0 0', padding: '10px', borderRadius: 6, border: '1px solid #ddd', fontSize: 15 }}
              required
              minLength={8}
            />
            {error && <div style={{ color: 'red', marginTop: 12, fontSize: 14 }}>{error}</div>}
            {success && <div style={{ color: 'green', marginTop: 12, fontSize: 14 }}>{success}</div>}
            <button
              type="submit"
              disabled={loading}
              style={{ width: '100%', background: '#ff9900', color: '#fff', border: 'none', borderRadius: 6, padding: '12px 0', fontWeight: 600, fontSize: 16, marginTop: 24, cursor: loading ? 'not-allowed' : 'pointer' }}
            >
              {loading ? 'Resetting...' : 'Reset password'}
            </button>
          </form>
        </div>
      </div>      {/* Footer */}
        </div>
  );
};

export default withAuth(ChangePassword);