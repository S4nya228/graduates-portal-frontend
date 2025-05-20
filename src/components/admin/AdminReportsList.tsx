import React, { useEffect, useState } from 'react'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '../../components/ui/Table'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '../Card'
import {
	CheckCircle,
	LucideMessageCirclePlus,
	Search,
	XCircle,
} from 'lucide-react'
import Button from '../ui/Button'
import Badge from '../ui/Badge'
import { fetchSupportRequests } from '../../services/supportService'
import SupportReplyModal from './SupportReplyModal'
import Input from '../ui/Input'

const AdminReportList = () => {
	const [reports, setReports] = useState<any[]>([])
	const [loading, setLoading] = useState<boolean>(true)
	const [selectedId, setSelectedId] = useState<number | null>(null)
	const [modalOpen, setModalOpen] = useState(false)
	const [searchQuery, setSearchQuery] = useState('')

	const handleReplyClick = (id: number) => {
		setSelectedId(id)
		setModalOpen(true)
	}

	const updateReports = async () => {
		try {
			const data = await fetchSupportRequests()
			setReports(data)
		} catch (error) {
			console.error('Error fetching support requests:', error)
		}
	}

	useEffect(() => {
		const loadReports = async () => {
			try {
				const data = await fetchSupportRequests()
				setReports(data)
			} catch (error) {
				console.error('Error fetching support requests:', error)
			} finally {
				setLoading(false)
			}
		}
		loadReports()
	}, [])

	const renderStatusBadge = (status: string) => {
		switch (status) {
			case 'A':
				return <Badge className="bg-yellow-500">Нова</Badge>
			case 'B':
				return <Badge className="bg-blue-500">В обробці</Badge>
			case 'C':
				return <Badge className="bg-green-500">Схвалено</Badge>
			case 'D':
				return <Badge className="bg-red-500">Відхилено</Badge>
			case 'F':
				return <Badge className="bg-orange-500">Повторно відкрито</Badge>
			default:
				return <Badge>{status}</Badge>
		}
	}

	const filteredReports = reports.filter(
		(report) =>
			report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
			report.author.name.toLowerCase().includes(searchQuery.toLowerCase())
	)

	if (loading) {
		return (
			<div className="flex items-center justify-center h-64">
				<div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent" />
			</div>
		)
	}

	const isEmptyList = reports.length === 0
	const isSearchEmpty = reports.length > 0 && filteredReports.length === 0

	return (
		<Card>
			<CardHeader>
				<CardTitle>Скарги та звіти</CardTitle>
				<CardDescription>
					Розгляд скарг від користувачів на контент чи інших користувачів
				</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="flex items-center justify-between mb-6">
					<div className="relative w-full max-w-sm">
						<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[hsl(215.4,16.3%,46.9%)]" />
						<Input
							placeholder="Пошук скарг..."
							className="pl-10"
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
						/>
					</div>
				</div>
				{isEmptyList && (
					<div className="text-center py-20 text-gray-500">
						Скарг поки що немає.
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
									<TableHead className="text-center">Скаржник</TableHead>
									<TableHead className="text-center">Причина</TableHead>
									<TableHead className="text-center">Дата</TableHead>
									<TableHead className="text-center">Статус</TableHead>
									<TableHead className="text-center">Дії</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{filteredReports.map((report) => (
									<TableRow key={report.id}>
										<TableCell className="font-medium text-center">
											{report.id}
										</TableCell>
										<TableCell className="text-center">
											{report.author.name}
										</TableCell>
										<TableCell className="max-w-100 text-center">
											{report.title}
										</TableCell>
										<TableCell className="text-center">
											{new Date(report.created_at).toLocaleDateString()}
										</TableCell>
										<TableCell className="text-center">
											{renderStatusBadge(report.status)}
										</TableCell>
										<TableCell className="text-center">
											<Button
												variant="ghost"
												size="sm"
												onClick={() => handleReplyClick(report.id)}
											>
												<LucideMessageCirclePlus className="h-5 w-5" />
											</Button>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</div>
				)}
			</CardContent>
			<SupportReplyModal
				open={modalOpen}
				onClose={() => setModalOpen(false)}
				reportId={selectedId}
				onUpdate={updateReports}
			/>
		</Card>
	)
}

export default AdminReportList
