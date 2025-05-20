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
	const filteredUsers = users.filter((user) =>
		user.name.toLowerCase().includes(searchQuery.toLowerCase())
	)

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

	const isEmptyList = users.length === 0
	const isSearchEmpty = users.length > 0 && filteredUsers.length === 0

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

				{isEmptyList && (
					<div className="text-center py-20 text-gray-500">
						Користувачів поки що немає.
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
									<TableHead className="text-center">Ім'я</TableHead>
									<TableHead className="text-center">Email</TableHead>
									<TableHead className="text-center">Дата реєстрації</TableHead>
									<TableHead className="text-center">Роль</TableHead>
									<TableHead className="text-center">Дії</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{filteredUsers.map((user) => (
									<TableRow key={user.id}>
										<TableCell className="font-medium text-center">
											{user.id}
										</TableCell>
										<TableCell className="text-center">{user.name}</TableCell>
										<TableCell className="text-center">{user.email}</TableCell>
										<TableCell className="text-center">
											{new Date(user.created_at).toLocaleDateString()}
										</TableCell>
										<TableCell className="text-center">
											{user.is_admin ? (
												<Badge className="bg-red-500">Адміністратор</Badge>
											) : (
												<Badge className="bg-blue-500">Користувач</Badge>
											)}
										</TableCell>
										<TableCell className="text-center">
											<Button
												variant="ghost"
												size="sm"
												onClick={() => openEditModal(user)}
											>
												<Edit className="h-4 w-4" />
											</Button>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</div>
				)}
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
