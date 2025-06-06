"use client";
import React, { useState, useRef, useEffect } from 'react';
import { logout } from '@/utils/auth';

interface AvatarDropdownProps {
  userEmail: string;
  avatarSrc: string;
}

const AvatarDropdown: React.FC<AvatarDropdownProps> = ({ userEmail, avatarSrc }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div ref={dropdownRef} style={{ position: 'relative' }}>
      {/* Avatar Image - Clickable */}
      <img
        src={avatarSrc}
        alt="avatar"
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: 40,
          height: 40,
          borderRadius: '50%',
          cursor: 'pointer',
          border: isOpen ? '2px solid #ff7700' : '2px solid transparent',
          transition: 'border-color 0.2s ease',
        }}
      />

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          style={{
            position: 'absolute',
            top: '50px',
            right: 0,
            background: '#fff',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            minWidth: '200px',
            zIndex: 1000,
            border: '1px solid #e0e0e0',
          }}
        >
          {/* User Email */}
          <div
            style={{
              padding: '12px 16px',
              borderBottom: '1px solid #f0f0f0',
              fontSize: '14px',
              color: '#666',
              wordBreak: 'break-all',
            }}
          >
            <div style={{ fontWeight: '500', marginBottom: '4px' }}>Logged in as:</div>
            <div>{userEmail}</div>
          </div>

          {/* Logout Button */}
          <div
            onClick={handleLogout}
            style={{
              padding: '12px 16px',
              cursor: 'pointer',
              fontSize: '14px',
              color: '#dc3545',
              fontWeight: '500',
              transition: 'background-color 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#f8f9fa';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            <span>🚪</span>
            Logout
          </div>
        </div>
      )}
    </div>
  );
};

export default AvatarDropdown;
