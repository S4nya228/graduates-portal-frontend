import React, { useEffect, useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import Input from '../ui/Input'
import Button from '../ui/Button'
import { toast } from 'react-toastify'
import postService, { Post } from '../../services/postService'
import { Textarea } from '../ui/Textarea'

interface Props {
	post: Post | null
	open: boolean
	onClose: () => void
	onUpdated: () => void
}

const EditPostModal: React.FC<Props> = ({ post, open, onClose, onUpdated }) => {
	const [formData, setFormData] = useState({
		title: '',
		content: '',
	})
	const [image, setImage] = useState<File | null>(null)
	const [existingImage, setExistingImage] = useState<string | null>(null)

	useEffect(() => {
		if (post) {
			setFormData({
				title: post.title || '',
				content: post.content || '',
			})
			setImage(null)
			setExistingImage(post.image || null)
		}
	}, [post])

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target
		setFormData((prev) => ({ ...prev, [name]: value }))
	}

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files.length > 0) {
			setImage(e.target.files[0])
			setExistingImage(null)
		}
	}

	const handleRemoveImage = () => {
		setImage(null)
		setExistingImage(null)
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		if (!post) return

		try {
			const form = new FormData()
			form.append('title', formData.title)
			form.append('content', formData.content)
			if (image) {
				form.append('file', image)
			}

			await postService.update(post.id, form)
			toast.success('Пост оновлено!')
			onUpdated()
			onClose()
		} catch (err) {
			console.error(err)
			toast.error('Помилка при оновленні поста')
		}
	}

	return (
		<Dialog.Root open={open} onOpenChange={onClose}>
			<Dialog.Portal>
				<Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50" />
				<Dialog.Content
					onClick={(e) => e.stopPropagation()}
					className="fixed left-1/2 top-1/2 z-50 w-full max-w-xl -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white p-6 shadow-xl focus:outline-none"
				>
					<div className="flex items-center justify-between mb-4">
						<Dialog.Title className="text-xl font-semibold">
							Редагувати пост
						</Dialog.Title>
						<Dialog.Close asChild>
							<button className="text-gray-500 hover:text-black">
								<X className="w-5 h-5 cursor-pointer" />
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
							name="content"
							placeholder="Контент"
							value={formData.content}
							onChange={handleChange}
							rows={6}
							required
						/>

						<div>
							<label htmlFor="image" className="block text-xl font-semibold">
								Зображення (необов'язково)
							</label>
							<div className="flex flex-col mt-1 w-full gap-4">
								{(image || existingImage) && (
									<div className="mt-4 relative">
										<img
											src={
												image ? URL.createObjectURL(image) : existingImage || ''
											}
											alt="Preview"
											className="max-h-[500px] w-auto mx-auto rounded-md object-contain"
										/>
										<Button
											variant="outline"
											type="button"
											className="absolute top-2 right-2 bg-white rounded-full p-3 shadow-md hover:bg-gray-200"
											onClick={handleRemoveImage}
										>
											<X className="text-gray-700" />
										</Button>
									</div>
								)}

								<Button
									variant="outline"
									type="button"
									className="p-2 cursor-pointer"
									onClick={() =>
										document.getElementById('image-input')?.click()
									}
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

export default EditPostModal
