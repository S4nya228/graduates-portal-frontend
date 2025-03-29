import React from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { Route, Routes } from 'react-router-dom'
import Home from '../../pages/Home'
import Login from '../../pages/Login'
import Register from '../../pages/Register'
import NotFound from '../../pages/NotFound'

function MainLayout() {
	return (
		<>
			<Header />
			<main>
				<Routes>
					<Route index element={<Home />} />
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
					<Route path="*" element={<NotFound />} />
				</Routes>
			</main>
			<Footer />
		</>
	)
}

export default MainLayout
