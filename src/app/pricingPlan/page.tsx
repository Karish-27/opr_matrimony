"use client";

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { withAuth } from '@/hooks/useAuth';
import '@/i18n';

const PricingPlanPage = () => {
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();
    const { t, i18n } = useTranslation();    const toggleDropdown = () => setIsOpen(!isOpen);
    
  return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Language Switcher */}
     
      {/* Header */}
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto w-full px-6 mt-4 text-sm text-gray-500">
        {t('home')} <span className="mx-2">{'>'}</span> <span>{t('search')}</span> <span className="mx-2">{'>'}</span> <span className="text-orange-500">{t('pricing_plan_breadcrumb', 'Pricing Plan')}</span>
      </div>
      {/* Pricing Plan Content */}
      <main className="flex-1 flex flex-col items-center justify-center py-12">        <h2 className="text-2xl font-semibold mb-2 text-center">{t('choose_pricing_plan', 'Choose your Pricing Plan')}</h2>
        <p className="text-gray-500 mb-10 text-center">{t('pricing_plan_subtitle', 'Unlock more profiles to find your perfect match')}</p>
        <div className="flex gap-6 flex-wrap justify-center">
          {/* Basic Plan */}
          <div className="bg-white rounded shadow-lg w-72 p-8 flex flex-col items-center border border-gray-200">
            <div className="font-semibold text-lg mb-2 text-gray-800">{t('basic_plan', 'Basic Plan')}</div>
            <div className="text-3xl font-bold mb-1 text-gray-800">₹100</div>
            <div className="text-sm text-orange-500 font-semibold mb-4">10 Credits</div>
            <ul className="mb-6 space-y-2 text-sm w-full text-gray-700">
              <li className="flex items-center">
                <span className="mr-2 text-orange-500">✔️</span> {t('basic_plan_profiles', 'View 10 complete profiles')}
              </li>
              <li className="flex items-center">
                <span className="mr-2 text-orange-500">✔️</span> {t('basic_plan_access', 'Full profile access with contact details')}
              </li>
              <li className="flex items-center">
                <span className="mr-2 text-orange-500">✔️</span> {t('basic_plan_support', '24/7 customer support')}
              </li>
            </ul>
            <button 
              className="bg-orange-500 text-white font-semibold px-8 py-2 rounded hover:bg-orange-600 transition-colors w-full"
              onClick={() => router.push('/pricingPlan/payment?plan=basic&amount=100')}
            >
              {t('buy_button', 'Buy Now')}
            </button>
          </div>

          {/* Premium Plan */}
          <div className="bg-orange-500 text-white rounded shadow-lg w-72 p-8 flex flex-col items-center relative">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-red-500 text-white text-xs px-3 py-1 rounded-full">
              {t('most_popular', 'MOST POPULAR')}
            </div>
            <div className="font-semibold text-lg mb-2">{t('premium_plan', 'Premium Plan')}</div>
            <div className="text-3xl font-bold mb-1">₹250</div>
            <div className="text-sm text-orange-100 font-semibold mb-4">25 Credits</div>
            <ul className="mb-6 space-y-2 text-sm w-full">
              <li className="flex items-center">
                <span className="mr-2">✔️</span> {t('premium_plan_profiles', 'View 25 complete profiles')}
              </li>
              <li className="flex items-center">
                <span className="mr-2">✔️</span> {t('premium_plan_access', 'Full profile access with contact details')}
              </li>
              <li className="flex items-center">
                <span className="mr-2">✔️</span> {t('premium_plan_priority', 'Priority customer support')}
              </li>
              <li className="flex items-center">
                <span className="mr-2">✔️</span> {t('premium_plan_bonus', 'Best value for money')}
              </li>
            </ul>
            <button 
              className="bg-white text-orange-500 font-semibold px-8 py-2 rounded hover:bg-orange-100 transition-colors w-full"
              onClick={() => router.push('/pricingPlan/payment?plan=premium&amount=250')}
            >
              {t('buy_button', 'Buy Now')}
            </button>
          </div>

          {/* Gold Plan */}
          <div className="bg-white rounded shadow-lg w-72 p-8 flex flex-col items-center border border-gray-200">
            <div className="font-semibold text-lg mb-2 text-gray-800">{t('gold_plan', 'Gold Plan')}</div>
            <div className="text-3xl font-bold mb-1 text-gray-800">₹500</div>
            <div className="text-sm text-orange-500 font-semibold mb-4">50 Credits</div>
            <ul className="mb-6 space-y-2 text-sm w-full text-gray-700">
              <li className="flex items-center">
                <span className="mr-2 text-orange-500">✔️</span> {t('gold_plan_profiles', 'View 50 complete profiles')}
              </li>
              <li className="flex items-center">
                <span className="mr-2 text-orange-500">✔️</span> {t('gold_plan_access', 'Full profile access with contact details')}
              </li>
              <li className="flex items-center">
                <span className="mr-2 text-orange-500">✔️</span> {t('gold_plan_priority', 'VIP customer support')}
              </li>
              <li className="flex items-center">
                <span className="mr-2 text-orange-500">✔️</span> {t('gold_plan_bonus', 'Maximum value package')}
              </li>
            </ul>
            <button 
              className="bg-orange-500 text-white font-semibold px-8 py-2 rounded hover:bg-orange-600 transition-colors w-full"
              onClick={() => router.push('/pricingPlan/payment?plan=gold&amount=500')}
            >
              {t('buy_button', 'Buy Now')}
            </button>
          </div>
        </div>      </main>      {/* Footer */}
    </div>
  )
}

export default withAuth(PricingPlanPage);