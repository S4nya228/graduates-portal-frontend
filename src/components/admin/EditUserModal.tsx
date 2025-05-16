import React, { useState, useEffect } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import Input from '../ui/Input'
import Button from '../ui/Button'
import { toast } from 'react-toastify'
import userService from '../../services/userService'
import { User } from '../../types'

interface Props {
	user: User | null
	open: boolean
	onClose: () => void
	onUpdated: () => void
}

const EditUserModal: React.FC<Props> = ({ user, open, onClose, onUpdated }) => {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
		password_confirmation: '',
		graduation_at: '',
		specialty: '',
		is_admin: 'N' as 'Y' | 'N',
	})

	useEffect(() => {
		if (user) {
			setFormData({
				name: user.name || '',
				email: user.email || '',
				password: '',
				password_confirmation: '',
				graduation_at: user.graduation_at?.toString() || '',
				specialty: user.specialty || '',
				is_admin: user.is_admin ? 'Y' : 'N',
			})
		}
	}, [user])

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { name, value } = e.target
		setFormData((prev) => ({ ...prev, [name]: value }))
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		if (!user) return

		const payload: any = {
			name: formData.name,
			email: formData.email,
			graduation_at: formData.graduation_at,
			specialty: formData.specialty,
			is_admin: formData.is_admin,
		}

		if (formData.password && formData.password_confirmation) {
			payload.password = formData.password
			payload.password_confirmation = formData.password_confirmation
		}

		try {
			await userService.update(user.id, payload)
			toast.success('Користувача оновлено!')
			onUpdated()
			onClose()
		} catch (err) {
			console.error(err)
			toast.error('Помилка при оновленні користувача')
		}
	}

	return (
		<Dialog.Root open={open} onOpenChange={onClose}>
			<Dialog.Portal>
				<Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50" />
				<Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-full max-w-xl -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white p-6 shadow-xl focus:outline-none">
					<div className="flex items-center justify-between mb-4">
						<Dialog.Title className="text-xl font-semibold">
							Редагувати користувача
						</Dialog.Title>
						<Dialog.Close asChild>
							<button className="text-gray-500 hover:text-black">
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
						/>
						<Input
							name="specialty"
							placeholder="Спеціальність"
							value={formData.specialty}
							onChange={handleChange}
						/>

						<Input
							type="password"
							name="password"
							placeholder="Новий пароль"
							value={formData.password}
							onChange={handleChange}
						/>
						<Input
							type="password"
							name="password_confirmation"
							placeholder="Підтвердження паролю"
							value={formData.password_confirmation}
							onChange={handleChange}
						/>

						<div>
							<label className="block text-sm font-medium mb-1">
								Роль користувача
							</label>
							<select
								name="is_admin"
								value={formData.is_admin}
								onChange={handleChange}
								className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
							>
								<option value="N">Користувач</option>
								<option value="Y">Адміністратор</option>
							</select>
						</div>

						<div className="flex justify-end pt-4">
							<Button
								type="submit"
								className="bg-alumni-purple hover:bg-[#8B5CF6]/90"
							>
								Оновити
							</Button>
						</div>
					</form>
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog.Root>
	)
}

export default EditUserModal
