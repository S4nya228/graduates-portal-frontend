import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { authActions } from '../../store/authSlice'
import authService from '../../services/authService'
import Button from '../../components/ui/Button'
import Input from '../../components/ui/Input'
import Label from '../../components/ui/Label'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '../../components/ui/Select'
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '../../components/Card'
import { User, Mail, Lock, Calendar, GraduationCap } from 'lucide-react'
import axios from 'axios'
import { validationMessagesMap } from '../../validation/validationMessages'
import { validateRegister } from '../../validation/validateRegister'

const Register = () => {
	const currentYear = new Date().getFullYear()
	const years = Array.from({ length: 30 }, (_, i) => currentYear - i)
	const navigate = useNavigate()
	const dispatch = useDispatch()
	function getFriendlyMessage(message: string): string {
		return validationMessagesMap[message] || message
	}

	const [formData, setFormData] = useState({
		name: '',
		email: '',
		graduation_at: '',
		specialty: '',
		password: '',
		password_confirmation: '',
	})

	const [errors, setErrors] = useState<any>({})
	const [isSubmitting, setIsSubmitting] = useState(false)

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { name, value } = e.target
		setFormData({
			...formData,
			[name]: value,
		})
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()

		const validationErrors = validateRegister(formData)
		if (Object.keys(validationErrors).length > 0) {
			setErrors(validationErrors)
			return
		}

		setIsSubmitting(true)

		try {
			const response = await authService.register(formData)

			if (response) {
				dispatch(
					authActions.setToken({
						token: response.token,
					})
				)

				navigate('/')
			}
		} catch (err) {
			if (axios.isAxiosError(err)) {
				if (err.response) {
					const apiErrors = err.response.data.errors || {}
					const formattedErrors: Record<string, string> = {}

					Object.entries(apiErrors).forEach(([field, messages]) => {
						if (Array.isArray(messages)) {
							formattedErrors[field] = messages
								.map(getFriendlyMessage)
								.join(' ')
						} else if (typeof messages === 'string') {
							formattedErrors[field] = getFriendlyMessage(messages)
						}
					})

					setErrors(formattedErrors)
				}
			} else {
				setErrors({ general: 'Щось пішло не так, спробуйте ще раз пізніше' })
			}
		} finally {
			setIsSubmitting(false)
		}
	}

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
							<Label htmlFor="name">Ім'я та прізвище</Label>
							<div className="relative">
								<Input
									id="name"
									name="name"
									placeholder="Іван Петренко"
									className="pl-10"
									value={formData.name}
									onChange={handleChange}
								/>
								<User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[hsl(215.4,16.3%,46.9%)]" />
							</div>
							{errors.name && (
								<p className="text-xs text-red-500">{errors.name}</p>
							)}
						</div>

						<div className="space-y-2">
							<Label htmlFor="email">Email адреса</Label>
							<div className="relative">
								<Input
									id="email"
									name="email"
									placeholder="email@university.edu"
									type="email"
									className="pl-10"
									value={formData.email}
									onChange={handleChange}
								/>
								<Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[hsl(215.4,16.3%,46.9%)]" />
							</div>
							{errors.email && (
								<p className="text-xs text-red-500">{errors.email}</p>
							)}
						</div>

						<div className="grid grid-cols-2 gap-4">
							<div className="space-y-2">
								<Label htmlFor="graduation-year">Рік випуску</Label>
								<div className="relative pt-2">
									<Select
										value={formData.graduation_at}
										onValueChange={(value) =>
											setFormData({ ...formData, graduation_at: value })
										}
									>
										<SelectTrigger className="w-full cursor-pointer rounded-md border border-[hsl(214.3,31.8%,91.4%)] bg-[hsl(210,40%,98%)] px-4 py-2 text-base md:text-sm placeholder:text-[hsl(215.4,16.3%,46.9%)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(252,56%,57%)] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pl-10">
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

									<Calendar
										className="absolute left-3 mt-1 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[hsl(215.4,16.3%,46.9%)]"
										aria-hidden="true"
									/>
								</div>
							</div>

							<div className="space-y-2">
								<Label htmlFor="specialization">Спеціалізація</Label>
								<div className="relative pt-2">
									<Select
										name="specialty"
										value={formData.specialty}
										onValueChange={(value) =>
											setFormData({ ...formData, specialty: value })
										}
									>
										<SelectTrigger className="w-full cursor-pointer rounded-md border border-[hsl(214.3,31.8%,91.4%)] bg-[hsl(210,40%,98%)] px-4 py-2 text-base md:text-sm placeholder:text-[hsl(215.4,16.3%,46.9%)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(252,56%,57%)] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pl-10">
											<SelectValue placeholder="Спеціалізація" />
										</SelectTrigger>

										<SelectContent>
											<SelectItem value="Програмна інженерія">
												Програмна інженерія
											</SelectItem>
											<SelectItem value="Комп'ютерні науки">
												Комп'ютерні науки
											</SelectItem>
											<SelectItem value="Штучний інтелект">
												Штучний інтелект
											</SelectItem>
											<SelectItem value="Кібербезпека">Кібербезпека</SelectItem>
											<SelectItem value="Наука про дані">
												Наука про дані
											</SelectItem>
										</SelectContent>
									</Select>
									<GraduationCap
										className="absolute left-3 mt-1 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[hsl(215.4,16.3%,46.9%)]"
										aria-hidden="true"
									/>
								</div>
							</div>
						</div>

						<div className="space-y-2">
							<Label htmlFor="password">Пароль</Label>
							<div className="relative">
								<Input
									id="password"
									name="password"
									type="password"
									className="pl-10"
									value={formData.password}
									onChange={handleChange}
								/>
								<Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[hsl(215.4,16.3%,46.9%)]" />
							</div>
							{errors.password && (
								<p className="text-xs text-red-500">{errors.password}</p>
							)}
							<p className="text-xs text-[hsl(215.4,16.3%,46.9%)]">
								Мінімум 8 символів, включаючи літери та цифри
							</p>
						</div>

						<div className="space-y-2">
							<Label htmlFor="password_confirmation">
								Підтвердження паролю
							</Label>
							<div className="relative">
								<Input
									id="password_confirmation"
									name="password_confirmation"
									type="password"
									className="pl-10"
									value={formData.password_confirmation}
									onChange={handleChange}
								/>
								<Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[hsl(215.4,16.3%,46.9%)]" />
							</div>
							{errors.password_confirmation && (
								<p className="text-xs text-red-500">
									{errors.password_confirmation}
								</p>
							)}
						</div>

						<Button
							className="w-full bg-alumni-purple hover:bg-[#8b5cf6]/90 cursor-pointer"
							onClick={handleSubmit}
							disabled={isSubmitting}
						>
							{isSubmitting ? 'Зареєструватись...' : 'Зареєструватись'}
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
