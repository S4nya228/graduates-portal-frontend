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
import { CheckCircle, Edit, Search, Trash2, UserPlus } from 'lucide-react'
import Input from '../ui/Input'
import Button from '../ui/Button'
import Badge from '../ui/Badge'
import CreateUserModal from './CreateUserModal'

const AdminUserList = () => {
	const [searchQuery, setSearchQuery] = useState('')
	const users = [
		{
			id: '1',
			name: 'Олексій Ковальчук',
			email: 'oleksii.kovalchuk@example.com',
			graduationYear: 2019,
			specialization: 'Програмна інженерія',
			status: 'active',
			registrationDate: '10.05.2023',
		},
		{
			id: '2',
			name: 'Марія Петренко',
			email: 'maria.petrenko@example.com',
			graduationYear: 2018,
			specialization: "Комп'ютерні науки",
			status: 'pending',
			registrationDate: '15.05.2023',
		},
		{
			id: '3',
			name: 'Іван Мельник',
			email: 'ivan.melnyk@example.com',
			graduationYear: 2020,
			specialization: 'Кібербезпека',
			status: 'active',
			registrationDate: '05.06.2023',
		},
		{
			id: '4',
			name: 'Софія Коваленко',
			email: 'sofia.kovalenko@example.com',
			graduationYear: 2017,
			specialization: 'Програмна інженерія',
			status: 'active',
			registrationDate: '22.06.2023',
		},
		{
			id: '5',
			name: 'Максим Шевченко',
			email: 'maxim.shevchenko@example.com',
			graduationYear: 2021,
			specialization: 'Штучний інтелект',
			status: 'inactive',
			registrationDate: '30.06.2023',
		},
	]

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
				<CardTitle>Управління користувачами</CardTitle>
				<CardDescription>
					Перегляд, редагування та управління акаунтами користувачів порталу
				</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="flex items-center justify-between mb-6">
					<div className="relative w-full max-w-sm">
						<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[hsl(215.4,16.3%,46.9%)]" />
						<Input
							placeholder="Пошук користувачів..."
							className="pl-10"
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
						/>
					</div>
					<CreateUserModal />
				</div>

				<div className="rounded-md">
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Ім'я</TableHead>
								<TableHead>Email</TableHead>
								<TableHead>Рік випуску</TableHead>
								<TableHead>Статус</TableHead>
								<TableHead>Дії</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{users.map((user) => (
								<TableRow key={user.id}>
									<TableCell className="font-medium">{user.name}</TableCell>
									<TableCell>{user.email}</TableCell>
									<TableCell>{user.graduationYear}</TableCell>
									<TableCell>{renderStatusBadge(user.status)}</TableCell>
									<TableCell>
										<div className="flex space-x-2">
											<Button variant="ghost" size="sm">
												<Edit className="h-4 w-4" />
											</Button>
											{user.status === 'pending' && (
												<Button
													variant="ghost"
													size="sm"
													className="text-green-500"
												>
													<CheckCircle className="h-4 w-4" />
												</Button>
											)}
											<Button
												variant="ghost"
												size="sm"
												className="text-red-500"
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
		</Card>
	)
}

export default AdminUserList
