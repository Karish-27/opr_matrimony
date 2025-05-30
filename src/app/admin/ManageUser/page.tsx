import React from 'react'
import Image from 'next/image';
import Sidebar from '@/components/Sidebar';

const users = [
  {
    regNo: '00010',
    profileImg: '/images/profilepicture.png',
    name: 'Theresa Webb',
    gender: 'Groom',
    father: 'Jacob Jones',
    dob: '12 Feb 1995',
    contact: '988744373',
    downloads: 5,
  },
  {
    regNo: '00010',
    profileImg: '/images/profilepicture.png',
    name: 'Ronald Richards',
    gender: 'Bride',
    father: 'Cody Fisher',
    dob: '12 Feb 1995',
    contact: '988744373',
    downloads: 10,
  },
  // ...add more users as needed for demo...
];

const ManageUser = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
     <Sidebar />
      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {/* Top Bar */}
        <div className="flex items-center justify-between px-8 py-4 bg-white shadow-sm">
          <h2 className="text-lg font-semibold">Manage Users</h2>
          <div className="flex items-center gap-4">
            <input type="text" placeholder="Search..." className="border rounded px-3 py-2 text-sm" />
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded flex items-center gap-2">
              <Image src="/icons/downloadwhite.svg" alt="Download" width={18} height={18} color='white' />
              Download
            </button>
            <Image src="/icons/profileicon.svg" alt="User" width={40} height={40} className="" />
          </div>
        </div>
        {/* Table */}
         <div className="flex-1 overflow-auto px-8 py-6">
          <table className="min-w-full bg-white rounded shadow text-center">
            <thead>
              <tr className="text-gray-500 text-sm border-b">
                <th className="px-3 py-2"><input type="checkbox" /></th>
                <th className="px-3 py-2">Reg.No</th>
                <th className="px-3 py-2">Profile</th>
                <th className="px-3 py-2">Gender</th>
                <th className="px-3 py-2">Father Name</th>
                <th className="px-3 py-2">DOB</th>
                <th className="px-3 py-2">Contact.No</th>
                <th className="px-3 py-2">Downloads</th>
                <th className="px-3 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, idx) => (
                <tr key={idx} className="border-b hover:bg-gray-50">
                  <td className="px-3 py-2 text-center"><input type="checkbox" /></td>
                  <td className="px-3 py-2 text-center">{user.regNo}</td>
                  <td className="px-3 py-2 flex items-center gap-2 justify-center">
                    <Image src={user.profileImg} alt={user.name} width={32} height={32} className="rounded-full" />
                    {user.name}
                  </td>
                  <td className="px-3 py-2 text-center">{user.gender}</td>
                  <td className="px-3 py-2 text-center">{user.father}</td>
                  <td className="px-3 py-2 text-center">{user.dob}</td>
                  <td className="px-3 py-2 text-center">{user.contact}</td>
                  <td className="px-3 py-2 text-center">{user.downloads}</td>
                  <td className="px-3 py-2 flex gap-3 justify-center">
                    <button><Image src="/icons/eye.svg" alt="View" width={20} height={20} /></button>
                    <button><Image src="/icons/download.svg" alt="Download" width={20} height={20} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* Pagination */}
          <div className="flex items-center justify-between mt-4 text-sm text-gray-500 w-full max-w-[1200px] mx-auto">
            <span>1-10 of 50 pages</span>
            <div className="flex items-center gap-2">
              <button className="px-2 py-1 border rounded disabled:opacity-50" disabled>{'<'}</button>
              <button className="px-3 py-1 border rounded bg-orange-500 text-white">1</button>
              <button className="px-3 py-1 border rounded">2</button>
              <span>...</span>
              <button className="px-3 py-1 border rounded">13</button>
              <button className="px-2 py-1 border rounded">{'>'}</button>
            </div>
          </div>
        </div>
        {/* Footer */}
       
      </main>
    </div>
  );
}

export default ManageUser