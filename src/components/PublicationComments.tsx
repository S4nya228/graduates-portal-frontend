import React, { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/Avatar'
import Button from './ui/Button'
import { Textarea } from './ui/Textarea'
import { Card } from './Card'
import { Heart, Reply } from 'lucide-react'

interface PublicationCommentsProps {
	publicationId: string
}

const PublicationComments: React.FC<PublicationCommentsProps> = ({
	publicationId,
}) => {
	const [commentText, setCommentText] = useState('')

	// Mock comments data
	const comments = [
		{
			id: '1',
			author: {
				name: 'Михайло Петренко',
				avatar: '',
			},
			content: "Дуже цікавий захід! Обов'язково візьму участь.",
			date: '03.07.2023',
			likes: 3,
			replies: [],
		},
		{
			id: '2',
			author: {
				name: 'Олена Коваленко',
				avatar: '',
			},
			content: 'А чи буде онлайн-трансляція для тих, хто не зможе приїхати?',
			date: '03.07.2023',
			likes: 0,
			replies: [
				{
					id: '3',
					author: {
						name: 'Анна Коваленко',
						avatar: '',
						isAuthor: true,
					},
					content:
						'Так, онлайн-трансляція буде доступна. Посилання надішлемо зареєстрованим учасникам.',
					date: '04.07.2023',
					likes: 2,
				},
			],
		},
	]

	const handleSubmitComment = (e: React.FormEvent) => {
		e.preventDefault()
		// Here we would normally send the comment to the server
		console.log('Submitting comment:', commentText)
		setCommentText('')
	}

	return (
		<div>
			<form onSubmit={handleSubmitComment} className="mb-8">
				<div className="flex gap-3">
					<Avatar>
						<AvatarFallback>ВК</AvatarFallback>
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

			<div className="space-y-6">
				{comments.map((comment) => (
					<Card key={comment.id} className="p-4">
						<div className="flex gap-3">
							<Avatar>
								<AvatarImage
									src={comment.author.avatar}
									alt={comment.author.name}
								/>
								<AvatarFallback>{comment.author.name[0]}</AvatarFallback>
							</Avatar>
							<div className="flex-1">
								<div className="flex justify-between items-start">
									<div>
										<p className="font-medium">{comment.author.name}</p>
										<p className="text-xs text-muted-foreground">
											{comment.date}
										</p>
									</div>
								</div>
								<p className="mt-2">{comment.content}</p>
								<div className="flex items-center space-x-4 mt-2">
									<Button
										variant="ghost"
										size="sm"
										className="flex items-center gap-1 h-8 px-2"
									>
										<Heart className="w-4 h-4" />
										<span>{comment.likes}</span>
									</Button>
									<Button
										variant="ghost"
										size="sm"
										className="flex items-center gap-1 h-8 px-2"
									>
										<Reply className="w-4 h-4" />
										<span>Відповісти</span>
									</Button>
								</div>

								{comment.replies && comment.replies.length > 0 && (
									<div className="mt-4 pl-6 border-l-2 border-muted space-y-4">
										{comment.replies.map((reply) => (
											<div key={reply.id} className="flex gap-3">
												<Avatar className="h-8 w-8">
													<AvatarImage
														src={reply.author.avatar}
														alt={reply.author.name}
													/>
													<AvatarFallback className="text-xs">
														{reply.author.name[0]}
													</AvatarFallback>
												</Avatar>
												<div className="flex-1">
													<div className="flex items-center">
														<p className="font-medium">{reply.author.name}</p>
														{reply.author.isAuthor && (
															<span className="ml-2 text-xs bg-alumni-blue/10 text-alumni-blue px-2 py-0.5 rounded-full">
																Автор
															</span>
														)}
													</div>
													<p className="text-xs text-muted-foreground">
														{reply.date}
													</p>
													<p className="mt-1">{reply.content}</p>
													<div className="flex items-center mt-1">
														<Button
															variant="ghost"
															size="sm"
															className="flex items-center gap-1 h-6 px-2 text-xs"
														>
															<Heart className="w-3 h-3" />
															<span>{reply.likes}</span>
														</Button>
													</div>
												</div>
											</div>
										))}
									</div>
								)}
							</div>
						</div>
					</Card>
				))}
			</div>
		</div>
	)
}

export default PublicationComments
