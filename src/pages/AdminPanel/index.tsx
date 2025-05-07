import React, { useState } from 'react'
import AdminHeader from '../../components/admin/AdminHeader'
import AdminStatsCards from '../../components/admin/AdminStatsCards'
import AdminTabs from '../../components/admin/AdminTabs'

const AdminPanel = () => {
	return (
		<div className="min-h-screen bg-alumni-light-gray">
			<AdminHeader />
			<div className="container mx-auto px-4 py-8">
				<AdminStatsCards />
				<AdminTabs />
			</div>
		</div>
	)
}

export default AdminPanel
