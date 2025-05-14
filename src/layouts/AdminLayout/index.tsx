import React from 'react'
import { Route, Routes } from 'react-router-dom'
import NotFound from '../../pages/NotFound'
import AdminPanel from '../../pages/AdminPanel'
import ScrollToTop from '../../components/ScrollToTop'

function AdminLayout() {
	return (
		<>
			<ScrollToTop />
			<Routes>
				<Route index element={<AdminPanel />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
		</>
	)
}

export default AdminLayout
