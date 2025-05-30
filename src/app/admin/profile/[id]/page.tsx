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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev: any) => ({ ...prev, [name]: value }));
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
            </div>
            <div style={{ minWidth: 220, textAlign: "right" }}>
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
                <button style={{ background: "#ff4d4f", color: "#fff", border: "none", borderRadius: 5, padding: "8px 18px", fontWeight: 500, cursor: "pointer" }}>Delete</button>
              </div>
              <img src={profilePhotos?.[0] || "/images/profilepicture.png"} alt="Profile" style={{ width: 170, height: 200, borderRadius: 10, objectFit: "cover", marginBottom: 8, border: "1px solid #eee" }} />
              <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
                {profilePhotos?.slice(1, 4).map((img: string, i: number) => (
                  <img key={i} src={img} alt="Gallery" style={{ width: 48, height: 48, borderRadius: 6, objectFit: "cover", border: "1px solid #eee" }} />
                ))}
              </div>
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
          </div>

          {/* Horoscope Chart */}
          <div style={{ marginTop: 36 }}>
            <div style={{ fontWeight: 600, fontSize: 17, marginBottom: 12 }}>Horoscope Chart</div>
            <div style={{ display: "flex", gap: 24 }}>
              <table style={{ borderCollapse: "collapse", width: 300, background: "#fafafa", borderRadius: 8, fontSize: 14, textAlign: "center" }}>
                <tbody>
                  <tr>
                    <td style={{ border: "1px solid #eee", height: 40 }}></td>
                    <td style={{ border: "1px solid #eee", height: 40 }}></td>
                    <td style={{ border: "1px solid #eee", height: 40 }}></td>
                    <td style={{ border: "1px solid #eee", height: 40 }}></td>
                  </tr>
                  <tr>
                    <td style={{ border: "1px solid #eee", height: 40 }}></td>
                    <td style={{ border: "1px solid #eee", height: 40 }}></td>
                    <td style={{ border: "1px solid #eee", height: 40 }}></td>
                    <td style={{ border: "1px solid #eee", height: 40 }}></td>
                  </tr>
                  <tr>
                    <td style={{ border: "1px solid #eee", height: 40 }}></td>
                    <td style={{ border: "1px solid #eee", height: 40 }}></td>
                    <td style={{ border: "1px solid #eee", height: 40 }}></td>
                    <td style={{ border: "1px solid #eee", height: 40 }}></td>
                  </tr>
                  <tr>
                    <td style={{ border: "1px solid #eee", height: 40 }}></td>
                    <td style={{ border: "1px solid #eee", height: 40 }}></td>
                    <td style={{ border: "1px solid #eee", height: 40 }}></td>
                    <td style={{ border: "1px solid #eee", height: 40 }}></td>
                  </tr>
                </tbody>
              </table>
              <table style={{ borderCollapse: "collapse", width: 300, background: "#fafafa", borderRadius: 8, fontSize: 14, textAlign: "center" }}>
                <tbody>
                  <tr>
                    <td style={{ border: "1px solid #eee", height: 40 }}></td>
                    <td style={{ border: "1px solid #eee", height: 40 }}></td>
                    <td style={{ border: "1px solid #eee", height: 40 }}></td>
                    <td style={{ border: "1px solid #eee", height: 40 }}></td>
                  </tr>
                  <tr>
                    <td style={{ border: "1px solid #eee", height: 40 }}></td>
                    <td style={{ border: "1px solid #eee", height: 40 }}></td>
                    <td style={{ border: "1px solid #eee", height: 40 }}></td>
                    <td style={{ border: "1px solid #eee", height: 40 }}></td>
                  </tr>
                  <tr>
                    <td style={{ border: "1px solid #eee", height: 40 }}></td>
                    <td style={{ border: "1px solid #eee", height: 40 }}></td>
                    <td style={{ border: "1px solid #eee", height: 40 }}></td>
                    <td style={{ border: "1px solid #eee", height: 40 }}></td>
                  </tr>
                  <tr>
                    <td style={{ border: "1px solid #eee", height: 40 }}></td>
                    <td style={{ border: "1px solid #eee", height: 40 }}></td>
                    <td style={{ border: "1px solid #eee", height: 40 }}></td>
                    <td style={{ border: "1px solid #eee", height: 40 }}></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfileDetail;
