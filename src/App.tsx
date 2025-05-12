import { useEffect, useState } from 'react'
import './App.css'
import { Route, Routes, useNavigate } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import { setNavigate } from './navigate'
import AdminLayout from './layouts/AdminLayout'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
	const navigate = useNavigate()

	useEffect(() => {
		setNavigate(navigate)
	}, [])

	return (
		<>
			<Routes>
				<Route path="/*" element={<MainLayout />} />
				<Route path="/admin/*" element={<AdminLayout />} />
			</Routes>
			<ToastContainer position="top-right" autoClose={5000} hideProgressBar />
		</>
	)
}

export default App
