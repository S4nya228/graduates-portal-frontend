import React, { useEffect, useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/Avatar'
import Button from './ui/Button'
import { Card } from './Card'
import { Heart, Pencil, Trash } from 'lucide-react'
import type { Comment } from '../services/commentService'
import commentService from '../services/commentService'
import clsx from 'clsx'
import { Textarea } from './ui/Textarea'

interface CommentListProps {
	comments: Comment[]
	postId: number
	currentUserId: number
}

const CommentList: React.FC<CommentListProps> = ({
	comments,
	postId,
	currentUserId,
}) => {
	const [localComments, setLocalComments] = useState<Comment[]>(comments)
	const [editingId, setEditingId] = useState<number | null>(null)
	const [editingContent, setEditingContent] = useState<string>('')

	useEffect(() => {
		setLocalComments(comments)
	}, [comments])

	const formatDate = (isoDate: string) =>
		new Date(isoDate).toLocaleDateString('uk-UA', {
			year: 'numeric',
			month: '2-digit',
			day: '2-digit',
		})

	const handleLike = async (commentId: number) => {
		try {
			await commentService.toggleLike(postId, commentId)
			setLocalComments((prev) =>
				prev.map((comment) =>
					comment.id === commentId
						? {
								...comment,
								has_reaction: !comment.has_reaction,
								like_count:
									(comment.like_count ?? 0) + (comment.has_reaction ? -1 : 1),
						  }
						: comment
				)
			)
		} catch (error) {
			console.error('Не вдалося лайкнути коментар')
		}
	}

	const handleDelete = async (commentId: number) => {
		try {
			await commentService.deleteComment(postId, commentId)
			setLocalComments((prev) => prev.filter((c) => c.id !== commentId))
			window.dispatchEvent(new Event('commentDeleted'))
		} catch (error) {
			console.error('Не вдалося видалити коментар')
		}
	}

	const startEditing = (comment: Comment) => {
		setEditingId(comment.id)
		setEditingContent(comment.content)
	}

	const cancelEditing = () => {
		setEditingId(null)
		setEditingContent('')
	}

	const saveEditing = async () => {
		if (editingId === null) return
		try {
			await commentService.updateComment(postId, editingId, {
				content: editingContent,
			})

			setLocalComments((prev) =>
				prev.map((c) =>
					c.id === editingId ? { ...c, content: editingContent } : c
				)
			)
			cancelEditing()
		} catch (error) {
			console.error('Не вдалося оновити коментар')
		}
	}

	return (
		<div className="space-y-6">
			{localComments.map((comment) => {
				const isMyComment = currentUserId === comment.user?.id

				return (
					<Card key={comment.id} className="p-4 relative">
						{isMyComment && (
							<div className="absolute top-2 right-2 flex space-x-2">
								<Button
									variant="ghost"
									size="icon"
									className="h-8 w-8"
									onClick={() => startEditing(comment)}
								>
									<Pencil className="h-4 w-4" />
								</Button>
								<Button
									variant="ghost"
									size="icon"
									className="h-8 w-8 text-red-500"
									onClick={() => handleDelete(comment.id)}
								>
									<Trash className="h-4 w-4" />
								</Button>
							</div>
						)}

						<div className="flex gap-3">
							<Avatar>
								<AvatarImage src={comment.user?.avatar || ''} />
								<AvatarFallback>
									{comment.user?.name?.[0] || '?'}
								</AvatarFallback>
							</Avatar>
							<div className="flex-1">
								<p className="font-medium">{comment.user?.name || 'Анонім'}</p>
								<p className="text-xs text-muted-foreground">
									{formatDate(comment.created_at)}
								</p>

								{editingId === comment.id ? (
									<div>
										<Textarea
											value={editingContent}
											onChange={(e) => setEditingContent(e.target.value)}
											className="min-h-24 mb-2 mt-3"
										/>
										<div className="mt-2 space-x-2">
											<Button size="sm" onClick={saveEditing}>
												Зберегти
											</Button>
											<Button size="sm" variant="ghost" onClick={cancelEditing}>
												Скасувати
											</Button>
										</div>
									</div>
								) : (
									<p className="mt-2">{comment.content}</p>
								)}

								<div className="flex items-center space-x-4 mt-2">
									<Button
										variant="ghost"
										size="sm"
										className="gap-1 h-8 px-2"
										onClick={() => handleLike(comment.id)}
									>
										<Heart
											className={clsx('w-4 h-4', {
												'fill-red-500 stroke-red-500 text-red-500':
													comment.has_reaction,
											})}
										/>
										<span className="text-muted-foreground">
											{comment.like_count ?? 0}
										</span>
									</Button>
								</div>
							</div>
						</div>
					</Card>
				)
			})}
		</div>
	)
}

export default CommentList
