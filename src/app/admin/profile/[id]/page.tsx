"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";

const ProfileDetail = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState<any>(null);
  const [imageUploading, setImageUploading] = useState(false);
  const [horoscopeUploading, setHoroscopeUploading] = useState(false);
  
  // Image gallery state
  const [showImageGallery, setShowImageGallery] = useState(false);
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [galleryType, setGalleryType] = useState<'profile' | 'horoscope'>('profile');

  useEffect(() => {
    if (!id) return;
    fetch(`/api/admin/profile/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProfile(data);
        setForm(data); // for editing
        setLoading(false);
      });
  }, [id]);

  // Keyboard navigation for image gallery
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!showImageGallery) return;
      
      if (event.key === 'Escape') {
        handleGalleryClose();
      } else if (event.key === 'ArrowLeft') {
        handlePrevImage();
      } else if (event.key === 'ArrowRight') {
        handleNextImage();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [showImageGallery, currentImageIndex, galleryImages.length]);

  // Image gallery handlers
  const handleImageClick = (images: string[], imageIndex: number = 0, type: 'profile' | 'horoscope' = 'profile') => {
    setGalleryImages(images);
    setCurrentImageIndex(imageIndex);
    setGalleryType(type);
    setShowImageGallery(true);
  };

  const handleGalleryClose = () => {
    setShowImageGallery(false);
    setGalleryImages([]);
    setCurrentImageIndex(0);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? galleryImages.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === galleryImages.length - 1 ? 0 : prev + 1
    );
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev: any) => ({ ...prev, [name]: value }));
  };
  const handleImageUpload = async (files: FileList, type: 'profile' | 'horoscope') => {
    const formData = new FormData();
    
    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i]);
    }
    formData.append('type', type);
    formData.append('profileId', id as string);

    if (type === 'profile') {
      setImageUploading(true);
    } else {
      setHoroscopeUploading(true);
    }

    try {
      const res = await fetch('/api/profiledataapi/userprofile/upload', {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        
        if (type === 'profile') {
          setForm((prev: any) => ({ 
            ...prev, 
            profilePhotos: data.urls 
          }));
          setProfile((prev: any) => ({ 
            ...prev, 
            profilePhotos: data.urls 
          }));
        } else {
          setForm((prev: any) => ({ 
            ...prev, 
            horoscopeProfile: {
              ...prev.horoscopeProfile,
              horoscopeDocuments: data.urls
            }
          }));
          setProfile((prev: any) => ({ 
            ...prev, 
            horoscopeProfile: {
              ...prev.horoscopeProfile,
              horoscopeDocuments: data.urls
            }
          }));
        }
        alert(`${type === 'profile' ? 'Profile' : 'Horoscope'} images uploaded successfully!`);
      } else {
        const errorData = await res.json();
        alert(errorData.error || 'Failed to upload images');
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Error uploading images');
    } finally {
      if (type === 'profile') {
        setImageUploading(false);
      } else {
        setHoroscopeUploading(false);
      }
    }
  };

  const handleRemoveImage = (index: number, type: 'profile' | 'horoscope') => {
    if (type === 'profile') {
      const newPhotos = [...(form.profilePhotos || [])];
      newPhotos.splice(index, 1);
      setForm((prev: any) => ({ ...prev, profilePhotos: newPhotos }));
    } else {
      const newDocs = [...(form.horoscopeProfile?.horoscopeDocuments || [])];
      newDocs.splice(index, 1);
      setForm((prev: any) => ({ 
        ...prev, 
        horoscopeProfile: {
          ...prev.horoscopeProfile,
          horoscopeDocuments: newDocs
        }
      }));
    }
  };

  

  const handleSave = async () => {
    const res = await fetch(`/api/admin/profile/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      const updated = await res.json();
      setProfile(updated);
      setEditMode(false);
    } else {
      alert('Failed to update profile');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!profile) return <div>Profile not found</div>;

  const {
    regNo,
    name,
    email,
    phone,
    dob,
    age,
    star,
    marriageStatus,
    height,
    qualification,
    color,
    caste,
    familyProperty,
    typeOfFood,
    salary,
    career,
    expectation,
    profilePhotos,
    parentInfo,
    horoscopeProfile,
  } = profile;

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f7f7f7" }}>
      <Sidebar />
      <main style={{ flex: 1, background: "#f7f7f7", padding: 0 }}>
        <div style={{ maxWidth: 950, margin: "40px auto 0 auto", background: "#fff", borderRadius: 12, boxShadow: "0 2px 8px #0001", padding: 40 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 32 }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600, fontSize: 20, marginBottom: 2 }}>{name}</div>
              <div style={{ color: "#888", fontSize: 15, marginBottom: 18 }}>Reg. No : <b>{regNo}</b></div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8, fontSize: 15 }}>
                <div><b>Email</b><br />{editMode ? <input name="email" value={form.email} onChange={handleInputChange} /> : email}</div>
                <div><b>Phone</b><br />{editMode ? <input name="phone" value={form.phone} onChange={handleInputChange} /> : phone}</div>
                <div><b>Date of Birth</b><br />{editMode ? <input name="dob" value={form.dob} onChange={handleInputChange} /> : dob}</div>
                <div><b>Age</b><br />{editMode ? <input name="age" value={form.age} onChange={handleInputChange} /> : `${age} Years`}</div>
                <div><b>Star</b><br />{editMode ? <input name="star" value={form.star} onChange={handleInputChange} /> : star}</div>
                <div><b>Marriage Status</b><br />{editMode ? <input name="marriageStatus" value={form.marriageStatus} onChange={handleInputChange} /> : marriageStatus}</div>
                <div><b>Height</b><br />{editMode ? <input name="height" value={form.height} onChange={handleInputChange} /> : height}</div>
                <div><b>Qualification</b><br />{editMode ? <input name="qualification" value={form.qualification} onChange={handleInputChange} /> : qualification}</div>
                <div><b>Color</b><br />{editMode ? <input name="color" value={form.color} onChange={handleInputChange} /> : color}</div>
                <div><b>Caste</b><br />{editMode ? <input name="caste" value={form.caste} onChange={handleInputChange} /> : caste}</div>
                <div><b>Family Property</b><br />{editMode ? <input name="familyProperty" value={form.familyProperty} onChange={handleInputChange} /> : familyProperty}</div>
                <div><b>Type of food</b><br />{editMode ? <input name="typeOfFood" value={form.typeOfFood} onChange={handleInputChange} /> : typeOfFood}</div>
                <div><b>Salary</b><br />{editMode ? <input name="salary" value={form.salary} onChange={handleInputChange} /> : salary}</div>
                <div><b>Career</b><br />{editMode ? <input name="career" value={form.career} onChange={handleInputChange} /> : career}</div>
                <div><b>Expectation</b><br />{editMode ? <input name="expectation" value={form.expectation} onChange={handleInputChange} /> : expectation}</div>
              </div>
            </div>            <div style={{ minWidth: 220, textAlign: "right" }}>
              <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginBottom: 8 }}>
                <button
                  style={{ background: "#ff9000", color: "#fff", border: "none", borderRadius: 5, padding: "8px 18px", fontWeight: 500, cursor: "pointer" }}
                  onClick={() => setEditMode(false)}
                  hidden={!editMode}
                >Cancel</button>
                <button
                  style={{ background: editMode ? "#52c41a" : "#ff9000", color: "#fff", border: "none", borderRadius: 5, padding: "8px 18px", fontWeight: 500, cursor: "pointer" }}
                  onClick={editMode ? handleSave : () => setEditMode(true)}
                >{editMode ? 'Save' : 'Edit'}</button>
              </div>
                {/* Profile Photo Section */}
              <div style={{ position: "relative", marginBottom: 8 }}>
                <img 
                  src={form?.profilePhotos?.[0] || "/images/profilepicture.png"} 
                  alt="Profile" 
                  style={{ width: 170, height: 200, borderRadius: 10, objectFit: "cover", border: "1px solid #eee", cursor: "pointer" }} 
                  onClick={() => form?.profilePhotos && form.profilePhotos.length > 0 && handleImageClick(form.profilePhotos, 0, 'profile')}
                  title="Click to view gallery"
                />{editMode && (
                  <div style={{ 
                    position: "absolute", 
                    top: 5, 
                    right: 5, 
                    background: "rgba(0,0,0,0.7)", 
                    borderRadius: 4, 
                    padding: 6,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}>
                    <label style={{ cursor: "pointer", color: "white", fontSize: 16, display: "flex", alignItems: "center" }}>
                      📷
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={(e) => e.target.files && handleImageUpload(e.target.files, 'profile')}
                        style={{ display: "none" }}
                        disabled={imageUploading}
                      />
                    </label>
                  </div>
                )}
              </div>              {/* Gallery Photos */}
              <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap" }}>
                {form?.profilePhotos?.slice(1, 4).map((img: string, i: number) => (
                  <div key={i} style={{ position: "relative" }}>
                    <img 
                      src={img} 
                      alt="Gallery" 
                      style={{ width: 48, height: 48, borderRadius: 6, objectFit: "cover", border: "1px solid #eee", cursor: "pointer" }} 
                      onClick={() => handleImageClick(form.profilePhotos, i + 1, 'profile')}
                      title="Click to view gallery"
                    />
                    {editMode && (
                      <button
                        onClick={() => handleRemoveImage(i + 1, 'profile')}
                        style={{
                          position: "absolute",
                          top: -5,
                          right: -5,
                          background: "#ff4d4f",
                          color: "white",
                          border: "none",
                          borderRadius: "50%",
                          width: 16,
                          height: 16,
                          fontSize: 10,
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center"
                        }}
                        title="Remove image"
                      >
                        ×
                      </button>
                    )}
                  </div>
                ))}
                  {/* Add more photos button */}
                {editMode && form?.profilePhotos?.length < 4 && (
                  <label style={{ 
                    cursor: "pointer", 
                    width: 48, 
                    height: 48, 
                    border: "2px dashed #ccc", 
                    borderRadius: 6, 
                    display: "flex", 
                    alignItems: "center", 
                    justifyContent: "center",
                    background: "#fafafa",
                    fontSize: 20,
                    color: "#666",
                    transition: "all 0.2s ease"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "#1890ff";
                    e.currentTarget.style.background = "#f0f8ff";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "#ccc";
                    e.currentTarget.style.background = "#fafafa";
                  }}
                  title="Add more photos"
                  >
                    +
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={(e) => e.target.files && handleImageUpload(e.target.files, 'profile')}
                      style={{ display: "none" }}
                      disabled={imageUploading}
                    />
                  </label>
                )}
              </div>
              
              {imageUploading && (
                <div style={{ fontSize: 12, color: "#666", marginTop: 8 }}>
                  Uploading images...
                </div>
              )}
            </div>
          </div>

          {/* Family Information */}
          <div style={{ marginTop: 36 }}>
            <div style={{ fontWeight: 600, fontSize: 17, marginBottom: 12 }}>Family Information</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, fontSize: 15 }}>
              <div><b>Father's Name</b><br />{parentInfo?.fatherName}</div>
              <div><b>Mother's Name</b><br />{parentInfo?.motherName}</div>
              <div><b>Father's Native</b><br />{parentInfo?.fatherNative}</div>
              <div><b>Mother's Native</b><br />{parentInfo?.motherNative}</div>
              <div><b>Father's Profession</b><br />{parentInfo?.fatherProfession}</div>
              <div><b>Mother's Profession</b><br />{parentInfo?.motherProfession}</div>
              <div><b>Phone Number</b><br />{parentInfo?.phoneNumber}</div>
              <div><b>Address</b><br />{parentInfo?.address}</div>
              <div><b>Brothers</b><br />{parentInfo?.brothers}</div>
              <div><b>Sisters</b><br />{parentInfo?.sisters}</div>
              <div><b>Elder Brother</b><br />{parentInfo?.elderBrother}</div>
              <div><b>Younger Brother</b><br />{parentInfo?.youngerBrother}</div>
              <div><b>Married Brother</b><br />{parentInfo?.marriedBrother}</div>
              <div><b>Elder Sister</b><br />{parentInfo?.elderSister}</div>
              <div><b>Younger Sister</b><br />{parentInfo?.youngerSister}</div>
              <div><b>Married Sister</b><br />{parentInfo?.marriedSister}</div>
            </div>
          </div>

          {/* Horoscope Information */}
          <div style={{ marginTop: 36 }}>
            <div style={{ fontWeight: 600, fontSize: 17, marginBottom: 12 }}>Horoscope Information</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, fontSize: 15 }}>
              <div><b>Zodiac Sign</b><br />{horoscopeProfile?.zodiacSign}</div>
              <div><b>Tamil year</b><br />{horoscopeProfile?.tamilYear}</div>
              <div><b>Tamil month</b><br />{horoscopeProfile?.tamilMonth}</div>
              <div><b>Udayati Natchat</b><br />{horoscopeProfile?.udayathiNatchat}</div>
              <div><b>Day</b><br />{horoscopeProfile?.day}</div>
              <div><b>Birth Time</b><br />{horoscopeProfile?.birthTime}</div>
              <div><b>Star/Foot</b><br />{horoscopeProfile?.starFoot}</div>
              <div><b>Ascendant (Lagnam)</b><br />{horoscopeProfile?.ascendant}</div>
              <div><b>Birthplace</b><br />{horoscopeProfile?.birthplace}</div>
              <div><b>Presence of natal direction</b><br />{horoscopeProfile?.natalDirection}</div>
            </div>
          </div>          {/* Horoscope Chart */}
          <div style={{ marginTop: 36 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <div style={{ fontWeight: 600, fontSize: 17 }}>Horoscope Chart</div>
              {editMode && (
                <label style={{ 
                  background: "#1890ff", 
                  color: "white", 
                  border: "none", 
                  borderRadius: 5, 
                  padding: "8px 16px", 
                  cursor: "pointer",
                  fontSize: 14,
                  fontWeight: 500
                }}>
                  {horoscopeUploading ? "Uploading..." : "Upload Horoscope Charts"}
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => e.target.files && handleImageUpload(e.target.files, 'horoscope')}
                    style={{ display: "none" }}
                    disabled={horoscopeUploading}
                  />
                </label>
              )}
            </div>
            
            {/* Check if horoscope chart images exist in the profile, otherwise show default images */}
            {form?.horoscopeProfile?.horoscopeDocuments && 
             Array.isArray(form.horoscopeProfile.horoscopeDocuments) && 
             form.horoscopeProfile.horoscopeDocuments.length > 0 ? (
              <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
                {form.horoscopeProfile.horoscopeDocuments.map((document: string, index: number) => (
                  <div key={index} style={{ flex: "0 0 auto", textAlign: "center", position: "relative" }}>                    <img 
                      src={document} 
                      alt={`Horoscope Chart ${index + 1}`}
                      style={{ 
                        width: 300, 
                        height: 300, 
                        objectFit: "contain", 
                        border: "1px solid #eee", 
                        borderRadius: 8,
                        background: "#fafafa",
                        cursor: "pointer",
                        boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
                      }}
                      onClick={() => handleImageClick(form.horoscopeProfile.horoscopeDocuments, index, 'horoscope')}
                      title="Click to view gallery"
                    />
                    {editMode && (
                      <button
                        onClick={() => handleRemoveImage(index, 'horoscope')}
                        style={{
                          position: "absolute",
                          top: 10,
                          right: 10,
                          background: "#ff4d4f",
                          color: "white",
                          border: "none",
                          borderRadius: "50%",
                          width: 24,
                          height: 24,
                          fontSize: 14,
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          boxShadow: "0 2px 4px rgba(0,0,0,0.2)"
                        }}
                        title="Remove chart"
                      >
                        ×
                      </button>
                    )}
                    <div style={{ textAlign: "center", marginTop: 8, fontSize: 14, color: "#666" }}>
                      Chart {index + 1}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
                {!editMode && (
                  <div style={{ padding: "10px", background: "#e6f7ff", border: "1px solid #91d5ff", borderRadius: 8, marginBottom: 12, fontSize: 14, color: "#0050b3" }}>
                    DEBUG: Showing default horoscope images because horoscope documents are not available
                  </div>
                )}
                <div style={{ width: "100%", display: "flex", gap: 24, flexWrap: "wrap" }}>
                  <div style={{ flex: "0 0 auto", textAlign: "center" }}>                    <img 
                      src="/images/h1.jpg" 
                      alt="Default Horoscope Chart 1"
                      style={{ 
                        width: 300, 
                        height: 300, 
                        objectFit: "contain", 
                        border: "1px solid #eee", 
                        borderRadius: 8,
                        background: "#fafafa",
                        cursor: "pointer",
                        boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
                      }}
                      onClick={() => handleImageClick(["/images/h1.jpg", "/images/h2.jpg"], 0, 'horoscope')}
                      title="Click to view gallery"
                    />
                    <div style={{ textAlign: "center", marginTop: 8, fontSize: 14, color: "#666" }}>
                      Default Chart 1
                    </div>
                  </div>
                  <div style={{ flex: "0 0 auto", textAlign: "center" }}>                    <img 
                      src="/images/h2.jpg" 
                      alt="Default Horoscope Chart 2"
                      style={{ 
                        width: 300, 
                        height: 300, 
                        objectFit: "contain", 
                        border: "1px solid #eee", 
                        borderRadius: 8,
                        background: "#fafafa",
                        cursor: "pointer",
                        boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
                      }}
                      onClick={() => handleImageClick(["/images/h1.jpg", "/images/h2.jpg"], 1, 'horoscope')}
                      title="Click to view gallery"
                    />
                    <div style={{ textAlign: "center", marginTop: 8, fontSize: 14, color: "#666" }}>
                      Default Chart 2
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {horoscopeUploading && (
              <div style={{ padding: "10px", background: "#f0f8f0", border: "1px solid #52c41a", borderRadius: 8, marginTop: 12, fontSize: 14, color: "#389e0d" }}>
                Uploading horoscope charts...
              </div>
            )}          </div>
        </div>
      </main>

      {/* Image Gallery Modal */}
      {showImageGallery && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.9)",
          zIndex: 60,
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}>
          <div style={{
            position: "relative",
            maxWidth: "90vw",
            maxHeight: "90vh",
            width: "100%",
            margin: "0 16px"
          }}>
            {/* Close button */}
            <button
              onClick={handleGalleryClose}
              style={{
                position: "absolute",
                top: 16,
                right: 16,
                color: "white",
                background: "none",
                border: "none",
                fontSize: 32,
                cursor: "pointer",
                zIndex: 10,
                width: 40,
                height: 40,
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
              title="Close gallery"
            >
              ×
            </button>

            {/* Main image */}
            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100%"
            }}>
              <img
                src={galleryImages[currentImageIndex]}
                alt={`${galleryType} image ${currentImageIndex + 1}`}
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  objectFit: "contain"
                }}
              />
            </div>

            {/* Navigation arrows */}
            {galleryImages.length > 1 && (
              <>
                <button
                  onClick={handlePrevImage}
                  style={{
                    position: "absolute",
                    left: 16,
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "white",
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    border: "none",
                    borderRadius: "50%",
                    width: 48,
                    height: 48,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 20
                  }}
                  title="Previous image"
                >
                  ‹
                </button>
                <button
                  onClick={handleNextImage}
                  style={{
                    position: "absolute",
                    right: 16,
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "white",
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    border: "none",
                    borderRadius: "50%",
                    width: 48,
                    height: 48,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 20
                  }}
                  title="Next image"
                >
                  ›
                </button>
              </>
            )}

            {/* Image thumbnails */}
            {galleryImages.length > 1 && (
              <div style={{
                position: "absolute",
                bottom: 16,
                left: "50%",
                transform: "translateX(-50%)"
              }}>
                <div style={{
                  display: "flex",
                  gap: 8,
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                  borderRadius: 8,
                  padding: 8
                }}>
                  {galleryImages.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      style={{
                        width: 64,
                        height: 64,
                        borderRadius: 4,
                        overflow: "hidden",
                        border: index === currentImageIndex ? "2px solid #ff9000" : "2px solid transparent",
                        cursor: "pointer",
                        background: "none",
                        padding: 0
                      }}
                    >
                      <img
                        src={img}
                        alt={`Thumbnail ${index + 1}`}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover"
                        }}
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Image counter */}
            <div style={{
              position: "absolute",
              top: 16,
              left: 16,
              color: "white",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              borderRadius: 4,
              padding: "8px 12px",
              fontSize: 14
            }}>
              {currentImageIndex + 1} / {galleryImages.length}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDetail;
