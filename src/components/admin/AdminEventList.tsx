import React, { useEffect, useState } from 'react'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '../ui/Table'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '../Card'
import {
	CalendarPlus,
	CheckCircle,
	Edit,
	MessageSquare,
	Search,
	Trash2,
	Users2Icon,
} from 'lucide-react'
import Input from '../ui/Input'
import Button from '../ui/Button'
import Badge from '../ui/Badge'
import CreateEventModal from './CreateEventModal'
import eventService from '../../services/eventService'
import { toast } from 'react-toastify'
import ConfirmDialog from '../ConfirmDialog'
import EditEventModal from './EditEventModal'

const AdminTabsList = () => {
	const [events, setEvents] = useState<any[]>([])
	const [loading, setLoading] = useState<boolean>(true)
	const [error, setError] = useState<string | null>(null)
	const [deleteId, setDeleteId] = useState<number | null>(null)
	const [isDeleting, setIsDeleting] = useState(false)
	const [editEvent, setEditEvent] = useState<Event | null>(null)
	const [search, setSearch] = useState('')

	const loadEvents = async () => {
		try {
			const data = await eventService.getAll()
			setEvents(data)
		} catch (error) {
			setError('Не вдалося завантажити події')
		} finally {
			setLoading(false)
		}
	}

	const handleDeleteConfirm = async () => {
		if (!deleteId) return
		setIsDeleting(true)
		try {
			await eventService.delete(deleteId)
			toast.success('Подію успішно видалено')
			setDeleteId(null)
			await loadEvents()
		} catch (e) {
			toast.error('Помилка при видаленні події')
		} finally {
			setIsDeleting(false)
		}
	}

	useEffect(() => {
		loadEvents()
	}, [])

	const filteredEvents = events.filter((event) =>
		event.title.toLowerCase().includes(search.toLowerCase())
	)

	if (loading) {
		return (
			<div className="flex items-center justify-center h-64">
				<div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent" />
			</div>
		)
	}

	const isEmptyList = events.length === 0
	const isSearchEmpty = events.length > 0 && filteredEvents.length === 0

	const renderStatusBadge = (status: string) => {
		switch (status) {
			case 'A':
				return <Badge className="bg-green-500">Активний</Badge>
			case 'D':
				return <Badge className="bg-red-500">Вимкнений</Badge>
			case 'H':
				return <Badge className="bg-gray-500">Деактивований</Badge>
			default:
				return <Badge>{status}</Badge>
		}
	}

	return (
		<Card>
			<CardHeader>
				<CardTitle>Управління подіями</CardTitle>
				<CardDescription>Перегляд та модерація подій</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="flex items-center justify-between mb-6">
					<div className="relative w-full max-w-sm">
						<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[hsl(215.4,16.3%,46.9%)]" />
						<Input
							placeholder="Пошук подій..."
							className="pl-10"
							value={search}
							onChange={(e) => setSearch(e.target.value)}
						/>
					</div>
					<CreateEventModal onEventCreated={loadEvents} />
				</div>
				{isEmptyList && (
					<div className="text-center py-20 text-gray-500">
						Подій поки що немає.
					</div>
				)}

				{isSearchEmpty && (
					<div className="text-center py-20 text-gray-500">
						За вашим запитом нічого не знайдено.
					</div>
				)}
				{!isEmptyList && !isSearchEmpty && (
					<div className="rounded-md">
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead className="text-center">№</TableHead>
									<TableHead className="text-center">Заголовок</TableHead>
									<TableHead className="text-center">Автор</TableHead>
									<TableHead className="text-center">Дата</TableHead>
									<TableHead className="text-center">Статус</TableHead>
									<TableHead className="text-center">Учасників</TableHead>
									<TableHead className="text-center">Дії</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{filteredEvents.map((event) => (
									<TableRow key={event.id}>
										<TableCell className="font-medium text-center">
											{event.id}
										</TableCell>
										<TableCell className="text-center">{event.title}</TableCell>
										<TableCell className="text-center">
											{event.user_name}
										</TableCell>
										<TableCell className="text-center">
											{new Date(event.created_at).toLocaleDateString()}
										</TableCell>
										<TableCell className="text-center">
											{renderStatusBadge(event.status)}
										</TableCell>
										<TableCell>
											<div className="flex justify-center items-center">
												<span className="flex items-center text-[hsl(215.4,16.3%,46.9%)]">
													<Users2Icon className="h-4 w-4 mr-1" />
													{event.participants}
												</span>
											</div>
										</TableCell>

										<TableCell className="text-center">
											<Button
												variant="ghost"
												size="sm"
												onClick={() => setEditEvent(event)}
											>
												<Edit className="h-4 w-4" />
											</Button>

											<Button
												variant="ghost"
												size="sm"
												className="text-red-500"
												onClick={() => setDeleteId(event.id)}
											>
												<Trash2 className="h-4 w-4" />
											</Button>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</div>
				)}
			</CardContent>
			<ConfirmDialog
				open={deleteId !== null}
				title="Видалення події"
				description="Ви дійсно хочете видалити цю подію? Цю дію неможливо скасувати."
				onConfirm={handleDeleteConfirm}
				onCancel={() => setDeleteId(null)}
				loading={isDeleting}
				confirmText="Видалити"
			/>
			{editEvent && (
				<EditEventModal
					event={editEvent}
					open={!!editEvent}
					onClose={() => setEditEvent(null)}
					onEventUpdated={loadEvents}
				/>
			)}
		</Card>
	)
}

export default AdminTabsList
