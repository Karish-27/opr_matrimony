"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Pagination from "@/components/Pagination";
import { withAuth } from "@/hooks/useAuth";
import { usePagination } from "@/hooks/usePagination";
import "@/i18n";

type Profile = {
  name: string;
  type: string;
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
  isLocked?: boolean; // New field to track if profile details should be locked
  hasBeenViewed?: boolean; // Indicates if the profile has been viewed
  gender?: string; // Add gender to Profile type
  isActive?: boolean; // Add isActive field to filter inactive users
  userId?: number; // Add userId to track the actual user ID
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
    horoscopeDocuments?: string[];
  };
  chart: string[][];
};

const ProfilesPage = () => {
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [userCredits, setUserCredits] = useState<number>(0);
  const [filters, setFilters] = useState({
    lookingFor: "",
    star: "",
    ageFrom: "",
    ageTo: "",
    marriageStatus: "",
  });
  const [filteredProfiles, setFilteredProfiles] = useState<Profile[]>([]);
  // Add pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(false);

  // Image gallery state
  const [showImageGallery, setShowImageGallery] = useState(false);
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const { t, i18n } = useTranslation();

  // Move fetchProfiles outside useEffect so it can be reused
  const fetchProfiles = async (page = 1, limit = itemsPerPage) => {
    try {
      setLoading(true);
      // Build query parameters
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
      });

      // Add filter parameters
      if (filters.lookingFor) params.append("gender", filters.lookingFor);
      if (filters.star) params.append("star", filters.star);
      if (filters.marriageStatus)
        params.append("marriageStatus", filters.marriageStatus);
      if (filters.ageFrom) params.append("ageFrom", filters.ageFrom);
      if (filters.ageTo) params.append("ageTo", filters.ageTo);

      const res = await fetch(`/api/profilelists?${params}`);
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();

      // Handle new API response format
      const profilesData = data.profiles || [];
      const creditsData = data.userCredits || 0;
      const paginationData = data.pagination || {};

      const fixedData = profilesData
        .filter((profile: any) => profile.isActive !== false) // Filter out inactive users
        .map((profile: any, idx: number) => ({
          ...profile,
          age: String(profile.age ?? ""),
          isBlurred: false, // Show all profiles as unlocked in list view
          isLocked: profile.isLocked || false, // Use server-determined lock status
          gender: profile.gender || "", // Use actual gender field
        }));

      setProfiles(fixedData);
      setUserCredits(creditsData);

      // Update pagination state
      if (paginationData.totalPages) {
        setTotalPages(paginationData.totalPages);
        setTotalItems(paginationData.totalItems);
        setCurrentPage(paginationData.currentPage);
      }
      console.log(fixedData, "fixedData");
    } catch (err) {
      setProfiles([]);
      console.error("Failed to fetch profiles:", err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchProfiles(1, itemsPerPage);
  }, [itemsPerPage]);

  useEffect(() => {
    setFilteredProfiles(profiles);
  }, [profiles]);

  // Handle pagination changes
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    fetchProfiles(page, itemsPerPage);
  };

  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
    fetchProfiles(1, newItemsPerPage);
  };

  // Handle search with pagination
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchProfiles(1, itemsPerPage);
  };

  const toggleDropdown = () => setIsOpen(!isOpen);
  const handleProfileClick = async (profile: Profile) => {
    // If profile has been viewed before, open modal directly
    if (profile.hasBeenViewed) {
      setSelectedProfile(profile);
      return;
    }

    // If profile is locked (no credits), show error and don't open modal
    if (profile.isLocked) {
      alert("Insufficient credits to view this profile.");
      return;
    }

    // If profile is not locked and not viewed, try to deduct credit
    try {
      const res = await fetch("/api/profilelists/view", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          profileUserId: profile.userId, // Use the actual user ID
        }),
      });

      const result = await res.json();

      if (res.ok) {
        // Update user credits
        setUserCredits(result.creditsRemaining);

        // Show success message if credit was used
        if (result.message && result.message.includes("1 credit used")) {
          alert(result.message);
        }

        // Mark profile as viewed and unlock it
        const updatedProfile = {
          ...profile,
          isLocked: false,
          hasBeenViewed: true,
        };
        setSelectedProfile(updatedProfile);

        // Update profiles list to reflect the change
        setProfiles((prev) =>
          prev.map((p) => (p.regNo === profile.regNo ? updatedProfile : p))
        );
        setFilteredProfiles((prev) =>
          prev.map((p) => (p.regNo === profile.regNo ? updatedProfile : p))
        );
      } else {
        // Show error message if insufficient credits
        alert(result.error || "Unable to view profile");
      }
    } catch (error) {
      console.error("Error viewing profile:", error);
      alert("Failed to view profile. Please try again.");
    }
  };
  const handleLikeClick = async (profile: Profile, idx: number) => {
    if (profile.isLocked) return; // Only allow likes for unlocked profiles
    const updatedProfiles = [...profiles];
    const newLiked = !profile.liked;
    updatedProfiles[idx] = { ...profile, liked: newLiked };
    setProfiles(updatedProfiles);

    try {
      await fetch(`/api/profilelists/${profile.regNo}/like`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ liked: newLiked }),
      });
      // No need to refetch profiles - the UI state is already updated optimistically
    } catch (err) {
      // Revert the optimistic update if the API call fails
      updatedProfiles[idx] = { ...profile, liked: profile.liked };
      setProfiles(updatedProfiles);
      console.error("Failed to update like status:", err);
    }
  };
  // Image gallery handlers
  const handleImageClick = (profile: Profile, imageIndex: number = 0) => {
    // Create array of all images (main image + gallery images)
    const allImages = [profile.image, ...(profile.gallery || [])];
    setGalleryImages(allImages);
    setCurrentImageIndex(imageIndex);
    setShowImageGallery(true);
  };

  const handleGalleryClose = () => {
    setShowImageGallery(false);
    setGalleryImages([]);
    setCurrentImageIndex(0);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? galleryImages.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === galleryImages.length - 1 ? 0 : prev + 1
    );
  };

  // Add keyboard navigation for image gallery
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!showImageGallery) return;

      switch (e.key) {
        case "Escape":
          handleGalleryClose();
          break;
        case "ArrowLeft":
          handlePrevImage();
          break;
        case "ArrowRight":
          handleNextImage();
          break;
      }
    };

    document.addEventListener("keydown", handleKeyPress);
    return () => document.removeEventListener("keydown", handleKeyPress);
  }, [showImageGallery, galleryImages.length]);

  const tamilStarMap: Record<string, string> = {
    Ashwini: "அசுவினி",
    Bharani: "பரணி",
    Krittika: "கிருத்திகை",
    Rohini: "ரோஹிணி",
    Mrigashirsha: "மிருகசீரிடம்",
    Ardra: "திருவாதிரை",
    Punarvasu: "புனர்பூசம்",
    Pushya: "பூசம்",
    Ashlesha: "ஆயில்யம்",
    Magha: "மகம்",
    "Purva Phalguni": "பூரம்",
    "Uttara Phalguni": "உத்திரம்",
    Hasta: "ஹஸ்தம்",
    Chitra: "சித்திரை",
    Swati: "சுவாதி",
    Vishakha: "விசாகம்",
    Anuradha: "அனுஷம்",
    Jyeshtha: "கேட்டை",
    Mula: "மூலம்",
    "Purva Ashadha": "பூராடம்",
    "Uttara Ashadha": "உத்திராடம்",
    Shravana: "திருவோணம்",
    Dhanishta: "அவிட்டம்",
    Shatabhisha: "சதயம்",
    "Purva Bhadrapada": "பூரட்டாதி",
    "Uttara Bhadrapada": "உத்திரட்டாதி",
    Revati: "ரேவதி",
  };
  const tamilMarriageStatusMap: Record<string, string> = {
    Single: "திருமணம் ஆகாதவர்",
    Divorced: "விவாகரத்து",
    Widowed: "விதவை",
  };
  const tamilNameMap: Record<string, string> = {
    // Example: 'Ramesh': 'ரமேஷ்',
    // Add more name mappings as needed
  };
  const tamilQualificationMap: Record<string, string> = {
    "B.E": "பி.இ.",
    "M.E": "எம்.இ.",
    "B.Tech": "பி.டெக்",
    "M.Tech": "எம்.டெக்",
    MBBS: "எம்.பி.பி.எஸ்",
    "B.Sc": "பி.எஸ்.சி",
    "M.Sc": "எம்.எஸ்.சி",
    "B.Com": "பி.காம்",
    "M.Com": "எம்.காம்",
    "B.A": "பி.ஏ",
    "M.A": "எம்.ஏ",
    PhD: "பி.எச்.டி",
    // Add more as needed
  };

  // 1. Add all star options as per user request
  const allStarOptions = [
    // Main Spectral Classes
    "O-type",
    "B-type",
    "A-type",
    "F-type",
    "G-type",
    "K-type",
    "M-type",
    // By Size/Luminosity
    "Dwarf",
    "Red Dwarf",
    "White Dwarf",
    "Brown Dwarf",
    "Giant",
    "Red Giant",
    "Blue Giant",
    "Supergiant",
    "Red Supergiant",
    "Blue Supergiant",
    "Hypergiant",
    // Special/Variable Types
    "Neutron Star",
    "Pulsar",
    "Magnetar",
    "Variable Star",
    "Cepheid",
    "Binary Star",
    "Wolf-Rayet",
    "Carbon Star",
    "T Tauri",
    "Protostar",
    // By Color/Temperature
    "Blue Star",
    "Blue-White Star",
    "White Star",
    "Yellow Star",
    "Orange Star",
    "Red Star",
    // Evolutionary Stages
    "Main Sequence",
    "Pre-Main Sequence",
    "Post-Main Sequence",
    "Planetary Nebula",
  ];
  // Use profiles for filter options, filteredProfiles for grid
  const unlockedProfiles = profiles.filter((p: Profile) => !p.isLocked);
  const lockedProfiles = profiles.filter((p: Profile) => p.isLocked);
  const starOptions = Array.from(
    new Set(unlockedProfiles.map((p: Profile) => p.star))
  ).filter(Boolean);
  const marriageStatusOptions = Array.from(
    new Set(unlockedProfiles.map((p: Profile) => p.marriageStatus))
  ).filter(Boolean);
  const lookingForOptions = [
    { value: "bride", label: t("bride", "Bride") },
    { value: "groom", label: t("groom", "Groom") },
  ];
  // Show all unique stars from all profiles (not just unlocked)
  // const allStarOptions = Array.from(new Set(profiles.map(p => p.star))).filter(Boolean);
  const handleFilterChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };  return (
      <div className="min-h-screen bg-gray-50 flex flex-col ">
      {/* Language Switcher */}
      {/* Header */}
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto w-full px-6 mt-4 text-sm text-gray-500">
        {t("home")} <span className="mx-2">{">"}</span>{" "}
        <span className="text-orange-500">{t("search")}</span>
      </div>
      {/* Search Filters */}
      <div className="max-w-7xl mx-auto w-full bg-white rounded shadow p-6 mt-4">
        <form
          className="flex flex-wrap items-end gap-4"
          onSubmit={handleSearch}
        >
          <div>
            <label className="block text-xs mb-1">
              {t("search_looking_for")}
            </label>
            <select
              className="border rounded px-3 py-2 w-40"
              name="lookingFor"
              value={filters.lookingFor}
              onChange={handleFilterChange}
            >
              <option value="">{t("choose_option", "Choose")}</option>
              {lookingForOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs mb-1">
              {t("star_label", "Star")}
            </label>
            <select
              className="border rounded px-3 py-2 w-40 text-sm"
              name="star"
              value={filters.star}
              onChange={handleFilterChange}
            >
              <option value="" className="h-20">
                {t("choose_option", "Choose")}
              </option>
              {allStarOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs mb-1">
              {t("age_label", "Age")}
            </label>
            <div className="flex space-x-2">
              <input
                type="text"
                name="ageFrom"
                value={filters.ageFrom}
                onChange={handleFilterChange}
                placeholder={t("age_from_placeholder", "From")}
                className="border rounded px-3 py-2 w-16"
              />
              <input
                type="text"
                name="ageTo"
                value={filters.ageTo}
                onChange={handleFilterChange}
                placeholder={t("age_to_placeholder", "To")}
                className="border rounded px-3 py-2 w-16"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs mb-1">
              {t("marriage_status_label", "Marriage Status")}
            </label>
            <select
              className="border rounded px-3 py-2 w-40"
              name="marriageStatus"
              value={filters.marriageStatus}
              onChange={handleFilterChange}
            >
              <option value="">{t("choose_option", "Choose")}</option>
              {marriageStatusOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600 ml-4"
          >
            {t("search_button", "Search")}
          </button>
        </form>
      </div>{" "}
      {/* Results Header */}
      <div className="max-w-7xl mx-auto w-full flex justify-between items-center px-6 mt-6">
        <div className="flex items-center space-x-4">
          {/* <div className="text-gray-700 text-sm">{t('showing_profiles', { from: 1, to: 57, count: 57, defaultValue: 'Showing 1 - 57 out profile' })}</div> */}
          <div className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-medium">
            {t("credits_remaining", "Credits Remaining")}: {userCredits}
          </div>
        </div>
        {/* <div className="flex items-center space-x-2">
          <span className="text-gray-500 text-sm">{t('view_by')}</span>
          <button className="p-1 border rounded bg-orange-50">
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
              <rect width="16" height="4" x="2" y="4" rx="1" />
              <rect width="16" height="4" x="2" y="12" rx="1" />
            </svg>
          </button>
        </div> */}
      </div>
      {/* Profiles Grid */}
      <div className="max-w-7xl mx-auto w-full grid grid-cols-4 gap-6 px-6 mt-4">
        {" "}
        {filteredProfiles.map((profile, idx) => (
          <div
            key={idx}
            className="bg-white rounded shadow border p-3 flex flex-col relative cursor-pointer"
            onClick={() => handleProfileClick(profile)}
          >
            {!profile.isLocked && (
              <button
                className="absolute top-3 right-3 bg-black bg-opacity-30 rounded-sm p-1 border z-10"
                onClick={(e) => {
                  e.stopPropagation();
                  handleLikeClick(profile, idx);
                }}
              >
                {profile.liked ? (
                  // Filled orange heart SVG
                  <svg
                    width="24"
                    height="21"
                    viewBox="0 0 24 21"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20.8401 2.61085C20.3294 2.09985 19.7229 1.6945 19.0555 1.41793C18.388 1.14137 17.6726 0.999023 16.9501 0.999023C16.2276 0.999023 15.5122 1.14137 14.8448 1.41793C14.1773 1.6945 13.5709 2.09985 13.0601 2.61085L12.0001 3.67085L10.9401 2.61085C9.90843 1.57916 8.50915 0.999558 7.05012 0.999558C5.59109 0.999558 4.19181 1.57916 3.16012 2.61085C2.12843 3.64254 1.54883 5.04182 1.54883 6.50085C1.54883 7.95988 2.12843 9.35916 3.16012 10.3908L4.22012 11.4508L12.0001 19.2308L19.7801 11.4508L20.8401 10.3908C21.3511 9.88009 21.7565 9.27366 22.033 8.6062C22.3096 7.93875 22.4519 7.22334 22.4519 6.50085C22.4519 5.77836 22.3096 5.06295 22.033 4.39549C21.7565 3.72803 21.3511 3.12161 20.8401 2.61085V2.61085Z"
                      stroke="#F98B1D"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : (
                  // Default heart outline SVG
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20.8401 4.61085C20.3294 4.09985 19.7229 3.6945 19.0555 3.41793C18.388 3.14137 17.6726 2.99902 16.9501 2.99902C16.2276 2.99902 15.5122 3.14137 14.8448 3.41793C14.1773 3.6945 13.5709 4.09985 13.0601 4.61085L12.0001 5.67085L10.9401 4.61085C9.90843 3.57916 8.50915 2.99956 7.05012 2.99956C5.59109 2.99956 4.19181 3.57916 3.16012 4.61085C2.12843 5.64254 1.54883 7.04182 1.54883 8.50085C1.54883 9.95988 2.12843 11.3592 3.16012 12.3908L4.22012 13.4508L12.0001 21.2308L19.7801 13.4508L20.8401 12.3908C21.3511 11.8801 21.7565 11.2737 22.033 10.6062C22.3096 9.93875 22.4519 9.22334 22.4519 8.50085C22.4519 7.77836 22.3096 7.06295 22.033 6.39549C21.7565 5.72803 21.3511 5.12161 20.8401 4.61085V4.61085Z"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </button>
            )}{" "}
            {/* Profile Image - always clear in list view */}
            <div className="relative">
              <img
                src={profile.image}
                alt={profile.name}
                className="h-52 w-full object-cover rounded cursor-pointer hover:opacity-90 transition-opacity"
              />
            </div>
            {/* Profile Info - always clear in list view */}
            <div className="mt-3">
              <div className="font-semibold text-gray-800">
                {i18n.language === "ta"
                  ? tamilNameMap[profile.name] || profile.name
                  : profile.name}
              </div>
              <div className="text-xs text-gray-500 truncate">
                {i18n.language === "ta"
                  ? tamilQualificationMap[profile.qualification] ||
                    profile.qualification
                  : profile.qualification}
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
                  {i18n.language === "ta"
                    ? tamilStarMap[profile.star] || profile.star
                    : profile.star}
                </span>
                <span className="flex items-center text-xs text-gray-700">
                  <svg
                    className="w-3 h-3 mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 2a8 8 0 100 16 8 8 0 000-16z" />
                  </svg>
                  {profile.age}
                </span>
                <span className="flex items-center text-xs text-gray-700">
                  <svg
                    className="w-3 h-3 mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <rect width="16" height="4" x="2" y="8" rx="2" />
                  </svg>
                  {i18n.language === "ta"
                    ? tamilMarriageStatusMap[profile.marriageStatus] ||
                      profile.marriageStatus
                    : profile.marriageStatus}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Pagination */}
      <div className="max-w-7xl mx-auto w-full px-6 mt-6">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
          onItemsPerPageChange={handleItemsPerPageChange}
        />
      </div>
      {/* Profile Modal */}
      {selectedProfile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-lg shadow-lg w-[900px] max-h-[90vh] overflow-y-auto relative">
            {/* Modal Header */}
            <div className="bg-orange-500 rounded-t-lg px-6 py-3 flex items-center justify-between">
              <span className="text-white font-medium">
                {t("profile_details", "Profile Details")}
              </span>
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
            </div>{" "}
            {/* Modal Body */}
            <div className="p-8">
              {selectedProfile.isLocked ? (
                /* Locked Profile Content */
                <div className="flex flex-col items-center justify-center py-16">
                  {/* Lock Icon */}
                  <div className="bg-orange-500 rounded-full p-6 mb-6">
                    <svg
                      className="w-12 h-12 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                  </div>

                  {/* Lock Message */}
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">
                    {t("profile_locked_title", "Profile Locked")}
                  </h3>
                  <p className="text-gray-600 text-center mb-8 max-w-md">
                    {t(
                      "profile_locked_message",
                      "This profile is restricted. Please upgrade your plan to view full profile details and contact information."
                    )}
                  </p>

                  {/* Basic Info Preview */}
                  <div className="bg-gray-50 rounded-lg p-6 mb-8 w-full max-w-md">
                    <div className="text-center">
                      <div className="font-semibold text-lg mb-2">
                        {selectedProfile.name}
                      </div>
                      <div className="text-sm text-gray-600 space-y-1">
                        <div>
                          {t("age_label", "Age")}: {selectedProfile.age}
                        </div>
                        <div>
                          {t("star_label", "Star")}:{" "}
                          {i18n.language === "ta"
                            ? tamilStarMap[selectedProfile.star] ||
                              selectedProfile.star
                            : selectedProfile.star}
                        </div>
                        <div>
                          {t("qualification_label", "Qualification")}:{" "}
                          {selectedProfile.qualification}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Upgrade Button */}
                  <button
                    className="bg-orange-500 text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-orange-600 transition-colors"
                    onClick={() => {
                      router.push("/pricingPlan");
                    }}
                  >
                    {t("upgrade_plan_button", "Upgrade Plan")}
                  </button>
                </div>
              ) : (
                /* Unlocked Profile Content */
                <div>
                  {/* Top Section */}
                  <div className="flex gap-8">
                    {/* Left Info */}
                    <div className="flex-1">
                      <div className="font-semibold text-lg">
                        {selectedProfile.name}
                      </div>
                      <div className="text-xs text-gray-500 mb-2">
                        {t("reg_no_label", "Reg. No")} : {selectedProfile.regNo}
                      </div>
                      <div className="grid grid-cols-3 gap-x-6 gap-y-2 text-sm mb-4">
                        <div>
                          <div className="text-gray-500">
                            {t("email_label", "Email")}
                          </div>
                          <div>{selectedProfile.email}</div>
                        </div>
                        <div>
                          <div className="text-gray-500">
                            {t("phone_label", "Phone")}
                          </div>
                          <div>{selectedProfile.phone}</div>
                        </div>
                        <div>
                          <div className="text-gray-500">
                            {t("dob_label", "Date Of Birth")}
                          </div>
                          <div>{selectedProfile.dob}</div>
                        </div>
                        <div>
                          <div className="text-gray-500">
                            {t("age_label", "Age")}
                          </div>
                          <div>{selectedProfile.age}</div>
                        </div>
                        <div>
                          <div className="text-gray-500">
                            {t("star_label", "Star")}
                          </div>
                          <div>
                            {i18n.language === "ta"
                              ? tamilStarMap[selectedProfile.star] ||
                                selectedProfile.star
                              : selectedProfile.star}
                          </div>
                        </div>
                        <div>
                          <div className="text-gray-500">
                            {t("marriage_status_label", "Marriage Status")}
                          </div>
                          <div>
                            {i18n.language === "ta"
                              ? tamilMarriageStatusMap[
                                  selectedProfile.marriageStatus
                                ] || selectedProfile.marriageStatus
                              : selectedProfile.marriageStatus}
                          </div>
                        </div>
                        <div>
                          <div className="text-gray-500">
                            {t("height_label", "Height")}
                          </div>
                          <div>{selectedProfile.height}</div>
                        </div>
                        <div>
                          <div className="text-gray-500">
                            {t("color_label", "Color")}
                          </div>
                          <div>{selectedProfile.color}</div>
                        </div>
                        <div>
                          <div className="text-gray-500">
                            {t("caste_label", "Caste")}
                          </div>
                          <div>{selectedProfile.caste}</div>
                        </div>
                        <div>
                          <div className="text-gray-500">
                            {t("qualification_label", "Qualification")}
                          </div>
                          <div>{selectedProfile.qualification}</div>
                        </div>
                        <div>
                          <div className="text-gray-500">
                            {t("family_property_label", "Family Property")}
                          </div>
                          <div>{selectedProfile.familyProperty}</div>
                        </div>
                        <div>
                          <div className="text-gray-500">
                            {t("type_of_food_label", "Type of food")}
                          </div>
                          <div>{selectedProfile.typeOfFood}</div>
                        </div>
                        <div>
                          <div className="text-gray-500">
                            {t("career_label", "Career")}
                          </div>
                          <div>{selectedProfile.career}</div>
                        </div>
                        <div>
                          <div className="text-gray-500">
                            {t("salary_label", "Salary")}
                          </div>
                          <div>{selectedProfile.salary}</div>
                        </div>
                        <div>
                          <div className="text-gray-500">
                            {t("expectation_label", "Expectation")}
                          </div>
                          <div>{selectedProfile.expectation}</div>
                        </div>
                      </div>
                    </div>{" "}
                    {/* Right Image & Gallery */}
                    <div className="flex flex-col items-center">
                      <img
                        src={selectedProfile.image}
                        alt={selectedProfile.name}
                        className="w-40 h-48 object-cover rounded mb-3 cursor-pointer hover:opacity-90 transition-opacity"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleImageClick(selectedProfile, 0);
                        }}
                      />
                      <div className="flex gap-2">
                        {selectedProfile.gallery.map((img, i) => (
                          <img
                            key={i}
                            src={img}
                            alt=""
                            className="w-16 h-16 object-cover rounded cursor-pointer hover:opacity-90 transition-opacity"
                            onClick={() =>
                              handleImageClick(selectedProfile, i + 1)
                            }
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  {/* Family Information */}
                  <div className="mt-8">
                    <div className="font-semibold text-base mb-2">
                      {t("family_info_label", "Family Information")}
                    </div>
                    <div className="grid grid-cols-6 gap-x-6 gap-y-2 text-sm">
                      <div>
                        <div className="text-gray-500">
                          {t("father_name_label", "Father's Name")}
                        </div>
                        <div>{selectedProfile.family.fatherName}</div>
                      </div>
                      <div>
                        <div className="text-gray-500">
                          {t("mother_name_label", "Mother's Name")}
                        </div>
                        <div>{selectedProfile.family.motherName}</div>
                      </div>
                      <div>
                        <div className="text-gray-500">
                          {t("father_native_label", "Father's Native")}
                        </div>
                        <div>{selectedProfile.family.fatherNative}</div>
                      </div>
                      <div>
                        <div className="text-gray-500">
                          {t("mother_native_label", "Mother's Native")}
                        </div>
                        <div>{selectedProfile.family.motherNative}</div>
                      </div>
                      <div>
                        <div className="text-gray-500">
                          {t("father_profession_label", "Father's Profession")}
                        </div>
                        <div>{selectedProfile.family.fatherProfession}</div>
                      </div>
                      <div>
                        <div className="text-gray-500">
                          {t("mother_profession_label", "Mother's Profession")}
                        </div>
                        <div>{selectedProfile.family.motherProfession}</div>
                      </div>
                      <div>
                        <div className="text-gray-500">
                          {t("register_phone_label", "Phone Number")}
                        </div>
                        <div>{selectedProfile.family.phoneNumber}</div>
                      </div>
                      <div className="col-span-2">
                        <div className="text-gray-500">
                          {t("register_address_label", "Address")}
                        </div>
                        <div>{selectedProfile.family.address}</div>
                      </div>
                      <div>
                        <div className="text-gray-500">
                          {t("brothers_label", "Brothers")}
                        </div>
                        <div>{selectedProfile.family.brothers}</div>
                      </div>
                      <div>
                        <div className="text-gray-500">
                          {t("elder_brothers_label", "Elder Brother")}
                        </div>
                        <div>{selectedProfile.family.elderBrother}</div>
                      </div>
                      <div>
                        <div className="text-gray-500">
                          {t("younger_brothers_label", "Younger Brother")}
                        </div>
                        <div>{selectedProfile.family.youngerBrother}</div>
                      </div>
                      <div>
                        <div className="text-gray-500">
                          {t("married_brothers_label", "Married")}
                        </div>
                        <div>{selectedProfile.family.marriedBrother}</div>
                      </div>
                      <div>
                        <div className="text-gray-500">
                          {t("sisters_label", "Sisters")}
                        </div>
                        <div>{selectedProfile.family.sisters}</div>
                      </div>
                      <div>
                        <div className="text-gray-500">
                          {t("elder_sisters_label", "Elder Sister")}
                        </div>
                        <div>{selectedProfile.family.elderSister}</div>
                      </div>
                      <div>
                        <div className="text-gray-500">
                          {t("younger_sisters_label", "Younger Sister")}
                        </div>
                        <div>{selectedProfile.family.youngerSister}</div>
                      </div>
                      <div>
                        <div className="text-gray-500">
                          {t("married_sisters_label", "Married")}
                        </div>
                        <div>{selectedProfile.family.marriedSister}</div>
                      </div>
                    </div>
                  </div>
                  {/* Horoscope Information */}
                  <div className="mt-8">
                    <div className="font-semibold text-base mb-2">
                      {t("horoscope_info", "Horoscope Information")}
                    </div>
                    <div className="grid grid-cols-6 gap-x-6 gap-y-2 text-sm">
                      <div>
                        <div className="text-gray-500">
                          {t("zodiac_sign_label", "Zodiac Sign")}
                        </div>
                        <div>{selectedProfile.horoscope.zodiacSign}</div>
                      </div>
                      <div>
                        <div className="text-gray-500">
                          {t("tamil_year_label", "Tamil year")}
                        </div>
                        <div>{selectedProfile.horoscope.tamilYear}</div>
                      </div>
                      <div>
                        <div className="text-gray-500">
                          {t("tamil_month_label", "Tamil month")}
                        </div>
                        <div>{selectedProfile.horoscope.tamilMonth}</div>
                      </div>
                      <div>
                        <div className="text-gray-500">
                          {t("udayathi_natchat_label", "Udayati Natchkal")}
                        </div>
                        <div>{selectedProfile.horoscope.udayathiNatchat}</div>
                      </div>
                      <div>
                        <div className="text-gray-500">
                          {t("day_label", "Day")}
                        </div>
                        <div>{selectedProfile.horoscope.day}</div>
                      </div>
                      <div>
                        <div className="text-gray-500">
                          {t("birth_time_label", "Birth Time")}
                        </div>
                        <div>{selectedProfile.horoscope.birthTime}</div>
                      </div>
                      <div>
                        <div className="text-gray-500">
                          {t("star_foot_label", "Star/Foot")}
                        </div>
                        <div>{selectedProfile.horoscope.starFoot}</div>
                      </div>
                      <div>
                        <div className="text-gray-500">
                          {t("ascendant_label", "Ascendant (Lagnani)")}
                        </div>
                        <div>{selectedProfile.horoscope.ascendant}</div>
                      </div>
                      <div>
                        <div className="text-gray-500">
                          {t("birthplace_label", "Birthplace")}
                        </div>
                        <div>{selectedProfile.horoscope.birthplace}</div>
                      </div>
                      <div className="col-span-2">
                        <div className="text-gray-500">
                          {t(
                            "natal_direction_label",
                            "Presence of natal direction"
                          )}
                        </div>
                        <div>{selectedProfile.horoscope.natalDirection}</div>
                      </div>
                    </div>
                  </div>{" "}
                  {/* Horoscope Chart */}
                  <div className="mt-8">
                    <div className="font-semibold text-base mb-2">
                      {t("horoscope_chart_label", "Horoscope Chart")}
                    </div>
                    {selectedProfile.horoscope.horoscopeDocuments &&
                    Array.isArray(
                      selectedProfile.horoscope.horoscopeDocuments
                    ) &&
                    selectedProfile.horoscope.horoscopeDocuments.length > 0 ? (
                      /* Show uploaded horoscope documents */
                      <div className="grid grid-cols-2 gap-4">
                        {selectedProfile.horoscope.horoscopeDocuments.map(
                          (document: string, index: number) => (
                            <div key={index} className="relative">
                              <img
                                src={document}
                                alt={`Horoscope Chart ${index + 1}`}
                                className="w-full h-80 object-contain border border-gray-200 rounded-lg bg-gray-50 cursor-pointer hover:shadow-lg transition-shadow"
                                onClick={() => window.open(document, "_blank")}
                                title="Click to view full size"
                              />
                              <div className="text-center mt-2 text-sm text-gray-600">
                                Chart {index + 1}
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    ) : (
                      /* Show default horoscope images when no documents uploaded */
                      <div className="grid grid-cols-2 gap-4">
                        <div className="relative">
                          <img
                            src="/images/h1.jpg"
                            alt="Default Horoscope Chart 1"
                            className="w-full h-80 object-contain border border-gray-200 rounded-lg bg-gray-50 cursor-pointer hover:shadow-lg transition-shadow"
                            onClick={() =>
                              window.open("/images/h1.jpg", "_blank")
                            }
                            title="Click to view full size"
                          />
                          <div className="text-center mt-2 text-sm text-gray-600">
                            Default Chart 1
                          </div>
                        </div>
                        <div className="relative">
                          <img
                            src="/images/h2.jpg"
                            alt="Default Horoscope Chart 2"
                            className="w-full h-80 object-contain border border-gray-200 rounded-lg bg-gray-50 cursor-pointer hover:shadow-lg transition-shadow"
                            onClick={() =>
                              window.open("/images/h2.jpg", "_blank")
                            }
                            title="Click to view full size"
                          />
                          <div className="text-center mt-2 text-sm text-gray-600">
                            Default Chart 2
                          </div>
                        </div>
                      </div>
                    )}
                    {selectedProfile.chart &&
                      selectedProfile.chart.length > 0 && (
                        <div className="mt-6">
                          <div className="font-medium text-sm mb-2">
                            Chart Data
                          </div>
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
                        </div>
                      )}
                  </div>
                </div>
              )}
            </div>
          </div>{" "}
        </div>
      )}
      {/* Image Gallery Modal */}
      {showImageGallery && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black bg-opacity-90">
          <div className="relative max-w-6xl max-h-[90vh] w-full mx-4">
            {/* Close button */}
            <button
              className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
              onClick={handleGalleryClose}
            >
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Main image */}
            <div className="flex items-center justify-center h-full">
              <img
                src={galleryImages[currentImageIndex]}
                alt={`Gallery image ${currentImageIndex + 1}`}
                className="max-w-full max-h-full object-contain"
              />
            </div>

            {/* Navigation arrows */}
            {galleryImages.length > 1 && (
              <>
                <button
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 bg-black bg-opacity-50 rounded-full p-2"
                  onClick={handlePrevImage}
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
                <button
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 bg-black bg-opacity-50 rounded-full p-2"
                  onClick={handleNextImage}
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </>
            )}

            {/* Image thumbnails */}
            {galleryImages.length > 1 && (
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                <div className="flex space-x-2 bg-black bg-opacity-50 rounded-lg p-2">
                  {galleryImages.map((img, index) => (
                    <button
                      key={index}
                      className={`w-16 h-16 rounded overflow-hidden border-2 ${
                        index === currentImageIndex
                          ? "border-orange-500"
                          : "border-transparent"
                      }`}
                      onClick={() => setCurrentImageIndex(index)}
                    >
                      <img
                        src={img}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Image counter */}
            <div className="absolute top-4 left-4 text-white bg-black bg-opacity-50 rounded px-3 py-1">
              {currentImageIndex + 1} / {galleryImages.length}
            </div>
          </div>        </div>      )}      {/* Footer */}
    </div>
  );
};

export default withAuth(ProfilesPage);
