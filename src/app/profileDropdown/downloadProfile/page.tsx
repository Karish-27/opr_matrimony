"use client";


import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react'
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { log } from 'console';

const DownloadProfilePage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [profiles, setProfiles] = useState<any[]>([]);
  const router = useRouter();

  // Fetch dynamic data from API
  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const res = await fetch('/api/profilelists');
        if (!res.ok) throw new Error('Failed to fetch profiles');
        const data = await res.json();
        console.log('Fetched profiles:', data);
        
        setProfiles(data);
      } catch (err) {
        setProfiles([]);
        console.error('Failed to fetch profiles:', err);
      }
    };
    fetchProfiles();
  }, []);

  const toggleDropdown = () => setIsOpen(!isOpen);

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
    let y = 40;
    let leftX = 40;
    let rightX = pageWidth - 220;

    // --- Profile Image (top, centered) ---
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
    y = galleryY + 60;

    // --- Profile Info (two columns) ---
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(18);
    doc.text(profile.name || '-', leftX, y);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(11);
    y += 24;
    doc.text(`Reg. No : ${profile.regNo || '-'}`, leftX, y);
    y += 18;
    // 2 columns for main info
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
    y += 18;

    // --- Family Information Section (two columns) ---
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
    y += 18;

    // --- Horoscope Information Section (two columns) ---
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
    y += 18;

    // --- Horoscope Chart (if available) ---
    if (Array.isArray(profile.chart) && profile.chart.length > 0) {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(13);
      doc.text('Horoscope Chart', leftX, y);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(11);
      y += 18;
      // Draw a 4x4 grid for chart
      const cellW = 100, cellH = 40;
      for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 4; col++) {
          const idx = row * 4 + col;
          doc.rect(leftX + col * cellW, y + row * cellH, cellW, cellH);
          if (profile.chart[idx]) {
            doc.text(String(profile.chart[idx]), leftX + col * cellW + 5, y + row * cellH + 20, { maxWidth: cellW - 10 });
          }
        }
      }
    }
    doc.save(`${profile.name || 'profile'}_profile.pdf`);
  };

  return (
   <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto w-full px-6 mt-4 text-sm text-gray-500">
        Home <span className="mx-2">{'>'}</span> <span className="text-orange-500">Download Profile</span>
      </div>

      {/* Title and View By */}
      <div className="max-w-7xl mx-auto w-full flex justify-between items-center px-6 mt-6">
        <div className="text-xl font-semibold text-gray-800">Download Profile</div>
        <div className="flex items-center space-x-2">
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
        </div>
      </div>

      {/* Table */}
      <div className="max-w-7xl mx-auto w-full mt-6 bg-white rounded shadow">
        <table className="min-w-full">
          <thead>
            <tr className="bg-orange-500 text-white text-left">
              <th className="px-4 py-3">
                <input type="checkbox" />
              </th>
              <th className="px-4 py-3">S.No</th>
              <th className="px-4 py-3">Reg.No</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Father Name</th>
              <th className="px-4 py-3">Mobile Number</th>
              <th className="px-4 py-3">Date of Birth</th>
              <th className="px-4 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {profiles.map((profile, idx) => (
              <tr key={idx} className="border-b last:border-b-0 hover:bg-gray-50">
                <td className="px-4 py-3">
                  <input type="checkbox" />
                </td>
                <td className="px-4 py-3">{profile.sno}</td>
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
          </tbody>
        </table>
        {/* Pagination */}
        <div className="flex justify-between items-center px-4 py-2 text-gray-500 text-sm border-t">
          <span>Rows per page: 10</span>
          <span>1-10 of {profiles.length} pages</span>
        </div>
      </div>

      {/* Footer */}
     
    </div>
  )
}

export default DownloadProfilePage;