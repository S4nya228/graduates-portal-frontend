import React, { useState, useEffect } from 'react'
import Button from '../../components/ui/Button'
import { AlertCircle, Bell, Calendar, ThumbsUp } from 'lucide-react'
import { Link } from 'react-router-dom'
import CreatePostModal from '../../components/CreatePublicationModal'
import NewsCard from '../../components/NewsCard'
import eventService, { Event } from '../../services/eventService'
import SupportModal from '../../components/SupportModal'
import postService from '../../services/postService'
import { useAuth } from '../../hooks/useAuth'

const Index: React.FC = () => {
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
	const [posts, setPosts] = useState<any[]>([])
	const [events, setEvents] = useState<Event[]>([])
	const [loading, setLoading] = useState<boolean>(true)
	const [eventsLoading, setEventsLoading] = useState<boolean>(true)
	const [error, setError] = useState<string | null>(null)
	const { isAuthenticated } = useAuth()

	const openModal = () => setIsModalOpen(true)
	const closeModal = () => setIsModalOpen(false)

	const fetchPosts = async () => {
		try {
			const data = await postService.getAll()
			setPosts(data)
		} catch (error) {
			setError('Не вдалося отримати пости')
		} finally {
			setLoading(false)
		}
	}

	const fetchEvents = async () => {
		try {
			const data = await eventService.getAll()
			const latestEvents = [...data]
				.sort(
					(a, b) =>
						new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
				)
				.slice(0, 3)
			setEvents(latestEvents)
		} catch (e) {
			console.error('Не вдалося отримати події')
		} finally {
			setEventsLoading(false)
		}
	}

	useEffect(() => {
		fetchPosts()
		fetchEvents()
	}, [])

	useEffect(() => {
		const handler = () => fetchPosts()
		window.addEventListener('postDeleted', handler)
		return () => window.removeEventListener('postDeleted', handler)
	}, [])

	if (loading) {
		return (
			<div className="flex items-center justify-center h-64">
				<div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent" />
			</div>
		)
	}

	if (error) {
		return <div>{error}</div>
	}

	const handleScrollToFooter = () => {
		const footerElement = document.getElementById('footer')
		if (footerElement) {
			footerElement.scrollIntoView({ behavior: 'smooth' })
		}
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
							onClick={handleScrollToFooter}
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

							{isAuthenticated && (
								<Button
									onClick={openModal}
									variant="outline"
									className="hover:bg-[#8B5CF6]"
								>
									Створити публікацію
								</Button>
							)}
						</div>

						{posts.length === 0 ? (
							<div className="flex flex-col items-center justify-center py-20 text-center text-gray-500 space-y-4">
								<AlertCircle className="w-12 h-12 mx-auto text-gray-400" />
								<p className="text-lg font-semibold">Публікацій поки немає</p>
								<p className="max-w-sm">
									{isAuthenticated
										? 'Схоже, тут ще немає новин. Натисніть "Створити публікацію", щоб додати першу.'
										: 'Схоже, тут ще немає новин. Увійдіть у систему, щоб створювати публікації.'}
								</p>
							</div>
						) : (
							posts.map((post) => (
								<Link to={`/publication/${post.id}`} key={post.id}>
									<NewsCard post={post} fetchPosts={fetchPosts} />
								</Link>
							))
						)}
					</div>

					<div>
						<div className="sticky top-20 bg-white rounded-lg shadow-md p-6 mb-6">
							<div className="flex items-center justify-between mb-4">
								<h3 className="text-lg font-semibold">Майбутні події</h3>
								<Button
									variant="ghost"
									size="sm"
									asChild
									className="hover:bg-[#8B5CF6]"
								>
									<Link to="/events">Всі події</Link>
								</Button>
							</div>

							<div className="space-y-4">
								{eventsLoading ? (
									<p className="text-sm text-gray-500">Завантаження подій...</p>
								) : events.length === 0 ? (
									<div className="flex flex-col items-center justify-center py-12 text-center text-gray-500 space-y-3">
										<Calendar className="w-10 h-10 text-alumni-blue" />
										<p className="text-lg font-semibold">Подій поки немає</p>
										<p className="max-w-xs text-sm">
											Здається, найближчим часом не планується жодних заходів.
											Стежте за оновленнями — можливо, скоро щось з’явиться!
										</p>
									</div>
								) : (
									events.map((event) => (
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
													<p className="text-sm text-gray-500">
														{event.start_event_date}
													</p>
													<p className="text-sm text-gray-500">
														{event.location}
													</p>
												</div>
											</div>
										</div>
									))
								)}
							</div>
						</div>
						{isAuthenticated && (
							<div className="sticky top-115 bg-white rounded-lg shadow-md p-6">
								<h3 className="text-lg font-semibold mb-4">Швидкі дії</h3>

								<div className="grid grid-cols-2 gap-3">
									{/* <Link to="/notification" className="w-full">
										<Button
											variant="outline"
											className="w-full justify-start hover:bg-[#8B5CF6]"
										>
											<Bell className="mr-2 h-4 w-4" />
											Сповіщення
										</Button>
									</Link> */}
									<SupportModal />
								</div>
							</div>
						)}
					</div>
				</div>
			</div>

			<CreatePostModal
				isOpen={isModalOpen}
				closeModal={closeModal}
				fetchPosts={fetchPosts}
			/>
		</div>
	)
}

export default Index
