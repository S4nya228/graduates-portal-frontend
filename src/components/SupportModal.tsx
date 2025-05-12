import React, { useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { ThumbsUp, X } from 'lucide-react'
import Button from './ui/Button'
import Input from './ui/Input'
import { Textarea } from './ui/Textarea'
import { sendSupportRequest } from '../services/supportService'
import { toast } from 'react-toastify'
const SupportModal = () => {
	const [formData, setFormData] = useState({
		title: '',
		appeal: '',
	})
	const [error, setError] = useState<string | null>(null)
	const [loading, setLoading] = useState(false)
	const [open, setOpen] = useState(false)

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target
		setFormData((prev) => ({ ...prev, [name]: value }))
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		if (!formData.title || !formData.appeal) {
			setError('Усі поля обовʼязкові')
			return
		}
		setError(null)
		setLoading(true)

		try {
			await sendSupportRequest(formData)
			setFormData({ title: '', appeal: '' })
			setOpen(false)
			toast.success('Звернення відправлено!')
		} catch (e) {
			setError('Помилка надсилання звернення')
			toast.error('Не вдалося надіслати звернення. Спробуйте ще раз.')
		} finally {
			setLoading(false)
		}
	}

	return (
		<Dialog.Root open={open} onOpenChange={setOpen}>
			<Dialog.Trigger asChild>
				<Button variant="outline" className="justify-start hover:bg-[#8B5CF6]">
					<ThumbsUp className="mr-2 h-4 w-4" />
					Підтримка
				</Button>
			</Dialog.Trigger>
			<Dialog.Portal>
				<Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50" />
				<Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-full max-w-xl -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white p-6 shadow-xl focus:outline-none">
					<div className="flex items-center justify-between mb-4">
						<Dialog.Title className="text-xl font-semibold">
							Звернення
						</Dialog.Title>
						<Dialog.Close asChild>
							<button className="text-gray-500 hover:text-black cursor-pointer">
								<X className="w-5 h-5" />
							</button>
						</Dialog.Close>
					</div>

					<form onSubmit={handleSubmit} className="space-y-4">
						<Input
							name="title"
							placeholder="Тема звернення"
							value={formData.title}
							onChange={handleChange}
							required
						/>
						<Textarea
							name="appeal"
							placeholder="Опишіть вашу проблему або запит"
							value={formData.appeal}
							onChange={handleChange}
							required
						/>
						{error && <p className="text-red-500 text-sm">{error}</p>}

						<div className="flex justify-end pt-4">
							<Button
								type="submit"
								className="bg-alumni-purple hover:bg-[#8B5CF6]/90"
								disabled={loading}
							>
								{loading ? 'Надсилання...' : 'Надіслати'}
							</Button>
						</div>
					</form>
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog.Root>
	)
}

export default SupportModal
