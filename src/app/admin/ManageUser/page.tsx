"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Sidebar from "@/components/Sidebar";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import AvatarDropdown from "@/components/AvatarDropdown";
import { withAdminAuth } from '@/hooks/useAuth';

interface FamilyInfo {
  fatherName?: string;
  motherName?: string;
  fatherNative?: string;
  motherNative?: string;
  fatherProfession?: string;
  motherProfession?: string;
  phoneNumber?: string;
  address?: string;
  brothers?: number;
  elderBrother?: number;
  youngerBrother?: number;
  marriedBrother?: number;
  sisters?: number;
  elderSister?: number;
  youngerSister?: number;
  marriedSister?: number;
}

interface HoroscopeInfo {
  zodiacSign?: string;
  tamilYear?: string;
  tamilMonth?: string;
  udayathiNatchat?: string;
  day?: string;
  birthTime?: string;
  starFoot?: string;
  ascendant?: string;
  birthplace?: string;
  natalDirection?: string;
}

interface User {
  regNo: string;
  avatar?: string;
  name: string;
  email?: string;
  mobile?: string;
  gender?: string;
  father?: string;
  dob?: string;
  credits?: number; // Add credits field
  createdAt?: Date | string; // Add created at field
  // Optional fields for extended functionality
  image?: string;
  phone?: string;
  age?: number;
  caste?: string;
  gallery?: string[];
  family?: FamilyInfo;
  familyProperty?: string;
  height?: string;
  qualification?: string;
  color?: string;
  typeOfFood?: string;
  career?: string;
  salary?: string;
  expectation?: string;
  star?: string;
  marriageStatus?: string;
  horoscope?: HoroscopeInfo;
  horoscopeProfile?: HoroscopeInfo;
  chart?: string[];
  status?: string;
  isActive?: boolean;
  userId?: number;
}

const ManageUser = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [editingCredits, setEditingCredits] = useState<{
    [key: number]: boolean;
  }>({});
  const [tempCredits, setTempCredits] = useState<{ [key: number]: number }>({});
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Multiple download states
  const [selectedUsers, setSelectedUsers] = useState<Set<string>>(new Set());
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);  const [downloadFilters, setDownloadFilters] = useState({
    gender: "",
    dobFrom: "",
    dobTo: "",
    createdAtFrom: "",
    createdAtTo: "",
    status: "",
    caste: "",
    star: "",
    marriageStatus: "",
    regNo: ""
  });

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
  useEffect(() => {
    // Fetch users data from API
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/admin/users");
        if (!response.ok) throw new Error("Failed to fetch users");
        const data = await response.json();
        console.log(data, "Fetched users data");

        // The API returns { users: [...] }, so we need to extract the users array
        if (data && Array.isArray(data.users)) {
          setUsers(data.users);
        } else {
          console.warn("API response does not contain users array:", data);
          setUsers([]);
        }
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Error fetching users");
        }
        setUsers([]); // Ensure users is always an array even on error
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);
  // Helper to convert image url to base64
  async function toDataUrl(url: string): Promise<string> {
    return await new Promise((resolve, reject) => {
      const img = new window.Image();
      img.crossOrigin = "Anonymous";
      img.onload = function () {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        if (!ctx) return reject("No ctx");
        ctx.drawImage(img, 0, 0);
        resolve(canvas.toDataURL("image/jpeg"));
      };
      img.onerror = reject;
      img.src = url;
    });
  }

  // Handle checkbox selection
  const handleSelectUser = (regNo: string) => {
    const newSelected = new Set(selectedUsers);
    if (newSelected.has(regNo)) {
      newSelected.delete(regNo);
    } else {
      newSelected.add(regNo);
    }
    setSelectedUsers(newSelected);
  };

  // Handle select all checkbox
  const handleSelectAll = () => {
    if (selectedUsers.size === currentUsers.length) {
      setSelectedUsers(new Set());
    } else {
      setSelectedUsers(new Set(currentUsers.map(user => user.regNo)));
    }
  };  // Filter users based on download filters
  const getFilteredUsersForDownload = () => {
    let filtered = [...filteredUsers];
    
    console.log('Starting with filtered users:', filtered.length);
    console.log('Download filters:', downloadFilters);
    
    if (downloadFilters.gender) {
      filtered = filtered.filter(user => 
        user.gender?.toLowerCase() === downloadFilters.gender.toLowerCase()
      );
      console.log('After gender filter:', filtered.length);
    }
    
    // Status filtering
    if (downloadFilters.status) {
      filtered = filtered.filter(user => {
        if (downloadFilters.status === "active") {
          return user.isActive === true;
        } else if (downloadFilters.status === "inactive") {
          return user.isActive === false;
        }
        return true;
      });
      console.log('After status filter:', filtered.length);
    }

    // Caste filtering
    if (downloadFilters.caste) {
      filtered = filtered.filter(user => 
        user.caste?.toLowerCase().includes(downloadFilters.caste.toLowerCase())
      );
      console.log('After caste filter:', filtered.length);
    }

    // Star filtering
    if (downloadFilters.star) {
      filtered = filtered.filter(user => 
        user.star?.toLowerCase().includes(downloadFilters.star.toLowerCase())
      );
      console.log('After star filter:', filtered.length);
    }

    // Marriage Status filtering
    if (downloadFilters.marriageStatus) {
      filtered = filtered.filter(user => 
        user.marriageStatus?.toLowerCase() === downloadFilters.marriageStatus.toLowerCase()
      );
      console.log('After marriage status filter:', filtered.length);
    }
    
    // DOB range filtering
    if (downloadFilters.dobFrom || downloadFilters.dobTo) {
      filtered = filtered.filter(user => {
        if (!user.dob) return false;
        
        const userDob = new Date(user.dob);
        if (isNaN(userDob.getTime())) return false;
        
        let matchesRange = true;
        
        if (downloadFilters.dobFrom) {
          const fromDate = new Date(downloadFilters.dobFrom);
          if (!isNaN(fromDate.getTime())) {
            matchesRange = matchesRange && userDob >= fromDate;
          }
        }
        
        if (downloadFilters.dobTo) {
          const toDate = new Date(downloadFilters.dobTo);
          if (!isNaN(toDate.getTime())) {
            // Set to end of day for inclusive comparison
            toDate.setHours(23, 59, 59, 999);
            matchesRange = matchesRange && userDob <= toDate;
          }
        }
        
        return matchesRange;
      });
      console.log('After DOB range filter:', filtered.length);
    }
    
    // Created At range filtering
    if (downloadFilters.createdAtFrom || downloadFilters.createdAtTo) {
      filtered = filtered.filter(user => {
        if (!user.createdAt) return false;
        
        const userCreatedAt = new Date(user.createdAt);
        if (isNaN(userCreatedAt.getTime())) return false;
        
        let matchesRange = true;
        
        if (downloadFilters.createdAtFrom) {
          const fromDate = new Date(downloadFilters.createdAtFrom);
          if (!isNaN(fromDate.getTime())) {
            matchesRange = matchesRange && userCreatedAt >= fromDate;
          }
        }
        
        if (downloadFilters.createdAtTo) {
          const toDate = new Date(downloadFilters.createdAtTo);
          if (!isNaN(toDate.getTime())) {
            // Set to end of day for inclusive comparison
            toDate.setHours(23, 59, 59, 999);
            matchesRange = matchesRange && userCreatedAt <= toDate;
          }
        }
        
        return matchesRange;
      });
      console.log('After Created At range filter:', filtered.length);
    }
    
    if (downloadFilters.regNo) {
      filtered = filtered.filter(user => 
        user.regNo.toLowerCase().includes(downloadFilters.regNo.toLowerCase())
      );
      console.log('After regNo filter:', filtered.length);
    }

    console.log('Final filtered count:', filtered.length);
    return filtered;
  };  // Helper function to add header and footer to PDF page
  const addHeaderFooterToPDF = async (doc: any) => {
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    
    try {
      // Add header image
      const headerImgData = await toDataUrl('/images/header.png');
      doc.addImage(
        headerImgData,
        "PNG",
        0,
        0,
        pageWidth,
        60, // Header height
        undefined,
        "FAST"
      );
    } catch (e) {
      console.log('Could not load header image:', e);
    }

    try {
      // Add footer image
      const footerImgData = await toDataUrl('/images/footer.png');
      doc.addImage(
        footerImgData,
        "PNG",
        0,
        pageHeight - 60, // Footer positioned at bottom
        pageWidth,
        60, // Footer height
        undefined,
        "FAST"
      );
    } catch (e) {
      console.log('Could not load footer image:', e);
    }
  };
  // Helper function to add a single profile to the PDF
  const addProfileToPDF = async (doc: any, profile: User, isFirst: boolean = false) => {
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    let y = 80; // Start below header (increased from 40)
    let leftX = 40;

    // Add new page if not the first profile
    if (!isFirst) {
      doc.addPage();
    }

    // Add header and footer to every page
    await addHeaderFooterToPDF(doc);    // Function to check if we need a new page for content overflow
    const checkPageBreak = async (requiredSpace: number) => {
      if (y + requiredSpace > pageHeight - 120) { // 120pt margin from bottom (60 for footer + 60 buffer)
        doc.addPage();
        await addHeaderFooterToPDF(doc);
        y = 80; // Reset Y position for new page (below header)
      }};    // --- Profile Image (top, centered) ---
    await checkPageBreak(280); // Check space for profile image and gallery
    if (profile.image) {
      try {
        const imgData = await toDataUrl(profile.image);
        doc.addImage(
          imgData,
          "JPEG",
          pageWidth / 2 - 85,
          y,
          170,
          210,
          undefined,
          "FAST"
        );
      } catch (e) {}
    }

    // --- Gallery Images (below main image, centered) ---
    let galleryY = y + 220;
    let galleryX = pageWidth / 2 - 90;
    if (Array.isArray(profile.gallery)) {
      for (let i = 0; i < profile.gallery.length && i < 4; i++) {
        try {
          const imgData = await toDataUrl(profile.gallery[i]);
          doc.addImage(
            imgData,
            "JPEG",
            galleryX,
            galleryY,
            40,
            40,
            undefined,
            "FAST"
          );
          galleryX += 45;
        } catch (e) {}
      }
    }
    y = galleryY + 60;    // --- Profile Info (two columns) ---
    await checkPageBreak(200); // Check space for profile info section
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text(profile.name || "-", leftX, y);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    y += 24;
    doc.text(`Reg. No : ${profile.regNo || "-"}`, leftX, y);
    y += 18;

    // 2 columns for main info
    const infoRows = [
      [
        { label: "Email", value: profile.email },
        { label: "Phone", value: profile.phone || profile.mobile },
      ],
      [
        { label: "Date Of Birth", value: profile.dob },
        { label: "Age", value: profile.age },
      ],
      [
        { label: "Star", value: profile.star },
        { label: "Marriage Status", value: profile.marriageStatus },
      ],
      [
        { label: "Height", value: profile.height },
        { label: "Qualification", value: profile.qualification },
      ],
      [
        { label: "Color", value: profile.color },
        { label: "Caste", value: profile.caste },
      ],
      [
        { label: "Family Property", value: profile.familyProperty },
        { label: "Type of food", value: profile.typeOfFood },
      ],
      [
        { label: "Career", value: profile.career },
        { label: "Salary", value: profile.salary },
      ],
      [
        { label: "Expectation", value: profile.expectation },
        { label: "", value: "" },
      ],
    ];

    infoRows.forEach((row) => {
      let colX = leftX;
      row.forEach((cell) => {
        if (cell.label) {
          doc.setFont("helvetica", "bold");
          doc.text(cell.label, colX, y);
          doc.setFont("helvetica", "normal");
          doc.text(cell.value ? String(cell.value) : "-", colX + 90, y, {
            maxWidth: 120,
          });
        }
        colX += 250;
      });      y += 18;
    });
    y += 18;    // --- Family Information Section (two columns) ---
    await checkPageBreak(200); // Check space for family section
    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.text("Family Information", leftX, y);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    y += 18;

    const fam = profile.family || {};
    const famRows = [
      [
        { label: "Father's Name", value: fam.fatherName },
        { label: "Mother's Name", value: fam.motherName },
      ],
      [
        { label: "Father's Native", value: fam.fatherNative },
        { label: "Mother's Native", value: fam.motherNative },
      ],
      [
        { label: "Father's Profession", value: fam.fatherProfession },
        { label: "Mother's Profession", value: fam.motherProfession },
      ],
      [
        { label: "Phone Number", value: fam.phoneNumber },
        { label: "Address", value: fam.address },
      ],
      [
        { label: "Brothers", value: fam.brothers },
        { label: "Elder Brother", value: fam.elderBrother },
      ],
      [
        { label: "Younger Brother", value: fam.youngerBrother },
        { label: "Married", value: fam.marriedBrother },
      ],
      [
        { label: "Sisters", value: fam.sisters },
        { label: "Elder Sister", value: fam.elderSister },
      ],
      [
        { label: "Younger Sister", value: fam.youngerSister },
        { label: "Married", value: fam.marriedSister },
      ],
    ];

    famRows.forEach((row) => {
      let colX = leftX;
      row.forEach((cell) => {
        doc.setFont("helvetica", "bold");
        doc.text(cell.label, colX, y);
        doc.setFont("helvetica", "normal");
        doc.text(
          cell.value !== undefined && cell.value !== null
            ? String(cell.value)
            : "-",
          colX + 110,
          y,
          { maxWidth: 120 }
        );
        colX += 270;
      });
      y += 18;    });
    y += 18;    // --- Horoscope Information Section (two columns) ---
    await checkPageBreak(150); // Check space for horoscope section
    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.text("Horoscope Information", leftX, y);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    y += 18;

    const horo = profile.horoscope || profile.horoscopeProfile || {};
    const horoRows = [
      [
        { label: "Zodiac Sign", value: horo.zodiacSign },
        { label: "Tamil year", value: horo.tamilYear },
      ],
      [
        { label: "Tamil month", value: horo.tamilMonth },
        { label: "Udayathi Natchat", value: horo.udayathiNatchat },
      ],
      [
        { label: "Day", value: horo.day },
        { label: "Birth Time", value: horo.birthTime },
      ],
      [
        { label: "Star/Foot", value: horo.starFoot },
        { label: "Ascendant (Lagnam)", value: horo.ascendant },
      ],
      [
        { label: "Birthplace", value: horo.birthplace },
        { label: "Presence of natal direction", value: horo.natalDirection },
      ],
    ];

    horoRows.forEach((row) => {
      let colX = leftX;
      row.forEach((cell) => {
        doc.setFont("helvetica", "bold");
        doc.text(cell.label, colX, y);
        doc.setFont("helvetica", "normal");
        doc.text(
          cell.value !== undefined && cell.value !== null
            ? String(cell.value)
            : "-",
          colX + 110,
          y,
          { maxWidth: 120 }
        );
        colX += 270;
      });
      y += 18;
    });
    y += 18;

    // --- Horoscope Chart (if available) ---
    if (Array.isArray(profile.chart) && profile.chart.length > 0) {
      doc.setFont("helvetica", "bold");
      doc.setFontSize(13);
      doc.text("Horoscope Chart", leftX, y);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(11);
      y += 18;

      // Draw a 4x4 grid for chart
      const cellW = 100,
        cellH = 40;
      for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 4; col++) {
          const idx = row * 4 + col;
          doc.rect(leftX + col * cellW, y + row * cellH, cellW, cellH);
          if (profile.chart[idx]) {
            doc.text(
              String(profile.chart[idx]),
              leftX + col * cellW + 5,
              y + row * cellH + 20,
              { maxWidth: cellW - 10 }
            );
          }
        }
      }
    }
  };
  // Download multiple profiles in a single PDF
  const handleMultipleProfilesPDF = async (profiles: User[]) => {
    const doc = new jsPDF({ orientation: "p", unit: "pt", format: "a4" });
    
    // Add header and footer to the first page
    await addHeaderFooterToPDF(doc);
    
    // Add each profile to the PDF
    for (let i = 0; i < profiles.length; i++) {
      await addProfileToPDF(doc, profiles[i], i === 0);
    }

    // Generate filename with timestamp
    const timestamp = new Date().toISOString().slice(0, 10);
    const filename = `multiple_profiles_${profiles.length}_${timestamp}.pdf`;
    
    doc.save(filename);
  };
  const handleMultipleDownload = async () => {
    setIsDownloading(true);
    try {
      let profilesToDownload: User[] = [];
      
      // Priority order:
      // 1. If profiles are selected, include them
      // 2. If filters are applied, include filtered results
      // 3. If no selection and no filters, download all visible users
      
      const hasFilters = Object.values(downloadFilters).some(filter => filter.trim() !== "");
      const hasSelectedProfiles = selectedUsers.size > 0;
      
      if (hasSelectedProfiles && hasFilters) {
        // Combine selected profiles with filtered results
        const selectedProfiles = filteredUsers.filter(user => selectedUsers.has(user.regNo));
        const filteredProfiles = getFilteredUsersForDownload();
        
        // Create a Set to avoid duplicates
        const combinedRegNos = new Set([
          ...selectedProfiles.map(p => p.regNo),
          ...filteredProfiles.map(p => p.regNo)
        ]);
        
        profilesToDownload = filteredUsers.filter(user => combinedRegNos.has(user.regNo));
      } else if (hasSelectedProfiles) {
        // Use only selected profiles
        profilesToDownload = filteredUsers.filter(user => selectedUsers.has(user.regNo));
      } else if (hasFilters) {
        // Use only filtered results
        profilesToDownload = getFilteredUsersForDownload();
      } else {
        // If no selection and no filters, download all visible users
        profilesToDownload = currentUsers;
      }

      if (profilesToDownload.length === 0) {
        alert("No profiles to download. Please select profiles or apply filters.");
        return;
      }

      // Show detailed confirmation message
      let confirmMessage = `This will download ${profilesToDownload.length} profile(s) in a single PDF file.\n\n`;
      if (hasSelectedProfiles && hasFilters) {
        confirmMessage += `Includes:\n• ${selectedUsers.size} selected profile(s)\n• ${getFilteredUsersForDownload().length} filtered profile(s)\n\n`;
      } else if (hasSelectedProfiles) {
        confirmMessage += `Includes ${selectedUsers.size} selected profile(s).\n\n`;
      } else if (hasFilters) {
        confirmMessage += `Includes profiles matching your filters.\n\n`;
      } else {
        confirmMessage += `Includes all visible profiles on current page.\n\n`;
      }
      confirmMessage += "Continue?";
      
      if (!confirm(confirmMessage)) {
        return;
      }

      // Create a single PDF with all profiles
      await handleMultipleProfilesPDF(profilesToDownload);      // Clear selections and close modal
      setSelectedUsers(new Set());
      setShowFilterModal(false);      setDownloadFilters({
        gender: "",
        dobFrom: "",
        dobTo: "",
        createdAtFrom: "",
        createdAtTo: "",
        status: "",
        caste: "",
        star: "",
        marriageStatus: "",
        regNo: ""
      });
      
      alert(`Successfully downloaded ${profilesToDownload.length} profile(s) in a single PDF!`);
    } catch (error) {
      console.error("Error downloading profiles:", error);
      alert("Error downloading profiles. Please try again.");
    } finally {
      setIsDownloading(false);
    }
  };

  // At the top of your component, after useState/useEffect
  // const testClick = () => {
  //   alert('Button clicked!');
  //   console.log('Button click works!');
  // };
  // Download PDF for a user
  const handleDownload = async (profile: any) => {
    const doc = new jsPDF({ orientation: "p", unit: "pt", format: "a4" });
    const pageWidth = doc.internal.pageSize.getWidth();
    let y = 80; // Start below header (increased from 40)
    let leftX = 40;
    let rightX = pageWidth - 220;

    // Add header and footer to the page
    await addHeaderFooterToPDF(doc);

    // --- Profile Image (top, centered) ---
    if (profile.image) {
      try {
        const imgData = await toDataUrl(profile.image);
        doc.addImage(
          imgData,
          "JPEG",
          pageWidth / 2 - 85,
          y,
          170,
          210,
          undefined,
          "FAST"
        );
      } catch (e) {}
    }

    // --- Gallery Images (below main image, centered) ---
    let galleryY = y + 220;
    let galleryX = pageWidth / 2 - 90;
    if (Array.isArray(profile.gallery)) {
      for (let i = 0; i < profile.gallery.length && i < 4; i++) {
        try {
          const imgData = await toDataUrl(profile.gallery[i]);
          doc.addImage(
            imgData,
            "JPEG",
            galleryX,
            galleryY,
            40,
            40,
            undefined,
            "FAST"
          );
          galleryX += 45;
        } catch (e) {}
      }
    }
    y = galleryY + 60;

    // --- Profile Info (two columns) ---
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text(profile.name || "-", leftX, y);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    y += 24;
    doc.text(`Reg. No : ${profile.regNo || "-"}`, leftX, y);
    y += 18;
    // 2 columns for main info
    const infoRows = [
      [
        { label: "Email", value: profile.email },
        { label: "Phone", value: profile.phone },
      ],
      [
        { label: "Date Of Birth", value: profile.dob },
        { label: "Age", value: profile.age },
      ],
      [
        { label: "Star", value: profile.star },
        { label: "Marriage Status", value: profile.marriageStatus },
      ],
      [
        { label: "Height", value: profile.height },
        { label: "Qualification", value: profile.qualification },
      ],
      [
        { label: "Color", value: profile.color },
        { label: "Caste", value: profile.caste },
      ],
      [
        { label: "Family Property", value: profile.familyProperty },
        { label: "Type of food", value: profile.typeOfFood },
      ],
      [
        { label: "Career", value: profile.career },
        { label: "Salary", value: profile.salary },
      ],
      [
        { label: "Expectation", value: profile.expectation },
        { label: "", value: "" },
      ],
    ];
    infoRows.forEach((row) => {
      let colX = leftX;
      row.forEach((cell) => {
        if (cell.label) {
          doc.setFont("helvetica", "bold");
          doc.text(cell.label, colX, y);
          doc.setFont("helvetica", "normal");
          doc.text(cell.value ? String(cell.value) : "-", colX + 90, y, {
            maxWidth: 120,
          });
        }
        colX += 250;
      });
      y += 18;
    });
    y += 18;

    // --- Family Information Section (two columns) ---
    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.text("Family Information", leftX, y);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    y += 18;
    const fam = profile.family || {};
    const famRows = [
      [
        { label: "Father's Name", value: fam.fatherName },
        { label: "Mother's Name", value: fam.motherName },
      ],
      [
        { label: "Father's Native", value: fam.fatherNative },
        { label: "Mother's Native", value: fam.motherNative },
      ],
      [
        { label: "Father's Profession", value: fam.fatherProfession },
        { label: "Mother's Profession", value: fam.motherProfession },
      ],
      [
        { label: "Phone Number", value: fam.phoneNumber },
        { label: "Address", value: fam.address },
      ],
      [
        { label: "Brothers", value: fam.brothers },
        { label: "Elder Brother", value: fam.elderBrother },
      ],
      [
        { label: "Younger Brother", value: fam.youngerBrother },
        { label: "Married", value: fam.marriedBrother },
      ],
      [
        { label: "Sisters", value: fam.sister },
        { label: "Elder Sister", value: fam.elderSister },
      ],
      [
        { label: "Younger Sister", value: fam.youngerSister },
        { label: "Married", value: fam.marriedSister },
      ],
    ];
    famRows.forEach((row) => {
      let colX = leftX;
      row.forEach((cell) => {
        doc.setFont("helvetica", "bold");
        doc.text(cell.label, colX, y);
        doc.setFont("helvetica", "normal");
        doc.text(
          cell.value !== undefined && cell.value !== null
            ? String(cell.value)
            : "-",
          colX + 110,
          y,
          { maxWidth: 120 }
        );
        colX += 270;
      });
      y += 18;
    });
    y += 18;

    // --- Horoscope Information Section (two columns) ---
    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.text("Horoscope Information", leftX, y);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    y += 18;
    const horo = profile.horoscope || profile.horoscopeProfile || {};
    const horoRows = [
      [
        { label: "Zodiac Sign", value: horo.zodiacSign },
        { label: "Tamil year", value: horo.tamilYear },
      ],
      [
        { label: "Tamil month", value: horo.tamilMonth },
        { label: "Udayathi Natchat", value: horo.udayathiNatchat },
      ],
      [
        { label: "Day", value: horo.day },
        { label: "Birth Time", value: horo.birthTime },
      ],
      [
        { label: "Star/Foot", value: horo.starFoot },
        { label: "Ascendant (Lagnam)", value: horo.ascendant },
      ],
      [
        { label: "Birthplace", value: horo.birthplace },
        { label: "Presence of natal direction", value: horo.natalDirection },
      ],
    ];
    horoRows.forEach((row) => {
      let colX = leftX;
      row.forEach((cell) => {
        doc.setFont("helvetica", "bold");
        doc.text(cell.label, colX, y);
        doc.setFont("helvetica", "normal");
        doc.text(
          cell.value !== undefined && cell.value !== null
            ? String(cell.value)
            : "-",
          colX + 110,
          y,
          { maxWidth: 120 }
        );
        colX += 270;
      });
      y += 18;
    });
    y += 18;    // --- Horoscope Chart (if available) ---
    if (Array.isArray(profile.chart) && profile.chart.length > 0) {
      await checkPageBreak(180); // Check space for horoscope chart section
      doc.setFont("helvetica", "bold");
      doc.setFontSize(13);
      doc.text("Horoscope Chart", leftX, y);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(11);
      y += 18;
      // Draw a 4x4 grid for chart
      const cellW = 100,
        cellH = 40;
      for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 4; col++) {
          const idx = row * 4 + col;
          doc.rect(leftX + col * cellW, y + row * cellH, cellW, cellH);
          if (profile.chart[idx]) {
            doc.text(
              String(profile.chart[idx]),
              leftX + col * cellW + 5,
              y + row * cellH + 20,
              { maxWidth: cellW - 10 }
            );
          }
        }
      }
    }
    doc.save(`${profile.name || "profile"}_profile.pdf`);
  };

  const testClick = () => {
    alert("Button clicked!");
    console.log("Button click works!");
  }; // Toggle user status function
  const toggleUserStatus = async (userId: number, currentStatus: boolean) => {
    try {
      const response = await fetch("/api/admin/users/toggle-status", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userId,
          isActive: !currentStatus,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to toggle user status");
      }

      const result = await response.json();

      // Update the users list with the new status
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.userId === userId
            ? {
                ...user,
                isActive: !currentStatus,
                status: !currentStatus ? "Active" : "Inactive",
              }
            : user
        )
      );

      console.log("Status updated successfully:", result.message);
    } catch (error) {
      console.error("Error toggling user status:", error);
      alert("Failed to update user status. Please try again.");
    }
  };

  // Credits management functions
  const startEditingCredits = (userId: number, currentCredits: number) => {
    setEditingCredits((prev) => ({ ...prev, [userId]: true }));
    setTempCredits((prev) => ({ ...prev, [userId]: currentCredits }));
  };

  const cancelEditingCredits = (userId: number) => {
    setEditingCredits((prev) => ({ ...prev, [userId]: false }));
    setTempCredits((prev) => {
      const newState = { ...prev };
      delete newState[userId];
      return newState;
    });
  };

  const saveCredits = async (userId: number) => {
    try {
      const newCredits = tempCredits[userId];
      if (newCredits < 0) {
        alert("Credits cannot be negative");
        return;
      }

      const response = await fetch("/api/admin/users/credits", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userId,
          credits: newCredits,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update credits");
      }

      const result = await response.json();

      // Update the users list with the new credits
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.userId === userId ? { ...user, credits: newCredits } : user
        )
      );

      // Clear editing state
      setEditingCredits((prev) => ({ ...prev, [userId]: false }));
      setTempCredits((prev) => {
        const newState = { ...prev };
        delete newState[userId];
        return newState;
      });

      alert(result.message || "Credits updated successfully");
    } catch (error) {
      console.error("Error updating credits:", error);
      alert("Failed to update credits. Please try again.");
    }
  };
  // Filter users to only show active users and match search query
  const filteredUsers = Array.isArray(users)
    ? users.filter((profile) => {
        // Only show active users
        if (profile.isActive === false) {
          return false;
        }

        const query = searchQuery.toLowerCase();
        const matchesSearch =
          (profile.name && profile.name.toLowerCase().includes(query)) ||
          (profile.gender && profile.gender.toLowerCase().includes(query)) ||
          (profile.dob && profile.dob.toLowerCase().includes(query)) ||
          (profile.regNo && profile.regNo.toLowerCase().includes(query)) ||
          (profile.email && profile.email.toLowerCase().includes(query)) ||
          (profile.mobile && profile.mobile.toLowerCase().includes(query));

        return matchesSearch;
      })
    : [];

  // Pagination calculations
  const totalItems = filteredUsers.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentUsers = filteredUsers.slice(startIndex, endIndex);
  // Reset to first page when search query changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, itemsPerPage]);

  // Handle items per page change
  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  };

  // Pagination functions
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      const half = Math.floor(maxVisiblePages / 2);
      let start = Math.max(currentPage - half, 1);
      let end = Math.min(start + maxVisiblePages - 1, totalPages);

      if (end - start < maxVisiblePages - 1) {
        start = Math.max(end - maxVisiblePages + 1, 1);
      }

      if (start > 1) {
        pageNumbers.push(1);
        if (start > 2) {
          pageNumbers.push("...");
        }
      }

      for (let i = start; i <= end; i++) {
        pageNumbers.push(i);
      }

      if (end < totalPages) {
        if (end < totalPages - 1) {
          pageNumbers.push("...");
        }
        pageNumbers.push(totalPages);
      }
    }

    return pageNumbers;
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />
      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {/* Minimal Test Button */}        {/* Top Bar */}
        <div className="flex items-center justify-between px-8 py-4 bg-white shadow-sm">
          <div className="flex items-center gap-4">
            <h2 className="text-lg font-semibold">Manage Users</h2>
            {selectedUsers.size > 0 && (
              <div className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm">
                {selectedUsers.size} profile(s) selected
              </div>
            )}
          </div>{" "}          <div className="flex items-center gap-4">
            <input
              type="text"
              placeholder="Search by name, gender, dob, reg no..."
              className="border rounded px-3 py-2 text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />{" "}            {/* Selection Summary Badge and Actions */}
            {selectedUsers.size > 0 && (
              <div className="flex items-center gap-2">
                <div className="bg-blue-100 text-blue-800 px-3 py-2 rounded text-sm font-medium">
                  {selectedUsers.size} selected
                </div>
                <button
                  onClick={async () => {
                    const selectedProfiles = filteredUsers.filter(user => selectedUsers.has(user.regNo));
                    if (selectedProfiles.length > 0) {
                      setIsDownloading(true);
                      try {
                        await handleMultipleProfilesPDF(selectedProfiles);
                        setSelectedUsers(new Set());
                      } catch (error) {
                        console.error('Download failed:', error);
                        alert('Download failed. Please try again.');
                      } finally {
                        setIsDownloading(false);
                      }
                    }
                  }}
                  disabled={isDownloading}
                  className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm disabled:opacity-50"
                  title="Quick download selected profiles"
                >
                  {isDownloading ? "..." : "Quick Download"}
                </button>
                <button
                  onClick={() => setSelectedUsers(new Set())}
                  className="text-blue-600 hover:text-blue-800 text-sm underline"
                  title="Clear selection"
                >
                  Clear
                </button>
              </div>
            )}
            
            <button 
              className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded flex items-center gap-2 disabled:opacity-50"
              onClick={() => setShowFilterModal(true)}
              disabled={isDownloading}
            >
              <Image
                src="/icons/downloadwhite.svg"
                alt="Download"
                width={18}
                height={18}
                color="white"
              />
              {isDownloading ? "Downloading..." : "Download Multiple"}
            </button>
            <AvatarDropdown
              userEmail="admin@gmail.com"
              avatarSrc="/icons/profileicon.svg"
            />
          </div>
        </div>
        {/* Table */}
        <div className="flex-1 overflow-auto px-8 py-6">
          {loading ? (
            <div className="text-center py-10">Loading...</div>
          ) : error ? (
            <div className="text-center text-red-500 py-10">{error}</div>
          ) : (
            <table className="min-w-full bg-white rounded shadow text-center">
              {" "}              <thead>
                {" "}
                <tr className="text-gray-500 text-sm border-b">                  <th className="px-3 py-2">
                    <input 
                      type="checkbox" 
                      checked={selectedUsers.size === currentUsers.length && currentUsers.length > 0}
                      onChange={handleSelectAll}
                      title={selectedUsers.size === currentUsers.length ? 
                        "Deselect all profiles on this page" : 
                        "Select all profiles on this page"}
                      className="cursor-pointer"
                    />
                  </th>
                  <th className="px-3 py-2">Reg.No</th>
                  <th className="px-3 py-2">Profile</th>
                  <th className="px-3 py-2">Father Name</th>
                  <th className="px-3 py-2">Gender</th>
                  <th className="px-3 py-2">Date of Birth</th>
                  <th className="px-3 py-2">Created At</th>
                  <th className="px-3 py-2">ContactNo</th>
                  <th className="px-3 py-2">Credits</th>
                  <th className="px-3 py-2">Action</th>
                </tr>
              </thead>{" "}
              <tbody>
                {currentUsers.map((profile, idx) => (
                  <tr key={idx} className="border-b hover:bg-gray-50">                    <td className="px-3 py-2 text-center">
                      <input 
                        type="checkbox" 
                        checked={selectedUsers.has(profile.regNo)}
                        onChange={() => handleSelectUser(profile.regNo)}
                      />
                    </td>
                    <td className="px-3 py-2 text-center">{profile.regNo}</td>
                    <td className="px-3 py-2 flex items-center gap-2 justify-center">
                      <Image
                        src={
                          profile.avatar ||
                          profile.image ||
                          "/images/profilepicture.png"
                        }
                        alt={profile.name}
                        width={32}
                        height={32}
                        className="rounded-full"
                      />
                      {profile.name}
                    </td>
                    <td className="px-3 py-2 text-center">
                      {profile.father || "-"}
                    </td>
                    <td className="px-3 py-2 text-center">
                      {profile.gender || "-"}
                    </td>                    <td className="px-3 py-2 text-center">
                      {profile.dob || "-"}
                    </td>
                    <td className="px-3 py-2 text-center">
                      {formatDate(profile.createdAt)}
                    </td>{" "}
                    <td className="px-3 py-2 text-center">
                      {profile.mobile || profile.phone || "-"}
                    </td>
                    <td className="px-3 py-2 text-center">
                      {profile.userId && editingCredits[profile.userId] ? (
                        <div className="flex items-center justify-center gap-2">
                          <input
                            type="number"
                            min="0"
                            value={tempCredits[profile.userId] || 0}
                            onChange={(e) =>
                              setTempCredits((prev) => ({
                                ...prev,
                                [profile.userId!]:
                                  parseInt(e.target.value) || 0,
                              }))
                            }
                            className="w-16 px-2 py-1 border rounded text-center"
                          />
                          <button
                            onClick={() => saveCredits(profile.userId!)}
                            className="text-green-600 hover:text-green-800"
                            title="Save"
                          >
                            ✓
                          </button>
                          <button
                            onClick={() =>
                              cancelEditingCredits(profile.userId!)
                            }
                            className="text-red-600 hover:text-red-800"
                            title="Cancel"
                          >
                            ✕
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center gap-2">
                          <span>{profile.credits || 0}</span>
                          {profile.userId && (
                            <button
                              onClick={() =>
                                startEditingCredits(
                                  profile.userId!,
                                  profile.credits || 0
                                )
                              }
                              className="text-blue-600 hover:text-blue-800 text-xs"
                              title="Edit Credits"
                            >
                              ✏️
                            </button>
                          )}
                        </div>
                      )}
                    </td>
                    <td className="px-3 py-2 flex gap-3 justify-center">
                      <button
                        onClick={() => {
                          // View profile
                          const id = profile.regNo.replace(/^VKR/, "");
                          window.location.href = `/admin/profile/${id}`;
                        }}
                      >
                        <Image
                          src="/icons/eye.svg"
                          alt="View"
                          width={20}
                          height={20}
                        />
                      </button>
                      <button onClick={() => handleDownload(profile)}>
                        <Image
                          src="/icons/download.svg"
                          alt="Download"
                          width={20}
                          height={20}
                        />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}{" "}
          {/* Pagination */}
          <div className="flex items-center justify-between mt-4 text-sm text-gray-500 w-full max-w-[1200px] mx-auto">
            <div className="flex items-center gap-4">
              <span>
                {totalItems > 0
                  ? `${startIndex + 1}-${Math.min(
                      endIndex,
                      totalItems
                    )} of ${totalItems} profiles`
                  : "0 profiles"}
              </span>
              <div className="flex items-center gap-2">
                <span>Show:</span>
                <select
                  value={itemsPerPage}
                  onChange={(e) =>
                    handleItemsPerPageChange(Number(e.target.value))
                  }
                  className="border rounded px-2 py-1 text-sm"
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={50}>50</option>
                </select>
                <span>per page</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={goToPreviousPage}
                className={`px-2 py-1 border rounded ${
                  currentPage === 1
                    ? "disabled:opacity-50 cursor-not-allowed"
                    : "hover:bg-gray-100"
                }`}
                disabled={currentPage === 1}
              >
                {"<"}
              </button>

              {getPageNumbers().map((pageNum, idx) => (
                <button
                  key={idx}
                  onClick={() =>
                    typeof pageNum === "number" ? goToPage(pageNum) : null
                  }
                  className={`px-3 py-1 border rounded ${
                    pageNum === currentPage
                      ? "bg-orange-500 text-white"
                      : typeof pageNum === "number"
                      ? "hover:bg-gray-100"
                      : "cursor-default"
                  }`}
                  disabled={typeof pageNum !== "number"}
                >
                  {pageNum}
                </button>
              ))}

              <button
                onClick={goToNextPage}
                className={`px-2 py-1 border rounded ${
                  currentPage === totalPages
                    ? "disabled:opacity-50 cursor-not-allowed"
                    : "hover:bg-gray-100"
                }`}
                disabled={currentPage === totalPages}
              >
                {">"}
              </button>
            </div>
          </div>        </div>
        {/* Footer */}
      </main>

      {/* Filter Modal */}
      {showFilterModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg w-[600px] max-h-[80vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="bg-orange-500 rounded-t-lg px-6 py-4 flex items-center justify-between">
              <h3 className="text-white font-semibold text-lg">Download Multiple Profiles</h3>
              <button
                onClick={() => setShowFilterModal(false)}
                className="text-white hover:text-orange-200"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6">              <div className="mb-6">
                <h4 className="font-semibold text-gray-800 mb-2">Download Options</h4>
                <p className="text-gray-600 text-sm mb-4">
                  You can download profiles using multiple methods (they will be combined):
                </p>
                <ul className="text-sm text-gray-600 space-y-1 mb-6">
                  <li>• <strong>Selected Profiles:</strong> {selectedUsers.size} profile(s) currently selected from visible list</li>
                  <li>• <strong>Filtered Results:</strong> Apply filters below to find specific profiles</li>
                  <li>• <strong>All Visible:</strong> Download all {currentUsers.length} profiles on current page (if nothing selected/filtered)</li>
                  <li className="mt-3 p-2 bg-blue-50 text-blue-700 rounded text-xs">
                    <strong>Note:</strong> If you select profiles AND apply filters, both will be included in the download
                  </li>
                </ul>
              </div>              {/* Filters Section */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-800 mb-3">Filter Profiles (Optional)</h4>                <div className="grid grid-cols-2 gap-4">
                  {/* Gender Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                    <select
                      value={downloadFilters.gender}
                      onChange={(e) => setDownloadFilters({...downloadFilters, gender: e.target.value})}
                      className="w-full border rounded px-3 py-2 text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    >
                      <option value="">All Genders</option>
                      <option value="bride">Bride</option>
                      <option value="groom">Groom</option>
                    </select>
                  </div>

                  {/* Status Filter */}
                  {/* <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <select
                      value={downloadFilters.status}
                      onChange={(e) => setDownloadFilters({...downloadFilters, status: e.target.value})}
                      className="w-full border rounded px-3 py-2 text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    >
                      <option value="">All Status</option>
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div> */}

                  {/* Caste Filter */}
                  {/* <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Caste</label>
                    <input
                      type="text"
                      value={downloadFilters.caste}
                      onChange={(e) => setDownloadFilters({...downloadFilters, caste: e.target.value})}
                      placeholder="Enter caste..."
                      className="w-full border rounded px-3 py-2 text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    />
                  </div> */}

                  {/* Star Filter */}
                  {/* <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Star</label>
                    <input
                      type="text"
                      value={downloadFilters.star}
                      onChange={(e) => setDownloadFilters({...downloadFilters, star: e.target.value})}
                      placeholder="Enter star..."
                      className="w-full border rounded px-3 py-2 text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    />
                  </div> */}

                  {/* Marriage Status Filter */}
                  {/* <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Marriage Status</label>
                    <select
                      value={downloadFilters.marriageStatus}
                      onChange={(e) => setDownloadFilters({...downloadFilters, marriageStatus: e.target.value})}
                      className="w-full border rounded px-3 py-2 text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    >
                      <option value="">All Status</option>
                      <option value="unmarried">Unmarried</option>
                      <option value="divorced">Divorced</option>
                      <option value="widow">Widow</option>
                      <option value="widower">Widower</option>
                    </select>
                  </div> */}

                  {/* Registration Number */}
                  {/* <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Registration Number</label>
                    <input
                      type="text"
                      value={downloadFilters.regNo}
                      onChange={(e) => setDownloadFilters({...downloadFilters, regNo: e.target.value})}
                      placeholder="Enter registration number..."
                      className="w-full border rounded px-3 py-2 text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    />
                  </div> */}
                  
                  {/* Date of Birth Range */}
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth Range</label>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">From Date</label>
                        <input
                          type="date"
                          value={downloadFilters.dobFrom}
                          onChange={(e) => setDownloadFilters({...downloadFilters, dobFrom: e.target.value})}
                          className="w-full border rounded px-3 py-2 text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">To Date</label>
                        <input
                          type="date"
                          value={downloadFilters.dobTo}
                          onChange={(e) => setDownloadFilters({...downloadFilters, dobTo: e.target.value})}
                          className="w-full border rounded px-3 py-2 text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                        />
                      </div>
                    </div>
                  </div>
                  
                  {/* Created At Date Range */}
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">CreatedAt Date Range</label>                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">From Date</label>
                        <input
                          type="date"
                          value={downloadFilters.createdAtFrom}
                          onChange={(e) => setDownloadFilters({...downloadFilters, createdAtFrom: e.target.value})}
                          className="w-full border rounded px-3 py-2 text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">To Date</label>
                        <input
                          type="date"
                          value={downloadFilters.createdAtTo}
                          onChange={(e) => setDownloadFilters({...downloadFilters, createdAtTo: e.target.value})}
                          className="w-full border rounded px-3 py-2 text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>{/* Preview Section */}
              <div className="mb-6 p-4 bg-gray-50 rounded">
                <h5 className="font-medium text-gray-800 mb-2">Download Preview</h5>
                <div className="text-sm text-gray-600 space-y-1">
                  {/* Active Filters Display */}
                  {Object.entries(downloadFilters).some(([_, value]) => value.trim() !== "") && (
                    <div className="mb-3 p-3 bg-blue-50 rounded border-l-4 border-blue-400">
                      <p className="font-medium text-blue-800 mb-1">Active Filters:</p>                      <ul className="text-blue-700 text-xs space-y-1">
                        {downloadFilters.gender && <li>• Gender: {downloadFilters.gender === 'bride' ? 'Bride' : 'Groom'}</li>}
                        {downloadFilters.status && <li>• Status: {downloadFilters.status === 'active' ? 'Active' : 'Inactive'}</li>}
                        {downloadFilters.caste && <li>• Caste: {downloadFilters.caste}</li>}
                        {downloadFilters.star && <li>• Star: {downloadFilters.star}</li>}
                        {downloadFilters.marriageStatus && <li>• Marriage Status: {downloadFilters.marriageStatus}</li>}
                        {downloadFilters.regNo && <li>• Registration No: {downloadFilters.regNo}</li>}
                        {(downloadFilters.dobFrom || downloadFilters.dobTo) && (
                          <li>• Birth Date: {downloadFilters.dobFrom || 'Any'} to {downloadFilters.dobTo || 'Any'}</li>
                        )}
                        {(downloadFilters.createdAtFrom || downloadFilters.createdAtTo) && (
                          <li>• Registration Date: {downloadFilters.createdAtFrom || 'Any'} to {downloadFilters.createdAtTo || 'Any'}</li>
                        )}
                      </ul>
                    </div>
                  )}
                  
                  {/* Selection Summary */}
                  {selectedUsers.size > 0 && (
                    <p className="text-green-600">• Selected profiles: <span className="font-medium">{selectedUsers.size}</span></p>
                  )}
                  {Object.values(downloadFilters).some(filter => filter.trim() !== "") && (
                    <p className="text-blue-600">• Filtered profiles: <span className="font-medium">{getFilteredUsersForDownload().length}</span></p>
                  )}
                  {selectedUsers.size === 0 && !Object.values(downloadFilters).some(filter => filter.trim() !== "") && (
                    <p className="text-gray-600">• All visible profiles: <span className="font-medium">{currentUsers.length}</span></p>
                  )}
                  
                  <hr className="my-2" />
                  <p className="font-medium text-lg text-orange-600">
                    Total to download: <span className="text-orange-700">{(() => {
                      const hasFilters = Object.values(downloadFilters).some(filter => filter.trim() !== "");
                      const hasSelectedProfiles = selectedUsers.size > 0;
                      
                      if (hasSelectedProfiles && hasFilters) {
                        const selectedProfiles = filteredUsers.filter(user => selectedUsers.has(user.regNo));
                        const filteredProfiles = getFilteredUsersForDownload();
                        const combinedRegNos = new Set([
                          ...selectedProfiles.map(p => p.regNo),
                          ...filteredProfiles.map(p => p.regNo)
                        ]);
                        return combinedRegNos.size;
                      } else if (hasSelectedProfiles) {
                        return selectedUsers.size;
                      } else if (hasFilters) {
                        return getFilteredUsersForDownload().length;
                      } else {
                        return currentUsers.length;
                      }
                    })()} profiles</span>
                  </p>
                  
                  {/* Warning for large downloads */}
                  {(() => {
                    const totalCount = (() => {
                      const hasFilters = Object.values(downloadFilters).some(filter => filter.trim() !== "");
                      const hasSelectedProfiles = selectedUsers.size > 0;
                      
                      if (hasSelectedProfiles && hasFilters) {
                        const selectedProfiles = filteredUsers.filter(user => selectedUsers.has(user.regNo));
                        const filteredProfiles = getFilteredUsersForDownload();
                        const combinedRegNos = new Set([
                          ...selectedProfiles.map(p => p.regNo),
                          ...filteredProfiles.map(p => p.regNo)
                        ]);
                        return combinedRegNos.size;
                      } else if (hasSelectedProfiles) {
                        return selectedUsers.size;
                      } else if (hasFilters) {
                        return getFilteredUsersForDownload().length;
                      } else {
                        return currentUsers.length;
                      }
                    })();
                    
                    if (totalCount > 50) {
                      return (
                        <div className="mt-2 p-2 bg-yellow-50 border border-yellow-200 rounded text-yellow-800 text-xs">
                          ⚠️ Large download ({totalCount} profiles). This may take several minutes to complete.
                        </div>
                      );
                    } else if (totalCount === 0) {
                      return (
                        <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded text-red-800 text-xs">
                          ❌ No profiles match your criteria. Please adjust your filters or selection.
                        </div>
                      );
                    }
                    return null;
                  })()}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowFilterModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>                
                <button
                  onClick={() => {
                    setDownloadFilters({
                      gender: "",
                      dobFrom: "",
                      dobTo: "",
                      createdAtFrom: "",
                      createdAtTo: "",
                      status: "",
                      caste: "",
                      star: "",
                      marriageStatus: "",
                      regNo: ""
                    });
                  }}
                  className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50"
                >
                  Clear Filters
                </button>
                <button
                  onClick={handleMultipleDownload}
                  disabled={isDownloading || (() => {
                    const hasFilters = Object.values(downloadFilters).some(filter => filter.trim() !== "");
                    const hasSelectedProfiles = selectedUsers.size > 0;
                    
                    if (hasSelectedProfiles && hasFilters) {
                      const selectedProfiles = filteredUsers.filter(user => selectedUsers.has(user.regNo));
                      const filteredProfiles = getFilteredUsersForDownload();
                      const combinedRegNos = new Set([
                        ...selectedProfiles.map(p => p.regNo),
                        ...filteredProfiles.map(p => p.regNo)
                      ]);
                      return combinedRegNos.size === 0;
                    } else if (hasSelectedProfiles) {
                      return selectedUsers.size === 0;
                    } else if (hasFilters) {
                      return getFilteredUsersForDownload().length === 0;
                    } else {
                      return currentUsers.length === 0;
                    }
                  })()}
                  className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isDownloading ? "Downloading..." : "Download Profiles"}
                </button>
              </div>
            </div>
          </div>
        </div>      )}
    </div>  );
};

export default withAdminAuth(ManageUser);
/**
 * Dummy checkPageBreak implementation for compatibility.
 * In this file, checkPageBreak is only called inside handleDownload,
 * but the real logic is handled in addProfileToPDF.
 * This function does nothing here.
 */
// function checkPageBreak(_: number) {
//   // No-op for single profile PDF (handleDownload)
// }
function checkPageBreak(arg0: number) {
  throw new Error("Function not implemented.");
}

