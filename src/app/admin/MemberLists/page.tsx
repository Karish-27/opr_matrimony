import Sidebar from "@/components/Sidebar";
import React from "react";

const members = [
  {
    regNo: "00010",
    name: "Theresa Webb",
    profile: "/images/profilepicture.png",
    gender: "Groom",
    email: "felicia.reid@example.com",
    contact: "988744373",
    date: "12 AUG 2022",
    status: "Active",
  },
  {
    regNo: "00010",
    name: "Ronald Richards",
    profile: "/images/profilepicture.png",
    gender: "Bride",
    email: "michelle.rivera@example.com",
    contact: "988744373",
    date: "12 AUG 2022",
    status: "Expiry",
  },
  {
    regNo: "00010",
    name: "Jacob Jones",
    profile: "/images/profilepicture.png",
    gender: "Groom",
    email: "georgia.young@example.com",
    contact: "988744373",
    date: "12 AUG 2022",
    status: "Active",
  },
  {
    regNo: "00010",
    name: "Cameron Williamson",
    profile: "/images/profilepicture.png",
    gender: "Groom",
    email: "alma.lawson@example.com",
    contact: "988744373",
    date: "12 AUG 2022",
    status: "Active",
  },
  {
    regNo: "00010",
    name: "Robert Fox",
    profile: "/images/profilepicture.png",
    gender: "Groom",
    email: "sara.cruz@example.com",
    contact: "988744373",
    date: "12 AUG 2022",
    status: "Active",
  },
  {
    regNo: "00010",
    name: "Dianne Russell",
    profile: "/images/profilepicture.png",
    gender: "Bride",
    email: "tanya.hill@example.com",
    contact: "988744373",
    date: "12 AUG 2022",
    status: "Expiry",
  },
  {
    regNo: "00010",
    name: "Albert Flores",
    profile: "/images/profilepicture.png",
    gender: "Groom",
    email: "willie.jennings@example.com",
    contact: "988744373",
    date: "12 AUG 2022",
    status: "Active",
  },
  {
    regNo: "00010",
    name: "Annette Black",
    profile: "/images/profilepicture.png",
    gender: "Bride",
    email: "kenzi.lawson@example.com",
    contact: "988744373",
    date: "12 AUG 2022",
    status: "Active",
  },
  {
    regNo: "00010",
    name: "Cameron Williamson",
    profile: "/images/profilepicture.png",
    gender: "Bride",
    email: "curtis.weaver@example.com",
    contact: "988744373",
    date: "12 AUG 2022",
    status: "Active",
  },
  {
    regNo: "00010",
    name: "Esther Howard",
    profile: "/images/profilepicture.png",
    gender: "Groom",
    email: "bill.sanders@example.com",
    contact: "988744373",
    date: "12 AUG 2022",
    status: "Active",
  },
];

const MemberLists = () => {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />
      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {/* Top Bar */}
        <div className="flex items-center justify-between px-8 py-4 bg-white border-b">
          <h2 className="text-lg font-semibold">Members List</h2>
          <div className="flex items-center gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="border rounded px-4 py-2 w-56"
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
            </div>
            <button className="bg-orange-400 hover:bg-orange-500 text-white px-6 py-2 rounded flex items-center gap-2">
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
            </button>
            <div className="w-10 h-10  overflow-hidden ">
              <img
                src="/icons/profileicon.svg"
                alt="User"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
        {/* Table */}
        <div className="flex-1 overflow-auto p-8">
          <div className="bg-white rounded-lg shadow border p-4">
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
                </tr>
              </thead>
              <tbody>
                {members.map((m, i) => (
                  <tr key={i} className="border-b hover:bg-gray-50 text-center">
                    <td className="px-2 py-2">
                      <input type="checkbox" />
                    </td>
                    <td className="px-2 py-2">{m.regNo}</td>
                    <td className="px-2 py-2">
                      <div className="flex flex-row items-center ml-4">
                        <div>
                          <img
                            src={m.profile}
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
                    <td className="px-2 py-2">{m.contact}</td>
                    <td className="px-2 py-2">{m.date}</td>
                    <td className="px-2 py-2">
                      {m.status === "Active" ? (
                        <span className="bg-green-500 text-white px-3 py-1 rounded text-xs">
                          Active
                        </span>
                      ) : (
                        <span className="bg-red-400 text-white px-3 py-1 rounded text-xs">
                          Expiry
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* Pagination */}
            <div className="flex items-center justify-between mt-4 text-gray-500 text-xs">
              <span>1-10 of 50 pages</span>
              <div className="flex items-center gap-1">
                <button
                  className="px-2 py-1 rounded border bg-gray-100"
                  disabled
                >
                  {"<"}
                </button>
                <button className="px-2 py-1 rounded border bg-white font-bold text-orange-500">
                  1
                </button>
                <button className="px-2 py-1 rounded border bg-white">2</button>
                <span>...</span>
                <button className="px-2 py-1 rounded border bg-white">
                  13
                </button>
                <button className="px-2 py-1 rounded border bg-orange-400 text-white">
                  {">"}
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Footer */}
       
      </main>
    </div>
  );
};

export default MemberLists;
