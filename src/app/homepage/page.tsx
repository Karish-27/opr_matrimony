"use client";

import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useTranslation } from "react-i18next";

const MatrimonyLandingPage = () => {
  const { t } = useTranslation();

  // Sample profile data with success story images
  const profilesData = [
    {
      names: "Gunja & Adarsh",
      date: "12 Apr 2020",
      image: "/images/successimage1.png",
    },
    {
      names: "Sundaraj & Radha",
      date: "13 Apr 2020",
      image: "/images/successimage2.png",
    },
    {
      names: "Raja & Priya",
      date: "15 Mar 2020",
      image: "/images/successimage3.png",
    },
    {
      names: "Vikram & Meera",
      date: "18 May 2020",
      image: "/images/successimage4.png",
    },
    { names: "Ravi & Kavya", date: "22 Jun 2020", image: "/images/image1.png" },
    {
      names: "Arjun & Sneha",
      date: "05 Jul 2020",
      image: "/images/image2.png",
    },
    {
      names: "Kiran & Divya",
      date: "10 Aug 2020",
      image: "/images/image3.png",
    },
    {
      names: "Suresh & Lakshmi",
      date: "25 Sep 2020",
      image: "/images/image4.png",
    },
    {
      names: "Mahesh & Anita",
      date: "08 Oct 2020",
      image: "/images/image5.png",
    },
    {
      names: "Deepak & Nisha",
      date: "14 Nov 2020",
      image: "/images/profilepicture.png",
    },
  ];

  type ProfileType = {
    names: string;
    date: string;
    image: string;
  };

  const [displayedProfiles, setDisplayedProfiles] = useState<ProfileType[]>([]);

  // Function to shuffle array and get 4 random profiles
  const getRandomProfiles = () => {
    const shuffled = [...profilesData].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 4);
  };
  // Set random profiles on component mount
  useEffect(() => {
    setDisplayedProfiles(getRandomProfiles());
  }, []);

  return (
    <div className="matrimony-landing">
      {/* Navigation */} {/* Hero Section */}
      <div
        className="relative h-screen flex items-center justify-center text-center text-white"
        style={{
          backgroundImage: "url('/images/bg2.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0  bg-opacity-50"></div>{" "}
        <div className="relative z-10 max-w-4xl px-5">
          <h1 className="text-5xl md:text-6xl font-bold mb-5">
            {t("hero_title")}
          </h1>
        </div>
      </div>
      {/* Services Section */}
      <section className="py-20 text-center">
        <div className="max-w-7xl mx-auto px-4">
          {" "}
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              {t("trusted_service_title")}
            </h2>
            <p className="max-w-3xl mx-auto text-gray-600 text-lg leading-relaxed">
              {t("trusted_service_description")}
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-20 h-20  rounded-full flex items-center justify-center mx-auto mb-6">
                <img src="/images/heart.png" alt="Heart Icon" />
              </div>{" "}
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                {t("best_matching_title")}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {t("best_matching_description")}
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-20 h-20  rounded-full flex items-center justify-center mx-auto mb-6">
                <img src="/images/verified-profile.png" alt="Profile Icon" />
              </div>{" "}
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                {t("verified_profile_title")}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {t("verified_profile_description")}
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-20 h-20  rounded-full flex items-center justify-center mx-auto mb-6">
                <img src="/images/directcommunication.png" alt="Chat Icon" />
              </div>{" "}
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                {t("direct_communication_title")}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {t("direct_communication_description")}
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* About Section */}
      <section
        className="py-20 bg-orange-50 relative overflow-hidden"
        id="about"
      >
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "url('https://media.istockphoto.com/id/1186214696/photo/hindu-wedding-ritual-wherein-bride-and-groom-hand.webp?a=1&b=1&s=612x612&w=0&k=20&c=TDlfitfgP1f1Z2zp6WBW2Ezyk5Ed3BCeD9HcNEVoKzo=')",
            backgroundSize: "contain",
          }}
        ></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2 lg:pr-12 mb-10 lg:mb-0">
              {" "}
              <h2 className="text-4xl font-bold text-gray-800 mb-6">
                {t("about_us_title")}
              </h2>
              <p className="text-gray-700 mb-6 leading-relaxed text-lg">
                {t("about_us_description")}
              </p>
              {/* <button className="bg-orange-500 text-white px-6 py-3 rounded-md font-bold hover:bg-orange-600 transition-colors">
                Read More
              </button> */}
            </div>
            <div className="lg:w-1/2">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <img
                    src="/images/image1.png"
                    alt="Wedding Ceremony"
                    className="w-full rounded-lg object-cover"
                  />
                  <img
                    src="/images/image2.png"
                    alt="Wedding Ceremony"
                    className="w-full rounded-lg object-cover"
                  />
                </div>
                <div className="space-y-4 mt-8">
                  <img
                    src="/images/image3.png"
                    alt="Wedding Ceremony"
                    className="w-full rounded-lg object-cover"
                  />
                  <img
                    src="/images/image4.png"
                    alt="Wedding Ceremony"
                    className="w-full rounded-lg object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Success Stories */}
      <section className="py-20 text-center">
        <div className="max-w-7xl mx-auto px-4">
          {" "}
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              {t("success_stories_title")}
            </h2>
            <p className="max-w-3xl mx-auto text-gray-600 text-lg leading-relaxed">
              {t("success_stories_description")}
            </p>
          </div>{" "}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayedProfiles.map((story, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="aspect-square">
                  <img
                    src={story.image}
                    alt="Success Story"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-800 mb-1">
                    {story.names}
                  </h3>
                  <p className="text-gray-500 text-sm mb-3">{story.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Gift Section */}
      <section
        className="relative h-96 bg-cover bg-center flex items-center justify-center text-center text-white"
        style={{ backgroundImage: "url('/images/bg3.jpg')" }}
      >
        <div className="absolute inset-0  bg-opacity-50"></div>{" "}
        <div className="relative z-10 max-w-4xl px-5">
          <h2 className="text-5xl font-bold mb-3">{t("gift_section_title")}</h2>
          <p className="text-xl">{t("gift_section_subtitle")}</p>
        </div>
      </section>{" "}
      {/* Contact Section */}
      <section className="py-20" id="contact">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-16 justify-between">
            <div className="lg:w-3/5">
              {" "}
              <h2 className="text-3xl font-bold text-gray-800 mb-8">
                {t("contact_information_title")}
              </h2>
              <div className="space-y-8">
                <div className="flex items-start">
                  <img
                    src="/images/call.png"
                    alt="Phone Icon"
                    className="w-8 h-8 mr-4 mt-1 flex-shrink-0"
                  />{" "}
                  <div className="pl-8 border-l border-gray-300">
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">
                      {t("contact_phone_label")}
                    </h3>
                    <p className="text-gray-600 text-lg font-medium">
                      {t("contact_phone_number")}
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <img
                    src="/images/mail.png"
                    alt="Email Icon"
                    className="w-8 h-8 mr-4 mt-1 flex-shrink-0"
                  />{" "}
                  <div className="pl-8 border-l border-gray-300">
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">
                      {t("contact_email_label")}
                    </h3>
                    <p className="text-gray-600 text-lg font-medium">
                      {t("contact_email")}
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <img
                    src="/images/clock.png"
                    alt="Clock Icon"
                    className="w-8 h-8 mr-4 mt-1 flex-shrink-0"
                  />{" "}
                  <div className="pl-8 border-l border-gray-300">
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">
                      {t("working_hours_label")}
                    </h3>
                    <p className="text-gray-600 text-lg font-medium">
                      {t("working_hours")}
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <img
                    src="/images/location.png"
                    alt="Location Icon"
                    className="w-8 h-8 mr-4 mt-1 flex-shrink-0"
                  />{" "}
                  <div className="pl-8 border-l border-gray-300">
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">
                      {t("address_label")}
                    </h3>
                    <p className="text-gray-600 text-lg font-medium leading-relaxed">
                      {t("address_line1")}
                      <br />
                      {t("address_line2")}
                      <br />
                      {t("address_line3")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:w-2/5">
              <img
                src="/images/contactphoto.png"
                alt="Couple Illustration"
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>
      {/* Footer */}
    </div>
  );
};

export default MatrimonyLandingPage;
