"use client";
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import '../../../i18n';

const MyProfileDetailsPage = () => {
     const router = useRouter();
     const { t } = useTranslation();
     const [isOpen, setIsOpen] = useState(false);
    
     const toggleDropdown = () => setIsOpen(!isOpen);
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
     
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto w-full px-6 mt-4 text-sm text-gray-500">
        {t('home')} <span className="mx-2">{'>'}</span> <span>{t('search')}</span> <span className="mx-2">{'>'}</span> <span className="text-orange-500">{t('profile_details')}</span>
      </div>

      {/* Profile Details Card */}
      <div className="max-w-7xl mx-auto w-full mt-6">
        <div className="bg-orange-500 rounded-t-lg px-6 py-3 flex items-center justify-between">
          <span className="text-white font-medium">{t('profile_details')}</span>
          <button className="bg-white text-orange-500 font-semibold px-6 py-2 rounded hover:bg-orange-100 transition-colors">{t('edit_button', 'Edit')}</button>
        </div>
        <div className="bg-white rounded-b-lg shadow-lg p-8">
          {/* Top Section */}
          <div className="flex gap-8">
            {/* Left Info */}
            <div className="flex-1">
              <div className="font-semibold text-lg">V. Megha Akash</div>
              <div className="text-xs text-gray-500 mb-2">{t('reg_no_label')} : VKR2333</div>
              <div className="grid grid-cols-3 gap-x-6 gap-y-2 text-sm mb-4">
                <div>
                  <div className="text-gray-500">{t('email_label')}</div>
                  <div>meghaakash@gmail.com</div>
                </div>
                <div>
                  <div className="text-gray-500">{t('phone_label')}</div>
                  <div>+91 8734584849</div>
                </div>
                <div>
                  <div className="text-gray-500">{t('dob_label')}</div>
                  <div>12 Feb 1994</div>
                </div>
                <div>
                  <div className="text-gray-500">{t('age_label')}</div>
                  <div>28 Years</div>
                </div>
                <div>
                  <div className="text-gray-500">{t('star_label')}</div>
                  <div>Hastham</div>
                </div>
                <div>
                  <div className="text-gray-500">{t('marriage_status_label')}</div>
                  <div>Unmarried</div>
                </div>
                <div>
                  <div className="text-gray-500">{t('height_label')}</div>
                  <div>5.6 Inch</div>
                </div>
                <div>
                  <div className="text-gray-500">{t('color_label')}</div>
                  <div>White</div>
                </div>
                <div>
                  <div className="text-gray-500">{t('caste_label')}</div>
                  <div>MBC</div>
                </div>
                <div>
                  <div className="text-gray-500">{t('qualification_label')}</div>
                  <div>B.Sc, M.Sc</div>
                </div>
                <div>
                  <div className="text-gray-500">{t('family_property_label')}</div>
                  <div>Own House, Land</div>
                </div>
                <div>
                  <div className="text-gray-500">{t('type_of_food_label')}</div>
                  <div>Vegetarian</div>
                </div>
                <div>
                  <div className="text-gray-500">{t('career_label')}</div>
                  <div>Software Engineer HCL Technologies Limited</div>
                </div>
                <div>
                  <div className="text-gray-500">{t('salary_label')}</div>
                  <div>40,000+ / per month</div>
                </div>
                <div>
                  <div className="text-gray-500">{t('expectation_label')}</div>
                  <div>Vegetarian</div>
                </div>
              </div>
            </div>
            {/* Right Image & Gallery */}
            <div className="flex flex-col items-center">
              <img src="/images/profilepicture.png" alt="V. Megha Akash" className="w-40 h-48 object-cover rounded mb-3" />
              <div className="flex gap-2">
                <img src="/images/profilepicture.png" alt="" className="w-16 h-16 object-cover rounded" />
                <img src="/images/profilepicture.png" alt="" className="w-16 h-16 object-cover rounded" />
                <img src="/images/profilepicture.png" alt="" className="w-16 h-16 object-cover rounded" />
              </div>
            </div>
          </div>
          {/* Family Information */}
          <div className="mt-8">
            <div className="font-semibold text-base mb-2">{t('family_info_label')}</div>
            <div className="grid grid-cols-6 gap-x-6 gap-y-2 text-sm">
              <div>
                <div className="text-gray-500">{t('father_name_label')}</div>
                <div>B.Venkataraman</div>
              </div>
              <div>
                <div className="text-gray-500">{t('mother_name_label')}</div>
                <div>Vasantha Gokilam</div>
              </div>
              <div>
                <div className="text-gray-500">{t('father_native_label')}</div>
                <div>Coimbatore</div>
              </div>
              <div>
                <div className="text-gray-500">{t('mother_native_label')}</div>
                <div>Coimbatore</div>
              </div>
              <div>
                <div className="text-gray-500">{t('father_profession_label')}</div>
                <div>B.Venkataraman</div>
              </div>
              <div>
                <div className="text-gray-500">{t('mother_profession_label')}</div>
                <div>Vasantha Gokilam</div>
              </div>
              <div>
                <div className="text-gray-500">{t('register_phone_label')}</div>
                <div>+91 8734584849</div>
              </div>
              <div className="col-span-2">
                <div className="text-gray-500">{t('register_address_label')}</div>
                <div>3/663-A, 10 Mahalakshmi Avenue, West Arsaur, Arsaur, Coimbatore</div>
              </div>
              <div>
                <div className="text-gray-500">{t('brothers_label')}</div>
                <div>2</div>
              </div>
              <div>
                <div className="text-gray-500">{t('elder_brothers_label')}</div>
                <div>1</div>
              </div>
              <div>
                <div className="text-gray-500">{t('younger_brothers_label')}</div>
                <div>1</div>
              </div>
              <div>
                <div className="text-gray-500">{t('married_brothers_label')}</div>
                <div>1</div>
              </div>
              <div>
                <div className="text-gray-500">{t('sisters_label')}</div>
                <div>1</div>
              </div>
              <div>
                <div className="text-gray-500">{t('elder_sisters_label')}</div>
                <div>0</div>
              </div>
              <div>
                <div className="text-gray-500">{t('younger_sisters_label')}</div>
                <div>1</div>
              </div>
              <div>
                <div className="text-gray-500">{t('married_sisters_label')}</div>
                <div>0</div>
              </div>
            </div>
          </div>
          {/* Horoscope Information */}
          <div className="mt-8">
            <div className="font-semibold text-base mb-2">{t('horoscope_info')}</div>
            <div className="grid grid-cols-6 gap-x-6 gap-y-2 text-sm">
              <div>
                <div className="text-gray-500">{t('zodiac_sign_label')}</div>
                <div>Scorpio</div>
              </div>
              <div>
                <div className="text-gray-500">{t('tamil_year_label')}</div>
                <div>Srimukha</div>
              </div>
              <div>
                <div className="text-gray-500">{t('tamil_month_label')}</div>
                <div>Aadi</div>
              </div>
              <div>
                <div className="text-gray-500">{t('udayathi_natchat_label')}</div>
                <div>Lorem ipsum dolor</div>
              </div>
              <div>
                <div className="text-gray-500">{t('day_label')}</div>
                <div>Wednesday</div>
              </div>
              <div>
                <div className="text-gray-500">{t('birth_time_label')}</div>
                <div>02:27 PM</div>
              </div>
              <div>
                <div className="text-gray-500">{t('star_foot_label')}</div>
                <div>Kettai</div>
              </div>
              <div>
                <div className="text-gray-500">{t('ascendant_label')}</div>
                <div>Scorpio</div>
              </div>
              <div>
                <div className="text-gray-500">{t('birthplace_label')}</div>
                <div>Coimbatore</div>
              </div>
              <div className="col-span-2">
                <div className="text-gray-500">{t('natal_direction_label')}</div>
                <div>Wednesday, Day: 01 Month : 06 Year : 08</div>
              </div>
            </div>
          </div>
          {/* Horoscope Chart */}
          <div className="mt-8">
            <div className="font-semibold text-base mb-2">{t('horoscope_chart_label')}</div>
            <div className="border rounded">
              <table className="w-full text-center text-sm">
                <tbody>
                  <tr>
                    <td className="border px-4 py-2 min-w-[80px]">சனி</td>
                    <td className="border px-4 py-2 min-w-[80px]">-</td>
                    <td className="border px-4 py-2 min-w-[80px]">கேது</td>
                    <td className="border px-4 py-2 min-w-[80px]">சுக்கிரன், புதன்</td>
                    <td className="border px-4 py-2 min-w-[80px]">-</td>
                    <td className="border px-4 py-2 min-w-[80px]">மாங்கல்யம், சுக்கிரன், புதன்</td>
                    <td className="border px-4 py-2 min-w-[80px]">-</td>
                    <td className="border px-4 py-2 min-w-[80px]">-</td>
                  </tr>
                  <tr>
                    <td className="border px-4 py-2 min-w-[80px]">-</td>
                    <td className="border px-4 py-2 min-w-[80px]">இரவி</td>
                    <td className="border px-4 py-2 min-w-[80px]">-</td>
                    <td className="border px-4 py-2 min-w-[80px]">அரசன்</td>
                    <td className="border px-4 py-2 min-w-[80px]">-</td>
                    <td className="border px-4 py-2 min-w-[80px]">அமாவாசை</td>
                    <td className="border px-4 py-2 min-w-[80px]">-</td>
                    <td className="border px-4 py-2 min-w-[80px]">-</td>
                  </tr>
                  <tr>
                    <td className="border px-4 py-2 min-w-[80px]">-</td>
                    <td className="border px-4 py-2 min-w-[80px]">வக்கிரம், சுக்கிரன்</td>
                    <td className="border px-4 py-2 min-w-[80px]">-</td>
                    <td className="border px-4 py-2 min-w-[80px]">சந்திரன்</td>
                    <td className="border px-4 py-2 min-w-[80px]">சந்திரன்</td>
                    <td className="border px-4 py-2 min-w-[80px]">-</td>
                    <td className="border px-4 py-2 min-w-[80px]">சந்திரன்</td>
                    <td className="border px-4 py-2 min-w-[80px]">-</td>
                  </tr>
                  <tr>
                    <td className="border px-4 py-2 min-w-[80px]">-</td>
                    <td className="border px-4 py-2 min-w-[80px]">-</td>
                    <td className="border px-4 py-2 min-w-[80px]">செவ்வாய், சனி, ராகு</td>
                    <td className="border px-4 py-2 min-w-[80px]">சந்திரன், ராகு</td>
                    <td className="border px-4 py-2 min-w-[80px]">சந்திரன், சுக்கிரன், புதன்</td>
                    <td className="border px-4 py-2 min-w-[80px]">-</td>
                    <td className="border px-4 py-2 min-w-[80px]">-</td>
                    <td className="border px-4 py-2 min-w-[80px]">-</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      
    </div>
  );
}


export default MyProfileDetailsPage;