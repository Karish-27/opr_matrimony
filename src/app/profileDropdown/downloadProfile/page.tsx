"use client";

import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react'
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { withAuth } from '@/hooks/useAuth';
import { log } from 'console';
import { useTranslation } from 'react-i18next';
import i18n from '@/i18n';

const DownloadProfilePage = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [profiles, setProfiles] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const router = useRouter();
  // Tamil field name mappings
  const tamilFieldNames: Record<string, string> = {
    'Email': 'மின்னஞ்சல்',
    'Phone': 'தொலைபேசி',
    'Date Of Birth': 'பிறந்த தேதி',
    'Age': 'வயது',
    'Star': 'நட்சத்திரம்',
    'Marriage Status': 'திருமண நிலை',
    'Height': 'உயரம்',
    'Qualification': 'கல்வி தகுதி',
    'Color': 'நிறம்',
    'Caste': 'சாதி',
    'Family Property': 'குடும்ப சொத்து',
    'Type of food': 'உணவு வகை',
    'Career': 'வேலை',
    'Salary': 'சம்பளம்',
    'Expectation': 'எதிர்பார்ப்பு',
    'Family Information': 'குடும்ப விவரம்',
    "Father's Name": 'தந்தையின் பெயர்',
    "Mother's Name": 'தாயின் பெயர்',
    "Father's Native": 'தந்தையின் பூர்வீகம்',
    "Mother's Native": 'தாயின் பூர்வீகம்',
    "Father's Profession": 'தந்தையின் தொழில்',
    "Mother's Profession": 'தாயின் தொழில்',
    'Phone Number': 'தொலைபேசி எண்',
    'Address': 'முகவரி',
    'Brothers': 'சகோதரர்கள்',
    'Elder Brother': 'மூத்த சகோதரன்',
    'Younger Brother': 'இளைய சகோதரன்',
    'Married': 'திருமணமானவர்',
    'Sisters': 'சகோதரிகள்',
    'Elder Sister': 'மூத்த சகோதரி',
    'Younger Sister': 'இளைய சகோதரி',
    'Horoscope Information': 'ஜாதக விவரம்',
    'Zodiac Sign': 'ராசி',
    'Tamil year': 'தமிழ் ஆண்டு',
    'Tamil month': 'தமிழ் மாதம்',
    'Udayathi Natchat': 'உதயதி நட்சத்திரம்',
    'Day': 'நாள்',
    'Birth Time': 'பிறந்த நேரம்',
    'Star/Foot': 'நட்சத்திரம் / பாதம்',
    'Ascendant (Lagnam)': 'லக்கினம்',
    'Birthplace': 'பிறந்த இடம்',
    'Presence of natal direction': 'பிறந்த திசை',
    'Horoscope Chart': 'ஜாதக பட்டியல்',
    'Chart 1': 'பட்டியல் 1',
    'Chart 2': 'பட்டியல் 2',
    'Horoscope Details Table': 'ஜாதக விவர அட்டவணை',
    // Table headers
    'S.No': 'வ.எண்',
    'Reg.No': 'பதிவு எண்',
    'Name': 'பெயர்',
    'Father Name': 'தந்தையின் பெயர்',    'Mobile Number': 'கைபேசி எண்',
    'Date of Birth': 'பிறந்த தேதி',
    'Action': 'செயல்',
    // Page labels
    'Download Profile': 'சுயவிவர பதிவிறக்கம்',
    'Home': 'முகப்பு',
    'Rows per page': 'பக்கத்திற்கு வரிசைகள்'
  };  // Helper function to get field name based on language
  const getFieldName = (fieldName: string): string => {
    return i18n.language === 'ta' ? (tamilFieldNames[fieldName] || fieldName) : fieldName;
  };
  // Fetch dynamic data from API
  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const res = await fetch('/api/profilelists');
        if (!res.ok) throw new Error('Failed to fetch profiles');
        const data = await res.json();
        console.log('Fetched profiles:', data);
        
        // Handle the response structure - the API returns { profiles: [...], userCredits: number }
        const profilesData = data.profiles || data; // Fallback to data if it's an array directly
        setProfiles(Array.isArray(profilesData) ? profilesData : []);
      } catch (err) {
        setProfiles([]);
        console.error('Failed to fetch profiles:', err);
      }
    };
    fetchProfiles();
  }, []);
  const toggleDropdown = () => setIsOpen(!isOpen);

  // Pagination logic
  const totalPages = Math.ceil(profiles.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProfiles = profiles.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1); // Reset to first page when changing items per page
  };

  // Helper to convert image url to base64
  async function toDataUrl(url: string): Promise<string> {
    return await new Promise((resolve, reject) => {
      const img = new window.Image();
      img.crossOrigin = 'Anonymous';
      img.onload = function () {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        if (!ctx) return reject('No ctx');
        ctx.drawImage(img, 0, 0);
        resolve(canvas.toDataURL('image/jpeg'));
      };
      img.onerror = reject;
      img.src = url;
    });
  }

    const handleDownload = async (profile: any) => {
    const doc = new jsPDF({ orientation: 'p', unit: 'pt', format: 'a4' });
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    let y = 40;
    let leftX = 40;
    let rightX = pageWidth - 220;    // Function to check if we need a new page
    const checkPageBreak = (requiredSpace: number) => {
      if (y + requiredSpace > pageHeight - 50) { // 50pt margin from bottom
        doc.addPage();
        y = 40; // Reset Y position for new page
        // Add orange header to new page as well
        addOrangeHeader();
      }
    };

    // Function to add orange header
    const addOrangeHeader = () => {
      // Draw orange rectangle at the top
      doc.setFillColor(255, 102, 0); // Orange color (#FF6600)
      doc.rect(0, 0, pageWidth, 60, 'F'); // Full width orange bar, 60pt height
      
      // Add company/website name in white text
      doc.setTextColor(255, 255, 255); // White text
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(24);
      // doc.text('Profile Details', pageWidth / 2, 35, { align: 'left' });
    
      // Reset text color to black for rest of document
      doc.setTextColor(0, 0, 0);
    };

    // Add orange header to first page
    addOrangeHeader();
    y = 80; // Start content after the orange header

    // --- Profile Image (top, centered) ---
    checkPageBreak(280); // Check if we have space for image and gallery
    if (profile.image) {
      try {
        const imgData = await toDataUrl(profile.image);
        doc.addImage(imgData, 'JPEG', pageWidth / 2 - 85, y, 170, 210, undefined, 'FAST');
      } catch (e) {}
    }

    // --- Gallery Images (below main image, centered) ---
    let galleryY = y + 220;
    let galleryX = pageWidth / 2 - 90;
    if (Array.isArray(profile.gallery)) {
      for (let i = 0; i < profile.gallery.length && i < 4; i++) {
        try {
          const imgData = await toDataUrl(profile.gallery[i]);
          doc.addImage(imgData, 'JPEG', galleryX, galleryY, 40, 40, undefined, 'FAST');
          galleryX += 45;
        } catch (e) {}
      }
    }
    y = galleryY + 60;    // --- Profile Info (two columns) ---
    checkPageBreak(200); // Check space for profile info section
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(18);
    doc.text(profile.name || '-', leftX, y);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(11);
    y += 24;
    doc.text(`Reg. No : ${profile.regNo || '-'}`, leftX, y);
    y += 18;    // 2 columns for main info
    const infoRows = [
      [
        { label: 'Email', value: profile.email },
        { label: 'Phone', value: profile.phone },
      ],
      [
        { label: 'Date Of Birth', value: profile.dob },
        { label: 'Age', value: profile.age },
      ],
      [
        { label: 'Star', value: profile.star },
        { label: 'Marriage Status', value: profile.marriageStatus },
      ],
      [
        { label: 'Height', value: profile.height },
        { label: 'Qualification', value: profile.qualification },
      ],
      [
        { label: 'Color', value: profile.color },
        { label: 'Caste', value: profile.caste },
      ],
      [
        { label: 'Family Property', value: profile.familyProperty },
        { label: 'Type of food', value: profile.typeOfFood },
      ],
      [
        { label: 'Career', value: profile.career },
        { label: 'Salary', value: profile.salary },
      ],
      [
        { label: 'Expectation', value: profile.expectation },
        { label: '', value: '' },
      ],
    ];
    infoRows.forEach(row => {
      checkPageBreak(25); // Check space for each row
      let colX = leftX;
      row.forEach(cell => {
        if (cell.label) {
          doc.setFont('helvetica', 'bold');
          doc.text(cell.label, colX, y);
          doc.setFont('helvetica', 'normal');
          doc.text(cell.value ? String(cell.value) : '-', colX + 90, y, { maxWidth: 120 });
        }
        colX += 250;
      });
      y += 18;
    });
    y += 18;    // --- Family Information Section (two columns) ---
    checkPageBreak(200); // Check space for family section
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(13);
    doc.text('Family Information', leftX, y);
    doc.setFont('helvetica', 'normal');
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
        { label: 'Phone Number', value: fam.phoneNumber },
        { label: 'Address', value: fam.address },
      ],
      [
        { label: 'Brothers', value: fam.brothers },
        { label: 'Elder Brother', value: fam.elderBrother },
      ],
      [
        { label: 'Younger Brother', value: fam.youngerBrother },
        { label: 'Married', value: fam.marriedBrother },
      ],
      [
        { label: 'Sisters', value: fam.sisters },
        { label: 'Elder Sister', value: fam.elderSister },
      ],
      [
        { label: 'Younger Sister', value: fam.youngerSister },
        { label: 'Married', value: fam.marriedSister },
      ],
    ];
    famRows.forEach(row => {
      checkPageBreak(25); // Check space for each family row
      let colX = leftX;
      row.forEach(cell => {
        doc.setFont('helvetica', 'bold');
        doc.text(cell.label, colX, y);
        doc.setFont('helvetica', 'normal');
        doc.text(cell.value !== undefined && cell.value !== null ? String(cell.value) : '-', colX + 110, y, { maxWidth: 120 });
        colX += 270;
      });
      y += 18;
    });
    y += 18;    // --- Horoscope Information Section (two columns) ---
    checkPageBreak(150); // Check space for horoscope section
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(13);
    doc.text('Horoscope Information', leftX, y);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(11);
    y += 18;
    const horo = profile.horoscope || profile.horoscopeProfile || {};
    const horoRows = [
      [
        { label: 'Zodiac Sign', value: horo.zodiacSign },
        { label: 'Tamil year', value: horo.tamilYear },
      ],
      [
        { label: 'Tamil month', value: horo.tamilMonth },
        { label: 'Udayathi Natchat', value: horo.udayathiNatchat },
      ],
      [
        { label: 'Day', value: horo.day },
        { label: 'Birth Time', value: horo.birthTime },
      ],
      [
        { label: 'Star/Foot', value: horo.starFoot },
        { label: 'Ascendant (Lagnam)', value: horo.ascendant },
      ],
      [
        { label: 'Birthplace', value: horo.birthplace },
        { label: 'Presence of natal direction', value: horo.natalDirection },
      ],
    ];
    horoRows.forEach(row => {
      checkPageBreak(25); // Check space for each horoscope row
      let colX = leftX;
      row.forEach(cell => {
        doc.setFont('helvetica', 'bold');
        doc.text(cell.label, colX, y);
        doc.setFont('helvetica', 'normal');
        doc.text(cell.value !== undefined && cell.value !== null ? String(cell.value) : '-', colX + 110, y, { maxWidth: 120 });
        colX += 270;
      });
      y += 18;
    });
    y += 18;    // --- Horoscope Chart Section ---
    checkPageBreak(300); // Check space for horoscope chart section
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(13);
    doc.text('Horoscope Chart', leftX, y);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(11);
    y += 18;

    // Check if horoscope chart images exist in the profile
    const horoscopeImages = horo.chartImages || profile.horoscopeImages || profile.chartImages;
    
    if (Array.isArray(horoscopeImages) && horoscopeImages.length > 0) {
      // Display actual horoscope chart images from database
      checkPageBreak(270); // Check space for chart images
      let chartX = leftX;
      for (let i = 0; i < horoscopeImages.length && i < 2; i++) {
        try {
          const imgData = await toDataUrl(horoscopeImages[i]);
          doc.addImage(imgData, 'JPEG', chartX, y, 200, 250, undefined, 'FAST');
          chartX += 220; // Space between images
        } catch (e) {
          console.error('Error loading horoscope image:', e);
        }
      }
      y += 270; // Move Y position down after images
    } else {
      // Display default horoscope chart images (h1.jpg and h2.jpg)
      checkPageBreak(295); // Check space for default chart images
      try {        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10);
        doc.text('(Default Horoscope Charts)', leftX, y);
        y += 15;
        
        // Add h1.jpg
        try {
          const h1Data = await toDataUrl('/images/h1.jpg');          doc.addImage(h1Data, 'JPEG', leftX, y, 200, 250, undefined, 'FAST');
          doc.setFont('helvetica', 'normal');
          doc.setFontSize(9);
          doc.text('Chart 1', leftX + 85, y + 260);
        } catch (e) {
          console.error('Error loading h1.jpg:', e);          // Fallback text if image fails to load
          doc.rect(leftX, y, 200, 250);
          doc.text('Chart 1' + ' - Image not available', leftX + 50, y + 125);
        }
        
        // Add h2.jpg
        try {
          const h2Data = await toDataUrl('/images/h2.jpg');          doc.addImage(h2Data, 'JPEG', leftX + 220, y, 200, 250, undefined, 'FAST');
          doc.setFont('helvetica', 'normal');
          doc.setFontSize(9);
          doc.text('Chart 2', leftX + 305, y + 260);
        } catch (e) {
          console.error('Error loading h2.jpg:', e);          // Fallback text if image fails to load
          doc.rect(leftX + 220, y, 200, 250);
          doc.text('Chart 2' + ' - Image not available', leftX + 270, y + 125);
        }
        
        y += 280; // Move Y position down after default images
      } catch (e) {
        console.error('Error adding default horoscope charts:', e);
      }
    }

    // --- Optional: Traditional Chart Table (if chart data exists) ---
    if (Array.isArray(profile.chart) && profile.chart.length > 0) {
      checkPageBreak(150); // Check space for chart table      y += 20;
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(12);
      doc.text('Horoscope Details Table', leftX, y);
      y += 18;
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      
      // Draw a 4x4 grid for chart
      const cellW = 100, cellH = 30;
      for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 4; col++) {
          const idx = row * 4 + col;
          doc.rect(leftX + col * cellW, y + row * cellH, cellW, cellH);
          if (profile.chart[idx]) {
            doc.text(String(profile.chart[idx]), leftX + col * cellW + 5, y + row * cellH + 18, { maxWidth: cellW - 10 });
          }
        }
      }
    }
    doc.save(`${profile.name || 'profile'}_profile.pdf`);
  };  return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
          {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto w-full px-6 mt-4 text-sm text-gray-500">
        {getFieldName('Home')} <span className="mx-2">{'>'}</span> <span className="text-orange-500">{getFieldName('Download Profile')}</span>
      </div>

      {/* Title and View By */}
      <div className="max-w-7xl mx-auto w-full flex justify-between items-center px-6 mt-6">
        <div className="text-xl font-semibold text-gray-800">{getFieldName('Download Profile')}</div>
        {/* <div className="flex items-center space-x-2">
          <span className="text-gray-500 text-sm">View by :</span>
          <button className="p-1 border rounded bg-orange-50">
            <svg className="w-4 h-4 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
              <rect width="6" height="6" x="2" y="2" rx="1"/>
              <rect width="6" height="6" x="12" y="2" rx="1"/>
              <rect width="6" height="6" x="2" y="12" rx="1"/>
              <rect width="6" height="6" x="12" y="12" rx="1"/>
            </svg>
          </button>
          <button className="p-1 border rounded">
            <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <rect width="16" height="4" x="2" y="4" rx="1"/>
              <rect width="16" height="4" x="2" y="12" rx="1"/>
            </svg>
          </button>
        </div> */}
      </div>

      {/* Table */}
      <div className="max-w-7xl mx-auto w-full mt-6 bg-white rounded shadow">
        <table className="min-w-full">          <thead>
            <tr className="bg-orange-500 text-white text-left">
              <th className="px-4 py-3">
                <input type="checkbox" />
              </th>
              <th className="px-4 py-3">{getFieldName('S.No')}</th>
              <th className="px-4 py-3">{getFieldName('Reg.No')}</th>
              <th className="px-4 py-3">{getFieldName('Name')}</th>
              <th className="px-4 py-3">{getFieldName('Father Name')}</th>
              <th className="px-4 py-3">{getFieldName('Mobile Number')}</th>
              <th className="px-4 py-3">{getFieldName('Date of Birth')}</th>
              <th className="px-4 py-3">{getFieldName('Action')}</th>
            </tr>
          </thead><tbody>
            {currentProfiles.map((profile, idx) => (
              <tr key={idx} className="border-b last:border-b-0 hover:bg-gray-50">
                <td className="px-4 py-3">
                  <input type="checkbox" />
                </td>
                <td className="px-4 py-3">{startIndex + idx + 1}</td>
                <td className="px-4 py-3">{profile.regNo}</td>
                <td className="px-4 py-3 flex items-center space-x-2">
                  <img src={profile.image} alt={profile.name} className="h-8 w-8 rounded-full" />
                  <span>{profile.name}</span>
                </td>
                <td className="px-4 py-3">{profile.family.fatherName || "-"}</td>
                <td className="px-4 py-3">{profile.phone}</td>
                <td className="px-4 py-3">{profile.dob}</td>
                <td className="px-4 py-3">
                  <button onClick={() => handleDownload(profile)}>
                    <img src="/icons/download.svg" alt="Download" className="h-5 w-5 text-orange-500 items-center" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>        </table>
        {/* Pagination */}        <div className="flex justify-between items-center px-4 py-2 text-gray-500 text-sm border-t">
          <div className="flex items-center space-x-2">
            <span>{getFieldName('Rows per page')}:</span>
            <select 
              value={itemsPerPage} 
              onChange={(e) => handleItemsPerPageChange(Number(e.target.value))}
              className="border rounded px-2 py-1 text-sm"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
          </div>
          
          <div className="flex items-center space-x-4">
            <span>
              {startIndex + 1}-{Math.min(endIndex, profiles.length)} of {profiles.length}
            </span>
            
            <div className="flex items-center space-x-1">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-1 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              {/* Page numbers */}
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }
                
                return (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className={`px-2 py-1 rounded text-sm ${
                      currentPage === pageNum
                        ? 'bg-orange-500 text-white'
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
              
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-1 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>      {/* Footer */}
     
    </div>
  )
}

export default withAuth(DownloadProfilePage);