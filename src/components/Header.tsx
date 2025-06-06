"use client";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { usePathname, useRouter } from "next/navigation";
import { logout } from "@/utils/auth";
import "@/i18n";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [langDropdown, setLangDropdown] = useState(false);
  const [profileImage, setProfileImage] = useState("/images/profilepicture.png");
  const [isLoadingProfile, setIsLoadingProfile] = useState(false);
  const router = useRouter();  const { t, i18n } = useTranslation();
  const toggleDropdown = () => setIsOpen(!isOpen);
  const toggleLangDropdown = () => setLangDropdown((prev) => !prev);
  const handleLangChange = (selected: "en" | "ta") => {
    i18n.changeLanguage(selected);
    setLangDropdown(false);
  };

  // Initialize language from localStorage on component mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('i18nextLng');
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'ta')) {
      i18n.changeLanguage(savedLanguage);
    }
  }, [i18n]);
  const pathname = usePathname();

  // Fetch user's profile image when component mounts
  useEffect(() => {
    const fetchUserProfileImage = async () => {
      // Only fetch profile image if user is logged in (not on homepage)
      if (pathname === "/homepage") return;
      
      setIsLoadingProfile(true);
      try {
        const res = await fetch('/api/admin/profileinfo', { 
          credentials: 'include',
          cache: 'no-store'
        });
        
        if (res.ok) {
          const data = await res.json();
          // Use the first image if available, otherwise keep the default
          if (data.image && data.image !== "/images/profilepicture.png") {
            setProfileImage(data.image);
          }
        } else if (res.status === 401) {
          // User not authenticated, keep default image
          console.log("User not authenticated");
        }
      } catch (error) {
        console.error("Error fetching profile image:", error);
        // Keep default image on error
      } finally {
        setIsLoadingProfile(false);
      }
    };

    fetchUserProfileImage();
  }, [pathname]);

  // Close dropdown when pathname changes
  useEffect(() => {
    setIsOpen(false);
    setLangDropdown(false);
  }, [pathname]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.profile-dropdown-container') && !target.closest('.lang-dropdown-container')) {
        setIsOpen(false);
        setLangDropdown(false);
      }
    };

    if (isOpen || langDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, langDropdown]);

  const handleLoginClick = () => {
    // Handle login navigation here
    router.push("/auth/login");
  };
  const handleRegisterClick = () => {
    // Handle register navigation here
    router.push("/auth/register");
  };  const handleLogout = async () => {
    try {
      await logout();
      // logout() function already handles redirection to login page
    } catch (error) {
      console.error('Logout error:', error);
      // Fallback: redirect to login page even if logout fails
      router.push('/auth/login');
    }
  };

  if (pathname.startsWith("/admin")) return null;

  return (
    <header className="w-full  bg-white">
      <div className="max-w-7xl mx-auto flex items-center justify-between py-4 px-6">
        <div className="flex items-center space-x-2">
          <img
            src="/images/loginlogo.png"
            alt="Matrimony"
            className="h-10 w-10"
          />
          <span className="font-bold text-xl text-black-500">Matrimony</span>
        </div>
        <nav className="flex items-center space-x-8">
          <a href="/homepage" className="text-gray-700 hover:text-orange-500">
            {t("home")}
          </a>          <a href="/profilelists" className="text-gray-700 hover:text-orange-500">
            {t("search")}
          </a>          <a href="/pricing" className="text-gray-700 hover:text-orange-500">
            {t("pricing")}
          </a>
          <a href="/contact" className="text-gray-700 hover:text-orange-500">
            {t("contact")}
          </a><div
            className="relative flex items-center space-x-2 cursor-pointer select-none lang-dropdown-container"
            onClick={toggleLangDropdown}
          >
            <span>{i18n.language === "en" ? "EN" : "TA"}</span>
            <svg
              className="w-4 h-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M19 9l-7 7-7-7"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {langDropdown && (
              <div className="absolute right-0 mt-32 w-24 bg-white border rounded shadow z-50">
                <div
                  className={`px-4 py-2 hover:bg-gray-100 cursor-pointer ${
                    i18n.language === "en" ? "font-bold text-orange-500" : ""
                  }`}
                  onClick={() => handleLangChange("en")}
                >
                  English
                </div>
                <div
                  className={`px-4 py-2 hover:bg-gray-100 cursor-pointer ${
                    i18n.language === "ta" ? "font-bold text-orange-500" : ""
                  }`}
                  onClick={() => handleLangChange("ta")}
                >
                  Tamil
                </div>
              </div>
            )}          </div>          {pathname !== "/homepage" && !pathname.startsWith("/auth") && pathname !== "/contact" && pathname !== "/pricing" && (
            <div className="relative profile-dropdown-container">
              <div className="ml-4 cursor-pointer" onClick={toggleDropdown}>
                <div className="relative">
                  <img
                    src={profileImage}
                    alt="User Profile"
                    className="h-8 w-8 rounded-full border object-cover"
                    onError={() => setProfileImage("/images/profilepicture.png")}
                  />
                  {isLoadingProfile && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-200 rounded-full">
                      <div className="w-4 h-4 border-2 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  )}
                </div>
              </div>
              {isOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg z-50 border">
                  <ul className="text-sm text-gray-700">
                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center space-x-2" onClick={(e) => {
                      e.stopPropagation();
                      setIsOpen(false);
                      router.push('/profileDropdown/myprofiledetails');
                    }}>
                      <img
                        src="/icons/profileicon.svg"
                        alt="Profile Icon"
                        className="h-5 w-5"
                      />
                      <span>Profile</span>
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center space-x-2" onClick={(e) => {
                      e.stopPropagation();
                      setIsOpen(false);
                      router.push('/profileDropdown/likedProfile');
                    }}>
                      <img
                        src="/icons/likedheart.svg"
                        alt="Liked Profile Icon"
                        className="h-5 w-5"
                      />
                      <span>Liked Profile</span>
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center space-x-2" onClick={(e) => {
                      e.stopPropagation();
                      setIsOpen(false);
                      router.push('/profileDropdown/downloadProfile');
                    }}>
                      <img
                        src="/icons/downloadprofileicon.svg"
                        alt="Download Profile Icon"
                        className="h-5 w-5"
                      />
                      <span>Download Profile</span>
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center space-x-2" onClick={(e) => {
                      e.stopPropagation();
                      setIsOpen(false);
                      router.push('/profileDropdown/changePassword');
                    }}>
                      <img
                        src="/icons/changepasswordicon.svg"
                        alt="Change Password Icon"
                        className="h-5 w-5"
                      />
                      <span>Change Password</span>
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center space-x-2" onClick={(e) => {
                      e.stopPropagation();
                      setIsOpen(false);
                      handleLogout();
                    }}>
                      <img
                        src="/icons/logouticon.svg"
                        alt="Logout Icon"
                        className="h-5 w-5"
                      />
                      <span>Logout</span>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          )}
          {pathname == "/homepage" && (
            <div className="flex space-x-3">
              <button
                type="button"                className="bg-orange-500 text-white px-5 py-2 rounded-md font-bold hover:bg-orange-600 transition-colors"                onClick={handleLoginClick}
              >
                Login
              </button>
              <button
                type="button"
                className="bg-white text-gray-800 px-5 py-2 rounded-md font-bold hover:bg-gray-100 transition-colors"
                onClick={handleRegisterClick}
              >
                Register
              </button>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
