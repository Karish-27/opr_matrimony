"use client";

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import '@/i18n';

const PricingPage = () => {
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();
    const { t, i18n } = useTranslation();
    
    const toggleDropdown = () => setIsOpen(!isOpen);
    
    const handlePlanSelection = (plan: string, amount: number) => {
        // For unauthenticated users, redirect to auth page with plan info
        router.push(`/auth?redirect=/pricingPlan/payment&plan=${plan}&amount=${amount}`);
    };
    
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Language Switcher */}
            {/* <div className="absolute top-4 right-4 z-10">
                <div className="relative">
                    <button
                        onClick={toggleDropdown}
                        className="flex items-center bg-white border border-gray-300 rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                    >
                        <span className="mr-2">🌐</span>
                        {i18n.language === 'ta' ? 'தமிழ்' : 'English'}
                        <svg className="ml-2 -mr-0.5 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </button>
                    {isOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg z-10">
                            <button
                                onClick={() => { i18n.changeLanguage('en'); setIsOpen(false); }}
                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                                🇺🇸 English
                            </button>
                            <button
                                onClick={() => { i18n.changeLanguage('ta'); setIsOpen(false); }}
                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                                🇮🇳 தமிழ்
                            </button>
                        </div>
                    )}
                </div>
            </div> */}

          

            {/* Breadcrumb */}
            <div className="max-w-7xl mx-auto w-full px-6 mt-4 text-sm text-gray-500">
                {t('home')} <span className="mx-2">{'>'}</span> <span className="text-orange-500">{t('pricing_plan_breadcrumb', 'Pricing Plans')}</span>
            </div>

            {/* Pricing Plan Content */}
            <main className="flex-1 flex flex-col items-center justify-center py-12">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold mb-4 text-gray-800">{t('pricing_plans_title', 'Find Your Perfect Match')}</h1>
                    <h2 className="text-2xl font-semibold mb-2 text-center">{t('choose_pricing_plan', 'Choose your Pricing Plan')}</h2>
                    <p className="text-gray-500 mb-6 text-center max-w-2xl mx-auto">
                        {t('pricing_plan_subtitle', 'Unlock more profiles to find your perfect match. Sign in to purchase credits and start connecting with potential matches.')}
                    </p>
                    <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 max-w-md mx-auto">
                        <p className="text-orange-800 text-sm">
                            <strong>{t('sign_in_required', 'Sign in required:')}</strong> {t('sign_in_message', 'Please sign in to purchase credits and access premium features.')}
                        </p>
                    </div>
                </div>

                <div className="flex gap-6 flex-wrap justify-center">
                    {/* Basic Plan */}
                    <div className="bg-white rounded shadow-lg w-72 p-8 flex flex-col items-center border border-gray-200 hover:shadow-xl transition-shadow">
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
                            onClick={() => handlePlanSelection('basic', 100)}
                        >
                            {t('get_started', 'Get Started')}
                        </button>
                    </div>

                    {/* Premium Plan */}
                    <div className="bg-orange-500 text-white rounded shadow-lg w-72 p-8 flex flex-col items-center relative hover:shadow-xl transition-shadow">
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
                            onClick={() => handlePlanSelection('premium', 250)}
                        >
                            {t('get_started', 'Get Started')}
                        </button>
                    </div>

                    {/* Gold Plan */}
                    <div className="bg-white rounded shadow-lg w-72 p-8 flex flex-col items-center border border-gray-200 hover:shadow-xl transition-shadow">
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
                            onClick={() => handlePlanSelection('gold', 500)}
                        >
                            {t('get_started', 'Get Started')}
                        </button>
                    </div>
                </div>

                {/* Additional Information */}
                <div className="mt-12 max-w-4xl mx-auto px-6">
                    <div className="bg-white rounded-lg shadow-sm p-8 border">
                        <h3 className="text-xl font-semibold mb-4 text-center text-gray-800">{t('why_choose_our_plans', 'Why Choose Our Plans?')}</h3>
                        <div className="grid md:grid-cols-3 gap-6 text-center">
                            <div>
                                <div className="text-orange-500 text-3xl mb-2">💎</div>
                                <h4 className="font-semibold mb-2">{t('verified_profiles', 'Verified Profiles')}</h4>
                                <p className="text-gray-600 text-sm">{t('verified_profiles_desc', 'All profiles are manually verified for authenticity')}</p>
                            </div>
                            <div>
                                <div className="text-orange-500 text-3xl mb-2">🔒</div>
                                <h4 className="font-semibold mb-2">{t('secure_platform', 'Secure Platform')}</h4>
                                <p className="text-gray-600 text-sm">{t('secure_platform_desc', 'Your privacy and data security is our top priority')}</p>
                            </div>
                            <div>
                                <div className="text-orange-500 text-3xl mb-2">📞</div>
                                <h4 className="font-semibold mb-2">{t('customer_support', 'Customer Support')}</h4>
                                <p className="text-gray-600 text-sm">{t('customer_support_desc', '24/7 dedicated support to help you find your match')}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer */}
           
        </div>
    );
};

export default PricingPage;
