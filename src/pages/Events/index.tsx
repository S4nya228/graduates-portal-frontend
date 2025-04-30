import React, { useState } from 'react'
import { Calendar, MapPin, Users, Clock, Filter } from 'lucide-react'
import Button from '../../components/ui/Button'
import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from '../../components/Pagination'
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

const eventsData = [
	{
		id: '1',
		title: 'День відкритих дверей',
		date: '10 червня 2023',
		time: '10:00 - 15:00',
		location: 'Головний корпус',
		description:
			'Запрошуємо всіх бажаючих відвідати наш університет та дізнатися більше про навчальні програми, познайомитися з викладачами та студентами.',
		organizer: 'Адміністрація університету',
		attendees: 120,
	},
	{
		id: '2',
		title: 'ІТ-конференція випускників',
		date: '25 червня 2023',
		time: '11:00 - 18:00',
		location: 'Конференц-зал B',
		description:
			'Щорічна конференція випускників ІТ-факультету. Обговорення нових технологій, нетворкінг та обмін досвідом.',
		organizer: 'Асоціація випускників',
		attendees: 85,
	},
	{
		id: '3',
		title: 'Тренінг з CV',
		date: '5 липня 2023',
		time: '14:00 - 16:30',
		location: 'Онлайн',
		description:
			'Практичний тренінг з написання ефективного резюме для студентів та випускників. Будуть розглянуті типові помилки та надані рекомендації.',
		organizer: "Кар'єрний центр",
		attendees: 50,
	},
	{
		id: '4',
		title: 'Зустріч випускників 2018 року',
		date: '15 липня 2023',
		time: '18:00 - 22:00',
		location: 'Студентський клуб',
		description:
			'Неформальна зустріч випускників 2018 року. Приходьте поділитися своїми успіхами та зустріти старих друзів!',
		organizer: 'Староста випуску 2018',
		attendees: 65,
	},
	{
		id: '5',
		title: 'Майстер-клас з Data Science',
		date: '2 серпня 2023',
		time: '16:00 - 19:00',
		location: 'Аудиторія 305',
		description:
			'Практичний майстер-клас від випускника, який працює в Google. Будуть розглянуті реальні кейси та інструменти для аналізу даних.',
		organizer: 'Кафедра інформаційних технологій',
		attendees: 40,
	},
	{
		id: '6',
		title: 'Ярмарок вакансій для ІТ-спеціалістів',
		date: '15 серпня 2023',
		time: '10:00 - 16:00',
		location: 'Головний хол університету',
		description:
			'Представники провідних ІТ-компаній України представлять свої вакансії для студентів та випускників. Можливість пройти попередню співбесіду на місці.',
		organizer: 'Відділ працевлаштування',
		attendees: 200,
	},
]

const Events = () => {
	const [filteredEvents, setFilteredEvents] = useState(eventsData)
	const [selectedMonth, setSelectedMonth] = useState<string>('all')

	const handleMonthFilter = (month: string) => {
		setSelectedMonth(month)
		if (month === 'all') {
			setFilteredEvents(eventsData)
		} else {
			const filtered = eventsData.filter((event) =>
				event.date.toLowerCase().includes(month.toLowerCase())
			)
			setFilteredEvents(filtered)
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
							<SelectTrigger className="w-[180px]">
								<SelectValue placeholder="Всі місяці" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="all">Всі місяці</SelectItem>
								<SelectItem value="червня">Червень</SelectItem>
								<SelectItem value="липня">Липень</SelectItem>
								<SelectItem value="серпня">Серпень</SelectItem>
							</SelectContent>
						</Select>
					</div>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{filteredEvents.map((event) => (
						<Card key={event.id} className="hover:shadow-md transition-shadow">
							<CardHeader className="bg-alumni-light-gray/50">
								<CardTitle className="text-alumni-purple">
									{event.title}
								</CardTitle>
								<CardDescription className="flex items-center mt-2">
									<Calendar className="h-4 w-4 mr-2 text-alumni-blue" />
									{event.date}
								</CardDescription>
							</CardHeader>
							<CardContent className="pt-4">
								<p className="text-sm text-gray-700 mb-4">
									{event.description}
								</p>
								<div className="space-y-2 text-sm">
									<div className="flex items-center text-gray-600">
										<Clock className="h-4 w-4 mr-2" />
										<span>{event.time}</span>
									</div>
									<div className="flex items-center text-gray-600">
										<MapPin className="h-4 w-4 mr-2" />
										<span>{event.location}</span>
									</div>
									<div className="flex items-center text-gray-600">
										<Users className="h-4 w-4 mr-2" />
										<span>{event.attendees} учасників</span>
									</div>
								</div>
							</CardContent>
							<CardFooter className="flex justify-between">
								<Button
									size="sm"
									className="bg-alumni-purple hover:bg-[#8B5CF6]/90"
								>
									Зареєструватися
								</Button>
							</CardFooter>
						</Card>
					))}
				</div>
				<Pagination className="mt-8">
					<PaginationContent>
						<PaginationItem>
							<PaginationPrevious href="#" />
						</PaginationItem>
						<PaginationItem>
							<PaginationLink href="#" isActive>
								1
							</PaginationLink>
						</PaginationItem>
						<PaginationItem>
							<PaginationLink href="#">2</PaginationLink>
						</PaginationItem>
						<PaginationItem>
							<PaginationLink href="#">3</PaginationLink>
						</PaginationItem>
						<PaginationItem>
							<PaginationNext href="#" />
						</PaginationItem>
					</PaginationContent>
				</Pagination>
			</div>
		</div>
	)
}

export default Events
