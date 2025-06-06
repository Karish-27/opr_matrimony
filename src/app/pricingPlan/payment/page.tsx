"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { withAuth } from '@/hooks/useAuth';

const PaymentPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [txnId, setTxnId] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("basic");
  const [amount, setAmount] = useState(100);

  // Get plan details from URL params if available
  useEffect(() => {
    const plan = searchParams.get('plan');
    const planAmount = searchParams.get('amount');
    
    if (plan) {
      setSelectedPlan(plan);
    }
    
    if (planAmount) {
      setAmount(parseInt(planAmount));
    }
  }, [searchParams]);

  const handlePaymentSuccess = () => {
    // Mark user as paid (for demo, use localStorage)
    if (typeof window !== "undefined") {
      localStorage.setItem("isPaidMember", "true");
    }
    router.push("/profilelists");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!txnId.trim()) {
      toast.error("Please enter a valid transaction ID");
      return;
    }

    // Get user ID from localStorage
    const userId = localStorage.getItem('userId');
    if (!userId) {
      toast.error("Please login first to process payment");
      router.push('/auth/login?redirect=/pricingPlan/payment');
      return;
    }

    setProcessing(true);

    try {
      const response = await fetch('/api/payment/process', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: parseInt(userId),
          transactionId: txnId.trim(),
          amount: amount,
          plan: selectedPlan
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message || 'Payment processed successfully!');
        setSubmitted(true);
        
        // Wait a moment then redirect to profile lists
        setTimeout(() => {
          handlePaymentSuccess();
        }, 2000);
      } else {
        toast.error(data.error || 'Payment processing failed');
      }
    } catch (error) {
      console.error('Payment processing error:', error);
      toast.error('Network error. Please try again.');
    } finally {
      setProcessing(false);
    }  };
  
  return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 flex flex-col items-center max-w-md w-full">
        {/* Plan Information */}
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Complete Your Purchase</h1>
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-4">
            <h3 className="font-semibold text-orange-800 capitalize">{selectedPlan} Plan</h3>
            <p className="text-gray-600">Amount: ₹{amount}</p>
            <p className="text-sm text-orange-600">
              Credits: {selectedPlan === 'basic' ? '10' : selectedPlan === 'premium' ? '25' : selectedPlan === 'gold' ? '50' : Math.floor(amount / 10)}
            </p>
          </div>
        </div>

        <img
          src="/images/GooglePay_QR.png"
          alt="Google Pay QR"
          className="w-64 h-72 mb-4"
        />
        <h2 className="text-xl font-semibold mb-2">Scan to Pay</h2>
        <p className="mb-4 text-gray-600 text-center">
          UPI ID: <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">karishmakumavat27-1@okhdfcbank</span>
        </p>
        
        {submitted ? (
          <div className="text-green-600 font-semibold text-center">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="text-green-800 font-semibold mb-2">Payment Submitted Successfully!</div>
              <div className="text-sm text-green-700">
                Your credits will be added to your account shortly.<br />
                Redirecting to profiles...
              </div>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col items-center w-full">
            <label className="mb-2 text-gray-700 font-medium">Enter UPI Transaction ID</label>
            <input
              type="text"
              value={txnId}
              onChange={e => setTxnId(e.target.value)}
              required
              disabled={processing}
              className="mb-4 px-4 py-2 border rounded w-full"
              placeholder="e.g. 1234567890"
            />
            <button
              type="submit"
              disabled={processing}
              className={`px-6 py-2 rounded w-full font-semibold transition-colors ${
                processing 
                  ? 'bg-gray-400 text-gray-700 cursor-not-allowed' 
                  : 'bg-green-500 text-white hover:bg-green-600'
              }`}
            >
              {processing ? 'Processing...' : 'Submit Payment'}
            </button>
          </form>        )}
        
        <div className="mt-4 text-center">
          <button
            onClick={() => router.back()}
            className="text-gray-500 hover:text-gray-700 text-sm underline"
          >
            ← Go Back
          </button>
        </div>
      </div>      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default withAuth(PaymentPage);
