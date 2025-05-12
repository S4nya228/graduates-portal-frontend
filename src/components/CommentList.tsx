import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/Avatar'
import Button from './ui/Button'
import { Card } from './Card'
import { Heart } from 'lucide-react'

interface Comment {
	id: number
	content: string
	created_at: string
	parent_id: number | null
	root_id: number | null
	user_id: number
	user?: {
		name: string
		avatar: string | null
	}
	likes?: number
}

interface CommentListProps {
	comments: Comment[]
}

const CommentList: React.FC<CommentListProps> = ({ comments }) => {
	const formatDate = (isoDate: string) =>
		new Date(isoDate).toLocaleDateString('uk-UA', {
			year: 'numeric',
			month: '2-digit',
			day: '2-digit',
		})

	return (
		<div className="space-y-6">
			{comments.map((comment) => (
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
								<Button variant="ghost" size="sm" className="gap-1 h-8 px-2">
									<Heart className="w-4 h-4" />
									<span>{comment.likes ?? 0}</span>
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
