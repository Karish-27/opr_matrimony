"use client";

import React from 'react';
import { useTranslation } from 'react-i18next';
import { usePathname } from 'next/navigation';

const Footer = () => {
  const { t } = useTranslation();
  const pathname = usePathname();
  
  if (pathname.startsWith("/admin")) return null;
  
  return (
    <footer className="w-full bg-orange-500 mt-10 py-3">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 text-white text-sm">
          <span>
            {t('footer_copyright', 'Copyright © Trichy Vayalur Road Reddy Trust All rights reserved. Theme Anews by themeuniver')}
          </span>
          <div className="flex space-x-4">
            <a href="#" aria-label="Twitter">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22.46 6c-.77.35-1.6.59-2.47.7a4.3 4.3 0 001.88-2.37 8.59 8.59 0 01-2.72 1.04A4.28 4.28 0 0016.11 4c-2.37 0-4.29 1.92-4.29 4.29 0 .34.04.67.11.99A12.13 12.13 0 013 5.1a4.28 4.28 0 001.33 5.72c-.7-.02-1.36-.21-1.94-.53v.05c0 2.01 1.43 3.69 3.32 4.07-.35.1-.72.16-1.1.16-.27 0-.53-.03-.78-.07.53 1.65 2.07 2.85 3.89 2.88A8.6 8.6 0 012 19.54a12.13 12.13 0 006.56 1.92c7.88 0 12.2-6.53 12.2-12.2 0-.19 0-.39-.01-.58A8.7 8.7 0 0024 4.59a8.48 8.48 0 01-2.54.7z" />
              </svg>
            </a>
            <a href="#" aria-label="Facebook">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.04c-5.5 0-9.96 4.46-9.96 9.96 0 4.41 3.6 8.07 8.24 8.93v-6.32h-2.48v-2.61h2.48v-2c0-2.44 1.46-3.78 3.7-3.78 1.07 0 2.19.19 2.19.19v2.41h-1.23c-1.21 0-1.59.75-1.59 1.52v1.66h2.7l-.43 2.61h-2.27v6.32c4.64-.86 8.24-4.52 8.24-8.93 0-5.5-4.46-9.96-9.96-9.96z" />
              </svg>
            </a>
            <a href="#" aria-label="Instagram">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M21.35 11.1c0-5.05-4.1-9.15-9.15-9.15S3.05 6.05 3.05 11.1c0 4.54 3.29 8.3 7.6 9.06v-6.41h-2.29v-2.65h2.29V9.41c0-2.27 1.36-3.53 3.44-3.53.99 0 2.03.18 2.03.18v2.23h-1.14c-1.12 0-1.47.7-1.47 1.42v1.7h2.5l-.4 2.65h-2.1v6.41c4.31-.76 7.6-4.52 7.6-9.06z" />
              </svg>
            </a>
          </div>
        </div>
      </footer>
  );
};

export default Footer