"use client";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { usePathname, useRouter } from "next/navigation";
import "@/i18n";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [langDropdown, setLangDropdown] = useState(false);
  const router = useRouter();
  const { t, i18n } = useTranslation();

  const toggleDropdown = () => setIsOpen(!isOpen);
  const toggleLangDropdown = () => setLangDropdown((prev) => !prev);
  const handleLangChange = (selected: "en" | "ta") => {
    i18n.changeLanguage(selected);
    setLangDropdown(false);
  };

  const handleLoginClick = () => {
    // Handle login navigation here
    router.push("/auth/login");
  };

  const handleRegisterClick = () => {
    // Handle register navigation here
    router.push("/auth/register");
  };

  const pathname = usePathname();
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
          <a href="homepage" className="text-gray-700 hover:text-orange-500">
            {t("home")}
          </a>
          <a href="/profilelists" className="text-gray-700 hover:text-orange-500">
            {t("search")}
          </a>
          <a href="pricingPlan" className="text-gray-700 hover:text-orange-500">
            {t("pricing")}
          </a>
          <a href="#" className="text-gray-700 hover:text-orange-500">
            {t("contact")}
          </a>
          <div
            className="relative flex items-center space-x-2 cursor-pointer select-none"
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
            )}
          </div>
          {pathname !== "/homepage" && (
            <>
              <div className="ml-4" onClick={toggleDropdown}>
                <img
                  src="/images/profilepicture.png"
                  alt="User"
                  className="h-8 w-8 rounded-full border"
                />
              </div>
              {isOpen && (
                <div className="absolute right-5 mt-60 w-48 bg-white  rounded-lg shadow-lg z-50 ">
                  <ul className="text-sm text-gray-700">
                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center space-x-2" onClick={() => router.push('/profileDropdown/myprofiledetails')}>
                      <img
                        src="/icons/profileicon.svg" // Update this path based on your file structure
                        alt="Profile Icon"
                        className="h-5 w-5"
                      />
                      <span>Profile</span>
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center space-x-2" onClick={() => router.push('/profileDropdown/likedProfile')}>
                      <img
                        src="/icons/likedheart.svg"
                        alt="Liked Profile Icon"
                        className="h-5 w-5"
                      />
                      <span>Liked Profile</span>
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center space-x-2" onClick={() => router.push('/profileDropdown/downloadProfile')}>
                      <img
                        src="/icons/downloadprofileicon.svg"
                        alt="Download Profile Icon"
                        className="h-5 w-5"
                      />
                      <span>Download Profile</span>
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center space-x-2">
                      <img
                        src="/icons/changepasswordicon.svg"
                        alt="Change Password Icon"
                        className="h-5 w-5"
                      />
                      <span>Change Password</span>
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center space-x-2" onClick={() => router.push('/auth/login')}>
                      <img
                        src="/icons/logouticon.svg" // Update this path based on your file structure
                        alt="Logout Icon"
                        className="h-5 w-5"
                      />
                      <span>Logout</span>
                    </li>
                  </ul>
                </div>
              )}
            </>
          )}
          {pathname == "/homepage" && (
            <div className="flex space-x-3">
              <button
                type="button"
                className="bg-orange-500 text-white px-5 py-2 rounded-md font-bold hover:bg-orange-600 transition-colors"
                onClick={handleLoginClick}
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
