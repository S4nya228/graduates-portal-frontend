import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Button from './Button'
import { Home, User, Users, Search, Menu, X, LogIn } from 'lucide-react'

const Header = () => {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
	const location = useLocation()
	const isLoggedIn = false

	const toggleMenu = () => {
		setMobileMenuOpen(!mobileMenuOpen)
	}

	const navItems = [
		{ name: 'Головна', path: '/', icon: <Home className="w-5 h-5 mr-2" /> },
		{
			name: 'Профіль',
			path: '/profile',
			icon: <User className="w-5 h-5 mr-2" />,
			requiresAuth: true,
		},
		{
			name: 'Пошук випускників',
			path: '/search',
			icon: <Search className="w-5 h-5 mr-2" />,
			requiresAuth: true,
		},
	]

	const filteredNavItems = navItems.filter((item) => {
		if (item.requiresAuth && !isLoggedIn) return false
		return true
	})

	return (
		<header className="sticky top-0 z-40 w-full bg-white shadow-sm">
			<div className="container flex items-center justify-between h-16 px-4 mx-auto">
				<div className="flex items-center">
					<Link to="/" className="flex items-center">
						<Users className="w-8 h-8 text-[#8B5CF6]" />
						<span className="ml-2 text-xl font-bold text-[#1E293B]">
							IT Alumni
						</span>
					</Link>
				</div>

				<nav className="hidden md:flex items-center space-x-4">
					{filteredNavItems.map((item) => (
						<Link
							key={item.path}
							to={item.path}
							className={`flex items-center px-4 py-2 rounded-md transition-colors ${
								location.pathname === item.path
									? 'bg-[#8B5CF6] text-white'
									: 'text-#1E293B hover:bg-[#F1F5F9]'
							}`}
						>
							{item.icon}
							{item.name}
						</Link>
					))}

					{isLoggedIn ? (
						<Button variant="outline" className="ml-2 cursor-pointer">
							Вийти
						</Button>
					) : (
						<Link to="/login">
							<Button className="bg-[#8B5CF6] hover:bg-[#8B5CF6]/90 text-white flex items-center cursor-pointer">
								<LogIn className="w-4 h-4 mr-2" />
								Увійти
							</Button>
						</Link>
					)}
				</nav>

				<button
					className="flex items-center md:hidden"
					onClick={toggleMenu}
					aria-label="Toggle menu"
				>
					{mobileMenuOpen ? (
						<X className="w-6 h-6 text-[#1E293B]" />
					) : (
						<Menu className="w-6 h-6 text-[#1E293B]" />
					)}
				</button>
			</div>

			{mobileMenuOpen && (
				<div className="md:hidden bg-white py-2">
					<div className="container px-4 mx-auto">
						{filteredNavItems.map((item) => (
							<Link
								key={item.path}
								to={item.path}
								className={`flex items-center px-4 py-3 rounded-md transition-colors ${
									location.pathname === item.path
										? 'bg-[#8B5CF6] text-white'
										: 'text-#1E293B hover:bg-[#F1F5F9]'
								}`}
								onClick={() => setMobileMenuOpen(false)}
							>
								{item.icon}
								{item.name}
							</Link>
						))}

						{isLoggedIn ? (
							<Button variant="outline" className="w-full mt-2">
								Вийти
							</Button>
						) : (
							<Link
								to="/login"
								className="block w-full mt-2"
								onClick={() => setMobileMenuOpen(false)}
							>
								<Button className="bg-[#8B5CF6] hover:bg-[#8B5CF6]/90 text-white w-full flex items-center justify-center">
									<LogIn className="w-4 h-4 mr-2" />
									Увійти
								</Button>
							</Link>
						)}
					</div>
				</div>
			)}
		</header>
	)
}

export default Header
