import Link from 'next/link';
import React from 'react';
import { usePathname } from 'next/navigation';

const Sidebar = () => {
    const pathname = usePathname();

    return (
    <aside
        style={{
            width: 220,
            background: '#ff9000',
            color: '#fff',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            paddingTop: 0,
        }}
    >
        <div
            style={{
                width: '100%',
                padding: 24,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <div
                style={{
                   
                    borderRadius: 6,
                    width: 120,
                    height: 48,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 600,
                    fontSize: 20,
                    marginBottom: 16,
                    overflow: 'hidden',
                    padding: 0,
                }}
            >
                <img
                    src="/images/logo.png"
                    alt="Logo"
                    style={{ maxHeight: 60, maxWidth: 120, objectFit: 'contain' }}
                />
            </div>
        </div>        <nav style={{ width: '100%' }}>
            <Link
                href="/admin/Dashboard"
                style={{
                    padding: '14px 32px',
                    fontWeight: 500,
                    borderRadius: 6,
                    margin: '0 12px 8px 12px',
                    cursor: 'pointer',
                    display: 'block',
                    textDecoration: 'none',
                    color: 'inherit',
                    backgroundColor: pathname === '/admin/Dashboard' ? '#ff7700' : 'transparent',
                }}
            >
                Dashboard
            </Link>
            <Link
                href="/admin/ManageUser"
                style={{
                    padding: '14px 32px',
                    fontWeight: 500,
                    borderRadius: 6,
                    margin: '0 12px 8px 12px',
                    cursor: 'pointer',
                    display: 'block',
                    textDecoration: 'none',
                    color: 'inherit',
                    backgroundColor: pathname === '/admin/ManageUser' ? '#ff7700' : 'transparent',
                }}
            >
                Manage Users
            </Link>            <Link
             href="/admin/MemberLists"
                style={{
                    padding: '14px 32px',
                    fontWeight: 500,
                    borderRadius: 6,
                    margin: '0 12px 8px 12px',
                    cursor: 'pointer',
                    display: 'block',
                    textDecoration: 'none',
                    color: 'inherit',
                    backgroundColor: pathname === '/admin/MemberLists' ? '#ff7700' : 'transparent',
                }}
            >
                Members List
            </Link>
            <Link
                href="/admin/PaidUsers"
                style={{
                    padding: '14px 32px',
                    fontWeight: 500,
                    borderRadius: 6,
                    margin: '0 12px 8px 12px',
                    cursor: 'pointer',
                    display: 'block',
                    textDecoration: 'none',
                    color: 'inherit',
                    backgroundColor: pathname === '/admin/PaidUsers' ? '#ff7700' : 'transparent',
                }}
            >
                Paid Users
            </Link>
        </nav>    </aside>
);
};

export default Sidebar;
