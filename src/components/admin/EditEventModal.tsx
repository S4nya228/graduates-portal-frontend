import React, { useState, useEffect } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { CalendarPlus, X } from 'lucide-react'
import Input from '../ui/Input'
import Button from '../ui/Button'
import { Textarea } from '../ui/Textarea'
import eventService from '../../services/eventService'
import { toast } from 'react-toastify'

interface EditEventModalProps {
	event: any
	open: boolean
	onClose: () => void
	onEventUpdated: () => Promise<void>
}

const EditEventModal = ({ event, onEventUpdated }: EditEventModalProps) => {
	const [formData, setFormData] = useState({
		title: '',
		description: '',
		start_event_date: '',
		end_event_date: '',
		star_event_time: '',
		end_event_time: '',
		location: '',
		status: '',
	})
	const [loading, setLoading] = useState(false)
	const [open, setOpen] = useState(false)

	useEffect(() => {
		if (event) {
			setFormData({
				title: event.title,
				description: event.description,
				start_event_date: event.start_event_date,
				end_event_date: event.end_event_date,
				star_event_time: event.star_event_time,
				end_event_time: event.end_event_time,
				location: event.location,
				status: event.status || '',
			})
			setOpen(true)
		}
	}, [event])

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target
		setFormData({ ...formData, [name]: value })
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setLoading(true)

		try {
			await eventService.update(event.id, formData)
			toast.success('Подію успішно оновлено!')
			setFormData({
				title: '',
				description: '',
				start_event_date: '',
				end_event_date: '',
				star_event_time: '',
				end_event_time: '',
				location: '',
				status: '',
			})
			setOpen(false)
			onEventUpdated()
		} catch (error) {
			toast.error('Помилка при оновленні події')
		} finally {
			setLoading(false)
		}
	}

	if (loading) {
		return (
			<div className="flex items-center justify-center h-64">
				<div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent" />
			</div>
		)
	}

	return (
		<Dialog.Root open={open} onOpenChange={setOpen}>
			<Dialog.Trigger asChild></Dialog.Trigger>
			<Dialog.Portal>
				<Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50" />
				<Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-full max-w-xl -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white p-6 shadow-xl focus:outline-none">
					<div className="flex items-center justify-between mb-4">
						<Dialog.Title className="text-xl font-semibold">
							Редагувати подію
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
							placeholder="Заголовок"
							value={formData.title}
							onChange={handleChange}
							required
						/>
						<Textarea
							name="description"
							placeholder="Опис"
							value={formData.description}
							onChange={handleChange}
							required
						/>
						<div className="grid grid-cols-2 gap-4">
							<Input
								type="date"
								name="start_event_date"
								value={formData.start_event_date}
								onChange={handleChange}
								required
							/>
							<Input
								type="date"
								name="end_event_date"
								value={formData.end_event_date}
								onChange={handleChange}
								required
							/>
						</div>
						<div className="grid grid-cols-2 gap-4">
							<Input
								type="time"
								name="star_event_time"
								value={formData.star_event_time}
								onChange={handleChange}
								required
							/>
							<Input
								type="time"
								name="end_event_time"
								value={formData.end_event_time}
								onChange={handleChange}
								required
							/>
						</div>
						<Input
							name="location"
							placeholder="Локація"
							value={formData.location}
							onChange={handleChange}
							required
						/>
						<div>
							<label className="block mb-1 text-sm font-medium text-gray-700">
								Статус
							</label>
							<select
								name="status"
								value={formData.status}
								onChange={handleChange}
								className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
								required
							>
								<option value="">Оберіть статус</option>
								<option value="A">Активний</option>
								<option value="D">Вимкнений</option>
								<option value="H">Деактивований</option>
							</select>
						</div>

						<div className="flex justify-end pt-4">
							<Button
								type="submit"
								className="bg-alumni-purple hover:bg-[#8B5CF6]/90"
								disabled={loading}
							>
								{loading ? 'Оновлення...' : 'Оновити'}
							</Button>
						</div>
					</form>
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog.Root>
	)
}

export default EditEventModal
