import React, { useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { CalendarPlus, X } from 'lucide-react'
import Input from '../ui/Input'
import Button from '../ui/Button'
import { Textarea } from '../ui/Textarea'

const CreateEventModal = () => {
	const [formData, setFormData] = useState({
		title: '',
		description: '',
		start_event_date: '',
		end_event_date: '',
		star_event_time: '',
		end_event_time: '',
		location: '',
	})

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target
		setFormData({ ...formData, [name]: value })
	}

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		// TODO: replace with actual POST request
		console.log('Submitting:', formData)
	}

	return (
		<Dialog.Root>
			<Dialog.Trigger asChild>
				<Button className="bg-alumni-purple hover:bg-[#8B5CF6]/90">
					<CalendarPlus className="mr-2 h-4 w-4" />
					Додати подію
				</Button>
			</Dialog.Trigger>
			<Dialog.Portal>
				<Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50" />
				<Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-full max-w-xl -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white p-6 shadow-xl focus:outline-none">
					<div className="flex items-center justify-between mb-4">
						<Dialog.Title className="text-xl font-semibold">
							Створити подію
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

export default CreateEventModal
