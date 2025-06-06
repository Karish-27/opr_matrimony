"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Sidebar from '@/components/Sidebar';
import AvatarDropdown from '@/components/AvatarDropdown';
import { withAdminAuth } from '@/hooks/useAuth';

const Dashboard = () => {	const [counts, setCounts] = useState({
		totalProfiles: 0,
		totalMaleProfiles: 0,
		totalFemaleProfiles: 0,
	});
	const [users, setUsers] = useState<Array<{
		regNo: string;
		name: string;
		email: string;
		avatar: string;
		mobile: string;
		createdAt?: Date | string;
	}>>([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const [totalUsers, setTotalUsers] = useState(0);
	const [loading, setLoading] = useState(false);
	const usersPerPage = 10;

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
	};const fetchUsers = async (page: number) => {
		setLoading(true);
		try {
			const response = await fetch(`/api/admin/users?page=${page}&limit=${usersPerPage}`);
			const data = await response.json();
			setUsers(data.users || []);
			setTotalPages(data.pagination?.totalPages || 1);
			setTotalUsers(data.pagination?.totalItems || 0);
		} catch (error) {
			console.error('Error fetching users:', error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetch('/api/dashboard/counts')
			.then((res) => res.json())
			.then((data) => setCounts(data));

		// Fetch dynamic users for table with pagination
		fetchUsers(currentPage);
	}, [currentPage]);

	return (
		<div
			style={{
				display: 'flex',
				minHeight: '100vh',
				background: '#f7f7f7',
			}}
		>
			{/* Sidebar */}
			<Sidebar />
			{/* Main Content */}
			<main
				style={{
					flex: 1,
					padding: '0 0 0 0',
					background: '#f7f7f7',
				}}
			>				{/* Top Bar */}
				<div
					style={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'flex-end',
						padding: '10px 40px 10px 40px',
						background: '#fff',
						borderBottom: '1px solid #eee',
						minHeight: 70,
           
					}}
				>
							<div
						style={{
							display: 'flex',
							alignItems: 'center',
							gap: 24,
						}}
					>
						<AvatarDropdown 
							userEmail="admin@gmail.com"
							avatarSrc="/icons/profileicon.svg"
						/>
					</div>
				</div>
				{/* Summary Cards */}
				<div
					style={{
						display: 'flex',
						gap: 24,
						margin: '32px 40px 0 40px',
					}}
				>
					<div
						style={{
							flex: 1,
							background: '#fff',
							borderRadius: 10,
							boxShadow: '0 2px 8px #0001',
							padding: 24,
							display: 'flex',
							alignItems: 'center',
							gap: 16,
						}}
					>
						<div style={{ fontSize: 32, color: '#ff9000' }}>👥</div>
						<div>
							<div style={{ fontSize: 28, fontWeight: 700 }}>{counts.totalProfiles}</div>
							<div style={{ color: '#888', fontSize: 15 }}>Total Profile</div>
						</div>
					</div>
					<div
						style={{
							flex: 1,
							background: '#fff',
							borderRadius: 10,
							boxShadow: '0 2px 8px #0001',
							padding: 24,
							display: 'flex',
							alignItems: 'center',
							gap: 16,
						}}
					>
						<div style={{ fontSize: 32, color: '#ff9000' }}>👨‍🦱</div>
						<div>
							<div style={{ fontSize: 28, fontWeight: 700 }}>{counts.totalMaleProfiles}</div>
							<div style={{ color: '#888', fontSize: 15 }}>Total Male Profile</div>
						</div>
					</div>
					<div
						style={{
							flex: 1,
							background: '#fff',
							borderRadius: 10,
							boxShadow: '0 2px 8px #0001',
							padding: 24,
							display: 'flex',
							alignItems: 'center',
							gap: 16,
						}}
					>
						<div style={{ fontSize: 32, color: '#ff9000' }}>👩‍🦰</div>
						<div>
							<div style={{ fontSize: 28, fontWeight: 700 }}>{counts.totalFemaleProfiles}</div>
							<div style={{ color: '#888', fontSize: 15 }}>Total Female Profile</div>
						</div>
					</div>
					<div
						style={{
							flex: 1,
							background: '#fff',
							borderRadius: 10,
							boxShadow: '0 2px 8px #0001',
							padding: 24,
							display: 'flex',
							alignItems: 'center',
							gap: 16,
						}}
					>
						<div
							style={{
								fontSize: 32,
								color: '#ff9000',
							}}
						>
							🏅
						</div>
						<div>
							<div
								style={{
									fontSize: 28,
									fontWeight: 700,
								}}
							>
								100
							</div>
							<div
								style={{
									color: '#888',
									fontSize: 15,
								}}
							>
								Total Paid Members
							</div>
						</div>
					</div>
				</div>
				{/* New Users Table */}
				<div
					style={{
						margin: '32px 40px',
						background: '#fff',
						borderRadius: 10,
						boxShadow: '0 2px 8px #0001',
						padding: 0,
						overflow: 'hidden',
					}}
				>					<div
						style={{
							padding: '20px 24px',
							fontWeight: 600,
							fontSize: 18,
							borderBottom: '1px solid #eee',
							display: 'flex',
							justifyContent: 'space-between',
							alignItems: 'center',
						}}
					>						<span>All Users</span>
						<div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
							{!loading && (
								<span style={{ fontSize: 14, fontWeight: 400, color: '#888' }}>
									Total: {totalUsers} users
								</span>
							)}
							<button
								onClick={() => fetchUsers(currentPage)}
								disabled={loading}
								style={{
									padding: '6px 12px',
									border: '1px solid #ddd',
									borderRadius: 6,
									background: '#fff',
									color: '#333',
									cursor: loading ? 'not-allowed' : 'pointer',
									fontSize: 12,
									display: 'flex',
									alignItems: 'center',
									gap: 4,
								}}
								title="Refresh"
							>
								🔄 {loading ? 'Loading...' : 'Refresh'}
							</button>
						</div>
					</div>
					<table
						style={{
							width: '100%',
							borderCollapse: 'collapse',
							fontSize: 16,
						}}
					>
						<thead>
							<tr
								style={{
									background: '#f7f7f7',
									color: '#888',
									textAlign: 'left',
								}}
							>
								<th
									style={{
										padding: '14px 16px',
										fontWeight: 500,
									}}
								>
									Reg.No
								</th>
								<th
									style={{
										padding: '14px 16px',
										fontWeight: 500,
									}}
								>
									Profile
								</th>
								<th
									style={{
										padding: '14px 16px',
										fontWeight: 500,
									}}
								>
									Email
								</th>								<th
									style={{
										padding: '14px 16px',
										fontWeight: 500,
									}}
								>
									Mobile Number
								</th>
								<th
									style={{
										padding: '14px 16px',
										fontWeight: 500,
									}}
								>
									Created At
								</th>
								<th
									style={{
										padding: '14px 16px',
										fontWeight: 500,
									}}
								>
									Action
								</th>
							</tr>
						</thead>						<tbody>							{loading ? (
								<tr>
									<td
										colSpan={6}
										style={{
											padding: '40px',
											textAlign: 'center',
											color: '#888',
										}}
									>
										Loading users...
									</td>
								</tr>
							) : users.length === 0 ? (
								<tr>
									<td
										colSpan={6}
										style={{
											padding: '40px',
											textAlign: 'center',
											color: '#888',
										}}
									>
										No users found
									</td>
								</tr>
							) : (
								users.map((user, idx) => (
								<tr
									key={idx}
									style={{
										borderBottom: '1px solid #f0f0f0',
									}}
								>
									<td
										style={{
											padding: '14px 16px',
											color: '#888',
										}}
									>
										{user.regNo}
									</td>
									<td
										style={{
											padding: '14px 16px',
											display: 'flex',
											alignItems: 'center',
											gap: 12,
										}}
									>
										<img
											src={user.avatar}
											alt={user.name}
											style={{
												width: 36,
												height: 36,
												borderRadius: '50%',
												objectFit: 'cover',
											}}
										/>
										<span
											style={{
												color: '#222',
												fontWeight: 500,
											}}
										>
											{user.name}
										</span>
									</td>
									<td
										style={{
											padding: '14px 16px',
											color: '#222',
										}}
									>
										{user.email}
									</td>									<td
										style={{
											padding: '14px 16px',
											color: '#222',
										}}
									>
										{user.mobile}
									</td>
									<td
										style={{
											padding: '14px 16px',
											color: '#222',
										}}
									>
										{formatDate(user.createdAt)}
									</td>
									<td
										style={{
											padding: '14px 16px',
										}}
									>
										<span
											style={{
												color: '#ff9000',
												fontSize: 22,
												cursor: 'pointer',
											}}
											onClick={() => {
												// Extract numeric id from regNo (assumes regNo is like VKR123)
												const id = user.regNo.replace(/^VKR/, '');
												window.location.href = `/admin/profile/${id}`;
											}}
											title="View Profile"										>
											👁️
										</span>
									</td>
								</tr>
							))
							)}
						</tbody>
					</table>
					
					{/* Pagination Controls */}
					<div
						style={{
							padding: '20px 24px',
							borderTop: '1px solid #eee',
							display: 'flex',
							justifyContent: 'space-between',
							alignItems: 'center',
						}}
					>
						<div style={{ color: '#888', fontSize: 14 }}>
							Showing {users.length > 0 ? ((currentPage - 1) * usersPerPage) + 1 : 0} to{' '}
							{Math.min(currentPage * usersPerPage, totalUsers)} of {totalUsers} users
						</div>
						
						<div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
							<button
								onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
								disabled={currentPage === 1 || loading}
								style={{
									padding: '8px 12px',
									border: '1px solid #ddd',
									borderRadius: 6,
									background: currentPage === 1 ? '#f5f5f5' : '#fff',
									color: currentPage === 1 ? '#888' : '#333',
									cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
									fontSize: 14,
								}}
							>
								Previous
							</button>
							
							{/* Page Numbers */}
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
										onClick={() => setCurrentPage(pageNum)}
										disabled={loading}
										style={{
											padding: '8px 12px',
											border: '1px solid #ddd',
											borderRadius: 6,
											background: currentPage === pageNum ? '#ff9000' : '#fff',
											color: currentPage === pageNum ? '#fff' : '#333',
											cursor: 'pointer',
											fontSize: 14,
											minWidth: 36,
										}}
									>
										{pageNum}
									</button>
								);
							})}
							
							<button
								onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
								disabled={currentPage === totalPages || loading}
								style={{
									padding: '8px 12px',
									border: '1px solid #ddd',
									borderRadius: 6,
									background: currentPage === totalPages ? '#f5f5f5' : '#fff',
									color: currentPage === totalPages ? '#888' : '#333',
									cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
									fontSize: 14,
								}}
							>
								Next
							</button>
						</div>
					</div>
				</div>
				{/* Footer */}
			
		</main>
		</div>
	);
};

export default withAdminAuth(Dashboard);