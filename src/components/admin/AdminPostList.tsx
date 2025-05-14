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
import { CheckCircle, Edit, MessageSquare, Search, Trash2 } from 'lucide-react'
import Input from '../ui/Input'
import Button from '../ui/Button'
import Badge from '../ui/Badge'
import postService from '../../services/postService'
import ConfirmDialog from '../ConfirmDialog'
import { toast } from 'react-toastify'

const AdminPostList = () => {
	const [posts, setPosts] = useState<any[]>([])
	const [loading, setLoading] = useState<boolean>(true)
	const [deleteId, setDeleteId] = useState<number | null>(null)
	const [isDeleting, setIsDeleting] = useState(false)

	const fetchPosts = async () => {
		try {
			const response = await postService.getAll()
			setPosts(response)
		} catch (e) {
			console.error('Помилка при отриманні постів:', e)
		} finally {
			setLoading(false)
		}
	}

	const handleDeleteConfirm = async () => {
		if (!deleteId) return
		setIsDeleting(true)
		try {
			await postService.remove(deleteId)
			toast.success('Публікацію успішно видалено')
			setDeleteId(null)
			await fetchPosts()
		} catch (e) {
			toast.error('Помилка при видаленні публікації')
		} finally {
			setIsDeleting(false)
		}
	}

	useEffect(() => {
		fetchPosts()
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
				<CardTitle>Управління контентом</CardTitle>
				<CardDescription>
					Перегляд та модерація публікацій, коментарів та іншого контенту
				</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="flex items-center justify-between mb-6">
					<div className="relative w-full max-w-sm">
						<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[hsl(215.4,16.3%,46.9%)]" />
						<Input placeholder="Пошук публікацій..." className="pl-10" />
					</div>
				</div>

				<div className="rounded-md">
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Заголовок</TableHead>
								<TableHead>Автор</TableHead>
								<TableHead>Дата</TableHead>
								<TableHead>Статус</TableHead>
								<TableHead>Взаємодії</TableHead>
								<TableHead>Дії</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{posts.map((post) => (
								<TableRow key={post.id}>
									<TableCell className="font-medium">{post.title}</TableCell>
									<TableCell>{post.user_name}</TableCell>
									<TableCell>
										{new Date(post.created_at).toLocaleDateString()}
									</TableCell>
									<TableCell>{renderStatusBadge(post.status)}</TableCell>
									<TableCell>
										<div className="flex items-center space-x-2">
											<span className="flex items-center text-[hsl(215.4,16.3%,46.9%)]">
												<MessageSquare className="h-4 w-4 mr-1" />
												{post.comment_count}
											</span>
											<span className="flex items-center text-[hsl(215.4,16.3%,46.9%)]">
												<CheckCircle className="h-4 w-4 mr-1" />
												{post.like_count}
											</span>
										</div>
									</TableCell>
									<TableCell>
										<div className="flex space-x-2">
											<Button variant="ghost" size="sm">
												<Edit className="h-4 w-4" />
											</Button>
											<Button
												variant="ghost"
												size="sm"
												className="text-red-500"
												onClick={() => setDeleteId(post.id)}
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
				title="Видалення публікації"
				description="Ви дійсно хочете видалити цю публікацію? Цю дію неможливо скасувати."
				onConfirm={handleDeleteConfirm}
				onCancel={() => setDeleteId(null)}
				loading={isDeleting}
				confirmText="Видалити"
			/>
		</Card>
	)
}

export default AdminPostList
