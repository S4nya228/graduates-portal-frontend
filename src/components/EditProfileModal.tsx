import React, { useState, useEffect, ChangeEvent } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import Button from './ui/Button'
import Input from './ui/Input'
import { Textarea } from './ui/Textarea'
import { Graduation, User } from '../types'
import userService from '../services/userService'
import SkillTagsInput from '../components/ui/SkillTagsInput'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from './ui/Select'
import { SocialLinksForm } from './SocialLinksForm'
import { X } from 'lucide-react'

interface EditProfileModalProps {
	isOpen: boolean
	closeModal: () => void
	initialData: User | null
	refreshUserData: () => void
}

const EditProfileModal: React.FC<EditProfileModalProps> = ({
	isOpen,
	closeModal,
	initialData,
	refreshUserData,
}) => {
	const [formData, setFormData] = useState<User | null>(null)
	const [avatar, setAvatar] = useState<File | null>(null)

	useEffect(() => {
		setFormData(initialData)
	}, [initialData])

	const graduationDegrees = [
		{ value: 'A', label: 'Немає' },
		{ value: 'B', label: 'Бакалавр' },
		{ value: 'C', label: 'Магістр' },
		{ value: 'D', label: 'Доктор наук' },
	]

	const handleChange = (
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target
		setFormData((prev) => (prev ? { ...prev, [name]: value } : null))
	}

	const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0]
		if (file) setAvatar(file)
	}

	const appendInfoToFormData = (
		profileData: FormData,
		arr: any[],
		key: string
	) => {
		arr.forEach((item, i) => {
			for (const [field, value] of Object.entries(item)) {
				if (value !== undefined && value !== null && value !== '') {
					profileData.append(`info[${key}][${i}][${field}]`, String(value))
				}
			}
		})
	}

	const handleSubmit = async () => {
		if (!formData) return

		try {
			const profileData = new FormData()

			const safeAppend = (key: string, value: any) => {
				if (value !== undefined && value !== null && value !== '') {
					profileData.append(key, value)
				}
			}

			safeAppend('name', formData.name)
			safeAppend('email', formData.email)
			safeAppend('about', formData.about)
			safeAppend('country', formData.country)
			safeAppend('city', formData.city)

			if (Array.isArray(formData.skills) && formData.skills.length > 0) {
				appendInfoToFormData(profileData, formData.skills, 'skills')
			} else {
				profileData.append('info[skills][0]', '')
			}

			if (Array.isArray(formData.projects) && formData.projects.length > 0) {
				appendInfoToFormData(profileData, formData.projects, 'projects')
			} else {
				profileData.append('info[projects][0]', '')
			}
			if (
				Array.isArray(formData.social_links) &&
				formData.social_links.length > 0
			) {
				const filteredLinks = formData.social_links.filter((link) =>
					link.link?.trim()
				)
				if (filteredLinks.length > 0) {
					appendInfoToFormData(profileData, filteredLinks, 'social_links')
				}
			} else {
				profileData.append('info[social_links][0]', '')
			}

			if (
				Array.isArray(formData.experience) &&
				formData.experience.length > 0
			) {
				const filteredExperience = formData.experience.filter(
					(exp) =>
						exp.company?.trim() ||
						exp.position?.trim() ||
						exp.start_experience?.trim() ||
						exp.end_experience?.trim()
				)

				if (filteredExperience.length > 0) {
					appendInfoToFormData(profileData, filteredExperience, 'experience')
				}
			} else {
				profileData.append('info[experience][0]', '')
			}

			if (
				Array.isArray(formData.graduation) &&
				formData.graduation.length > 0
			) {
				const filteredGraduation = formData.graduation.filter(
					(grad) =>
						grad.university?.trim() ||
						grad.faculty?.trim() ||
						grad.specialty?.trim() ||
						grad.degree?.trim() ||
						grad.start_graduation?.trim() ||
						grad.end_graduation?.trim()
				)

				filteredGraduation.forEach((item, i) => {
					const keys = [
						'id',
						'university',
						'faculty',
						'specialty',
						'degree',
						'start_graduation',
						'end_graduation',
					]
					keys.forEach((field) => {
						if (item[field as keyof typeof item]) {
							profileData.append(
								`info[graduation][${i}][${field}]`,
								String(item[field as keyof typeof item])
							)
						}
					})
				})
			} else {
				profileData.append('info[graduation][0]', '')
			}

			if (avatar) {
				profileData.append('file', avatar)
			}

			await userService.updateCabinet(profileData)
			refreshUserData()
			closeModal()
		} catch (error) {
			console.error('Помилка оновлення профілю', error)
		}
	}

	const updateGraduationField = (
		index: number,
		field: keyof Graduation,
		value: string
	) => {
		setFormData((prev) =>
			prev
				? {
						...prev,
						graduation: prev.graduation.map((item, i) =>
							i === index ? { ...item, [field]: value } : item
						),
				  }
				: null
		)
	}

	const removeGraduationBlock = (index: number) => {
		setFormData((prev) =>
			prev
				? {
						...prev,
						graduation: prev.graduation.filter((_, i) => i !== index),
				  }
				: null
		)
	}

	const updateProjectField = (
		index: number,
		field: 'title' | 'description',
		value: string
	) => {
		setFormData((prev) =>
			prev
				? {
						...prev,
						projects: prev.projects
							? prev.projects.map((item, i) =>
									i === index ? { ...item, [field]: value } : item
							  )
							: [],
				  }
				: null
		)
	}

	const removeProjectBlock = (index: number) => {
		setFormData((prev) =>
			prev
				? {
						...prev,
						projects: prev.projects
							? prev.projects.filter((_, i) => i !== index)
							: [],
				  }
				: null
		)
	}

	if (!formData) return null

	return (
		<Dialog.Root open={isOpen} onOpenChange={(open) => !open && closeModal()}>
			<Dialog.Overlay className="fixed inset-0 bg-black/30" />
			<Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-lg shadow-lg max-w-3xl w-full overflow-y-auto max-h-[90vh]">
				<Dialog.Title className="text-2xl font-bold mb-4">
					Редагувати профіль
				</Dialog.Title>

				<div className="space-y-4 ">
					<div className="">
						<label className="block font-semibold">Аватар</label>
						<div className="flex flex-col items-center mt-1 w-full gap-4">
							{avatar ? (
								<div className="relative mt-2">
									<img
										src={URL.createObjectURL(avatar)}
										alt="Avatar Preview"
										className="w-32 h-32 object-cover rounded-full"
									/>
									<Button
										variant="outline"
										className="absolute top-0 right-0 bg-white rounded-full p-2 shadow-md hover:bg-gray-200"
										onClick={() => setAvatar(null)}
									>
										<X className="text-gray-700 w-4 h-4" />
									</Button>
								</div>
							) : formData.avatar && typeof formData.avatar === 'string' ? (
								<div className="relative mt-2">
									<img
										src={formData.avatar}
										alt="Current Avatar"
										className="w-32 h-32 object-cover rounded-full"
									/>
								</div>
							) : null}

							<Button
								variant="outline"
								className="p-2 cursor-pointer w-fit"
								onClick={() => document.getElementById('avatar-input')?.click()}
							>
								Завантажити зображення
							</Button>

							<input
								type="file"
								id="avatar-input"
								accept="image/*"
								className="hidden"
								onChange={handleAvatarChange}
							/>
						</div>
					</div>
					<Input
						name="name"
						placeholder="Ім'я"
						value={formData.name}
						onChange={handleChange}
					/>
					<Input
						name="email"
						placeholder="Email"
						value={formData.email}
						onChange={handleChange}
					/>
					<Textarea
						name="about"
						placeholder="Про себе"
						value={formData.about || ''}
						onChange={handleChange}
					/>
					<Input
						name="country"
						placeholder="Країна"
						value={formData.country || ''}
						onChange={handleChange}
					/>
					<Input
						name="city"
						placeholder="Місто"
						value={formData.city || ''}
						onChange={handleChange}
					/>
					<SkillTagsInput
						skills={formData.skills || []}
						onChange={(newSkills) =>
							setFormData((prev) =>
								prev ? { ...prev, skills: newSkills } : null
							)
						}
					/>
					<h3 className="font-semibold mt-6">Проєкти</h3>
					{formData?.projects?.map((p, index) => (
						<div
							key={index}
							className="space-y-2 mb-4 border border-gray-200 rounded p-4 relative"
						>
							<Button
								variant="outline"
								className="absolute top-2 right-2 p-1 text-red-600 hover:text-red-800"
								onClick={() => removeProjectBlock(index)}
							>
								<X className="w-4 h-4" />
							</Button>
							<Input
								placeholder="Назва проєкту"
								value={p.title || ''}
								onChange={(e) =>
									updateProjectField(index, 'title', e.target.value)
								}
							/>
							<Textarea
								placeholder="Опис проєкту"
								value={p.description || ''}
								onChange={(e) =>
									updateProjectField(index, 'description', e.target.value)
								}
							/>
						</div>
					))}

					<Button
						type="button"
						variant="outline"
						onClick={() =>
							setFormData((prev) =>
								prev
									? {
											...prev,
											projects: prev.projects
												? [...prev.projects, { title: '', description: '' }]
												: [{ title: '', description: '' }],
									  }
									: null
							)
						}
					>
						➕ Додати проєкт
					</Button>

					<h3 className="font-semibold mt-6">Досвід</h3>
					{formData.experience?.map((exp, index) => (
						<div
							key={index}
							className="space-y-2 mb-4 border border-gray-200 rounded p-4 relative"
						>
							<Button
								variant="outline"
								className="absolute top-2 right-2 p-1 text-red-600 hover:text-red-800"
								onClick={() =>
									setFormData((prev) =>
										prev
											? {
													...prev,
													experience:
														prev.experience?.filter((_, i) => i !== index) ??
														[],
											  }
											: null
									)
								}
							>
								<X className="w-4 h-4" />
							</Button>
							<Input
								placeholder="Посада"
								value={exp.position || ''}
								onChange={(e) =>
									setFormData((prev) =>
										prev
											? {
													...prev,
													experience: prev.experience?.map((item, i) =>
														i === index
															? { ...item, position: e.target.value }
															: item
													),
											  }
											: null
									)
								}
							/>
							<Input
								placeholder="Компанія"
								value={exp.company || ''}
								onChange={(e) =>
									setFormData((prev) =>
										prev
											? {
													...prev,
													experience: prev.experience?.map((item, i) =>
														i === index
															? { ...item, company: e.target.value }
															: item
													),
											  }
											: null
									)
								}
							/>
							<Input
								placeholder="Локація"
								value={exp.location || ''}
								onChange={(e) =>
									setFormData((prev) =>
										prev
											? {
													...prev,
													experience: prev.experience?.map((item, i) =>
														i === index
															? { ...item, location: e.target.value }
															: item
													),
											  }
											: null
									)
								}
							/>
							<div className="flex gap-2">
								<Input
									type="date"
									placeholder="Початок"
									value={exp.start_experience || ''}
									onChange={(e) =>
										setFormData((prev) =>
											prev
												? {
														...prev,
														experience: prev.experience?.map((item, i) =>
															i === index
																? { ...item, start_experience: e.target.value }
																: item
														),
												  }
												: null
										)
									}
								/>
								<Input
									type="date"
									placeholder="Завершення"
									value={exp.end_experience || ''}
									onChange={(e) =>
										setFormData((prev) =>
											prev
												? {
														...prev,
														experience: prev.experience?.map((item, i) =>
															i === index
																? { ...item, end_experience: e.target.value }
																: item
														),
												  }
												: null
										)
									}
								/>
							</div>
							<Textarea
								placeholder="Опис досвіду"
								value={exp.description || ''}
								onChange={(e) =>
									setFormData((prev) =>
										prev
											? {
													...prev,
													experience: prev.experience?.map((item, i) =>
														i === index
															? { ...item, description: e.target.value }
															: item
													),
											  }
											: null
									)
								}
							/>
						</div>
					))}

					<Button
						type="button"
						variant="outline"
						onClick={() =>
							setFormData((prev) =>
								prev
									? {
											...prev,
											experience: [
												...(prev.experience || []),
												{
													position: '',
													company: '',
													city: '',
													start_experience: '',
													end_experience: '',
													description: '',
												},
											],
									  }
									: null
							)
						}
					>
						➕ Додати досвід
					</Button>

					<h3 className="font-semibold mt-6">Освіта</h3>
					{formData.graduation.map((g, index) => (
						<div
							key={index}
							className="space-y-2 mb-4 border border-gray-200 rounded p-4 relative"
						>
							<Button
								variant="outline"
								className="absolute top-2 right-2 p-1 text-red-600 hover:text-red-800"
								onClick={() => removeGraduationBlock(index)}
							>
								<X className="w-4 h-4" />
							</Button>

							<Input
								placeholder="Університет"
								value={g.university || ''}
								onChange={(e) =>
									updateGraduationField(index, 'university', e.target.value)
								}
							/>
							<Input
								placeholder="Факультет"
								value={g.faculty || ''}
								onChange={(e) =>
									updateGraduationField(index, 'faculty', e.target.value)
								}
							/>
							<Input
								placeholder="Спеціальність"
								value={g.specialty || ''}
								onChange={(e) =>
									updateGraduationField(index, 'specialty', e.target.value)
								}
							/>
							<Select
								value={g.degree || ''}
								onValueChange={(value) =>
									updateGraduationField(index, 'degree', value)
								}
							>
								<SelectTrigger>
									<SelectValue placeholder="Оберіть ступінь" />
								</SelectTrigger>
								<SelectContent>
									{graduationDegrees.map((deg) => (
										<SelectItem key={deg.value} value={deg.value}>
											{deg.label}
										</SelectItem>
									))}
								</SelectContent>
							</Select>

							<Input
								type="date"
								placeholder="Початок навчання"
								value={g.start_graduation || ''}
								onChange={(e) =>
									updateGraduationField(
										index,
										'start_graduation',
										e.target.value
									)
								}
							/>
							<Input
								type="date"
								placeholder="Кінець навчання"
								value={g.end_graduation || ''}
								onChange={(e) =>
									updateGraduationField(index, 'end_graduation', e.target.value)
								}
							/>
						</div>
					))}
					<Button
						type="button"
						variant="outline"
						onClick={() =>
							setFormData((prev) =>
								prev
									? {
											...prev,
											graduation: [
												...prev.graduation,
												{
													university: '',
													faculty: '',
													specialty: '',
													degree: '',
													start_graduation: '',
													end_graduation: '',
												},
											],
									  }
									: null
							)
						}
					>
						➕ Додати місце навчання
					</Button>

					<SocialLinksForm
						socialLinks={formData.social_links}
						setFormData={setFormData}
					/>
				</div>

				<div className="mt-6 flex justify-end gap-4">
					<Button variant="outline" onClick={closeModal}>
						Скасувати
					</Button>
					<Button variant="outline" onClick={handleSubmit}>
						Зберегти
					</Button>
				</div>
			</Dialog.Content>
		</Dialog.Root>
	)
}

export default EditProfileModal
