import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
	const currentYear = new Date().getFullYear()

	return (
		<footer id="footer" className="bg-[#1E293B] text-white py-8 mt-auto">
			<div className="container mx-auto px-4">
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					<div>
						<h3 className="text-lg font-semibold mb-4">IT Alumni</h3>
						<p className="text-[#F1F5F9]">
							Спільнота випускників факультету інформаційних технологій
						</p>
					</div>

					<div>
						<h3 className="text-lg font-semibold mb-4">Посилання</h3>
						<ul className="space-y-2">
							<li>
								<Link
									to="/"
									className="text-[#F1F5F9] hover:text-white transition-colors"
								>
									Головна
								</Link>
							</li>
							<li>
								<Link
									to="/search"
									className="text-[#F1F5F9] hover:text-white transition-colors"
								>
									Пошук випускників
								</Link>
							</li>
							<li>
								<Link
									to="/events"
									className="text-[#F1F5F9] hover:text-white transition-colors"
								>
									Майбутні події
								</Link>
							</li>
						</ul>
					</div>

					<div>
						<h3 className="text-lg font-semibold mb-4">Контакти</h3>
						<p className="text-[#F1F5F9]">
							Адреса: вулиця Університетська, 1<br />
							Телефон: (123) 456-7890
							<br />
							Email: it-alumni@university.edu
						</p>
					</div>
				</div>

				<div className="border-t border-[#94A3B8] mt-8 pt-6 text-center text-[#F1F5F9]">
					<p>&copy; {currentYear} IT Alumni Portal. Всі права захищено.</p>
				</div>
			</div>
		</footer>
	)
}

export default Footer
