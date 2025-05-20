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
import Events from '../../pages/Events'
import ScrollToTop from '../../components/ScrollToTop'
import Notifications from '../../pages/Notification'
import AuthGate from '../../components/AuthGate'

function MainLayout() {
	return (
		<div className="min-h-screen flex flex-col">
			<Header />
			<ScrollToTop />
			<main className="flex-grow">
				<Routes>
					<Route index element={<Home />} />
					<Route
						path="/login"
						element={
							<AuthGate>
								<Login />
							</AuthGate>
						}
					/>
					<Route
						path="/register"
						element={
							<AuthGate>
								<Register />
							</AuthGate>
						}
					/>
					<Route
						path="/profile"
						element={
							<AuthGate requireAuth>
								<Profile />
							</AuthGate>
						}
					/>
					<Route path="/search" element={<SearchAlumni />} />
					<Route path="/publication/:id" element={<Publication />} />
					<Route path="/events" element={<Events />} />
					<Route path="/cabinet/:id" element={<Profile />} />
					<Route path="/notification" element={<Notifications />} />
					<Route path="*" element={<NotFound />} />
				</Routes>
			</main>
			<Footer />
		</div>
	)
}

export default MainLayout
