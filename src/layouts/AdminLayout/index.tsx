import React from 'react'
import { Route, Routes } from 'react-router-dom'
import NotFound from '../../pages/NotFound'
import AdminPanel from '../../pages/AdminPanel'

function AdminLayout() {
	return (
		<Routes>
			<Route path="/1" element={<AdminPanel />} />
			<Route path="*" element={<NotFound />} />
		</Routes>
	)
}

export default AdminLayout
