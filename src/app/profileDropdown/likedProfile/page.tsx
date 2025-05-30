"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import "@/i18n";
import React from "react";

// Define Profile type for better type safety and dynamic rendering
// You can expand this type as per your API response

type Profile = {
  id?: string;
  name: string;
  regNo: string;
  email: string;
  phone: string;
  dob: string;
  age: string;
  star: string;
  marriageStatus: string;
  height: string;
  color: string;
  caste: string;
  qualification: string;
  familyProperty: string;
  typeOfFood: string;
  career: string;
  salary: string;
  expectation: string;
  image: string;
  gallery: string[];
   liked?: boolean;
  isBlurred?: boolean;
  family: {
    fatherName: string;
    motherName: string;
    fatherNative: string;
    motherNative: string;
    fatherProfession: string;
    motherProfession: string;
    phoneNumber: string;
    address: string;
    brothers: number;
    sisters: number;
    elderBrother: number;
    youngerBrother: number;
    marriedBrother: number;
    elderSister: number;
    youngerSister: number;
    marriedSister: number;
  };
  horoscope: {
    zodiacSign: string;
    tamilYear: string;
    tamilMonth: string;
    udayathiNatchat: string;
    day: string;
    birthTime: string;
    starFoot: string;
    ascendant: string;
    birthplace: string;
    natalDirection: string;
  };
  chart: string[][];
};

const LikedProfilePage = () => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [langDropdown, setLangDropdown] = useState(false);
  const router = useRouter();
  const { t, i18n } = useTranslation();

   const fetchProfiles = async () => {
      try {
        const res = await fetch("/api/profilelists");
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        const fixedData = data.map((profile: any, idx: number) => ({
          ...profile,
          age: String(profile.age ?? ""),
          isBlurred: idx > 1, // Only first two profiles are not blurred
        }));
        setProfiles(fixedData);
        console.log(fixedData, "fixedData");
      } catch (err) {
        setProfiles([]);
        console.error("Failed to fetch profiles:", err);
      }
    };
  
    useEffect(() => {
      fetchProfiles();
    }, []);

  useEffect(() => {
    const fetchLikedProfiles = async () => {
      const res = await fetch("/api/profilelists/liked-profiles");
      const data = await res.json();
      
      // Map API data to Profile type, fallback for missing fields
      const mappedProfiles = (data.profiles || []).map((profile: any) => ({
        id: profile.id,
        name: profile.name || profile.firstName + ' ' + (profile.lastName || ''),
        regNo: profile.regNo,
        email: profile.email,
        phone: profile.phone,
        dob: profile.dob,
        age: profile.age,
        star: profile.star,
        marriageStatus: profile.marriageStatus,
        height: profile.height,
        color: profile.color,
        caste: profile.caste,
        qualification: profile.qualification,
        familyProperty: profile.familyProperty,
        typeOfFood: profile.typeOfFood,
        career: profile.career,
        salary: profile.salary,
        expectation: profile.expectation,
        image: profile.image,
        gallery: profile.gallery || [],
        liked: profile.liked,
        isBlurred: false, // You can set blur logic if needed
        family: profile.family || {
          fatherName: '',
          motherName: '',
          fatherNative: '',
          motherNative: '',
          fatherProfession: '',
          motherProfession: '',
          phoneNumber: '',
          address: '',
          brothers: 0,
          sisters: 0,
          elderBrother: 0,
          youngerBrother: 0,
          marriedBrother: 0,
          elderSister: 0,
          youngerSister: 0,
          marriedSister: 0,
        },
        horoscope: profile.horoscope || {
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
        },
        chart: profile.chart || [],
      }));
      setProfiles(mappedProfiles);
      console.log(mappedProfiles, "Mapped Profiles"); // Debugging line to check mapped profiles
    };
    fetchLikedProfiles();
  }, []);
  

  const toggleDropdown = () => setIsOpen(!isOpen);
  const toggleLangDropdown = () => setLangDropdown((prev) => !prev);
  

  const handleProfileClick = (profile: Profile) => {
    if (profile.isBlurred) {
      // Don't open modal for blurred profiles
      return;
    }
    setSelectedProfile(profile);
  };

   const tamilStarMap: Record<string, string> = {
    'Ashwini': 'அசுவினி',
    'Bharani': 'பரணி',
    'Krittika': 'கிருத்திகை',
    'Rohini': 'ரோஹிணி',
    'Mrigashirsha': 'மிருகசீரிடம்',
    'Ardra': 'திருவாதிரை',
    'Punarvasu': 'புனர்பூசம்',
    'Pushya': 'பூசம்',
    'Ashlesha': 'ஆயில்யம்',
    'Magha': 'மகம்',
    'Purva Phalguni': 'பூரம்',
    'Uttara Phalguni': 'உத்திரம்',
    'Hasta': 'ஹஸ்தம்',
    'Chitra': 'சித்திரை',
    'Swati': 'சுவாதி',
    'Vishakha': 'விசாகம்',
    'Anuradha': 'அனுஷம்',
    'Jyeshtha': 'கேட்டை',
    'Mula': 'மூலம்',
    'Purva Ashadha': 'பூராடம்',
    'Uttara Ashadha': 'உத்திராடம்',
    'Shravana': 'திருவோணம்',
    'Dhanishta': 'அவிட்டம்',
    'Shatabhisha': 'சதயம்',
    'Purva Bhadrapada': 'பூரட்டாதி',
    'Uttara Bhadrapada': 'உத்திரட்டாதி',
    'Revati': 'ரேவதி',
  };
  const tamilMarriageStatusMap: Record<string, string> = {
    'Single': 'திருமணம் ஆகாதவர்',
    'Divorced': 'விவாகரத்து',
    'Widowed': 'விதவை',
  };
  const tamilNameMap: Record<string, string> = {
  // Example: 'Ramesh': 'ரமேஷ்',
  // Add more name mappings as needed
};
const tamilQualificationMap: Record<string, string> = {
  'B.E': 'பி.இ.',
  'M.E': 'எம்.இ.',
  'B.Tech': 'பி.டெக்',
  'M.Tech': 'எம்.டெக்',
  'MBBS': 'எம்.பி.பி.எஸ்',
  'B.Sc': 'பி.எஸ்.சி',
  'M.Sc': 'எம்.எஸ்.சி',
  'B.Com': 'பி.காம்',
  'M.Com': 'எம்.காம்',
  'B.A': 'பி.ஏ',
  'M.A': 'எம்.ஏ',
  'PhD': 'பி.எச்.டி',
  // Add more as needed
};

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
     

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto w-full px-6 mt-4 text-sm text-gray-500">
        {t('home')} <span className="mx-2">{'>'}</span>{' '}
        <span className="text-orange-500">{t('likedProfile')}</span>
      </div>

      {/* Title */}
      <div className="max-w-7xl mx-auto w-full px-6 mt-6 text-xl font-semibold text-gray-800">
        {t('likedProfile')}
      </div>

      {/* View By */}
      <div className="max-w-7xl mx-auto w-full flex justify-end items-center px-6 mt-2">
        <span className="text-gray-500 text-sm mr-2">{t('viewBy')}</span>
        <button className="p-1 border rounded bg-orange-50 mr-1">
          <svg
            className="w-4 h-4 text-orange-500"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <rect width="6" height="6" x="2" y="2" rx="1" />
            <rect width="6" height="6" x="12" y="2" rx="1" />
            <rect width="6" height="6" x="2" y="12" rx="1" />
            <rect width="6" height="6" x="12" y="12" rx="1" />
          </svg>
        </button>
        <button className="p-1 border rounded">
          <svg
            className="w-4 h-4 text-gray-400"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <rect width="16" height="4" x="2" y="4" rx="2" />
            <rect width="16" height="4" x="2" y="12" rx="2" />
          </svg>
        </button>
      </div>

      {/* Profiles Grid */}
      <div className="max-w-7xl mx-auto w-full grid grid-cols-4 gap-6 px-6 mt-4">
        {profiles.length === 0 ? (
          <div className="col-span-4 text-center text-gray-500 py-10">
            {t('noLiked')}
          </div>
        ) : (
          profiles.map((profile, idx) => (
            <div
              key={profile.id || idx}
              className="bg-white rounded shadow border p-3 flex flex-col relative"
               onClick={() => handleProfileClick(profile)}
            >
              {/* Unlike Button (Heart) */}
              {profile.liked && (
                <button
                  className="absolute top-3 right-3 bg-black bg-opacity-30 rounded-sm p-1 border z-10"
                  onClick={async (e) => {
                    e.stopPropagation();
                    // Optimistically update UI
                    const updatedProfiles = [...profiles];
                    updatedProfiles.splice(idx, 1);
                    setProfiles(updatedProfiles);
                    // Update backend
                    await fetch(`/api/profilelists/${profile.regNo}/like`, {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ liked: false }),
                    });
                  }}
                >
                  {/* Filled liked heart icon */}
                  <svg width="24" height="21" viewBox="0 0 24 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M20.8401 2.61085C20.3294 2.09985 19.7229 1.6945 19.0555 1.41793C18.388 1.14137 17.6726 0.999023 16.9501 0.999023C16.2276 0.999023 15.5122 1.14137 14.8448 1.41793C14.1773 1.6945 13.5709 2.09985 13.0601 2.61085L12.0001 3.67085L10.9401 2.61085C9.90843 1.57916 8.50915 0.999558 7.05012 0.999558C5.59109 0.999558 4.19181 1.57916 3.16012 2.61085C2.12843 3.64254 1.54883 5.04182 1.54883 6.50085C1.54883 7.95988 2.12843 9.35916 3.16012 10.3908L4.22012 11.4508L12.0001 19.2308L19.7801 11.4508L20.8401 10.3908C21.3511 9.88009 21.7565 9.27366 22.033 8.6062C22.3096 7.93875 22.4519 7.22334 22.4519 6.50085C22.4519 5.77836 22.3096 5.06295 22.033 4.39549C21.7565 3.72803 21.3511 3.12161 20.8401 2.61085V2.61085Z"
                      stroke="#F98B1D"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              )}
              {/* Profile Image */}
              <img
                src={profile.image || "/images/profilepicture.png"}
                alt={profile.name || "Profile"}
                className="h-40 w-full object-cover rounded"
              />
              <div className="mt-3 font-semibold text-gray-800">
                {profile.name}
              </div>
              <div className="text-xs text-gray-500 truncate">
                {profile.qualification}
              </div>
              <div className="flex flex-wrap items-center gap-2 mt-2">
                <span className="flex items-center text-xs text-orange-500 bg-orange-50 px-2 py-1 rounded">
                  <svg
                    className="w-3 h-3 mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <circle cx="10" cy="10" r="10" />
                  </svg>
                  {profile.star || "star"}
                </span>
                <span className="flex items-center text-xs text-gray-700">
                  <svg
                    className="w-3 h-3 mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 2a8 8 0 100 16 8 8 0 000-16z" />
                  </svg>
                  {profile.age ? `${profile.age} Years` : ""}
                </span>
                <span className="flex items-center text-xs text-gray-700">
                  <svg
                    className="w-3 h-3 mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <rect width="16" height="4" x="2" y="8" rx="2" />
                  </svg>
                  {profile.marriageStatus || "status"}
                </span>
              </div>
              {/* Additional fields can be rendered here as needed */}
            </div>
          ))
        )}
      </div>
       {selectedProfile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-lg shadow-lg w-[900px] max-h-[90vh] overflow-y-auto relative">
            {/* Modal Header */}
            <div className="bg-orange-500 rounded-t-lg px-6 py-3 flex items-center justify-between">
              <span className="text-white font-medium">{t('profile_details', 'Profile Details')}</span>
              <div className="flex items-center space-x-4">
                <button className="text-white hover:text-orange-200">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                  </svg>
                </button>
                <button className="text-white hover:text-orange-200">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17 21v-2a4 4 0 00-4-4H7a4 4 0 00-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 00-3-3.87" />
                    <path d="M16 3.13a4 4 0 010 7.75" />
                  </svg>
                </button>
                <button className="text-white hover:text-orange-200">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" />
                  </svg>
                </button>
                <button
                  className="text-white hover:text-orange-200"
                  onClick={() => setSelectedProfile(null)}
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M6 18L18 6M6 6l12 12"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>
            {/* Modal Body */}
            <div className="p-8">
              {/* Top Section */}
              <div className="flex gap-8">
                {/* Left Info */}
                <div className="flex-1">
                  <div className="font-semibold text-lg">
                    {selectedProfile.name}
                  </div>
                  <div className="text-xs text-gray-500 mb-2">
                    {t('reg_no_label', 'Reg. No')} : {selectedProfile.regNo}
                  </div>
                  <div className="grid grid-cols-3 gap-x-6 gap-y-2 text-sm mb-4">
                    <div>
                      <div className="text-gray-500">{t('email_label', 'Email')}</div>
                      <div>{selectedProfile.email}</div>
                    </div>
                    <div>
                      <div className="text-gray-500">{t('phone_label', 'Phone')}</div>
                      <div>{selectedProfile.phone}</div>
                    </div>
                    <div>
                      <div className="text-gray-500">{t('dob_label', 'Date Of Birth')}</div>
                      <div>{selectedProfile.dob}</div>
                    </div>
                    <div>
                      <div className="text-gray-500">{t('age_label', 'Age')}</div>
                      <div>{selectedProfile.age}</div>
                    </div>
                    <div>
                      <div className="text-gray-500">{t('star_label', 'Star')}</div>
                      <div>{i18n.language === 'ta' ? (tamilStarMap[selectedProfile.star] || selectedProfile.star) : selectedProfile.star}</div>
                    </div>
                    <div>
                      <div className="text-gray-500">{t('marriage_status_label', 'Marriage Status')}</div>
                      <div>{i18n.language === 'ta' ? (tamilMarriageStatusMap[selectedProfile.marriageStatus] || selectedProfile.marriageStatus) : selectedProfile.marriageStatus}</div>
                    </div>
                    <div>
                      <div className="text-gray-500">{t('height_label', 'Height')}</div>
                      <div>{selectedProfile.height}</div>
                    </div>
                    <div>
                      <div className="text-gray-500">{t('color_label', 'Color')}</div>
                      <div>{selectedProfile.color}</div>
                    </div>
                    <div>
                      <div className="text-gray-500">{t('caste_label', 'Caste')}</div>
                      <div>{selectedProfile.caste}</div>
                    </div>
                    <div>
                      <div className="text-gray-500">{t('qualification_label', 'Qualification')}</div>
                      <div>{selectedProfile.qualification}</div>
                    </div>
                    <div>
                      <div className="text-gray-500">{t('family_property_label', 'Family Property')}</div>
                      <div>{selectedProfile.familyProperty}</div>
                    </div>
                    <div>
                      <div className="text-gray-500">{t('type_of_food_label', 'Type of food')}</div>
                      <div>{selectedProfile.typeOfFood}</div>
                    </div>
                    <div>
                      <div className="text-gray-500">{t('career_label', 'Career')}</div>
                      <div>{selectedProfile.career}</div>
                    </div>
                    <div>
                      <div className="text-gray-500">{t('salary_label', 'Salary')}</div>
                      <div>{selectedProfile.salary}</div>
                    </div>
                    <div>
                      <div className="text-gray-500">{t('expectation_label', 'Expectation')}</div>
                      <div>{selectedProfile.expectation}</div>
                    </div>
                  </div>
                </div>
                {/* Right Image & Gallery */}
                <div className="flex flex-col items-center">
                  <img
                    src={selectedProfile.image}
                    alt={selectedProfile.name}
                    className="w-40 h-48 object-cover rounded mb-3"
                  />
                  <div className="flex gap-2">
                    {selectedProfile.gallery.map((img, i) => (
                      <img
                        key={i}
                        src={img}
                        alt=""
                        className="w-16 h-16 object-cover rounded"
                      />
                    ))}
                  </div>
                </div>
              </div>
              {/* Family Information */}
              <div className="mt-8">
                <div className="font-semibold text-base mb-2">
                  {t('family_info_label', 'Family Information')}
                </div>
                {selectedProfile.family ? (
                  <div className="grid grid-cols-6 gap-x-6 gap-y-2 text-sm">
                    <div>
                      <div className="text-gray-500">{t('father_name_label', "Father's Name")}</div>
                      <div>{selectedProfile.family.fatherName}</div>
                    </div>
                    <div>
                      <div className="text-gray-500">{t('mother_name_label', "Mother's Name")}</div>
                      <div>{selectedProfile.family.motherName}</div>
                    </div>
                    <div>
                      <div className="text-gray-500">{t('father_native_label', "Father's Native")}</div>
                      <div>{selectedProfile.family.fatherNative}</div>
                    </div>
                    <div>
                      <div className="text-gray-500">{t('mother_native_label', "Mother's Native")}</div>
                      <div>{selectedProfile.family.motherNative}</div>
                    </div>
                    <div>
                      <div className="text-gray-500">{t('father_profession_label', "Father's Profession")}</div>
                      <div>{selectedProfile.family.fatherProfession}</div>
                    </div>
                    <div>
                      <div className="text-gray-500">{t('mother_profession_label', "Mother's Profession")}</div>
                      <div>{selectedProfile.family.motherProfession}</div>
                    </div>
                    <div>
                      <div className="text-gray-500">{t('register_phone_label', 'Phone Number')}</div>
                      <div>{selectedProfile.family.phoneNumber}</div>
                    </div>
                    <div className="col-span-2">
                      <div className="text-gray-500">{t('register_address_label', 'Address')}</div>
                      <div>{selectedProfile.family.address}</div>
                    </div>
                    <div>
                      <div className="text-gray-500">{t('brothers_label', 'Brothers')}</div>
                      <div>{selectedProfile.family.brothers}</div>
                    </div>
                    <div>
                      <div className="text-gray-500">{t('elder_brothers_label', 'Elder Brother')}</div>
                      <div>{selectedProfile.family.elderBrother}</div>
                    </div>
                    <div>
                      <div className="text-gray-500">{t('younger_brothers_label', 'Younger Brother')}</div>
                      <div>{selectedProfile.family.youngerBrother}</div>
                    </div>
                    <div>
                      <div className="text-gray-500">{t('married_brothers_label', 'Married')}</div>
                      <div>{selectedProfile.family.marriedBrother}</div>
                    </div>
                    <div>
                      <div className="text-gray-500">{t('sisters_label', 'Sisters')}</div>
                      <div>{selectedProfile.family.sisters}</div>
                    </div>
                    <div>
                      <div className="text-gray-500">{t('elder_sisters_label', 'Elder Sister')}</div>
                      <div>{selectedProfile.family.elderSister}</div>
                    </div>
                    <div>
                      <div className="text-gray-500">{t('younger_sisters_label', 'Younger Sister')}</div>
                      <div>{selectedProfile.family.youngerSister}</div>
                    </div>
                    <div>
                      <div className="text-gray-500">{t('married_sisters_label', 'Married')}</div>
                      <div>{selectedProfile.family.marriedSister}</div>
                    </div>
                  </div>
                ) : (
                  <div className="text-gray-500 text-sm">{t('no_family_info', 'No family information available.')}</div>
                )}
              </div>
              {/* Horoscope Information */}
              <div className="mt-8">
                <div className="font-semibold text-base mb-2">
                  {t('horoscope_info', 'Horoscope Information')}
                </div>
                {selectedProfile.horoscope ? (
                  <div className="grid grid-cols-6 gap-x-6 gap-y-2 text-sm">
                    <div>
                      <div className="text-gray-500">{t('zodiac_sign_label', 'Zodiac Sign')}</div>
                      <div>{selectedProfile.horoscope.zodiacSign}</div>
                    </div>
                    <div>
                      <div className="text-gray-500">{t('tamil_year_label', 'Tamil year')}</div>
                      <div>{selectedProfile.horoscope.tamilYear}</div>
                    </div>
                    <div>
                      <div className="text-gray-500">{t('tamil_month_label', 'Tamil month')}</div>
                      <div>{selectedProfile.horoscope.tamilMonth}</div>
                    </div>
                    <div>
                      <div className="text-gray-500">{t('udayathi_natchat_label', 'Udayati Natchkal')}</div>
                      <div>{selectedProfile.horoscope.udayathiNatchat}</div>
                    </div>
                    <div>
                      <div className="text-gray-500">{t('day_label', 'Day')}</div>
                      <div>{selectedProfile.horoscope.day}</div>
                    </div>
                    <div>
                      <div className="text-gray-500">{t('birth_time_label', 'Birth Time')}</div>
                      <div>{selectedProfile.horoscope.birthTime}</div>
                    </div>
                    <div>
                      <div className="text-gray-500">{t('star_foot_label', 'Star/Foot')}</div>
                      <div>{selectedProfile.horoscope.starFoot}</div>
                    </div>
                    <div>
                      <div className="text-gray-500">{t('ascendant_label', 'Ascendant (Lagnani)')}</div>
                      <div>{selectedProfile.horoscope.ascendant}</div>
                    </div>
                    <div>
                      <div className="text-gray-500">{t('birthplace_label', 'Birthplace')}</div>
                      <div>{selectedProfile.horoscope.birthplace}</div>
                    </div>
                    <div className="col-span-2">
                      <div className="text-gray-500">
                        {t('natal_direction_label', 'Presence of natal direction')}
                      </div>
                      <div>{selectedProfile.horoscope.natalDirection}</div>
                    </div>
                  </div>
                ) : (
                  <div className="text-gray-500 text-sm">{t('no_horoscope_info', 'No horoscope information available.')}</div>
                )}
              </div>
              {/* Horoscope Chart */}
              <div className="mt-8">
                <div className="font-semibold text-base mb-2">
                  {t('horoscope_chart_label', 'Horoscope Chart')}
                </div>
                {selectedProfile.chart && selectedProfile.chart.length > 0 ? (
                  <div className="border rounded">
                    <table className="w-full text-center text-sm">
                      <tbody>
                        {selectedProfile.chart.map((row, i) => (
                          <tr key={i}>
                            {row.map((cell, j) => (
                              <td
                                key={j}
                                className="border px-4 py-2 min-w-[80px]"
                              >
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-gray-500 text-sm">{t('no_chart_info', 'No chart information available.')}</div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      
    </div>
  );
};

export default LikedProfilePage;