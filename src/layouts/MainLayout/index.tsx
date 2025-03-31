import React from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { Route, Routes } from 'react-router-dom'
import Home from '../../pages/Home'
import Login from '../../pages/Login'
import Register from '../../pages/Register'
import NotFound from '../../pages/NotFound'
import Profile from '../../pages/Profile'
import SearchAlumni from '../../pages/Search'
import Publication from '../../pages/Publication'

function MainLayout() {
	return (
		<>
			<Header />
			<main>
				<Routes>
					<Route index element={<Home />} />
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
					<Route path="/profile" element={<Profile />} />
					<Route path="/search" element={<SearchAlumni />} />
					<Route path="/publication/:id" element={<Publication />} />
					<Route path="*" element={<NotFound />} />
				</Routes>
			</main>
			<Footer />
		</>
	)
}

export default MainLayout
