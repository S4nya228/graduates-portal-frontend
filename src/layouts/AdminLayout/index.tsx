import React from 'react'
import { Route, Routes } from 'react-router-dom'
import NotFound from '../../pages/NotFound'

function AdminLayout() {
	return (
		<Routes>
			<Route path="*" element={<NotFound />} />
		</Routes>
	)
}

export default AdminLayout
