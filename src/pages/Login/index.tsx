import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Button from '../../components/ui/Button'
import Input from '../../components/ui/Input'
import Label from '../../components/ui/Label'
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '../../components/Card'
import { LogIn, Mail, Lock } from 'lucide-react'

import { useDispatch } from 'react-redux'
import { authActions } from '../../store/authSlice'
import { getNavigate } from '../../navigate'
import authService from '../../services/authService'
import { LoginErrors, validateLogin } from '../../validation/validation'
import { validationMessagesMap } from '../../validation/validationMessages'

const Login = () => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [loading, setLoading] = useState(false)
	const [errors, setErrors] = useState<LoginErrors>({})
	const [serverError, setServerError] = useState('')

	const dispatch = useDispatch()
	const navigate = getNavigate()

	function getFriendlyMessage(message: string): string {
		return validationMessagesMap[message] || message
	}

	const validate = () => {
		const validationErrors = validateLogin(email, password)
		setErrors(validationErrors)
		return Object.keys(validationErrors).length === 0
	}

	const handleLogin = async (e: React.FormEvent) => {
		e.preventDefault()
		setServerError('')
		setErrors({})

		if (!validate()) {
			return
		}

		setLoading(true)

		try {
			const response = await authService.login({ email, password })

			if (!response?.token) {
				throw new Error('Помилка авторизації: відсутній token')
			}

			dispatch(authActions.setToken({ token: response.token }))
			navigate('/profile')
		} catch (err: any) {
			console.error(err)

			if (err.response?.status === 422 && err.response?.data?.errors) {
				const apiErrors = err.response.data.errors
				const formattedErrors: LoginErrors = {}

				Object.entries(apiErrors).forEach(([key, messages]) => {
					if (Array.isArray(messages)) {
						formattedErrors[key as keyof LoginErrors] = messages
							.map(getFriendlyMessage)
							.join(' ')
					}
				})

				setErrors(formattedErrors)
			} else {
				setServerError(
					err.response?.data?.message ||
						'Невірні дані для входу або сервер недоступний.'
				)
			}
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className="min-h-screen flex items-center justify-center bg-[#F1F5F9] px-4 py-12">
			<div className="w-full max-w-md">
				<Card>
					<form onSubmit={handleLogin}>
						<CardHeader className="space-y-1 text-center">
							<CardTitle className="text-2xl font-bold">
								Вхід до порталу
							</CardTitle>
							<CardDescription>
								Увійдіть у ваш обліковий запис для доступу до порталу
								випускників
							</CardDescription>
						</CardHeader>

						<CardContent className="space-y-4">
							{serverError && (
								<p className="text-sm text-red-500 text-center">
									{serverError}
								</p>
							)}

							<div className="flex flex-col gap-2">
								<Label htmlFor="email">Email адреса</Label>
								<div className="relative">
									<Input
										id="email"
										type="email"
										placeholder="email@university.edu"
										value={email}
										onChange={(e) => setEmail(e.target.value)}
										className="pl-10"
										required
									/>
									<Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted" />
								</div>
								{errors.email && (
									<p className="text-sm text-red-500">{errors.email}</p>
								)}
							</div>

							<div className="flex flex-col gap-2">
								<Label htmlFor="password">Пароль</Label>
								<div className="relative">
									<Input
										id="password"
										type="password"
										value={password}
										onChange={(e) => setPassword(e.target.value)}
										className="pl-10"
										required
									/>
									<Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted" />
								</div>
								{errors.password && (
									<p className="text-sm text-red-500">{errors.password}</p>
								)}
							</div>

							<Button
								type="submit"
								disabled={loading}
								className="cursor-pointer w-full bg-alumni-purple hover:bg-alumni-purple/90"
							>
								<LogIn className="mr-2 h-4 w-4" />
								{loading ? 'Завантаження...' : 'Увійти'}
							</Button>
						</CardContent>

						<CardFooter className="flex flex-col space-y-4">
							<div className="text-center text-sm">
								Ще не маєте облікового запису?{' '}
								<Link
									to="/register"
									className="text-alumni-blue hover:underline font-medium"
								>
									Зареєструватися
								</Link>
							</div>
						</CardFooter>
					</form>
				</Card>
			</div>
		</div>
	)
}

export default Login
