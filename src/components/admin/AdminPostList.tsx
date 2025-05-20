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
import postService, { Post } from '../../services/postService'
import ConfirmDialog from '../ConfirmDialog'
import { toast } from 'react-toastify'
import EditPostModal from './EditPostModal'

const AdminPostList = () => {
	const [posts, setPosts] = useState<any[]>([])
	const [loading, setLoading] = useState<boolean>(true)
	const [deleteId, setDeleteId] = useState<number | null>(null)
	const [isDeleting, setIsDeleting] = useState(false)
	const [searchQuery, setSearchQuery] = useState('')
	const [editPost, setEditPost] = useState<Post | null>(null)
	const [editOpen, setEditOpen] = useState(false)

	const handleEditClick = (post: Post) => {
		setEditPost(post)
		setEditOpen(true)
	}

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

	const filteredPosts = posts.filter(
		(post) =>
			post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
			post.user_name.toLowerCase().includes(searchQuery.toLowerCase())
	)

	const isEmptyList = posts.length === 0
	const isSearchEmpty = posts.length > 0 && filteredPosts.length === 0

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
						<Input
							placeholder="Пошук публікацій..."
							className="pl-10"
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
						/>
					</div>
				</div>
				{isEmptyList && (
					<div className="text-center py-20 text-gray-500">
						Постів поки що немає.
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
									<TableHead className="text-center">Взаємодії</TableHead>
									<TableHead className="text-center">Дії</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{filteredPosts.map((post) => (
									<TableRow key={post.id}>
										<TableCell className="font-medium text-center">
											{post.id}
										</TableCell>
										<TableCell className="text-center">{post.title}</TableCell>
										<TableCell className="text-center">
											{post.user_name}
										</TableCell>
										<TableCell className="text-center">
											{new Date(post.created_at).toLocaleDateString()}
										</TableCell>
										<TableCell>
											<div className="flex justify-center items-center space-x-4">
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

										<TableCell className="text-center">
											<Button
												variant="ghost"
												size="sm"
												onClick={() => handleEditClick(post)}
											>
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
				title="Видалення публікації"
				description="Ви дійсно хочете видалити цю публікацію? Цю дію неможливо скасувати."
				onConfirm={handleDeleteConfirm}
				onCancel={() => setDeleteId(null)}
				loading={isDeleting}
				confirmText="Видалити"
			/>
			<EditPostModal
				post={editPost}
				open={editOpen}
				onClose={() => setEditOpen(false)}
				onUpdated={fetchPosts}
			/>
		</Card>
	)
}

export default AdminPostList
