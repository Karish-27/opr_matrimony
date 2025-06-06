"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from "react-i18next";
import "@/i18n";

const Login = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { t } = useTranslation();

  // Validation functions
  function validateEmail(email: string): boolean {
    // More robust email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email.trim());
  }

  function validatePassword(password: string): boolean {
    // Password must be at least 8 characters with at least one uppercase, one lowercase, one number
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  }

  // Form validation function
  const validateForm = (email: string, password: string): boolean => {
    let isValid = true;

    // Validate email
    if (!email.trim()) {
      toast.error(t("login_email_required"));
      isValid = false;
    } else if (!validateEmail(email)) {
      toast.error(t("login_email_invalid"));
      isValid = false;
    }

    // Validate password
    if (!password.trim()) {
      toast.error(t("login_password_required"));
      isValid = false;
    } else if (!validatePassword(password)) {
      toast.error(t("login_password_invalid"));
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isSubmitting) return; // Prevent double submission

    const form = e.target as HTMLFormElement;
    const email = (form["email"] as HTMLInputElement).value;
    const password = (form["password"] as HTMLInputElement).value;

    // Validate form before submission
    if (!validateForm(email, password)) {
      return; // Stop submission if validation fails
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          password,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success(t("login_success"));
        setTimeout(() => {
          router.push("/auth/userprofile");
        }, 1500);
      } else {
        // Handle specific error messages from the server
        let errorMessage = t("login_failed");

        if (res.status === 401) {
          errorMessage = t("login_invalid_credentials");
        } else if (res.status === 404) {
          errorMessage = t("login_no_account");
        } else if (res.status === 400) {
          errorMessage = t("login_password_mismatch");
        } else if (res.status === 422) {
          errorMessage = t("login_invalid_format");
        } else if (data.message || data.error) {
          errorMessage = data.message || data.error;
        }

        toast.error(errorMessage);
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error(t("login_network_error"));
    } finally {
      setIsSubmitting(false);
    }
  };  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isSubmitting) return; // Prevent double submission

    const form = e.target as HTMLFormElement;
    const email = (form["email"] as HTMLInputElement).value;
    const password = (form["password"] as HTMLInputElement).value;

    setIsSubmitting(true);

    try {
      // Check for admin credentials
      if (email.trim() === "admin@gmail.com" && password === "admin@123") {
        // Set admin session cookie
        document.cookie = `isAdmin=true; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax`;
        
        toast.success(t("login_success"));
        setTimeout(() => {
          router.push("/admin/Dashboard");
        }, 1500);
      } else {
        toast.error("Invalid admin credentials. Please use admin@gmail.com and admin@123");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error(t("login_network_error"));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
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
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            alt="Your Company"
            src="/images/loginlogo.png"
            className="mx-auto h-12 w-auto"
          />
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-[#F98B1D] text-900">
            {t("login_title")}
          </h2>
        </div>        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            action="#"
            method="POST"
            className="space-y-6"
            onSubmit={handleLogin}
          >
            <div>
              <label
                htmlFor="email"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Password
                </label>
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex w-full justify-center rounded-md bg-[#F98B1D] px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline  focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#F98B1D]"
              >
                {isSubmitting ? "Signing in..." : "Sign in"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
