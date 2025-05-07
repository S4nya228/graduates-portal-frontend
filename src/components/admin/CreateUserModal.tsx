import React, { useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { X, UserPlus } from 'lucide-react'
import Input from '../ui/Input'
import Button from '../ui/Button'

const CreateUserModal = () => {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		graduation_at: '',
		specialty: '',
		password: '',
		password_confirmation: '',
	})

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target
		setFormData({ ...formData, [name]: value })
	}

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		// TODO: Replace with actual POST request
		console.log('User submitting:', formData)
	}

	return (
		<Dialog.Root>
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
						<Input
							name="specialty"
							placeholder="Спеціальність"
							value={formData.specialty}
							onChange={handleChange}
							required
						/>
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
