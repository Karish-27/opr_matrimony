"use client";

import { useRouter } from "next/navigation";
import React from "react";

const PaymentPage = () => {
  const router = useRouter();

  const handlePaymentSuccess = () => {
    // Mark user as paid (for demo, use localStorage)
    if (typeof window !== "undefined") {
      localStorage.setItem("isPaidMember", "true");
    }
    router.push("/profilelists");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="bg-white rounded-lg shadow-lg p-8 flex flex-col items-center">
        <img
          src="/images/GooglePay_QR.png"
          alt="Google Pay QR"
          className="w-64 h-72 mb-4"
        />
        <h2 className="text-xl font-semibold mb-2">Scan to Pay</h2>
        <p className="mb-4 text-gray-600 text-center">
          UPI ID: <span className="font-mono">karishmakumavat27-1@okhdfcbank</span>
        </p>
        <button
          className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition-colors"
          onClick={handlePaymentSuccess}
        >
          Pay Now
        </button>
      </div>
    </div>
  );
};

export default PaymentPage;
