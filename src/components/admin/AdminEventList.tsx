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

	if (loading) {
		return (
			<div className="flex items-center justify-center h-64">
				<div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent" />
			</div>
		)
	}

	const renderStatusBadge = (status: string) => {
		switch (status) {
			case 'active':
				return <Badge className="bg-green-500">Активний</Badge>
			case 'pending':
				return <Badge className="bg-yellow-500">Очікує підтвердження</Badge>
			case 'inactive':
				return <Badge className="bg-gray-500">Неактивний</Badge>
			case 'published':
				return <Badge className="bg-green-500">Опубліковано</Badge>
			case 'draft':
				return <Badge className="bg-gray-500">Чернетка</Badge>
			case 'flagged':
				return <Badge className="bg-red-500">Позначено</Badge>
			case 'resolved':
				return <Badge className="bg-green-500">Вирішено</Badge>
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
						<Input placeholder="Пошук подій..." className="pl-10" />
					</div>
					<CreateEventModal onEventCreated={loadEvents} />
				</div>

				<div className="rounded-md">
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>№</TableHead>
								<TableHead>Заголовок</TableHead>
								<TableHead>Автор</TableHead>
								<TableHead>Дата</TableHead>
								<TableHead>Статус</TableHead>
								<TableHead>Взаємодії</TableHead>
								<TableHead>Дії</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{events.map((event) => (
								<TableRow key={event.id}>
									<TableCell className="font-medium">{event.id}</TableCell>
									<TableCell>{event.title}</TableCell>
									<TableCell>{event.user_name}</TableCell>
									<TableCell>
										{new Date(event.created_at).toLocaleDateString()}
									</TableCell>
									<TableCell>{renderStatusBadge(event.status)}</TableCell>
									<TableCell>
										<span className="flex items-center text-[hsl(215.4,16.3%,46.9%)]">
											<Users2Icon className="h-4 w-4 mr-1" />{' '}
											{event.participants}
										</span>
									</TableCell>
									<TableCell>
										<div className="flex space-x-2">
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
										</div>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</div>
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
