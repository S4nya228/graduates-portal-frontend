import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/Avatar'
import Button from '../../components/ui/Button'
import Badge from '../../components/ui/Badge'
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from '../../components/Card'
import { ChevronLeft, Heart, MessageSquare, Calendar, User } from 'lucide-react'
import PublicationComments from '../../components/PublicationComments'
import postService from '../../services/postService'

const Publication = () => {
	const { id } = useParams()
	const [publication, setPublication] = useState<any>(null)
	const [liked, setLiked] = useState<boolean>(false)
	const [likeCount, setLikeCount] = useState<number>(0)
	const [loading, setLoading] = useState<boolean>(false)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		const fetchPost = async () => {
			try {
				const response = await postService.getById(id!)
				const post = response[0]
				setPublication(post)
				setLikeCount(post.like_count)
				setLiked(post.has_reaction && post.reaction_type === 'LIKE')
			} catch (err) {
				setError('Не вдалося завантажити публікацію.')
			} finally {
				setLoading(false)
			}
		}

		fetchPost()
	}, [id])

	const handleToggleLike = async (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault()

		if (loading) return

		try {
			await postService.like(publication.id)

			setLiked((prev) => !prev)
			setLikeCount((prev) => (liked ? prev - 1 : prev + 1))
		} catch (error) {
			console.error('Помилка лайкування поста', error)
		} finally {
			setLoading(false)
		}
	}

	if (loading) return <div className="p-4 text-center">Завантаження...</div>
	if (error) return <div className="p-4 text-center text-red-500">{error}</div>
	if (!publication) return null

	const formattedDate = publication?.created_at
		? new Intl.DateTimeFormat('uk-UA', {
				year: 'numeric',
				month: 'long',
				day: 'numeric',
		  }).format(new Date(publication.created_at.replace('.000000Z', 'Z')))
		: ''

	return (
		<div className="min-h-screen bg-alumni-light-gray">
			<div className="container mx-auto px-4 py-8">
				<div className="mb-6">
					<Link
						to="/"
						className="inline-flex items-center text-alumni-dark hover:text-[#3b82f6]"
					>
						<ChevronLeft className="h-4 w-4 mr-1" />
						<span>Назад на головну</span>
					</Link>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
					<div className="lg:col-span-2">
						<Card className="overflow-hidden bg-white shadow-md">
							{publication.image && (
								<div className="w-full h-64 md:h-96 overflow-hidden">
									<img
										src={publication.image}
										alt={publication.title}
										className="w-full h-full object-cover"
									/>
								</div>
							)}
							<CardHeader className="pb-3">
								<div className="flex items-center space-x-3">
									<Avatar>
										{publication.user_avatar && (
											<AvatarImage
												src={publication.user_avatar}
												alt={publication.user_name}
											/>
										)}
										<AvatarFallback>{publication.user_name[0]}</AvatarFallback>
									</Avatar>

									<div>
										<div className="font-medium">{publication.user_name}</div>
										<div className="text-sm text-[hsl(215.4,16.3%,46.9%)] flex items-center">
											<span>{formattedDate}</span>
										</div>
									</div>
								</div>
							</CardHeader>

							<CardContent className="pt-6 px-6">
								<h1 className="text-2xl md:text-3xl font-bold mb-2">
									{publication.title}
								</h1>
								<div className="prose max-w-none mb-6 whitespace-pre-line">
									{publication.content}
								</div>
							</CardContent>

							<CardFooter className="pb-4 px-6 flex justify-between">
								<div className="flex items-center space-x-6">
									<Button
										variant="ghost"
										size="sm"
										className="flex items-center gap-1"
										onClick={handleToggleLike}
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
									>
										<MessageSquare className="w-5 h-5" />
										<span>{publication.comment_count}</span>
									</Button>
								</div>
							</CardFooter>
						</Card>

						<div className="mt-8">
							<h2 className="text-xl font-bold mb-4">
								Коментарі ({publication.comment_count})
							</h2>
							<PublicationComments publicationId={publication.id} />
						</div>
					</div>

					<div className="lg:col-span-1">
						<div className="sticky top-20">
							<div className="bg-white rounded-lg shadow p-6 mb-6">
								<h2 className="text-xl font-bold mb-4">Про автора</h2>
								<div className="flex items-center space-x-4 mb-4">
									<Avatar>
										{publication.user_avatar && (
											<AvatarImage
												src={publication.user_avatar}
												alt={publication.user_name}
											/>
										)}
										<AvatarFallback>{publication.user_name[0]}</AvatarFallback>
									</Avatar>

									<div>
										<div className="font-bold text-lg">
											{publication.user_name}
										</div>
									</div>
								</div>
								<p className="text-muted-foreground">
									Інформація про автора публікації.
								</p>
								<div className="mt-4">
									<Button variant="outline" className="w-full">
										Переглянути профіль
									</Button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Publication
