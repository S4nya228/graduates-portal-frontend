import React from 'react'
import { Link } from 'react-router-dom'
import Button from '../../components/Button'
import Input from '../../components/Input'
import Label from '../../components/Label'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '../../components/Select'
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '../../components/Card'
import { User, Mail, Lock, Calendar } from 'lucide-react'

const Register = () => {
	const currentYear = new Date().getFullYear()
	const years = Array.from({ length: 30 }, (_, i) => currentYear - i)

	return (
		<div className="min-h-screen flex items-center justify-center bg-alumni-light-gray px-4 py-12">
			<div className="w-full max-w-md">
				<Card>
					<CardHeader className="space-y-1 text-center">
						<CardTitle className="text-2xl font-bold">Реєстрація</CardTitle>
						<CardDescription>
							Створіть обліковий запис для доступу до порталу випускників
						</CardDescription>
					</CardHeader>

					<CardContent className="space-y-4">
						<div className="space-y-2">
							<Label htmlFor="fullName">Ім'я та прізвище</Label>
							<div className="relative">
								<Input
									id="fullName"
									placeholder="Іван Петренко"
									className="pl-10"
								/>
								<User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[hsl(215.4,16.3%,46.9%)]" />
							</div>
						</div>

						<div className="space-y-2">
							<Label htmlFor="email">Email адреса</Label>
							<div className="relative">
								<Input
									id="email"
									placeholder="email@university.edu"
									type="email"
									className="pl-10"
								/>
								<Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[hsl(215.4,16.3%,46.9%)]" />
							</div>
							<p className="text-xs text-[hsl(215.4,16.3%,46.9%)]">
								Використовуйте університетську пошту для швидкої верифікації
							</p>
						</div>

						<div className="grid grid-cols-2 gap-4">
							<div className="space-y-2">
								<Label htmlFor="graduation-year">Рік випуску</Label>
								<div className="relative pt-2">
									<Select>
										<SelectTrigger className="pl-10">
											<SelectValue placeholder="Рік" />
										</SelectTrigger>
										<SelectContent>
											{years.map((year) => (
												<SelectItem key={year} value={year.toString()}>
													{year}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
									<Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[hsl(215.416.3%,46.9%)]" />
								</div>
							</div>

							<div className="space-y-2">
								<Label htmlFor="specialization">Спеціалізація</Label>
								<div className="relative pt-2">
									<Select>
										<SelectTrigger>
											<SelectValue placeholder="Спеціалізація" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="software-engineering">
												Програмна інженерія
											</SelectItem>
											<SelectItem value="computer-science">
												Комп'ютерні науки
											</SelectItem>
											<SelectItem value="ai">Штучний інтелект</SelectItem>
											<SelectItem value="cybersecurity">
												Кібербезпека
											</SelectItem>
											<SelectItem value="data-science">
												Наука про дані
											</SelectItem>
										</SelectContent>
									</Select>
								</div>
							</div>
						</div>

						<div className="space-y-2">
							<Label htmlFor="password">Пароль</Label>
							<div className="relative">
								<Input id="password" type="password" className="pl-10" />
								<Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[hsl(215.4,16.3%,46.9%)]" />
							</div>
							<p className="text-xs text-[hsl(215.4,16.3%,46.9%)]">
								Мінімум 8 символів, включаючи літери та цифри
							</p>
						</div>

						<div className="space-y-2">
							<Label htmlFor="confirm-password">Підтвердження паролю</Label>
							<div className="relative">
								<Input
									id="confirm-password"
									type="password"
									className="pl-10"
								/>
								<Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[hsl(215.4,16.3%,46.9%)]" />
							</div>
						</div>

						<Button className="w-full bg-alumni-purple hover:bg-alumni-purple/90 cursor-pointer">
							Зареєструватися
						</Button>
					</CardContent>

					<CardFooter className="flex flex-col space-y-4">
						<div className="text-center text-sm">
							Вже маєте обліковий запис?{' '}
							<Link
								to="/login"
								className="text-alumni-blue hover:underline font-medium"
							>
								Увійти
							</Link>
						</div>
					</CardFooter>
				</Card>
			</div>
		</div>
	)
}

export default Register
