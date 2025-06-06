"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import "@/i18n";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { withAuth } from "@/hooks/useAuth";

const ParentFamilyPage = () => {
  const router = useRouter();
  const { t, i18n } = useTranslation();
  const [selected, setSelected] = useState({
    father: false,
    mother: false,
  });  const [form, setForm] = useState({
    fatherName: "",
    motherName: "",
    fatherNative: "",
    motherNative: "",
    fatherProfession: "",
    motherProfession: "",
    phone: "",
    address: "",
    brothers: 0,
    elderBrothers: 0,
    youngerBrothers: 0,
    marriedBrothers: 0,
    sisters: 0,
    elderSisters: 0,
    youngerSisters: 0,
    marriedSisters: 0,
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setSelected((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const numericFields = [
    "brothers",
    "elderBrothers",
    "youngerBrothers",
    "marriedBrothers",
    "sisters",
    "elderSisters",
    "youngerSisters",
    "marriedSisters"
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: numericFields.includes(name) ? Number(value) : value,
    }));
  };

  const handleNext = () => {
    router.push("/auth/userprofile/parentsinfo/horoscopeprofile"); // Navigate to next step
  };

  const handleBack = () => {
    router.push("/auth/userprofile"); // Navigate to userprofile age page
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting form:", form);
    
    const res = await fetch("/api/profiledataapi/userprofile/parentsinfo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    console.log("Response:", res);

    if (res.ok) {
      console.log("Form data submitted:", form);
       toast.success(t('parents_success', 'Parents information added successfully!'));
      router.push("/auth/userprofile/parentsinfo/horoscopeprofile");
    } else {
      alert(t("register_failed"));
    }
  };

  const renderNumberOptions = () =>
    Array.from({ length: 11 }, (_, i) => (
      <option key={i} value={i}>
        {i < 10 ? `0${i}` : i}
      </option>
    ));

  // Language switcher
  const handleLanguageChange = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  return (
    <div className="flex flex-col items-center py-8 px-4">
       <ToastContainer position="top-right" autoClose={2000} />
      {/* Language Switcher */}
     
      {/* Logo and Title */}
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
      {/* Parent Information Form */}
      <form
        className="w-full max-w-3xl bg-white p-8 rounded-lg shadow"
        onSubmit={handleSubmit}
      >
        <h3 className="text-md font-semibold text-gray-800 mb-4">
          {t("parent_info", "Parent information")}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t("father_name_label", "Father's Name")} *
            </label>
            <input
              type="text"
              name="fatherName"
              value={form.fatherName}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder={t("register_father_name_placeholder", t("register_height_placeholder"))}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t("mother_name_label", "Mother's Name")} *
            </label>
            <input
              type="text"
              name="motherName"
              value={form.motherName}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder={t("register_mother_name_placeholder", t("register_height_placeholder"))}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t("father_native_label", "Father's Native")} *
            </label>
            <input
              type="text"
              name="fatherNative"
              value={form.fatherNative}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder={t("register_father_native_placeholder", t("register_height_placeholder"))}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t("mother_native_label", "Mother's Native")} *
            </label>
            <input
              type="text"
              name="motherNative"
              value={form.motherNative}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder={t("register_mother_native_placeholder", t("register_height_placeholder"))}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t("father_profession_label", "Father's Profession")} *
            </label>
            <input
              type="text"
              name="fatherProfession"
              value={form.fatherProfession}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder={t("register_father_profession_placeholder", t("register_height_placeholder"))}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t("mother_profession_label", "Mother's Profession")} *
            </label>
            <input
              type="text"
              name="motherProfession"
              value={form.motherProfession}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder={t("register_mother_profession_placeholder", t("register_height_placeholder"))}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t("register_phone_label")} *
            </label>
            <div className="flex">
              <span className="px-3 py-2 bg-gray-100 border border-r-0 border-gray-300 rounded-l-md text-sm text-gray-500">
                +91
              </span>
              <input
                type="text"
                name="phone"
                value={form.phone}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-r-md"
                placeholder={t("register_phone_placeholder", t("register_height_placeholder"))}
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t("register_address_label", "Address")} *
            </label>
            <input
              type="text"
              name="address"
              value={form.address}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder={t("register_address_placeholder", t("register_height_placeholder"))}
              required
            />
          </div>
        </div>

        {/* Family Members */}
        <h3 className="text-md font-semibold text-gray-800 mb-4">
          {t("family_members_label", "Family Members")}
        </h3>
        <div className="flex items-center space-x-4 mb-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              name="father"
              checked={selected.father}
              onChange={handleChange}
              className="mr-2 accent-orange-500"
            />
            <span>{t("register_type_groom", "Father")}</span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              name="mother"
              checked={selected.mother}
              onChange={handleChange}
              className="mr-2 accent-orange-500"
            />
            <span>{t("register_type_bride", "Mother")}</span>
          </label>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t("brothers_label", "Brothers")} *
            </label>
            <select
              name="brothers"
              value={form.brothers}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            >
              {renderNumberOptions()}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t("elder_brothers_label", "Elder Brothers")} *
            </label>
            <select
              name="elderBrothers"
              value={form.elderBrothers}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            >
              {renderNumberOptions()}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t("younger_brothers_label", "Younger Brothers")} *
            </label>
            <select
              name="youngerBrothers"
              value={form.youngerBrothers}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            >
              {renderNumberOptions()}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t("married_brothers_label", "Married Brothers")} *
            </label>
            <select
              name="marriedBrothers"
              value={form.marriedBrothers}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            >
              {renderNumberOptions()}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t("sisters_label", "Sisters")} *
            </label>
            <select
              name="sisters"
              value={form.sisters}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            >
              {renderNumberOptions()}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t("elder_sisters_label", "Elder Sisters")} *
            </label>
            <select
              name="elderSisters"
              value={form.elderSisters}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            >
              {renderNumberOptions()}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t("younger_sisters_label", "Younger Sisters")} *
            </label>
            <select
              name="youngerSisters"
              value={form.youngerSisters}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            >
              {renderNumberOptions()}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t("married_sisters_label", "Married Sisters")} *
            </label>
            <select
              name="marriedSisters"
              value={form.marriedSisters}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            >
              {renderNumberOptions()}
            </select>
          </div>
        </div>
        {/* Back and Next Buttons */}
        <div className="flex justify-between mt-8">
          <button
            type="button"
            className="px-6 py-2 border border-orange-500 text-orange-500 rounded-md bg-white"
            onClick={handleBack}
          >
            {t("back_button", "Back")}
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-orange-500 text-white rounded-md"
          >
            {t("next_button", "Next")}
          </button>
        </div>
      </form>
    </div>
  );
};

export default withAuth(ParentFamilyPage);
