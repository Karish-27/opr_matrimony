"use client";
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { withAuth } from '@/hooks/useAuth';
import '../../../i18n';

const MyProfileDetailsPage = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [parentInfo, setParentInfo] = useState<any>(null);
  const [horoscopeProfile, setHoroscopeProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<any>(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  useEffect(() => {
    // Check if user is admin and redirect to admin dashboard
    const checkUserType = async () => {
      try {
        const response = await fetch('/api/auth/check-admin', {
          credentials: 'include',
        });
        
        if (response.ok) {
          // User is admin, redirect to admin dashboard
          alert('Admin users cannot access profile details. Redirecting to admin dashboard.');
          router.push('/admin/Dashboard');
          return;
        }
      } catch (error) {
        // Not admin, continue with regular flow
      }
      
      // Proceed with regular user profile fetching
      fetchData();
    };

    checkUserType();
  }, [router]);

  // Fetch data for the currently logged-in user
  const fetchData = async () => {
    setLoading(true);
    try {
      // Only use the profileinfo API for all user data
      const res = await fetch('/api/admin/profileinfo', { credentials: 'include' });
      if (res.status === 401) {
        alert('Your session has expired or you are not logged in. Please log in again.');
        setLoading(false);
        return;
      }
      if (res.status === 403) {
        alert('You are logged in as an admin. Admin users cannot access profile details. Please log in as a regular user or access the admin dashboard.');
        router.push('/admin/Dashboard');
        return;
      }
      if (!res.ok) throw new Error('Failed to fetch user profile');
      const data = await res.json();
      console.log(data, "profileinfo data");
      setUserProfile(data);
      setParentInfo(data.family || {});
      setHoroscopeProfile(data.horoscope || {});
      setFormData({ ...data }); // Initialize formData
    } catch (err) {
      setUserProfile(null);
      setParentInfo(null);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    setFormData({ ...userProfile });
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData({ ...userProfile });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const res = await fetch('/api/admin/profileinfo', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error('Failed to update profile');
      const updated = await res.json();
      setUserProfile(updated);
      setIsEditing(false);
    } catch (err) {
      alert('Failed to save changes.');
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }  return (
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
          {!isEditing ? (
            <button onClick={handleEdit} className="bg-white text-orange-500 font-semibold px-6 py-2 rounded hover:bg-orange-100 transition-colors">{t('edit_button', 'Edit')}</button>
          ) : (
            <div className="flex gap-2">
              <button onClick={handleSave} className="bg-white text-green-600 font-semibold px-6 py-2 rounded hover:bg-green-100 transition-colors">{t('save_button', 'Save')}</button>
              <button onClick={handleCancel} className="bg-white text-gray-500 font-semibold px-6 py-2 rounded hover:bg-gray-100 transition-colors">{t('cancel_button', 'Cancel')}</button>
            </div>
          )}
        </div>
        <div className="bg-white rounded-b-lg shadow-lg p-8">
          {/* Top Section */}
          <div className="flex gap-8">
            {/* Left Info */}
            <div className="flex-1">
              <div className="font-semibold text-lg">{userProfile?.fullName || '-'}</div>
              <div className="text-xs text-gray-500 mb-2">{t('reg_no_label')} : {userProfile?.regNo || '-'}</div>
              <div className="grid grid-cols-3 gap-x-6 gap-y-2 text-sm mb-4">
                <div>
                  <div className="text-gray-500">{t('email_label')}</div>
                  {isEditing ? (
                    <input name="email" value={formData?.email || ''} onChange={handleChange} className="border rounded px-2 py-1 w-full" />
                  ) : (
                    <div>{userProfile?.email || '-'}</div>
                  )}
                </div>
                <div>
                  <div className="text-gray-500">{t('phone_label')}</div>
                  {isEditing ? (
                    <input name="phone" value={formData?.phone || ''} onChange={handleChange} className="border rounded px-2 py-1 w-full" />
                  ) : (
                    <div>{userProfile?.phone || '-'}</div>
                  )}
                </div>
                <div>
                  <div className="text-gray-500">{t('dob_label')}</div>
                  {isEditing ? (
                    <input type="date" name="dob" value={formData?.dob || ''} onChange={handleChange} className="border rounded px-2 py-1 w-full" />
                  ) : (
                    <div>{userProfile?.dob || '-'}</div>
                  )}
                </div>
                <div>
                  <div className="text-gray-500">{t('age_label')}</div>
                  {isEditing ? (
                    <input name="age" value={formData?.age || ''} onChange={handleChange} className="border rounded px-2 py-1 w-full" />
                  ) : (
                    <div>{userProfile?.age || '-'}</div>
                  )}
                </div>
                <div>
                  <div className="text-gray-500">{t('star_label')}</div>
                  {isEditing ? (
                    <input name="star" value={formData?.star || ''} onChange={handleChange} className="border rounded px-2 py-1 w-full" />
                  ) : (
                    <div>{userProfile?.star || '-'}</div>
                  )}
                </div>
                <div>
                  <div className="text-gray-500">{t('marriage_status_label')}</div>
                  {isEditing ? (
                    <input name="marriageStatus" value={formData?.marriageStatus || ''} onChange={handleChange} className="border rounded px-2 py-1 w-full" />
                  ) : (
                    <div>{userProfile?.marriageStatus || '-'}</div>
                  )}
                </div>
                <div>
                  <div className="text-gray-500">{t('height_label')}</div>
                  {isEditing ? (
                    <input name="height" value={formData?.height || ''} onChange={handleChange} className="border rounded px-2 py-1 w-full" />
                  ) : (
                    <div>{userProfile?.height || '-'}</div>
                  )}
                </div>
                <div>
                  <div className="text-gray-500">{t('color_label')}</div>
                  {isEditing ? (
                    <input name="color" value={formData?.color || ''} onChange={handleChange} className="border rounded px-2 py-1 w-full" />
                  ) : (
                    <div>{userProfile?.color || '-'}</div>
                  )}
                </div>
                <div>
                  <div className="text-gray-500">{t('caste_label')}</div>
                  {isEditing ? (
                    <input name="caste" value={formData?.caste || ''} onChange={handleChange} className="border rounded px-2 py-1 w-full" />
                  ) : (
                    <div>{userProfile?.caste || '-'}</div>
                  )}
                </div>
                <div>
                  <div className="text-gray-500">{t('qualification_label')}</div>
                  {isEditing ? (
                    <input name="qualification" value={formData?.qualification || ''} onChange={handleChange} className="border rounded px-2 py-1 w-full" />
                  ) : (
                    <div>{userProfile?.qualification || '-'}</div>
                  )}
                </div>
                <div>
                  <div className="text-gray-500">{t('family_property_label')}</div>
                  {isEditing ? (
                    <input name="familyProperty" value={formData?.familyProperty || ''} onChange={handleChange} className="border rounded px-2 py-1 w-full" />
                  ) : (
                    <div>{userProfile?.familyProperty || '-'}</div>
                  )}
                </div>
                <div>
                  <div className="text-gray-500">{t('type_of_food_label')}</div>
                  {isEditing ? (
                    <input name="typeOfFood" value={formData?.typeOfFood || ''} onChange={handleChange} className="border rounded px-2 py-1 w-full" />
                  ) : (
                    <div>{userProfile?.typeOfFood || '-'}</div>
                  )}
                </div>
                <div>
                  <div className="text-gray-500">{t('career_label')}</div>
                  {isEditing ? (
                    <input name="career" value={formData?.career || ''} onChange={handleChange} className="border rounded px-2 py-1 w-full" />
                  ) : (
                    <div>{userProfile?.career || '-'}</div>
                  )}
                </div>
                <div>
                  <div className="text-gray-500">{t('salary_label')}</div>
                  {isEditing ? (
                    <input name="salary" value={formData?.salary || ''} onChange={handleChange} className="border rounded px-2 py-1 w-full" />
                  ) : (
                    <div>{userProfile?.salary || '-'}</div>
                  )}
                </div>
                <div>
                  <div className="text-gray-500">{t('expectation_label')}</div>
                  {isEditing ? (
                    <input name="expectation" value={formData?.expectation || ''} onChange={handleChange} className="border rounded px-2 py-1 w-full" />
                  ) : (
                    <div>{userProfile?.expectation || '-'}</div>
                  )}
                </div>
              </div>
            </div>
            {/* Right Image & Gallery */}
            <div className="flex flex-col items-center">
              <img src={userProfile?.image || '/images/profilepicture.png'} alt={userProfile?.fullName || ''} className="w-40 h-48 object-cover rounded mb-3" />
              <div className="flex gap-2">
                {(userProfile?.gallery || ['/images/profilepicture.png','/images/profilepicture.png','/images/profilepicture.png']).slice(0,3).map((img:string, idx:number) => (
                  <img key={idx} src={img} alt="" className="w-16 h-16 object-cover rounded" />
                ))}
              </div>
            </div>
          </div>
          {/* Family Information */}
          <div className="mt-8">
            <div className="font-semibold text-base mb-2">{t('family_info_label')}</div>
            <div className="grid grid-cols-6 gap-x-6 gap-y-2 text-sm">
              <div>
                <div className="text-gray-500">{t('father_name_label')}</div>
                <div>{parentInfo?.fatherName || '-'}</div>
              </div>
              <div>
                <div className="text-gray-500">{t('mother_name_label')}</div>
                <div>{parentInfo?.motherName || '-'}</div>
              </div>
              <div>
                <div className="text-gray-500">{t('father_native_label')}</div>
                <div>{parentInfo?.fatherNative || '-'}</div>
              </div>
              <div>
                <div className="text-gray-500">{t('mother_native_label')}</div>
                <div>{parentInfo?.motherNative || '-'}</div>
              </div>
              <div>
                <div className="text-gray-500">{t('father_profession_label')}</div>
                <div>{parentInfo?.fatherProfession || '-'}</div>
              </div>
              <div>
                <div className="text-gray-500">{t('mother_profession_label')}</div>
                <div>{parentInfo?.motherProfession || '-'}</div>
              </div>
              <div>
                <div className="text-gray-500">{t('register_phone_label')}</div>
                <div>{userProfile?.phone || '-'}</div>
              </div>
              <div className="col-span-2">
                <div className="text-gray-500">{t('register_address_label')}</div>
                <div>{parentInfo?.address || '-'}</div>
              </div>
              <div>
                <div className="text-gray-500">{t('brothers_label')}</div>
                <div>{parentInfo?.brothers || '-'}</div>
              </div>
              <div>
                <div className="text-gray-500">{t('elder_brothers_label')}</div>
                <div>{parentInfo?.elderBrother || '-'}</div>
              </div>
              <div>
                <div className="text-gray-500">{t('younger_brothers_label')}</div>
                <div>{parentInfo?.youngerBrother || '-'}</div>
              </div>
              <div>
                <div className="text-gray-500">{t('married_brothers_label')}</div>
                <div>{parentInfo?.marriedBrother || '-'}</div>
              </div>
              <div>
                <div className="text-gray-500">{t('sisters_label')}</div>
                <div>{parentInfo?.sisters || '-'}</div>
              </div>
              <div>
                <div className="text-gray-500">{t('elder_sisters_label')}</div>
                <div>{parentInfo?.elderSister || '-'}</div>
              </div>
              <div>
                <div className="text-gray-500">{t('younger_sisters_label')}</div>
                <div>{parentInfo?.youngerSister || '-'}</div>
              </div>
              <div>
                <div className="text-gray-500">{t('married_sisters_label')}</div>
                <div>{parentInfo?.marriedSister || '-'}</div>
              </div>
            </div>
          </div>
          {/* Horoscope Information (dynamic) */}
          <div className="mt-8">
            <div className="font-semibold text-base mb-2">{t('horoscope_info')}</div>
            <div className="grid grid-cols-6 gap-x-6 gap-y-2 text-sm">
              <div>
                <div className="text-gray-500">{t('zodiac_sign_label')}</div>
                <div>{horoscopeProfile?.zodiacSign || '-'}</div>
              </div>
              <div>
                <div className="text-gray-500">{t('tamil_year_label')}</div>
                <div>{horoscopeProfile?.tamilYear || '-'}</div>
              </div>
              <div>
                <div className="text-gray-500">{t('tamil_month_label')}</div>
                <div>{horoscopeProfile?.tamilMonth || '-'}</div>
              </div>
              <div>
                <div className="text-gray-500">{t('udayathi_natchat_label')}</div>
                <div>{horoscopeProfile?.udayathiNatchat || '-'}</div>
              </div>
              <div>
                <div className="text-gray-500">{t('day_label')}</div>
                <div>{horoscopeProfile?.day || '-'}</div>
              </div>
              <div>
                <div className="text-gray-500">{t('birth_time_label')}</div>
                <div>{horoscopeProfile?.birthTime || '-'}</div>
              </div>
              <div>
                <div className="text-gray-500">{t('star_foot_label')}</div>
                <div>{horoscopeProfile?.starFoot || '-'}</div>
              </div>
              <div>
                <div className="text-gray-500">{t('ascendant_label')}</div>
                <div>{horoscopeProfile?.ascendant || '-'}</div>
              </div>
              <div>
                <div className="text-gray-500">{t('birthplace_label')}</div>
                <div>{horoscopeProfile?.birthplace || '-'}</div>
              </div>
              <div className="col-span-2">
                <div className="text-gray-500">{t('natal_direction_label')}</div>
                <div>{horoscopeProfile?.natalDirection || '-'}</div>
              </div>
            </div>
          </div>          {/* Horoscope Chart */}
          <div className="mt-8">
            <div className="font-semibold text-base mb-2">{t('horoscope_chart_label')}</div>
            {/* Check if horoscope chart images exist in the profile, otherwise show default images */}
            {horoscopeProfile?.chartImages && horoscopeProfile.chartImages.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {horoscopeProfile.chartImages.map((image: string, index: number) => (
                  <img 
                    key={index}
                    src={image} 
                    alt={`Horoscope Chart ${index + 1}`}
                    className="w-full max-w-md mx-auto border rounded shadow-lg"
                  />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="text-center">
                  <img 
                    src="/images/h1.jpg" 
                    alt="Default Horoscope Chart 1"
                    className="w-full max-w-md mx-auto border rounded shadow-lg"
                  />
                  <p className="text-sm text-gray-500 mt-2">{t('default_horoscope_chart_1', 'Default Horoscope Chart 1')}</p>
                </div>
                <div className="text-center">
                  <img 
                    src="/images/h2.jpg" 
                    alt="Default Horoscope Chart 2"
                    className="w-full max-w-md mx-auto border rounded shadow-lg"
                  />
                  <p className="text-sm text-gray-500 mt-2">{t('default_horoscope_chart_2', 'Default Horoscope Chart 2')}</p>
                </div>
              </div>
            )}
            
            {/* Optional: Keep the original table as fallback or additional info */}
            {/* <div className="mt-6 border rounded">
              <div className="bg-gray-50 px-4 py-2 font-medium text-sm">{t('horoscope_details_table', 'Horoscope Details')}</div>
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
            </div> */}
          </div>
        </div>
      </div>      {/* Footer */}
      
    </div>
  );
}

export default withAuth(MyProfileDetailsPage);