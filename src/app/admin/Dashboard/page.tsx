"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Sidebar from '@/components/Sidebar';

const Dashboard = () => {
	const [counts, setCounts] = useState({
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
	}>>([]);

	useEffect(() => {
		fetch('/api/dashboard/counts')
			.then((res) => res.json())
			.then((data) => setCounts(data));

		// Fetch dynamic users for table
		fetch('/api/admin/users')
			.then((res) => res.json())
			.then((data) => setUsers(data.users || []));
	}, []);

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
			>
				{/* Top Bar */}
				<div
					style={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'space-between',
						padding: '10px 40px 10px 40px',
						background: '#fff',
						borderBottom: '1px solid #eee',
						minHeight: 70,
           
					}}
				>
					<div
						style={{
							fontSize: 18,
							fontWeight: 500,
						}}
					>
						Welcome{' '}
						<span role="img" aria-label="wave">
							👋
						</span>{' '}
						Jenny Wilson
					</div>
					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							gap: 24,
						}}
					>
						<span
							style={{
								fontSize: 22,
								color: '#aaa',
								cursor: 'pointer',
							}}
						>
							🔔
						</span>
						<img
							src="https://randomuser.me/api/portraits/men/6.jpg"
							alt="avatar"
							style={{
								width: 40,
								height: 40,
								borderRadius: '50%',
							}}
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
				>
					<div
						style={{
							padding: '20px 24px',
							fontWeight: 600,
							fontSize: 18,
							borderBottom: '1px solid #eee',
						}}
					>
						New Users
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
								</th>
								<th
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
									Action
								</th>
							</tr>
						</thead>
						<tbody>
							{users.map((user, idx) => (
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
									</td>
									<td
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
											title="View Profile"
										>
											👁️
										</span>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
				{/* Footer */}
			
			</main>
		</div>
	);
};

export default Dashboard;