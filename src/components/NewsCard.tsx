import React, { useState } from 'react'
import { Card, CardContent, CardFooter, CardHeader } from './Card'
import Button from './ui/Button'
import { Avatar, AvatarFallback, AvatarImage } from './ui/Avatar'
import {
	Heart,
	MessageSquare,
	MoreHorizontal,
	Pencil,
	Trash2,
} from 'lucide-react'
import postService from '../services/postService'
import { useAppSelector } from '../hooks/redux'
import { toast } from 'react-toastify'
import ConfirmDialog from './ConfirmDialog'
import { createPortal } from 'react-dom'

export interface NewsCardProps {
	post: {
		id: number
		user_id: number
		user_name: string
		user_avatar: string | null
		title: string
		content: string
		like_count: number
		comment_count: number
		image: string | null
		created_at: string
		has_reaction: boolean
		reaction_type: 'LIKE' | 'DISLIKE' | null
	}
}

const NewsCard: React.FC<NewsCardProps> = ({ post }) => {
	const [liked, setLiked] = useState<boolean>(
		post.has_reaction && post.reaction_type === 'LIKE'
	)
	const [likeCount, setLikeCount] = useState(post.like_count)
	const [loading, setLoading] = useState(false)
	const user = useAppSelector((state) => state.auth.user)
	const isMyPost = user?.id === post.user_id
	const [isMenuOpen, setIsMenuOpen] = useState(false)
	const [deleteId, setDeleteId] = useState<number | null>(null)
	const [isDeleting, setIsDeleting] = useState(false)

	const handleToggleLike = async () => {
		if (loading) return
		setLoading(true)

		try {
			await postService.like(post.id)

			setLiked((prev) => !prev)
			setLikeCount((prev) => (liked ? prev - 1 : prev + 1))
		} catch (error) {
			console.error('Помилка лайкування поста', error)
		} finally {
			setLoading(false)
		}
	}

	const handleDeleteConfirm = async () => {
		if (!deleteId) return
		setIsDeleting(true)
		try {
			await postService.remove(deleteId)
			window.dispatchEvent(new Event('postDeleted'))
			toast.success('Публікацію успішно видалено')
			setDeleteId(null)
		} catch (e) {
			toast.error('Помилка при видаленні публікації')
		} finally {
			setIsDeleting(false)
		}
	}

	return (
		<Card className="alumni-card overflow-hidden mb-6 animate-fade-in">
			<CardHeader className="pb-3">
				<div className="flex items-center space-x-3 w-full">
					<Avatar>
						{post.user_avatar && (
							<AvatarImage src={post.user_avatar} alt={post.user_name} />
						)}
						<AvatarFallback>{post.user_name[0]}</AvatarFallback>
					</Avatar>
					<div>
						<div className="font-medium">{post.user_name}</div>
						<div className="text-sm text-[hsl(215.4,16.3%,46.9%)] flex items-center">
							<span>{new Date(post.created_at).toLocaleDateString()}</span>
						</div>
					</div>
					{isMyPost && (
						<div className="ml-auto relative">
							<Button
								variant="ghost"
								size="icon"
								onClick={(e) => {
									e.preventDefault()
									setIsMenuOpen((prev) => !prev)
								}}
							>
								<MoreHorizontal className="w-5 h-5 text-black-500" />
							</Button>
							{isMenuOpen && (
								<div className="absolute right-0 mt-2 bg-white shadow-lg rounded-md w-32 z-10">
									<Button
										variant="ghost"
										className="w-full text-left p-2"
										onClick={(e) => {
											e.preventDefault
										}}
									>
										<Pencil className="w-4 h-4 text-blue-500" />
										Редагувати
									</Button>
									<Button
										variant="ghost"
										className="w-full text-left p-2"
										onClick={(e) => {
											e.stopPropagation()
											e.preventDefault()
											setDeleteId(post.id)
										}}
									>
										<Trash2 className="w-4 h-4 text-red-500" />
										Видалити
									</Button>
								</div>
							)}
						</div>
					)}
				</div>
			</CardHeader>

			<CardContent className="pb-4">
				<h3 className="text-xl font-semibold mb-2">{post.title}</h3>
				<p className="text-gray-600">{post.content}</p>
				{post.image && (
					<div className="mt-4 rounded-md overflow-hidden">
						<img
							src={post.image}
							alt="Post image"
							className="w-full h-auto max-h-96 object-contain"
						/>
					</div>
				)}
			</CardContent>

			<CardFooter className="pt-3 flex justify-between">
				<div className="flex items-center space-x-6">
					<Button
						variant="ghost"
						size="sm"
						className="flex items-center gap-1"
						onClick={(e) => {
							e.preventDefault()
							handleToggleLike()
						}}
						disabled={loading}
					>
						<Heart
							className={`w-5 h-5 transition-colors ${
								liked ? 'text-red-500 fill-red-500' : ''
							}`}
						/>
						<span>{likeCount}</span>
					</Button>
					<Button
						variant="ghost"
						size="sm"
						className="flex items-center gap-1"
						onClick={(e) => e.preventDefault()}
					>
						<MessageSquare className="w-5 h-5" />
						<span>{post.comment_count}</span>
					</Button>
				</div>
			</CardFooter>
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

export default NewsCard
