import React from 'react'
import { Link } from 'react-router-dom'
import Button from '../../components/Button'
import Input from '../../components/Input'
import Label from '../../components/Label'
import Checkbox from '../../components/Checkbox'
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '../../components/Card'
import { LogIn, Mail, Lock } from 'lucide-react'

const Login = () => {
	return (
		<div className="min-h-screen flex items-center justify-center bg-[#F1F5F9] px-4 py-12">
			<div className="w-full max-w-md">
				<Card>
					<CardHeader className="space-y-1 text-center">
						<CardTitle className="text-2xl font-bold">
							Вхід до порталу
						</CardTitle>
						<CardDescription>
							Увійдіть у ваш обліковий запис для доступу до порталу випускників
						</CardDescription>
					</CardHeader>

					<CardContent className="space-y-4">
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
						</div>

						<div className="space-y-2">
							<div className="flex items-center justify-between">
								<Label htmlFor="password">Пароль</Label>
								<Link
									to="/forgot-password"
									className="text-xs text-alumni-blue hover:underline"
								>
									Забули пароль?
								</Link>
							</div>
							<div className="relative">
								<Input id="password" type="password" className="pl-10" />
								<Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[hsl(215.4,16.3%,46.9%)]" />
							</div>
						</div>

						<div className="flex items-center space-x-2">
							<Checkbox id="remember" />
							<label
								htmlFor="remember"
								className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
							>
								Запам'ятати мене
							</label>
						</div>

						<Button className="cursor-pointer w-full bg-alumni-purple hover:bg-alumni-purple/90">
							<LogIn className="mr-2 h-4 w-4" /> Увійти
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
				</Card>
			</div>
		</div>
	)
}

export default Login
