import React, { useState, ChangeEvent } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import Button from './Button'
import { Textarea } from './Textarea'
import Input from './Input'
import { X } from 'lucide-react'
import axiosInstance from '../api/axiosInstance'

interface CreatePostModalProps {
	isOpen: boolean
	closeModal: () => void
	fetchPosts: () => void
}

interface NewPost {
	title: string
	description: string
	image?: File | null
}

const CreatePostModal: React.FC<CreatePostModalProps> = ({
	isOpen,
	closeModal,
	fetchPosts,
}) => {
	const [title, setTitle] = useState<string>('')
	const [description, setDescription] = useState<string>('')
	const [image, setImage] = useState<File | null>(null)

	const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0]
		if (file) {
			setImage(file)
		}
	}

	const handleRemoveImage = () => {
		setImage(null)
	}
	const resetForm = () => {
		setTitle('')
		setDescription('')
		setImage(null)
	}

	const handleSubmit = async () => {
		if (title && description) {
			const newPost: NewPost = { title, description, image }

			try {
				const formData = new FormData()
				formData.append('title', newPost.title)
				formData.append('content', newPost.description)
				if (newPost.image) {
					formData.append('file', newPost.image)
				}

				const response = await axiosInstance.post('/post', formData, {
					headers: {
						'Content-Type': 'multipart/form-data',
					},
				})

				closeModal()
				resetForm()
				fetchPosts()
			} catch (error) {
				console.error('Не вдалося створити пост', error)
			}
		}
	}

	return (
		<Dialog.Root open={isOpen} onOpenChange={closeModal}>
			<Dialog.Overlay className="fixed inset-0 bg-black/30" />
			<Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#f1f5f9] p-8 rounded-lg shadow-lg max-w-2xl w-full">
				<Dialog.Title className="text-2xl font-bold mb-4">
					Створити публікацію
				</Dialog.Title>
				<div className="space-y-4">
					<div className="flex flex-col gap-4">
						<label htmlFor="title" className="block text-xl font-semibold">
							Заголовок
						</label>
						<Input
							placeholder="Заголовок..."
							className="mb-2 text-gray-600"
							id="title"
							type="text"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
						/>
					</div>

					<div className="flex flex-col gap-4">
						<label
							htmlFor="description"
							className="block text-xl font-semibold"
						>
							Опис
						</label>
						<Textarea
							placeholder="Вміст..."
							className="min-h-50 mb-2 text-gray-600"
							value={description}
							onChange={(e) => setDescription(e.target.value)}
						/>
					</div>

					<div>
						<label htmlFor="image" className="block text-xl font-semibold">
							Зображення (необов'язково)
						</label>
						<div className="flex flex-col mt-1 w-full gap-4">
							{image && (
								<div className="mt-4 relative">
									<img
										src={URL.createObjectURL(image)}
										alt="Preview"
										className="w-full h-auto rounded-md"
									/>
									<Button
										variant="outline"
										className="absolute top-2 right-2 bg-white rounded-full p-3 shadow-md hover:bg-gray-200"
										onClick={handleRemoveImage}
									>
										<X className="text-gray-700" />
									</Button>
								</div>
							)}
							<Button
								variant="outline"
								className="p-2 cursor-pointer"
								onClick={() => document.getElementById('image-input')?.click()}
							>
								Вибрати зображення
							</Button>

							<input
								type="file"
								id="image-input"
								className="hidden"
								accept="image/*"
								onChange={handleImageChange}
							/>
						</div>
					</div>
				</div>

				<div className="mt-6 flex justify-end gap-4">
					<Button variant="outline" onClick={closeModal}>
						Закрити
					</Button>
					<Button variant="outline" onClick={handleSubmit}>
						Створити
					</Button>
				</div>
			</Dialog.Content>
		</Dialog.Root>
	)
}

export default CreatePostModal
