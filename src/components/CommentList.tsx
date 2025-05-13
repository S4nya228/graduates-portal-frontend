import React, { useEffect, useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/Avatar'
import Button from './ui/Button'
import { Card } from './Card'
import { Heart } from 'lucide-react'
import type { Comment } from '../services/commentService'
import commentService from '../services/commentService'
import clsx from 'clsx'

interface CommentListProps {
	comments: Comment[]
	postId: number
}

const CommentList: React.FC<CommentListProps> = ({ comments, postId }) => {
	const [localComments, setLocalComments] = useState<Comment[]>(comments)

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

	return (
		<div className="space-y-6">
			{localComments.map((comment) => (
				<Card key={comment.id} className="p-4">
					<div className="flex gap-3">
						<Avatar>
							<AvatarImage src={comment.user?.avatar || ''} />
							<AvatarFallback>{comment.user?.name?.[0] || '?'}</AvatarFallback>
						</Avatar>
						<div className="flex-1">
							<p className="font-medium">{comment.user?.name || 'Анонім'}</p>
							<p className="text-xs text-muted-foreground">
								{formatDate(comment.created_at)}
							</p>
							<p className="mt-2">{comment.content}</p>
							<div className="flex items-center space-x-4 mt-2">
								<Button
									variant="ghost"
									size="sm"
									className={clsx('gap-1 h-8 px-2', {
										'text-red-500': comment.has_reaction,
									})}
									onClick={() => handleLike(comment.id)}
								>
									<Heart className="w-4 h-4 fill-current" />
									<span>{comment.like_count ?? 0}</span>
								</Button>
							</div>
						</div>
					</div>
				</Card>
			))}
		</div>
	)
}

export default CommentList
