import React, { useEffect, useState } from 'react'
import { Calendar, MapPin, Clock, Filter, Users } from 'lucide-react'
import Button from '../../components/ui/Button'
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '../../components/Card'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '../../components/ui/Select'
import eventService, { Event } from '../../services/eventService'
import { toast } from 'react-toastify'

const Events: React.FC = () => {
	const [events, setEvents] = useState<Event[]>([])
	const [filteredEvents, setFilteredEvents] = useState<Event[]>([])
	const [selectedMonth, setSelectedMonth] = useState<string>('all')
	const [loading, setLoading] = useState<boolean>(true)

	const fetchEvents = async () => {
		try {
			const data = await eventService.getAll()
			setEvents(data)
			setFilteredEvents(data)
		} catch (error) {
			console.error('Помилка при завантаженні подій:', error)
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		fetchEvents()
	}, [])

	if (loading) {
		return (
			<div className="flex items-center justify-center h-64">
				<div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent" />
			</div>
		)
	}

	const handleMonthFilter = (month: string) => {
		setSelectedMonth(month)
		if (month === 'all') {
			setFilteredEvents(events)
		} else {
			const filtered = events.filter((event) => {
				const date = new Date(event.start_event_date)
				const monthName = date
					.toLocaleDateString('uk-UA', { month: 'long' })
					.toLowerCase()
				return monthName === month
			})
			setFilteredEvents(filtered)
		}
	}

	const handleRegistrationToggle = async (
		eventId: number,
		isRegistered: boolean
	) => {
		try {
			if (isRegistered) {
				await eventService.unregister(eventId)
				toast.success('Реєстрацію скасовано')
			} else {
				await eventService.register(eventId)
				toast.success('Ви успішно зареєстровані на подію')
			}
			setEvents((prev) =>
				prev.map((e) =>
					e.id === eventId ? { ...e, is_registered: !isRegistered } : e
				)
			)
			setFilteredEvents((prev) =>
				prev.map((e) =>
					e.id === eventId ? { ...e, is_registered: !isRegistered } : e
				)
			)
			fetchEvents()
		} catch (error) {
			console.error('Помилка при оновленні реєстрації:', error)
			toast.error('Сталася помилка. Спробуйте ще раз.')
		}
	}

	return (
		<div className="min-h-screen bg-alumni-light-gray">
			<div className="bg-alumni-gradient text-white py-12 px-4">
				<div className="container mx-auto">
					<h1 className="text-3xl md:text-4xl font-bold mb-4">
						Майбутні події
					</h1>
					<p className="text-lg max-w-3xl">
						Календар заходів для випускників та студентів факультету ІТ
					</p>
				</div>
			</div>

			<div className="container mx-auto px-4 py-8">
				<div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
					<div className="bg-white p-3 rounded-md shadow-sm flex items-center gap-2">
						<Filter className="h-5 w-5 text-alumni-purple" />
						<span className="font-medium">Фільтрувати за місяцем:</span>
						<Select value={selectedMonth} onValueChange={handleMonthFilter}>
							<SelectTrigger className="w-[180px] h-10 rounded-md border border-[hsl(214.3,31.8%,91.4%)] bg-[hsl(210,40%,98%)] px-3 py-2 text-base file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-[hsl(222.2,84%,4.9%)] placeholder:text-[hsl(215.4,16.3%,46.9%)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(252,56%,57%)] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm' cursor-pointer">
								<SelectValue placeholder="Всі місяці" />
							</SelectTrigger>
							<SelectContent>
								{[
									'all',
									'січень',
									'лютий',
									'березень',
									'квітень',
									'травень',
									'червень',
									'липень',
									'серпень',
									'вересень',
									'жовтень',
									'листопад',
									'грудень',
								].map((month) => (
									<SelectItem key={month} value={month}>
										{month === 'all'
											? 'Всі місяці'
											: month[0].toUpperCase() + month.slice(1)}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>
				</div>

				{loading ? (
					<p className="text-center text-gray-500">Завантаження подій...</p>
				) : (
					<>
						{filteredEvents.length === 0 ? (
							<div className="flex items-center justify-center h-[70vh] w-full">
								<div className="text-center text-gray-500">
									<p className="text-2xl font-semibold mb-2">
										Подій не виявлено
									</p>
									<p className="text-base">
										Спробуйте змінити місяць або перевірте пізніше.
									</p>
								</div>
							</div>
						) : (
							<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
								{filteredEvents.map((event) => (
									<Card
										key={event.id}
										className="hover:shadow-md transition-shadow h-full flex flex-col"
									>
										<CardHeader className="bg-alumni-light-gray/50">
											<CardTitle className="text-alumni-purple">
												{event.title}
											</CardTitle>
											<CardDescription className="flex items-center mt-2">
												<Calendar className="h-4 w-4 mr-2 text-alumni-blue" />
												{new Date(event.start_event_date).toLocaleDateString(
													'uk-UA',
													{
														day: 'numeric',
														month: 'long',
														year: 'numeric',
													}
												)}
											</CardDescription>
										</CardHeader>
										<CardContent className="pt-4 flex-1">
											<p className="text-sm text-gray-700 mb-4">
												{event.description}
											</p>
											<div className="space-y-2 text-sm">
												<div className="flex items-center text-gray-600">
													<Clock className="h-4 w-4 mr-2" />
													<span>
														{event.star_event_time.slice(0, 5)} –{' '}
														{event.end_event_time.slice(0, 5)}
													</span>
												</div>
												<div className="flex items-center text-gray-600">
													<MapPin className="h-4 w-4 mr-2" />
													<span>{event.location}</span>
												</div>
												<div className="flex items-center text-gray-600">
													<Users className="h-4 w-4 mr-2" />
													<span>{event.participants} учасників</span>
												</div>
											</div>
										</CardContent>
										<CardFooter className="mt-auto">
											<Button
												size="sm"
												className={`w-full ${
													event.is_registered
														? 'bg-gray-300 hover:bg-gray-400 text-black'
														: 'bg-alumni-purple hover:bg-[#8B5CF6]/90 text-white'
												}`}
												onClick={() =>
													handleRegistrationToggle(
														event.id,
														event.is_registered
													)
												}
											>
												{event.is_registered
													? 'Скасувати реєстрацію'
													: 'Зареєструватися'}
											</Button>
										</CardFooter>
									</Card>
								))}
							</div>
						)}
					</>
				)}
			</div>
		</div>
	)
}

export default Events
