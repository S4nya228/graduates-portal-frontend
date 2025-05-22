import React, { useState, useEffect } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { GraduationCap, X } from 'lucide-react'
import Input from '../ui/Input'
import Button from '../ui/Button'
import { toast } from 'react-toastify'
import userService from '../../services/userService'
import { User } from '../../types'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '../ui/Select'

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
		graduated_at: '',
		specialty: '',
		password: '',
		password_confirmation: '',
		is_admin: 'N' as 'Y' | 'N',
	})

	useEffect(() => {
		if (user) {
			setFormData({
				name: user.name || '',
				email: user.email || '',
				password: '',
				password_confirmation: '',
				graduated_at: user.graduated_at?.toString() || '',
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
			graduated_at: formData.graduated_at,
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

	const handleSelectChange = (value: string) => {
		setFormData({ ...formData, specialty: value })
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
								<X className="w-5 h-5 cursor-pointer" />
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
							name="graduated_at"
							placeholder="Рік випуску"
							value={formData.graduated_at?.slice(0, 4) || ''}
							onChange={handleChange}
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
