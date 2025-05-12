import React, { useState, useEffect } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/Avatar'
import Button from './ui/Button'
import { Textarea } from './ui/Textarea'
import userService from '../services/userService'
import { User } from '../types'

interface CommentFormProps {
	onSubmit: (text: string) => void
}

const CommentForm: React.FC<CommentFormProps> = ({ onSubmit }) => {
	const [commentText, setCommentText] = useState('')
	const [currentUser, setCurrentUser] = useState<User | null>(null)

	useEffect(() => {
		userService.current().then((response) => setCurrentUser(response ?? null))
	}, [])

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		if (!commentText.trim()) return
		onSubmit(commentText.trim())
		setCommentText('')
	}

	return (
		<form onSubmit={handleSubmit} className="mb-8">
			<div className="flex gap-3">
				<Avatar>
					{currentUser?.avatar ? (
						<AvatarImage src={currentUser.avatar} />
					) : (
						<AvatarFallback>{currentUser?.name?.[0] ?? 'К'}</AvatarFallback>
					)}
				</Avatar>
				<div className="flex-1">
					<Textarea
						placeholder="Напишіть коментар..."
						value={commentText}
						onChange={(e) => setCommentText(e.target.value)}
						className="min-h-24 mb-2"
					/>
					<Button type="submit" disabled={!commentText.trim()}>
						Додати коментар
					</Button>
				</div>
			</div>
		</form>
	)
}

export default CommentForm
