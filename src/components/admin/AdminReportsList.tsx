import React, { useState } from 'react'
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
	Edit,
	MessageSquare,
	Search,
	Trash2,
	XCircle,
} from 'lucide-react'
import Input from '../ui/Input'
import Button from '../ui/Button'
import Badge from '../ui/Badge'

const AdminReportList = () => {
	const reports = [
		{
			id: '1',
			type: 'post',
			targetId: '4',
			reporter: 'Максим Шевченко',
			reason: 'Спам/Реклама',
			date: '05.07.2023',
			status: 'pending',
		},
		{
			id: '2',
			type: 'comment',
			targetId: '7',
			reporter: 'Софія Коваленко',
			reason: 'Образливий контент',
			date: '04.07.2023',
			status: 'pending',
		},
		{
			id: '3',
			type: 'user',
			targetId: '12',
			reporter: 'Олексій Ковальчук',
			reason: 'Фейковий акаунт',
			date: '03.07.2023',
			status: 'resolved',
		},
	]

	const renderStatusBadge = (status: string) => {
		switch (status) {
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
								<TableHead>Тип</TableHead>
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
									<TableCell className="font-medium capitalize">
										{report.type === 'post'
											? 'Публікація'
											: report.type === 'comment'
											? 'Коментар'
											: 'Користувач'}
									</TableCell>
									<TableCell>{report.reporter}</TableCell>
									<TableCell>{report.reason}</TableCell>
									<TableCell>{report.date}</TableCell>
									<TableCell>{renderStatusBadge(report.status)}</TableCell>
									<TableCell>
										<div className="flex space-x-2">
											<Button variant="ghost" size="sm">
												<Edit className="h-4 w-4" />
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
		</Card>
	)
}

export default AdminReportList
