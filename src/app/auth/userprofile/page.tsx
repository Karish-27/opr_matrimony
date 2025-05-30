"use client";

import React, { useEffect, useState } from 'react';
import { CalendarIcon, CameraIcon } from '@heroicons/react/24/solid';
import { ChevronDownIcon } from '@heroicons/react/16/solid';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { useTranslation } from "react-i18next";
import "@/i18n";

const Page = () => {
  const router = useRouter();
  const { t, i18n } = useTranslation();
  const [form, setForm] = useState({
    userId: '', // Set this from session/auth context if available
    firstName: '',
    lastName: '',
    type: '',
    dietType: '',
    dob: '',
    age: '',
    height: '',
    color: '',
    education: '',
    career: '',
    salary: '',
    familyProperty: '',
    expectation: '',
    phone: '',
    caste: '',
    marriageStatus: '',
    profilePhotos: [] as string[],
  });

   useEffect(() => {
    // Get userId from localStorage and set it in form state
    const userId = localStorage.getItem('userId');
    if (userId) {
      setForm((prev) => ({ ...prev, userId }));
    }
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files).slice(0, 4);
    setSelectedFiles(files);
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) return;
    setUploading(true);
    const formData = new FormData();
    selectedFiles.forEach((file) => formData.append('profilePhotos', file));
    try {
      const res = await fetch('/api/profiledataapi/userprofile/upload', {
        method: 'POST',
        body: formData,
      });
      if (!res.ok) {
        throw new Error('Upload failed');
      }
      const data = await res.json();
      setForm((prev) => ({ ...prev, profilePhotos: data.urls }));
    } catch (error) {
      toast.error(t('register_failed'));
    } finally {
      setUploading(false);
    }
  };
  

  const handleRadioChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedFiles.length > 0 && form.profilePhotos.length === 0) {
      await handleUpload();
    }
    const res = await fetch('/api/profiledataapi/userprofile', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      router.push('/auth/userprofile/parentsinfo');
    } else {
      toast.error(t('register_failed'));
    }
  };

  // Tamil font for input fields if Tamil is selected
  const tamilFont = i18n.language === "ta" ? { fontFamily: "Latha, Arial, sans-serif" } : {};

  // Language switcher UI
  // const LanguageSwitcher = () => (
  //   <div className="flex gap-2 mb-4">
  //     <button
  //       type="button"
  //       onClick={() => i18n.changeLanguage('en')}
  //       className={`px-2 py-1 rounded ${i18n.language === 'en' ? 'bg-orange-500 text-white' : 'bg-gray-200'}`}
  //     >
  //       English
  //     </button>
  //     <button
  //       type="button"
  //       onClick={() => i18n.changeLanguage('ta')}
  //       className={`px-2 py-1 rounded ${i18n.language === 'ta' ? 'bg-orange-500 text-white' : 'bg-gray-200'}`}
  //     >
  //       தமிழ்
  //     </button>
  //   </div>
  // );

  return (
    <div className="flex flex-col items-center py-8 px-4">
      {/* Logo and Title */}
      <div className="flex flex-col items-center mb-6">
        <div className="w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center mb-2">
          <span className="text-white text-2xl font-bold">M</span>
        </div>
        <h1 className="text-xl font-semibold text-gray-800">Matrimony</h1>
      </div>
      {/* <LanguageSwitcher /> */}
      <h2 className="text-lg font-medium text-gray-900 mb-6">{t('register_title')}</h2>
      {/* Form */}
      <form className="w-full max-w-4xl bg-white p-8 rounded-lg shadow" onSubmit={handleSubmit} lang={i18n.language}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* First Name */}
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
              {t('register_first_name_label')} <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              placeholder={t('register_first_name_placeholder')}
              value={form.firstName}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
              lang={i18n.language}
              style={tamilFont}
            />
          </div>
          {/* Last Name */}
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
              {t('register_last_name_label')} <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              placeholder={t('register_last_name_placeholder')}
              value={form.lastName}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
              lang={i18n.language}
              style={tamilFont}
            />
          </div>
          {/* Choose your type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('register_type_label', 'Choose your type')}
            </label>
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="type"
                  value="Groom"
                  checked={form.type === 'Groom'}
                  onChange={handleRadioChange}
                  className="mr-2"
                  required
                  lang={i18n.language}
                  style={tamilFont}
                />
                <span className="text-sm">{t('register_type_groom', 'Groom')}</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="type"
                  value="Bride"
                  checked={form.type === 'Bride'}
                  onChange={handleRadioChange}
                  className="mr-2"
                  required
                  lang={i18n.language}
                  style={tamilFont}
                />
                <span className="text-sm">{t('register_type_bride', 'Bride')}</span>
              </label>
            </div>
          </div>
          {/* Diet Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('register_diet_type_label', 'Diet Type')}
            </label>
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="dietType"
                  value="Vegetarian"
                  checked={form.dietType === 'Vegetarian'}
                  onChange={handleRadioChange}
                  className="mr-2"
                  required
                  lang={i18n.language}
                  style={tamilFont}
                />
                <span className="text-sm">{t('register_diet_veg', 'Vegetarian')}</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="dietType"
                  value="Non-Vegetarian"
                  checked={form.dietType === 'Non-Vegetarian'}
                  onChange={handleRadioChange}
                  className="mr-2"
                  required
                  lang={i18n.language}
                  style={tamilFont}
                />
                <span className="text-sm">{t('register_diet_nonveg', 'Non - Vegetarian')}</span>
              </label>
            </div>
          </div>
          {/* Date of Birth */}
          <div>
            <label htmlFor="dob" className="block text-sm font-medium text-gray-700 mb-1">
              {t('register_dob_label', 'Date of Birth')} <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="date"
                id="dob"
                name="dob"
                value={form.dob}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md pr-10"
                required
                lang={i18n.language}
                style={tamilFont}
              />
              <CalendarIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            </div>
          </div>
          {/* Age */}
          <div>
            <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">
              {t('register_age_label', 'Age')} <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="number"
                id="age"
                name="age"
                value={form.age}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                min={18}
                max={100}
                required
                lang={i18n.language}
                style={tamilFont}
              />
              <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            </div>
          </div>
          {/* Height */}
          <div>
            <label htmlFor="height" className="block text-sm font-medium text-gray-700 mb-1">
              {t('register_height_label', 'Height')} <span className="text-red-500">*</span>
            </label>
            <div className="flex">
              <input
                type="text"
                id="height"
                name="height"
                value={form.height}
                onChange={handleChange}
                placeholder={t('register_height_placeholder', 'Type')}
                className="w-full px-3 py-2 border border-gray-300 rounded-l-md"
                required
                lang={i18n.language}
                style={tamilFont}
              />
              <span className="px-3 py-2 bg-gray-100 border border-l-0 border-gray-300 rounded-r-md text-sm text-gray-500">
                CM
              </span>
            </div>
          </div>
          {/* Color */}
          <div>
            <label htmlFor="color" className="block text-sm font-medium text-gray-700 mb-1">
              {t('register_color_label', 'Color')} <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="color"
              name="color"
              value={form.color}
              onChange={handleChange}
              placeholder={t('register_color_placeholder', 'Type')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
              lang={i18n.language}
              style={tamilFont}
            />
          </div>
          {/* Educational Qualification */}
          <div>
            <label htmlFor="education" className="block text-sm font-medium text-gray-700 mb-1">
              {t('register_education_label', 'Educational Qualification')} <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="education"
              name="education"
              value={form.education}
              onChange={handleChange}
              placeholder={t('register_education_placeholder', 'Type')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
              lang={i18n.language}
              style={tamilFont}
            />
          </div>
          {/* Career Details */}
          <div>
            <label htmlFor="career" className="block text-sm font-medium text-gray-700 mb-1">
              {t('register_career_label', 'Career Details')} <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="career"
              name="career"
              value={form.career}
              onChange={handleChange}
              placeholder={t('register_career_placeholder', 'Type')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
              lang={i18n.language}
              style={tamilFont}
            />
          </div>
          {/* Salary / Monthly Earnings */}
          <div>
            <label htmlFor="salary" className="block text-sm font-medium text-gray-700 mb-1">
              {t('register_salary_label', 'Salary / Monthly Earnings')} <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="salary"
              name="salary"
              value={form.salary}
              onChange={handleChange}
              placeholder={t('register_salary_placeholder', 'Type')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
              lang={i18n.language}
              style={tamilFont}
            />
          </div>
          {/* Family Property Details */}
          <div>
            <label htmlFor="familyProperty" className="block text-sm font-medium text-gray-700 mb-1">
              {t('register_family_property_label', 'Family Property Details')} <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="familyProperty"
              name="familyProperty"
              value={form.familyProperty}
              onChange={handleChange}
              placeholder={t('register_family_property_placeholder', 'Type')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
              lang={i18n.language}
              style={tamilFont}
            />
          </div>
          {/* Expectation */}
          <div>
            <label htmlFor="expectation" className="block text-sm font-medium text-gray-700 mb-1">
              {t('register_expectation_label', 'Expectation')} <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="expectation"
              name="expectation"
              value={form.expectation}
              onChange={handleChange}
              placeholder={t('register_expectation_placeholder', 'Type')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
              lang={i18n.language}
              style={tamilFont}
            />
          </div>
          {/* Phone Number */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              {t('register_phone_label', 'Phone Number')} <span className="text-red-500">*</span>
            </label>
            <div className="flex">
              <span className="px-3 py-2 bg-gray-100 border border-r-0 border-gray-300 rounded-l-md text-sm text-gray-500">
                +91
              </span>
              <input
                type="text"
                id="phone"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-r-md"
                required
                lang={i18n.language}
                style={tamilFont}
              />
            </div>
          </div>
          {/* Caste */}
          <div>
            <label htmlFor="caste" className="block text-sm font-medium text-gray-700 mb-1">
              {t('register_caste_label', 'Caste')} <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="caste"
              name="caste"
              value={form.caste}
              onChange={handleChange}
              placeholder={t('register_caste_placeholder', 'Type')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
              lang={i18n.language}
              style={tamilFont}
            />
          </div>
          {/* Marriage Status */}
          <div>
            <label htmlFor="marriageStatus" className="block text-sm font-medium text-gray-700 mb-1">
              {t('register_marriage_status_label', 'Marriage Status')} <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select
                id="marriageStatus"
                name="marriageStatus"
                value={form.marriageStatus}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md appearance-none"
                required
                lang={i18n.language}
                style={tamilFont}
              >
                <option value="" disabled>{t('register_marriage_status_choose', 'Choose')}</option>
                <option value="Single">{t('register_marriage_status_single', 'Single')}</option>
                <option value="Divorced">{t('register_marriage_status_divorced', 'Divorced')}</option>
                <option value="Widowed">{t('register_marriage_status_widowed', 'Widowed')}</option>
              </select>
              <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>
        {/* Profile Photos */}
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            {t('register_profile_photo_label', 'Profile Photo')} <span className="text-red-500">*</span>
          </label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileChange}
            className="mb-2"
          />
          <button
            type="button"
            onClick={handleUpload}
            disabled={uploading || selectedFiles.length === 0}
            className="px-4 py-1 bg-orange-500 text-white rounded mb-2"
          >
            {uploading ? t('register_uploading', 'Uploading...') : t('register_upload_button', 'Upload Selected Photos')}
          </button>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {form.profilePhotos.map((url, idx) => (
              <img
                key={idx}
                src={url}
                alt={`Profile ${idx + 1}`}
                className="w-full h-32 object-cover rounded"
              />
            ))}
          </div>
        </div>
        {/* Next Button */}
        <div className="mt-8 flex justify-end">
          <button
            type="submit"
            className="px-6 py-2 bg-orange-500 text-white rounded-md"
          >
            {t('register_button', 'Next')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Page;