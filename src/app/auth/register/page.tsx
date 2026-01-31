"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from "react-i18next";
import "@/i18n";
import { setUserIdInLocalStorage } from "@/utils/auth";

const Register = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { t, i18n } = useTranslation();

  // Validation functions
  function validateName(name: string): boolean {
    // Name should be at least 2 characters and contain only letters and spaces
    return /^[a-zA-Z\s]{2,}$/.test(name.trim());
  }

  function validateEmail(email: string): boolean {
    // More robust email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email.trim());
  }

  function validatePassword(password: string): boolean {
    // Password must be at least 8 characters with at least one uppercase, one lowercase, one number
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  }

  // Form validation function
  const validateForm = (firstName: string, lastName: string, email: string, password: string): boolean => {
    let isValid = true;

    // Validate first name
    if (!firstName.trim()) {
      toast.error(t("register_first_name_required"));
      isValid = false;
    } else if (!validateName(firstName)) {
      toast.error(t("register_first_name_invalid"));
      isValid = false;
    }

    // Validate last name
    if (!lastName.trim()) {
      toast.error(t("register_last_name_required"));
      isValid = false;
    } else if (!validateName(lastName)) {
      toast.error(t("register_last_name_invalid"));
      isValid = false;
    }

    // Validate email
    if (!email.trim()) {
      toast.error(t("register_email_required"));
      isValid = false;
    } else if (!validateEmail(email)) {
      toast.error(t("register_email_invalid"));
      isValid = false;
    }

    // Validate password
    if (!password.trim()) {
      toast.error(t("register_password_required"));
      isValid = false;
    } else if (!validatePassword(password)) {
      toast.error(t("register_password_invalid"));
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isSubmitting) return; // Prevent double submission
    
    const form = e.target as HTMLFormElement;
    const firstName = (form["first-name"] as HTMLInputElement).value;
    const lastName = (form["last-name"] as HTMLInputElement).value;
    const email = (form["email"] as HTMLInputElement).value;
    const password = (form["password"] as HTMLInputElement).value;

    // Validate form before submission
    if (!validateForm(firstName, lastName, email, password)) {
      return; // Stop submission if validation fails
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          email: email.trim(), 
          password, 
          firstName: firstName.trim(), 
          lastName: lastName.trim() 
        }),
      });      const data = await res.json();
      console.log("Registration response:", data);
      
      const userId = data.userId;
      if (res.ok) {
        // Store userId in localStorage for immediate use
        // Note: The server has already set the userId in cookies for long-term authentication
        if (userId) {
          setUserIdInLocalStorage(String(Number(userId)));
        }
        toast.success(t("register_success"));
        setTimeout(() => {
          router.push("/auth/userprofile");
        }, 1500);
      } else {
        // Handle specific error messages from the server
        const errorMessage = data.message || data.error || t("register_failed");
        toast.error(errorMessage);
      }
    } catch (error) {
      console.error("Registration error:", error);
      toast.error(t("register_network_error"));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
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

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            action="#"
            method="POST"
            className="space-y-6"
            onSubmit={handleSubmit}
            lang={i18n.language}
          >
            <div className="flex gap-4">
              <div className="w-1/2">
                <label
                  htmlFor="first-name"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  {t("register_first_name_label")} <span className="text-red-500">*</span>
                </label>
                <div className="mt-2">
                  <input
                    id="first-name"
                    name="first-name"
                    type="text"
                    required
                    autoComplete="given-name"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    placeholder={t("register_first_name_placeholder")}
                    lang={i18n.language}
                    style={i18n.language === "ta" ? { fontFamily: "Latha, Arial, sans-serif" } : {}}
                  />
                </div>
              </div>
              <div className="w-1/2">
                <label
                  htmlFor="last-name"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  {t("register_last_name_label")} <span className="text-red-500">*</span>
                </label>
                <div className="mt-2">
                  <input
                    id="last-name"
                    name="last-name"
                    type="text"
                    required
                    autoComplete="family-name"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    placeholder={t("register_last_name_placeholder")}
                    lang={i18n.language}
                    style={i18n.language === "ta" ? { fontFamily: "Latha, Arial, sans-serif" } : {}}
                  />
                </div>
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm/6 font-medium text-gray-900"
              >
                {t("register_email_label")} <span className="text-red-500">*</span>
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  placeholder={t("register_email_placeholder")}
                  lang={i18n.language}
                  style={i18n.language === "ta" ? { fontFamily: "Latha, Arial, sans-serif" } : {}}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  {t("register_password_label")} <span className="text-red-500">*</span>
                </label>
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    {t("register_forgot_password")}
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="new-password"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  placeholder={t("register_password_placeholder")}
                  lang={i18n.language}
                  style={i18n.language === "ta" ? { fontFamily: "Latha, Arial, sans-serif" } : {}}
                />
              </div>
              <div className="mt-1 text-xs text-gray-500">
                {t("register_password_hint")}
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`flex w-full justify-center rounded-md px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${
                  isSubmitting 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-[#F98B1D] hover:bg-orange-600'
                }`}
              >
                {isSubmitting ? t("register_registering") : t("register_button")}
              </button>
            </div>
            <div className="text-center text-sm mt-4">
              {t("register_already_account")} {" "}
              <Link
                href="/auth/login"
                className="font-semibold text-indigo-600 hover:text-indigo-500"
              >
                {t("register_login_here")}
              </Link>
            </div>
          </form>
          <ToastContainer 
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </div>
      </div>
    </>
  );
};

export default Register;