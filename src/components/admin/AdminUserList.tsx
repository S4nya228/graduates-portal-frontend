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
import { Edit, Search } from 'lucide-react'
import Input from '../ui/Input'
import Button from '../ui/Button'
import Badge from '../ui/Badge'
import CreateUserModal from './CreateUserModal'
import userService from '../../services/userService'
import { User } from '../../types'
import EditUserModal from './EditUserModal'

const AdminUserList = () => {
	const [searchQuery, setSearchQuery] = useState('')
	const [users, setUsers] = useState<User[]>([])
	const [loading, setLoading] = useState<boolean>(true)
	const [selectedUser, setSelectedUser] = useState<User | null>(null)
	const [isEditModalOpen, setIsEditModalOpen] = useState(false)

	const openEditModal = (user: User) => {
		setSelectedUser(user)
		setIsEditModalOpen(true)
	}

	const fetchUsers = async () => {
		try {
			const data = await userService.getAll()
			setUsers(data)
		} catch (error) {
			console.error('Не вдалося завантажити користувачів:', error)
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		fetchUsers()
	}, [])

	if (loading) {
		return (
			<div className="flex items-center justify-center h-64">
				<div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent" />
			</div>
		)
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
					<CreateUserModal onUserCreated={fetchUsers} />
				</div>

				<div className="rounded-md">
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>№</TableHead>
								<TableHead>Ім'я</TableHead>
								<TableHead>Email</TableHead>
								<TableHead>Дата реєстрації</TableHead>
								<TableHead>Роль</TableHead>
								<TableHead>Дії</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{users.map((user) => (
								<TableRow key={user.id}>
									<TableCell className="font-medium">{user.id}</TableCell>
									<TableCell>{user.name}</TableCell>
									<TableCell>{user.email}</TableCell>
									<TableCell>
										{new Date(user.created_at).toLocaleDateString()}
									</TableCell>
									<TableCell>
										{user.is_admin ? (
											<Badge className="bg-red-500">Адміністратор</Badge>
										) : (
											<Badge className="bg-blue-500">Користувач</Badge>
										)}
									</TableCell>
									<TableCell>
										<div className="flex space-x-2">
											<Button
												variant="ghost"
												size="sm"
												onClick={() => openEditModal(user)}
											>
												<Edit className="h-4 w-4" />
											</Button>
										</div>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</div>
			</CardContent>
			<EditUserModal
				user={selectedUser}
				open={isEditModalOpen}
				onClose={() => setIsEditModalOpen(false)}
				onUpdated={fetchUsers}
			/>
		</Card>
	)
}

export default AdminUserList
