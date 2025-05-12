import React, { useState } from 'react'
import CommentForm from './CommentForm'
import CommentList from './CommentList'
import commentService from '../services/commentService'

interface Comment {
	id: number
	content: string
	created_at: string
	parent_id: number | null
	root_id: number | null
	user_id: number
	user_name?: string
	user_avatar?: string | null
	likes?: number
}

interface PublicationCommentsProps {
	publicationId: string
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
			<CommentList comments={comments} />
		</div>
	)
}

export default PublicationComments
