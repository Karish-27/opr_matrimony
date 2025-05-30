"use client";

import React, { useEffect, useState } from 'react';
import { Upload, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTranslation } from 'react-i18next';
import '@/i18n';

const HoroscopeRegistrationForm = () => {
  const router = useRouter();
  const { t, i18n } = useTranslation();
  const [currentStep, setCurrentStep] = useState(3);
  const [form, setForm] = useState({
    userId: '', // You must set this from a prop, context, or previous step
    zodiacSign: '',
    tamilYear: '',
    tamilMonth: '',
    udayathiNatchat: '',
    day: '',
    birthTime: '',
    starFoot: '',
    ascendant: '',
    birthplace: '',
    natalDirection: '',
  });
  const [documents, setDocuments] = useState<File[]>([]);

   useEffect(() => {
       // Get userId from localStorage and set it in form state
       const userId = localStorage.getItem('userId');
       if (userId) {
         setForm((prev) => ({ ...prev, userId }));
       }
     }, []);

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      // Avoid duplicates by name and size
      setDocuments((prev) => {
        const allFiles = [...prev, ...newFiles];
        const uniqueFiles = Array.from(
          new Map(allFiles.map(file => [file.name + file.size, file])).values()
        );
        return uniqueFiles;
      });
    }
  };

  // Remove a file from the list
  const handleRemoveFile = (index: number) => {
    setDocuments((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

     if (!form.userId) {
    toast.error(t('horoscope_userid_required', 'UserProfileId is required.'));
    return;
  }

    // Log form data and files
    console.log('Form Data:', form);
    console.log('Selected Documents:', documents);

    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => formData.append(key, value));
    documents.forEach((file) => formData.append('horoscopeDocuments', file));

    try {
      const res = await fetch('/api/profiledataapi/userprofile/parentsinfo/horoscopeprofile', {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        toast.success(t('horoscope_success', 'Horoscope profile created successfully!'));
        setTimeout(() => {
          router.push('/profilelists');
        }, 1500);
      } else {
        const errorData = await res.json();
        toast.error(errorData.error || t('horoscope_failed', 'Failed to create horoscope profile'));
      }
    } catch (err) {
      console.error('Submission error:', err);
      toast.error(t('horoscope_error', 'An error occurred while submitting the form'));
    }
  };
  const handleNext = () => {
    router.push('/profilelists'); // Navigate to next step
  }; // Horoscope step is active in the image

  const handleBack = () => {
    router.push('/auth/userprofile/parentsinfo'); // Navigate to userprofile age page
  };

  // Language switcher
  const handleLanguageChange = (lang: string) => {
    i18n.changeLanguage(lang);
  };
  
  return (
    <div className="max-w-3xl mx-auto p-6">
      <ToastContainer position="top-right" autoClose={2000} />
      {/* Language Switcher */}
     
      {/* Logo */}
      <div className="flex justify-center mb-6">
        <div className="bg-orange-500 rounded-full p-3">
          <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 2V4M12 20V22M2 12H4M20 12H22M17.7 6.3L16.3 7.7M7.7 16.3L6.3 17.7M6.3 6.3L7.7 7.7M16.3 16.3L17.7 17.7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>

      {/* Form Title */}
      <h1 className="text-center text-2xl font-semibold mb-8">{t('register_title')}</h1>

      {/* Form Section */}
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="mb-8">
          <h2 className="text-lg font-medium mb-6">{t('horoscope_info', 'Horoscope Information')}</h2>
          <div className="grid grid-cols-2 gap-6">
            {/* Zodiac Sign */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                {t('zodiac_sign_label', 'Zodiac Sign')} *
              </label>
              <select
                name="zodiacSign"
                value={form.zodiacSign}
                onChange={handleInputChange}
                className="appearance-none w-full px-3 py-2 border border-gray-300 rounded text-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                required
              >
                <option value="">{t('choose_option', 'Choose')}</option>
                <option value="Aries">{t('zodiac_aries', 'Aries')}</option>
                <option value="Taurus">{t('zodiac_taurus', 'Taurus')}</option>
                <option value="Gemini">{t('zodiac_gemini', 'Gemini')}</option>
                <option value="Cancer">{t('zodiac_cancer', 'Cancer')}</option>
                <option value="Leo">{t('zodiac_leo', 'Leo')}</option>
                <option value="Virgo">{t('zodiac_virgo', 'Virgo')}</option>
                <option value="Libra">{t('zodiac_libra', 'Libra')}</option>
                <option value="Scorpio">{t('zodiac_scorpio', 'Scorpio')}</option>
                <option value="Sagittarius">{t('zodiac_sagittarius', 'Sagittarius')}</option>
                <option value="Capricorn">{t('zodiac_capricorn', 'Capricorn')}</option>
                <option value="Aquarius">{t('zodiac_aquarius', 'Aquarius')}</option>
                <option value="Pisces">{t('zodiac_pisces', 'Pisces')}</option>
              </select>
            </div>
            {/* Tamil Year */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                {t('tamil_year_label', 'Tamil Year')} *
              </label>
              <input
                type="text"
                name="tamilYear"
                value={form.tamilYear}
                onChange={handleInputChange}
                placeholder={t('tamil_year_placeholder', 'Type')}
                className="w-full px-3 py-2 border border-gray-300 rounded text-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                required
              />
            </div>
            {/* Tamil Month */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                {t('tamil_month_label', 'Tamil Month')} *
              </label>
              <input
                type="text"
                name="tamilMonth"
                value={form.tamilMonth}
                onChange={handleInputChange}
                placeholder={t('tamil_month_placeholder', 'Type')}
                className="w-full px-3 py-2 border border-gray-300 rounded text-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                required
              />
            </div>
            {/* Udayathi Natchat */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                {t('udayathi_natchat_label', 'Udayathi Natchat')} *
              </label>
              <input
                type="text"
                name="udayathiNatchat"
                value={form.udayathiNatchat}
                onChange={handleInputChange}
                placeholder={t('udayathi_natchat_placeholder', 'Type')}
                className="w-full px-3 py-2 border border-gray-300 rounded text-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                required
              />
            </div>
            {/* Day */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                {t('day_label', 'Day')} *
              </label>
              <input
                type="text"
                name="day"
                value={form.day}
                onChange={handleInputChange}
                placeholder={t('day_placeholder', 'Type')}
                className="w-full px-3 py-2 border border-gray-300 rounded text-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                required
              />
            </div>
            {/* Birth Time */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                {t('birth_time_label', 'Birth Time')} *
              </label>
              <input
                type="text"
                name="birthTime"
                value={form.birthTime}
                onChange={handleInputChange}
                placeholder={t('birth_time_placeholder', '00:00:00')}
                className="w-full px-3 py-2 border border-gray-300 rounded text-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                required
              />
            </div>
            {/* Star / Foot */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                {t('star_foot_label', 'Star / Foot')} *
              </label>
              <input
                type="text"
                name="starFoot"
                value={form.starFoot}
                onChange={handleInputChange}
                placeholder={t('star_foot_placeholder', 'Type')}
                className="w-full px-3 py-2 border border-gray-300 rounded text-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                required
              />
            </div>
            {/* Ascendant (Lagnani) */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                {t('ascendant_label', 'Ascendant (Lagnani)')} *
              </label>
              <input
                type="text"
                name="ascendant"
                value={form.ascendant}
                onChange={handleInputChange}
                placeholder={t('ascendant_placeholder', 'Type')}
                className="w-full px-3 py-2 border border-gray-300 rounded text-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                required
              />
            </div>
            {/* Birthplace */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                {t('birthplace_label', 'Birthplace')} *
              </label>
              <input
                type="text"
                name="birthplace"
                value={form.birthplace}
                onChange={handleInputChange}
                placeholder={t('birthplace_placeholder', 'Type')}
                className="w-full px-3 py-2 border border-gray-300 rounded text-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                required
              />
            </div>
            {/* Presence of natal direction */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                {t('natal_direction_label', 'Presence of natal Direction')} *
              </label>
              <input
                type="text"
                name="natalDirection"
                value={form.natalDirection}
                onChange={handleInputChange}
                placeholder={t('natal_direction_placeholder', 'Type')}
                className="w-full px-3 py-2 border border-gray-300 rounded text-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                required
              />
            </div>
          </div>
        </div>

        {/* Horoscope Document Section */}
        {documents.length > 0 && (
          <div className="mb-4 flex flex-row flex-wrap gap-4">
            {documents.map((file, idx) => (
              <div
                key={file.name + file.size}
                className="flex items-center bg-gray-100 rounded px-3 py-2"
              >
                <span className="mr-2 text-sm text-gray-700 truncate max-w-[120px]">{file.name}</span>
                <button
                  type="button"
                  className="ml-2 text-gray-400 hover:text-red-500"
                  onClick={() => handleRemoveFile(idx)}
                  title={t('remove_button', 'Remove')}
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Horoscope Document Section */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium">{t('horoscope_document_label', 'Horoscope Document')}</h2>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div className="border border-dashed border-gray-300 rounded p-6 flex flex-col items-center justify-center bg-gray-50">
              <div className="mb-2">
                <Upload size={24} className="text-gray-400" />
              </div>
              <input
                type="file"
                name="horoscopeDocuments"
                multiple
                accept="image/*,application/pdf"
                className="text-gray-400 text-sm"
                onChange={handleFileChange}
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            className="px-6 py-2 border border-orange-500 text-orange-500 rounded hover:bg-orange-50"
            onClick={handleBack}
          >
            {t('back_button', 'Back')}
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
          >
            {t('create_button', 'Create')}
          </button>
        </div>
      </form>
    </div>
  );
}

export default HoroscopeRegistrationForm