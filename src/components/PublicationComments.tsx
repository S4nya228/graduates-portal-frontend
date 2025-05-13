import React, { useState } from 'react'
import CommentForm from './CommentForm'
import CommentList from './CommentList'
import commentService from '../services/commentService'
import type { Comment } from '../services/commentService'

interface PublicationCommentsProps {
	publicationId: number
	comments: Comment[]
}

const PublicationComments: React.FC<PublicationCommentsProps> = ({
	publicationId,
	comments,
}) => {
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

	return (
		<div>
			<CommentForm onSubmit={handleCreateComment} />
			<CommentList postId={publicationId} comments={comments} />
		</div>
	)
}

export default PublicationComments
