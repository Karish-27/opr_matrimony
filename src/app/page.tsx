"use client";

import { redirect } from 'next/navigation';
import RootRedirect from '@/components/RootRedirect';

const Home = () => {
    // Server-side redirect - this is the primary method
    // Always redirect root path to homepage for unauthenticated users
    // Middleware will handle authentication-based redirects
    redirect('/homepage');
};

// Fallback component in case server-side redirect doesn't work
export default function RootPage() {
    return (
        <>
            {/* Meta refresh as final fallback */}
            <head>
                <meta httpEquiv="refresh" content="0; url=/homepage" />
                <link rel="canonical" href="/homepage" />
            </head>
            <div>
                <RootRedirect />
                <div style={{ 
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'center', 
                    height: '100vh',
                    fontFamily: 'system-ui, -apple-system, sans-serif'
                }}>
                    <div style={{ textAlign: 'center' }}>
                        <div style={{ 
                            width: '40px', 
                            height: '40px', 
                            border: '4px solid #f3f3f3',
                            borderTop: '4px solid #ff9000',
                            borderRadius: '50%',
                            animation: 'spin 1s linear infinite',
                            margin: '0 auto 20px'
                        }} />
                        <p style={{ color: '#666', fontSize: '16px', marginBottom: '10px' }}>
                            Redirecting to homepage...
                        </p>
                        <p style={{ color: '#999', fontSize: '14px' }}>
                            If you are not redirected automatically, 
                            <a href="/homepage" style={{ color: '#ff9000', textDecoration: 'none' }}> click here</a>
                        </p>
                    </div>
                </div>
                <style jsx>{`
                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                `}</style>
            </div>
        </>
    );
}
