import { useEffect, useState } from 'react'
import './App.css'
import { Route, Routes, useNavigate } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import { setNavigate } from './navigate'
import AdminLayout from './layouts/AdminLayout'

function App() {
	const navigate = useNavigate()

	useEffect(() => {
		setNavigate(navigate)
	}, [])

	return (
		<Routes>
			<Route path="/*" element={<MainLayout />} />
			<Route path="/admin/*" element={<AdminLayout />} />
		</Routes>
	)
}

export default App
