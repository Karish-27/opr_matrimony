"use client";

import Sidebar from "@/components/Sidebar";
import React, { useEffect, useState } from "react";
import AvatarDropdown from '@/components/AvatarDropdown';
import { withAdminAuth } from '@/hooks/useAuth';

// Define the Member type
interface Member {
  regNo: string;
  name: string;
  gender: string;
  email: string;
  phone: string;
  dob: string;
  status?: string;
  image: string;
  mobile?: string;
  avatar?: string;
  isActive?: boolean;
  userId?: number;
  createdAt?: Date | string;
}

const MemberLists = () => {  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Utility function to format date to yyyy/mm/dd
  const formatDate = (dateString: Date | string | undefined): string => {
    if (!dateString) return "-";
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return "-";
      
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      
      return `${year}/${month}/${day}`;
    } catch (error) {
      return "-";
    }
  };
  const filteredMembers = Array.isArray(members) ? members.filter((profile: any) => {
    const query = searchQuery.toLowerCase();
    const matchesSearch = (
      (profile.name && profile.name.toLowerCase().includes(query)) ||
      (profile.gender && profile.gender.toLowerCase().includes(query)) ||
      (profile.dob && profile.dob.toLowerCase().includes(query)) ||
      (profile.regNo && profile.regNo.toLowerCase().includes(query))
    );
    
    const matchesStatus = statusFilter === 'all' || 
      (statusFilter === 'active' && profile.isActive) ||
      (statusFilter === 'inactive' && !profile.isActive);
    
    return matchesSearch && matchesStatus;
  }) : [];

  // Pagination calculations
  const totalItems = filteredMembers.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentMembers = filteredMembers.slice(startIndex, endIndex);
  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, statusFilter, itemsPerPage]);

  // Pagination handlers
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
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

  // Toggle user status function
  const toggleUserStatus = async (userId: number, currentStatus: boolean) => {
    try {
      const response = await fetch('/api/admin/users/toggle-status', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: userId,
          isActive: !currentStatus
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to toggle user status');
      }

      const result = await response.json();
      
      // Update the members list with the new status
      setMembers(prevMembers => 
        prevMembers.map(member => 
          member.userId === userId 
            ? { 
                ...member, 
                isActive: !currentStatus,
                status: !currentStatus ? "Active" : "Inactive"
              }
            : member
        )
      );

      console.log('Status updated successfully:', result.message);
    } catch (error) {
      console.error('Error toggling user status:', error);
      alert('Failed to update user status. Please try again.');
    }
  };useEffect(() => {
     // Fetch users data from API
     const fetchUsers = async () => {
       setLoading(true);
       try {
         const response = await fetch('/api/admin/users');
         if (!response.ok) throw new Error('Failed to fetch users');
         const data = await response.json();
         console.log(data, 'Fetched members data');

         // The API returns { users: [...] }
         if (data && Array.isArray(data.users)) {
           setMembers(data.users);
         } else if (Array.isArray(data)) {
           setMembers(data);
         } else {
           console.error('API response format unexpected:', data);
           setMembers([]);
         }
       } catch (err) {
         if (err instanceof Error) {
           setError(err.message);
         } else {
           setError('Error fetching members');
         }
         setMembers([]); // Set to empty array on error
       } finally {
         setLoading(false);
       }
     };
 
     fetchUsers();
   }, []);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />
      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {/* Top Bar */}
        <div className="flex items-center justify-between px-8 py-4 bg-white border-b">
          <h2 className="text-lg font-semibold">Members List</h2>          <div className="flex items-center gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="border rounded px-4 py-2 w-56"
                value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              />
              <span className="absolute right-3 top-2.5 text-gray-400">
                <svg
                  width="16"
                  height="16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="M21 21l-4.35-4.35" />
                </svg>
              </span>
            </div>            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as 'all' | 'active' | 'inactive')}
              className="border rounded px-4 py-2"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
            <select
              value={itemsPerPage}
              onChange={(e) => setItemsPerPage(Number(e.target.value))}
              className="border rounded px-4 py-2"
            >
              <option value={5}>5 per page</option>
              <option value={10}>10 per page</option>
              <option value={25}>25 per page</option>
              <option value={50}>50 per page</option>
            </select>
            {/* <button className="bg-orange-400 hover:bg-orange-500 text-white px-6 py-2 rounded flex items-center gap-2">
              <svg
                width="18"
                height="18"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M12 5v14M19 12l-7 7-7-7" />
              </svg>
              Download
            </button> */}
            <AvatarDropdown 
              userEmail="admin@gmail.com"
              avatarSrc="/icons/profileicon.svg"
            />
          </div>
        </div>
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
                    <th className="px-2 py-3">
                      <input type="checkbox" />
                    </th>
                    <th className="px-2 py-3">Reg.No</th>
                    <th className="px-2 py-3">Profile</th>
                    <th className="px-2 py-3">Gender</th>
                    <th className="px-2 py-3">Email</th>
                    <th className="px-2 py-3">Contact.No</th>
                    <th className="px-2 py-3">Purchase Date</th>
                    <th className="px-2 py-3">Status</th>
                    <th className="px-2 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentMembers.map((m, i) => (
                    <tr key={i} className="border-b hover:bg-gray-50 text-center">
                      <td className="px-2 py-2">
                        <input type="checkbox" />
                      </td>
                      <td className="px-2 py-2">{m.regNo}</td>
                      <td className="px-2 py-2">
                        <div className="flex flex-row items-center ml-4">
                          <div>
                            <img
                              src={m.image || m.avatar || "/images/profilepicture.png"}
                              alt={m.name}
                              className="w-8 h-8 rounded-full mb-1 mr-3"
                            />
                          </div>
                          <div>
                            <span className="text-sm text-gray-800">
                              {m.name}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="px-2 py-2">{m.gender}</td>
                      <td className="px-2 py-2">{m.email}</td>
                      <td className="px-2 py-2">{m.phone || m.mobile}</td>
                      <td className="px-2 py-2">{m.dob || "1-1-2000"}</td>
                      <td className="px-2 py-2">
                        {(m.isActive !== false) ? (
                          <span className="bg-green-500 text-white px-3 py-1 rounded text-xs">
                            Active
                          </span>
                        ) : (
                          <span className="bg-red-400 text-white px-3 py-1 rounded text-xs">
                            Inactive
                          </span>
                        )}
                      </td>
                      <td className="px-2 py-2">
                        {m.userId && (
                          <button
                            onClick={() => toggleUserStatus(m.userId!, m.isActive !== false)}
                            className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                              m.isActive !== false
                                ? 'bg-red-500 hover:bg-red-600 text-white'
                                : 'bg-green-500 hover:bg-green-600 text-white'
                            }`}
                          >
                            {m.isActive !== false ? 'Deactivate' : 'Activate'}
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            {/* Pagination */}
            {totalItems > 0 && (
              <div className="flex items-center justify-between mt-4 text-gray-500 text-xs">
                <span>
                  {`${startIndex + 1}-${Math.min(endIndex, totalItems)} of ${totalItems} items`}
                </span>
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
                      <span key={`ellipsis-${index}`} className="px-2 py-1">...</span>
                    ) : (
                      <button
                        key={page}
                        className={`px-2 py-1 rounded border ${
                          currentPage === page
                            ? 'bg-orange-400 text-white font-bold'
                            : 'bg-white hover:bg-gray-50'
                        }`}
                        onClick={() => goToPage(page as number)}
                      >
                        {page}
                      </button>
                    )
                  ))}
                  
                  <button
                    className={`px-2 py-1 rounded border ${
                      currentPage === totalPages || totalPages === 0
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-white hover:bg-gray-50'
                    }`}
                    disabled={currentPage === totalPages || totalPages === 0}
                    onClick={goToNext}
                  >
                    {">"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        {/* Footer */}
           </main>
    </div>
  );
};

export default withAdminAuth(MemberLists);
