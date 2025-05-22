import React, { useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { X, UserPlus, GraduationCap } from 'lucide-react'
import Input from '../ui/Input'
import Button from '../ui/Button'
import { toast } from 'react-toastify'
import userService from '../../services/userService'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '../ui/Select'

interface CreateUserModalProps {
	onUserCreated: () => void
}

const CreateUserModal: React.FC<CreateUserModalProps> = ({ onUserCreated }) => {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		graduation_at: '',
		specialty: '',
		password: '',
		password_confirmation: '',
	})

	const [open, setOpen] = useState(false)

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target
		setFormData({ ...formData, [name]: value })
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()

		try {
			const payload = {
				...formData,
			}
			await userService.create(payload)
			setOpen(false)
			onUserCreated()
			toast.success('Користувача створено успішно!')
			setFormData({
				name: '',
				email: '',
				graduation_at: '',
				specialty: '',
				password: '',
				password_confirmation: '',
			})
		} catch (error) {
			toast.error('Помилка при створенні користувача')
			console.error('Помилка створення користувача:', error)
		}
	}

	const handleSelectChange = (value: string) => {
		setFormData({ ...formData, specialty: value })
	}

	return (
		<Dialog.Root open={open} onOpenChange={setOpen}>
			<Dialog.Trigger asChild>
				<Button className="bg-alumni-purple hover:bg-[#8B5CF6]/90">
					<UserPlus className="mr-2 h-4 w-4" />
					Додати користувача
				</Button>
			</Dialog.Trigger>
			<Dialog.Portal>
				<Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50" />
				<Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-full max-w-xl -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white p-6 shadow-xl focus:outline-none">
					<div className="flex items-center justify-between mb-4">
						<Dialog.Title className="text-xl font-semibold">
							Новий користувач
						</Dialog.Title>
						<Dialog.Close asChild>
							<button className="text-gray-500 hover:text-black cursor-pointer">
								<X className="w-5 h-5" />
							</button>
						</Dialog.Close>
					</div>

					<form onSubmit={handleSubmit} className="space-y-4">
						<Input
							name="name"
							placeholder="Ім’я"
							value={formData.name}
							onChange={handleChange}
							required
						/>
						<Input
							type="email"
							name="email"
							placeholder="Email"
							value={formData.email}
							onChange={handleChange}
							required
						/>
						<Input
							type="number"
							name="graduation_at"
							placeholder="Рік випуску"
							value={formData.graduation_at}
							onChange={handleChange}
							required
						/>
						<div className="relative pt-2">
							<Select
								value={formData.specialty}
								onValueChange={handleSelectChange}
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
									<SelectItem value="Наука про дані">Наука про дані</SelectItem>
								</SelectContent>
							</Select>
							<GraduationCap
								className="absolute left-3 mt-1 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[hsl(215.4,16.3%,46.9%)]"
								aria-hidden="true"
							/>
						</div>
						<Input
							type="password"
							name="password"
							placeholder="Пароль"
							value={formData.password}
							onChange={handleChange}
							required
						/>
						<Input
							type="password"
							name="password_confirmation"
							placeholder="Підтвердження паролю"
							value={formData.password_confirmation}
							onChange={handleChange}
							required
						/>

						<div className="flex justify-end pt-4">
							<Button
								type="submit"
								className="bg-alumni-purple hover:bg-[#8B5CF6]/90"
							>
								Створити
							</Button>
						</div>
					</form>
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog.Root>
	)
}

export default CreateUserModal
