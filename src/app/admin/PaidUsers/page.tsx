"use client";

import Sidebar from "@/components/Sidebar";
import React, { useEffect, useState } from "react";
import AvatarDropdown from '@/components/AvatarDropdown';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { withAdminAuth } from '@/hooks/useAuth';

interface Payment {
  id: number;
  customerName: string;
  transactionAmount: number;
  transactionDate: string;
  createdAt: string;
}

const PaidUsers = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    customerName: '',
    transactionAmount: '',
    transactionDate: ''
  });
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    fetchPayments(currentPage, itemsPerPage);
  }, [currentPage, itemsPerPage]);
  const fetchPayments = async (page = 1, limit = 10) => {
    try {
      setLoading(true);
      const res = await fetch(`/api/admin/payments?page=${page}&limit=${limit}`);
      if (!res.ok) {
        throw new Error('Failed to fetch payments');
      }
      const data = await res.json();
      if (data.success) {
        setPayments(data.payments || []);
        if (data.pagination) {
          setCurrentPage(data.pagination.currentPage);
          setTotalPages(data.pagination.totalPages);
          setTotalItems(data.pagination.totalItems);
          setItemsPerPage(data.pagination.itemsPerPage);
        }
      } else {
        throw new Error(data.error || 'Failed to fetch payments');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error fetching payments');
      setPayments([]);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.customerName || !formData.transactionAmount || !formData.transactionDate) {
      toast.error('Please fill all fields');
      return;
    }

    try {
      const res = await fetch('/api/admin/payments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (data.success) {
        toast.success('Payment added successfully');
        setFormData({
          customerName: '',
          transactionAmount: '',
          transactionDate: ''        });
        setShowAddForm(false);
        fetchPayments(currentPage, itemsPerPage); // Refresh the list
      } else {
        toast.error(data.error || 'Failed to add payment');
      }
    } catch (error) {
      toast.error('Error adding payment');
      console.error('Error:', error);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this payment record?')) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/payments?id=${id}`, {
        method: 'DELETE'
      });

      const data = await res.json();      if (data.success) {
        toast.success('Payment deleted successfully');
        fetchPayments(currentPage, itemsPerPage); // Refresh the list
      } else {
        toast.error(data.error || 'Failed to delete payment');
      }
    } catch (error) {
      toast.error('Error deleting payment');
      console.error('Error:', error);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount);
  };

  // Pagination functions
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      setCurrentPage(page);
    }
  };

  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  };

  const goToPrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push('...');
        pages.push(currentPage - 1);
        pages.push(currentPage);
        pages.push(currentPage + 1);
        pages.push('...');
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <ToastContainer position="top-right" autoClose={3000} />
      
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {/* Top Bar */}
        <div className="flex items-center justify-between px-8 py-4 bg-white border-b">
          <h2 className="text-lg font-semibold">Paid Users</h2>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setShowAddForm(!showAddForm)}
              className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded flex items-center gap-2"
            >
              <span>+</span>
              Add Payment
            </button>
            <AvatarDropdown 
              userEmail="admin@gmail.com"
              avatarSrc="https://randomuser.me/api/portraits/men/6.jpg"
            />
          </div>
        </div>

        {/* Add Payment Form */}
        {showAddForm && (
          <div className="bg-white border-b p-6">
            <h3 className="text-md font-medium mb-4">Add New Payment</h3>
            <form onSubmit={handleSubmit} className="flex gap-4 items-end">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Customer Name
                </label>
                <input
                  type="text"
                  name="customerName"
                  value={formData.customerName}
                  onChange={handleInputChange}
                  className="border rounded px-3 py-2 w-48"
                  placeholder="Enter customer name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Transaction Amount
                </label>
                <input
                  type="number"
                  step="0.01"
                  name="transactionAmount"
                  value={formData.transactionAmount}
                  onChange={handleInputChange}
                  className="border rounded px-3 py-2 w-32"
                  placeholder="0.00"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Transaction Date
                </label>
                <input
                  type="date"
                  name="transactionDate"
                  value={formData.transactionDate}
                  onChange={handleInputChange}
                  className="border rounded px-3 py-2 w-40"
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
              >
                Add
              </button>
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </form>
          </div>
        )}

        {/* Table */}
        <div className="flex-1 overflow-auto p-8">
          <div className="bg-white rounded-lg shadow border p-4">
            {loading ? (
              <div className="text-center py-8">Loading...</div>
            ) : error ? (
              <div className="text-center text-red-500 py-8">{error}</div>
            ) : (
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="text-gray-500 border-b">
                    <th className="px-4 py-3 text-left">Sr No</th>
                    <th className="px-4 py-3 text-left">Customer Name</th>
                    <th className="px-4 py-3 text-left">Transaction Amount</th>
                    <th className="px-4 py-3 text-left">Transaction Date</th>
                    <th className="px-4 py-3 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {payments.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="text-center py-8 text-gray-500">
                        No payment records found
                      </td>
                    </tr>
                  ) : (
                    payments.map((payment, index) => (
                      <tr key={payment.id} className="border-b hover:bg-gray-50">
                        <td className="px-4 py-3">{index + 1}</td>
                        <td className="px-4 py-3 font-medium">{payment.customerName}</td>
                        <td className="px-4 py-3 text-green-600 font-medium">
                          {formatAmount(payment.transactionAmount)}
                        </td>
                        <td className="px-4 py-3">{formatDate(payment.transactionDate)}</td>
                        <td className="px-4 py-3">
                          <button
                            onClick={() => handleDelete(payment.id)}
                            className="text-red-600 hover:text-red-800 text-sm font-medium"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            )}            {/* Pagination */}
            {totalItems > 0 && (
              <div className="flex items-center justify-between mt-4 text-gray-500 text-xs">
                <div className="flex items-center gap-4">
                  <span>
                    {totalItems > 0 
                      ? `${((currentPage - 1) * itemsPerPage) + 1}-${Math.min(currentPage * itemsPerPage, totalItems)} of ${totalItems} payments`
                      : '0 payments'
                    }
                  </span>
                  <div className="flex items-center gap-2">
                    <span>Show:</span>
                    <select 
                      value={itemsPerPage} 
                      onChange={(e) => handleItemsPerPageChange(Number(e.target.value))}
                      className="border rounded px-2 py-1 text-sm"
                    >
                      <option value={5}>5 per page</option>
                      <option value={10}>10 per page</option>
                      <option value={25}>25 per page</option>
                      <option value={50}>50 per page</option>
                    </select>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    className={`px-2 py-1 rounded border ${
                      currentPage === 1 
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                        : 'bg-white hover:bg-gray-50'
                    }`}
                    disabled={currentPage === 1}
                    onClick={goToPrevious}
                  >
                    {"<"}
                  </button>
                  
                  {getPageNumbers().map((page, index) => (
                    page === '...' ? (
                      <span key={`ellipsis-${index}`} className="px-2 py-1">
                        ...
                      </span>
                    ) : (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page as number)}
                        className={`px-2 py-1 rounded border ${
                          currentPage === page
                            ? 'bg-orange-500 text-white font-bold'
                            : 'bg-white hover:bg-gray-50'
                        }`}
                      >
                        {page}
                      </button>
                    )
                  ))}
                  
                  <button
                    className={`px-2 py-1 rounded border ${
                      currentPage === totalPages 
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                        : 'bg-orange-400 text-white hover:bg-orange-500'
                    }`}
                    disabled={currentPage === totalPages}
                    onClick={goToNext}
                  >
                    {">"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>  );
};

export default withAdminAuth(PaidUsers);
