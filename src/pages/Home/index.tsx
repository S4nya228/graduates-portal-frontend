import React, { useState } from 'react'
import NewsCard from '../../components/NewsCard'
import Button from '../../components/Button'
import { Bell, Calendar, UserPlus, ThumbsUp, MessageSquare } from 'lucide-react'
import { Link } from 'react-router-dom'
import CreatePostModal from '../../components/CreatePublicationModal'

interface News {
	id: string
	author: {
		name: string
		avatar: string
		role?: string
	}
	date: string
	title: string
	content: string
	image?: string
	likes: number
	comments: number
	liked?: boolean
}

const newsFeed: News[] = [
	{
		id: '1',
		author: {
			name: 'Анна Коваленко',
			avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
			role: 'Адміністратор',
		},
		date: '2 години тому',
		title: 'Зустріч випускників 2018 року',
		content:
			'Запрошуємо всіх випускників 2018 року на щорічну зустріч, яка відбудеться 15 червня в головному корпусі університету. Буде багато цікавих розмов, спогадів та нових знайомств!',
		image:
			'https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
		likes: 24,
		comments: 5,
		liked: true,
	},
	{
		id: '2',
		author: {
			name: 'Анна Коваленко',
			avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
			role: 'Адміністратор',
		},
		date: '2 години тому',
		title: 'Зустріч випускників 2018 року',
		content:
			'Запрошуємо всіх випускників 2018 року на щорічну зустріч, яка відбудеться 15 червня в головному корпусі університету. Буде багато цікавих розмов, спогадів та нових знайомств!',
		image:
			'https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
		likes: 24,
		comments: 5,
		liked: true,
	},
	{
		id: '3',
		author: {
			name: 'Анна Коваленко',
			avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
			role: 'Адміністратор',
		},
		date: '2 години тому',
		title: 'Зустріч випускників 2018 року',
		content:
			'Запрошуємо всіх випускників 2018 року на щорічну зустріч, яка відбудеться 15 червня в головному корпусі університету. Буде багато цікавих розмов, спогадів та нових знайомств!',
		likes: 24,
		comments: 5,
		liked: true,
	},
]

const upcomingEvents = [
	{
		id: '1',
		title: 'День відкритих дверей',
		date: '10 червня 2023',
		location: 'Головний корпус',
	},
	{
		id: '2',
		title: 'ІТ-конференція випускників',
		date: '25 червня 2023',
		location: 'Конференц-зал B',
	},
	{
		id: '3',
		title: 'Тренінг з CV',
		date: '5 липня 2023',
		location: 'Онлайн',
	},
]

const Index: React.FC = () => {
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
	const [posts, setPosts] = useState<News[]>(newsFeed)

	const openModal = () => setIsModalOpen(true)
	const closeModal = () => setIsModalOpen(false)

	const createPost = (newPost: {
		title: string
		description: string
		image?: string
	}) => {
		setPosts([newPost as News, ...posts])
	}

	return (
		<div className="min-h-screen bg-alumni-light-gray">
			<div className="bg-alumni-gradient text-white py-20 px-4">
				<div className="container mx-auto text-center">
					<h1 className="text-4xl md:text-5xl font-bold mb-6">
						Портал випускників факультету ІТ
					</h1>
					<p className="text-xl mb-8 max-w-3xl mx-auto">
						Залишайтеся на зв'язку з однокурсниками, діліться досвідом та
						будуйте професійну мережу
					</p>
					<div className="flex flex-wrap justify-center gap-4">
						<Link to="/login">
							<Button
								variant="outline"
								className="bg-white text-alumni-purple hover:bg-white/10"
							>
								Приєднатися до спільноти
							</Button>
						</Link>

						<Button
							variant="outline"
							className="bg-white text-alumni-purple border-white hover:bg-white/10"
						>
							Дізнатися більше
						</Button>
					</div>
				</div>
			</div>

			<div className="container mx-auto px-4 py-12">
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
					<div className="lg:col-span-2">
						<div className="flex items-center justify-between mb-6">
							<h2 className="text-2xl font-bold">Стрічка новин</h2>
							<Button
								onClick={openModal}
								variant="outline"
								className=" hover:bg-[#8B5CF6]"
							>
								Створити публікацію
							</Button>
						</div>

						{newsFeed.map((news) => (
							<NewsCard key={news.id} {...news} />
						))}

						<div className="text-center mt-8">
							<Button variant="outline" className=" hover:bg-[#8B5CF6]">
								Завантажити більше
							</Button>
						</div>
					</div>

					<div>
						<div className="bg-white rounded-lg shadow-md p-6 mb-6">
							<div className="flex items-center justify-between mb-4">
								<h3 className="text-lg font-semibold">Майбутні події</h3>
								<Button
									variant="ghost"
									size="sm"
									asChild
									className=" hover:bg-[#8B5CF6]"
								>
									<a href="/events">Всі події</a>
								</Button>
							</div>

							<div className="space-y-4">
								{upcomingEvents.map((event) => (
									<div
										key={event.id}
										className="border-b border-gray-100 last:border-0 pb-3 last:pb-0"
									>
										<div className="flex items-start">
											<div className="bg-alumni-light-gray rounded p-2 mr-3">
												<Calendar className="h-5 w-5 text-alumni-blue" />
											</div>
											<div>
												<h4 className="font-medium">{event.title}</h4>
												<p className="text-sm text-gray-500">{event.date}</p>
												<p className="text-sm text-gray-500">
													{event.location}
												</p>
											</div>
										</div>
									</div>
								))}
							</div>
						</div>

						<div className="bg-white rounded-lg shadow-md p-6">
							<h3 className="text-lg font-semibold mb-4">Швидкі дії</h3>

							<div className="grid grid-cols-2 gap-3">
								<Button
									variant="outline"
									className="justify-start hover:bg-[#8B5CF6]"
								>
									<UserPlus className="mr-2 h-4 w-4" />
									Запросити
								</Button>
								<Button
									variant="outline"
									className="justify-start hover:bg-[#8B5CF6]"
								>
									<Bell className="mr-2 h-4 w-4" />
									Сповіщення
								</Button>
								<Button
									variant="outline"
									className="justify-start hover:bg-[#8B5CF6]"
								>
									<ThumbsUp className="mr-2 h-4 w-4" />
									Підтримка
								</Button>
								<Button
									variant="outline"
									className="justify-start hover:bg-[#8B5CF6]"
								>
									<MessageSquare className="mr-2 h-4 w-4" />
									Чат
								</Button>
							</div>
						</div>
					</div>
				</div>
			</div>
			<CreatePostModal
				isOpen={isModalOpen}
				closeModal={closeModal}
				createPost={createPost}
			/>
		</div>
	)
}

export default Index
