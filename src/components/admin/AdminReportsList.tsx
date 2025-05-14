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
import { CheckCircle, LucideMessageCirclePlus, XCircle } from 'lucide-react'
import Button from '../ui/Button'
import Badge from '../ui/Badge'
import { fetchSupportRequests } from '../../services/supportService'
import SupportReplyModal from './SupportReplyModal'

const AdminReportList = () => {
	const [reports, setReports] = useState<any[]>([])
	const [loading, setLoading] = useState<boolean>(true)
	const [selectedId, setSelectedId] = useState<number | null>(null)
	const [modalOpen, setModalOpen] = useState(false)

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

	if (loading) {
		return (
			<div className="flex items-center justify-center h-64">
				<div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent" />
			</div>
		)
	}

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

	return (
		<Card>
			<CardHeader>
				<CardTitle>Скарги та звіти</CardTitle>
				<CardDescription>
					Розгляд скарг від користувачів на контент чи інших користувачів
				</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="rounded-md">
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>№</TableHead>
								<TableHead>Скаржник</TableHead>
								<TableHead>Причина</TableHead>
								<TableHead>Дата</TableHead>
								<TableHead>Статус</TableHead>
								<TableHead>Дії</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{reports.map((report) => (
								<TableRow key={report.id}>
									<TableCell className="font-medium">{report.id}</TableCell>
									<TableCell>{report.author.name}</TableCell>
									<TableCell className="max-w-100">{report.title}</TableCell>
									<TableCell>
										{new Date(report.created_at).toLocaleDateString()}
									</TableCell>
									<TableCell>{renderStatusBadge(report.status)}</TableCell>
									<TableCell>
										<div className="flex space-x-2">
											<Button
												variant="ghost"
												size="sm"
												onClick={() => handleReplyClick(report.id)}
											>
												<LucideMessageCirclePlus className="h-5 w-5" />
											</Button>

											{report.status === 'pending' && (
												<>
													<Button
														variant="ghost"
														size="sm"
														className="text-green-500"
													>
														<CheckCircle className="h-4 w-4" />
													</Button>
													<Button
														variant="ghost"
														size="sm"
														className="text-red-500"
													>
														<XCircle className="h-4 w-4" />
													</Button>
												</>
											)}
										</div>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</div>
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
