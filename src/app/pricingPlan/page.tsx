"use client";

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import '@/i18n';

const PricingPlanPage = () => {
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();
    const { t, i18n } = useTranslation();
    const toggleDropdown = () => setIsOpen(!isOpen);
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Language Switcher */}
     
      {/* Header */}
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto w-full px-6 mt-4 text-sm text-gray-500">
        {t('home')} <span className="mx-2">{'>'}</span> <span>{t('search')}</span> <span className="mx-2">{'>'}</span> <span className="text-orange-500">{t('pricing_plan_breadcrumb', 'Pricing Plan')}</span>
      </div>
      {/* Pricing Plan Content */}
      <main className="flex-1 flex flex-col items-center justify-center py-12">
        <h2 className="text-2xl font-semibold mb-2 text-center">{t('choose_pricing_plan', 'Choose your Pricing Plan')}</h2>
        <p className="text-gray-500 mb-10 text-center">{t('pricing_plan_subtitle', 'Lorem ipsum dolor sit amet consectetur. Nunc at in accumsan')}</p>
        <div className="flex gap-10">
          {/* Free Plan */}
          <div className="bg-orange-500 text-white rounded shadow-lg w-72 p-8 flex flex-col items-center">
            <div className="font-semibold text-lg mb-2">{t('free_plan', 'Free Plan')}</div>
            <div className="text-3xl font-bold mb-4">₹0</div>
            <ul className="mb-6 space-y-2 text-sm w-full">
              <li className="flex items-center">
                <span className="mr-2">✔️</span> {t('no_renewal_charges', 'No Renewal Charges')}
              </li>
              <li className="flex items-center">
                <span className="mr-2">✔️</span> {t('free_plan_downloads', '5 Downloads can available')}
              </li>
              <li className="flex items-center">
                <span className="mr-2">✔️</span> {t('free_plan_lorem', 'Lorem ipsum dolor sit amet')}
              </li>
            </ul>
            <button className="bg-white text-orange-500 font-semibold px-8 py-2 rounded hover:bg-orange-100 transition-colors">{t('buy_button', 'Buy')}</button>
          </div>
          {/* Member Plan */}
          <div className="bg-white rounded shadow-lg w-72 p-8 flex flex-col items-center">
            <div className="font-semibold text-lg mb-2 text-gray-800">{t('member_plan', 'Member Plan')}</div>
            <div className="text-3xl font-bold mb-1 text-gray-800">₹1000<span className="text-base font-normal">/ {t('per_year', 'year')}</span></div>
            <ul className="mb-6 space-y-2 text-sm w-full text-gray-700">
              <li className="flex items-center">
                <span className="mr-2 text-orange-500">✔️</span> {t('member_plan_renewal', 'Renewal Charges – Rs.500 / year')}
              </li>
              <li className="flex items-center">
                <span className="mr-2 text-orange-500">✔️</span> {t('member_plan_downloads', '50 Downloads can available')}
              </li>
              <li className="flex items-center">
                <span className="mr-2 text-orange-500">✔️</span> {t('member_plan_lorem', 'Lorem ipsum dolor sit amet')}
              </li>
            </ul>
            <button className="bg-orange-500 text-white font-semibold px-8 py-2 rounded hover:bg-orange-600 transition-colors" onClick={() => router.push('/pricingPlan/payment')}>
              {t('buy_button', 'Buy')}
            </button>
          </div>
        </div>
      </main>
      {/* Footer */}
    </div>
  )
}

export default PricingPlanPage