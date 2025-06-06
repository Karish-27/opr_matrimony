"use client";

import React from "react";
import { useTranslation } from "react-i18next";

const ContactPage = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div
        className="relative h-64 flex items-center justify-center text-center text-white"
        style={{
          backgroundImage: "url('/images/bg2.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0  bg-opacity-50"></div>
        <div className="relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold">
            {t("contact_us") || "Contact Us"}
          </h1>
          <p className="text-xl mt-2">
            {t("contact_us_subtitle") || "We'd love to hear from you"}
          </p>
        </div>
      </div>      {/* Contact Content */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex flex-col lg:flex-row items-center gap-16 justify-between">
          {/* Contact Information */}
          <div className="lg:w-3/5">
            <h2 className="text-3xl font-bold text-gray-800 mb-8">
              {t('contact_information_title') || "Contact Information"}
            </h2>
            <div className="space-y-8">
              <div className="flex items-start">
                <img
                  src="/images/call.png"
                  alt="Phone Icon"
                  className="w-8 h-8 mr-4 mt-1 flex-shrink-0"
                />
                <div className="pl-8 border-l border-gray-300">
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">
                    {t('contact_phone_label') || "Phone Number"}
                  </h3>
                  <p className="text-gray-600 text-lg font-medium">
                    {t('contact_phone_number') || "+1 (555) 123-4567"}
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <img
                  src="/images/mail.png"
                  alt="Email Icon"
                  className="w-8 h-8 mr-4 mt-1 flex-shrink-0"
                />
                <div className="pl-8 border-l border-gray-300">
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">
                    {t('contact_email_label') || "Email Address"}
                  </h3>
                  <p className="text-gray-600 text-lg font-medium">
                    {t('contact_email') || "info@matrimony.com"}
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <img
                  src="/images/clock.png"
                  alt="Clock Icon"
                  className="w-8 h-8 mr-4 mt-1 flex-shrink-0"
                />
                <div className="pl-8 border-l border-gray-300">
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">
                    {t('working_hours_label') || "Working Hours"}
                  </h3>
                  <p className="text-gray-600 text-lg font-medium">
                    {t('working_hours') || "Mon - Fri: 9:00 AM - 6:00 PM"}
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <img
                  src="/images/location.png"
                  alt="Location Icon"
                  className="w-8 h-8 mr-4 mt-1 flex-shrink-0"
                />
                <div className="pl-8 border-l border-gray-300">
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">
                    {t('address_label') || "Address"}
                  </h3>
                  <p className="text-gray-600 text-lg font-medium leading-relaxed">
                    {t('address_line1') || "123 Marriage Lane"}
                    <br />
                    {t('address_line2') || "Love City, LC 12345"}
                    <br />
                    {t('address_line3') || "United States"}
                  </p>
                </div>
              </div>            </div>
          </div>
          
          {/* Contact Image */}
          <div className="lg:w-2/5">
            <img
              src="/images/contactphoto.png"
              alt="Couple Illustration"
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
