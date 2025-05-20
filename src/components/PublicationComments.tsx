import React, { useState } from 'react'
import CommentForm from './CommentForm'
import CommentList from './CommentList'
import commentService from '../services/commentService'
import type { Comment } from '../services/commentService'
import { Card } from './Card'
import { useAppSelector } from '../hooks/redux'

interface PublicationCommentsProps {
	publicationId: number
	comments: Comment[]
}

const PublicationComments: React.FC<PublicationCommentsProps> = ({
	publicationId,
	comments,
}) => {
	const user = useAppSelector((state) => state.auth.user)

	const handleCreateComment = async (text: string) => {
		try {
			await commentService.create(Number(publicationId), {
				content: text,
			})

			window.dispatchEvent(new Event('commentAdded'))
		} catch {
			console.error('Не вдалося створити коментар')
		}
	}

	if (!user) {
		return (
			<Card className="p-6 text-center text-muted-foreground">
				<p>Увійдіть у свій акаунт, щоб залишати коментарі.</p>
			</Card>
		)
	}

	return (
		<div>
			<CommentForm onSubmit={handleCreateComment} />
			<CommentList
				postId={publicationId}
				comments={comments}
				currentUserId={user.id}
			/>
		</div>
	)
}

export default PublicationComments
