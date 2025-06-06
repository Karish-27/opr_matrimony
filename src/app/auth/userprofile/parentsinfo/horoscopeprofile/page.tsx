"use client";

import React, { useEffect, useState } from 'react';
import { Upload, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTranslation } from 'react-i18next';
import '@/i18n';
import { withAuth } from '@/hooks/useAuth';

const HoroscopeRegistrationForm = () => {
  const router = useRouter();
  const { t, i18n } = useTranslation();
  const [currentStep, setCurrentStep] = useState(3);  const [form, setForm] = useState({
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
  });const [horoscopeImages, setHoroscopeImages] = useState<File[]>([]);
  const [existingImages, setExistingImages] = useState<string[]>([]);
  const [submittedData, setSubmittedData] = useState<any>(null); // State to hold submitted data
  useEffect(() => {
    // Fetch existing horoscope data if available
    fetchExistingHoroscopeData();
  }, []);
  // Fetch existing horoscope data
  const fetchExistingHoroscopeData = async () => {
    try {
      const res = await fetch('/api/profiledataapi/userprofile/parentsinfo/horoscopeprofile', {
        method: 'GET',
      });
      if (res.ok) {
        const data = await res.json();
        if (data.horoscopeDocuments && Array.isArray(data.horoscopeDocuments)) {
          setExistingImages(data.horoscopeDocuments);
        }
        // Populate form with existing data
        setForm(prev => ({
          ...prev,
          zodiacSign: data.zodiacSign || '',
          tamilYear: data.tamilYear || '',
          tamilMonth: data.tamilMonth || '',
          udayathiNatchat: data.udayathiNatchat || '',
          day: data.day || '',
          birthTime: data.birthTime || '',
          starFoot: data.starFoot || '',
          ascendant: data.ascendant || '',
          birthplace: data.birthplace || '',
          natalDirection: data.natalDirection || '',
        }));
      }
    } catch (error) {
      console.log('No existing horoscope data found');
    }
  };

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };  // Handle image file selection (limit to 2 images)
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      const imageFiles = newFiles.filter(file => file.type.startsWith('image/'));
      
      // Validate file sizes (max 5MB per image)
      const validFiles = imageFiles.filter(file => {
        if (file.size > 5 * 1024 * 1024) {
          toast.error(t('file_too_large', `File ${file.name} is too large. Maximum size is 5MB.`));
          return false;
        }
        return true;
      });

      // Validate file types more strictly
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
      const typeValidFiles = validFiles.filter(file => {
        if (!allowedTypes.includes(file.type)) {
          toast.error(t('invalid_file_type', `File ${file.name} is not a supported image format. Please use JPEG, PNG, or WebP.`));
          return false;
        }
        return true;
      });
      
      setHoroscopeImages((prev) => {
        const currentTotal = prev.length + existingImages.length;
        const availableSlots = 2 - currentTotal;
        
        if (availableSlots <= 0) {
          toast.warning(t('horoscope_max_images', 'You can upload maximum 2 horoscope chart images. Please remove an existing image first.'));
          return prev;
        }
        
        if (typeValidFiles.length > availableSlots) {
          toast.warning(t('horoscope_max_images', `You can only upload ${availableSlots} more image(s). Only the first ${availableSlots} images will be added.`));
          return [...prev, ...typeValidFiles.slice(0, availableSlots)];
        }
        
        if (typeValidFiles.length > 0) {
          toast.success(t('images_added', `${typeValidFiles.length} horoscope chart image(s) added successfully.`));
        }
        
        return [...prev, ...typeValidFiles];
      });
      
      // Clear the input value to allow re-selection of the same files
      e.target.value = '';
    }
  };

  // Remove an uploaded image from the list
  const handleRemoveImage = (index: number) => {
    setHoroscopeImages((prev) => prev.filter((_, i) => i !== index));
  };

  // Remove an existing image
  const handleRemoveExistingImage = (index: number) => {
    setExistingImages((prev) => prev.filter((_, i) => i !== index));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Log form data and files
    console.log('Form Data:', form);
    console.log('Selected Horoscope Images:', horoscopeImages);

    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      formData.append(key, value as string);
    });
    
    // Add existing images that weren't removed
    existingImages.forEach((imageUrl) => {
      formData.append('existingImages', imageUrl);
    });
    
    // Add new horoscope images
    horoscopeImages.forEach((file) => formData.append('horoscopeImages', file));

    try {
      const res = await fetch('/api/profiledataapi/userprofile/parentsinfo/horoscopeprofile', {
        method: 'POST',
        body: formData,
      });

      console.log(res, "res");
      

      if (res.ok) {
        const responseData = await res.json(); // Get the response data
        setSubmittedData(responseData); // Set the submitted data
        toast.success(t('horoscope_success', 'Horoscope profile created successfully!'));
        setTimeout(() => {
          router.push('/auth/login'); // Navigate to next step
        }, 1500);
      } else {
        const errorData = await res.json();
        // Show more details if the error is a foreign key violation
        if (errorData.error && errorData.error.includes('Foreign key constraint')) {
          toast.error(t('horoscope_userid_not_found', 'UserProfileId does not exist. Please complete the previous steps or contact support.'));
        } else {
          toast.error(errorData.error || t('horoscope_failed', 'Failed to create horoscope profile'));
        }
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
    <div className="flex flex-col items-center py-8 px-4">
      <ToastContainer position="top-right" autoClose={2000} />
      {/* Language Switcher */}
     
      {/* Logo */}
     <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            alt="Your Company"
            src="/images/loginlogo.png"
            className="mx-auto h-20 w-auto"
          />
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-[#F98B1D] text-900">
            {t("register_title")}
          </h2>
        </div>
      {/* Form Section */}
      <form className="w-full max-w-4xl bg-white p-8 rounded-lg shadow" onSubmit={handleSubmit} lang={i18n.language}>
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
        </div>        {/* Horoscope Images Preview Section */}
        {(horoscopeImages.length > 0 || existingImages.length > 0) && (
          <div className="mb-6">
            <h3 className="text-md font-medium mb-4 text-gray-700">{t('horoscope_images_preview', 'Horoscope Chart Images Preview')}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Existing Images */}
              {existingImages.map((imageUrl, idx) => (
                <div key={`existing-${idx}`} className="relative group">
                  <div className="relative overflow-hidden rounded-lg border-2 border-green-200 bg-green-50">
                    <img 
                      src={imageUrl} 
                      alt={`Horoscope Chart ${idx + 1}`}
                      className="w-full h-64 object-cover transition-transform group-hover:scale-105"
                      onError={(e) => {
                        e.currentTarget.src = '/images/placeholder-image.png';
                      }}
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-opacity"></div>
                  </div>
                  <button
                    type="button"
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1.5 hover:bg-red-600 transition-colors shadow-lg"
                    onClick={() => handleRemoveExistingImage(idx)}
                    title={t('remove_button', 'Remove')}
                  >
                    <X size={16} />
                  </button>
                  <div className="absolute bottom-2 left-2 bg-green-500 text-white px-2 py-1 rounded text-xs font-medium">
                    {t('existing_image', 'Saved')}
                  </div>
                  <p className="text-xs text-gray-600 mt-2 text-center font-medium">
                    {t('horoscope_chart', 'Horoscope Chart')} {idx + 1}
                  </p>
                </div>
              ))}
              
              {/* New Images */}
              {horoscopeImages.map((file, idx) => (
                <div key={`new-${file.name}-${file.size}`} className="relative group">
                  <div className="relative overflow-hidden rounded-lg border-2 border-orange-200 bg-orange-50">
                    <img 
                      src={URL.createObjectURL(file)} 
                      alt={`New Horoscope Chart ${idx + 1}`}
                      className="w-full h-64 object-cover transition-transform group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-opacity"></div>
                  </div>
                  <button
                    type="button"
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1.5 hover:bg-red-600 transition-colors shadow-lg"
                    onClick={() => handleRemoveImage(idx)}
                    title={t('remove_button', 'Remove')}
                  >
                    <X size={16} />
                  </button>
                  <div className="absolute bottom-2 left-2 bg-orange-500 text-white px-2 py-1 rounded text-xs font-medium">
                    {t('new_image', 'New')}
                  </div>
                  <p className="text-xs text-gray-600 mt-2 text-center font-medium">
                    {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}{/* Horoscope Images Upload Section */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium">{t('horoscope_images_label', 'Horoscope Chart Images')}</h2>
            <span className="text-sm text-gray-500">
              {t('upload_limit', `${horoscopeImages.length + existingImages.length}/2 images`)}
            </span>
          </div>
          <div className="grid grid-cols-1 gap-6">
            <div className={`border border-dashed rounded p-6 flex flex-col items-center justify-center transition-colors ${
              horoscopeImages.length + existingImages.length >= 2 
                ? 'border-gray-200 bg-gray-100' 
                : 'border-orange-300 bg-orange-50 hover:border-orange-400 hover:bg-orange-100'
            }`}>
              <div className="mb-2">
                <Upload size={24} className={horoscopeImages.length + existingImages.length >= 2 ? "text-gray-400" : "text-orange-500"} />
              </div>
              <p className="text-sm text-gray-600 mb-2 text-center">
                {horoscopeImages.length + existingImages.length >= 2 
                  ? t('upload_horoscope_limit_reached', 'Maximum 2 images uploaded. Remove an image to upload new one.')
                  : t('upload_horoscope_text', 'Upload your horoscope chart images (Max 2 images, 5MB each)')
                }
              </p>
              <input
                type="file"
                name="horoscopeImages"
                multiple
                accept="image/jpeg,image/jpg,image/png,image/webp"
                className={`text-sm ${horoscopeImages.length + existingImages.length >= 2 ? 'text-gray-400 cursor-not-allowed' : 'text-orange-600 hover:text-orange-700'}`}
                onChange={handleImageChange}
                disabled={horoscopeImages.length + existingImages.length >= 2}
              />
              {horoscopeImages.length + existingImages.length >= 2 && (
                <p className="text-xs text-orange-500 mt-2 text-center">
                  {t('max_images_reached', 'Maximum 2 images allowed. Remove an image to upload new one.')}
                </p>
              )}
              <p className="text-xs text-gray-500 mt-2 text-center">
                {t('supported_formats', 'Supported formats: JPEG, PNG, WebP (Max 5MB each)')}
              </p>
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

      {/* Show submitted data after successful submission */}
      {/* {submittedData && (
        <div className="mt-8 p-4 border border-green-400 rounded bg-green-50">
          <h2 className="text-lg font-semibold mb-2 text-green-700">{t('submitted_data', 'Submitted Data')}</h2>
          <pre className="text-sm text-gray-800 whitespace-pre-wrap">{JSON.stringify(submittedData, null, 2)}</pre>
        </div>
      )} */}
    </div>
  );
}

export default withAuth(HoroscopeRegistrationForm)