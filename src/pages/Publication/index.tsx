import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { Avatar, AvatarFallback, AvatarImage } from '../../components/Avatar'
import Button from '../../components/Button'
import Badge from '../../components/Badge'
import { Card, CardContent, CardFooter } from '../../components/Card'
import { ChevronLeft, Heart, MessageSquare, Calendar, User } from 'lucide-react'
import PublicationComments from '../../components/PublicationComments'

const Publication = () => {
	const { id } = useParams()

	const publication = {
		id: '1',
		title: 'Зустріч випускників 2018 року',
		author: {
			name: 'Анна Коваленко',
			avatar: '',
		},
		date: '02.07.2023',
		content: `
      Запрошуємо всіх випускників 2018 року на щорічну зустріч, яка відбудеться 15 серпня 2023 року у головному корпусі університету.
      
      Програма зустрічі:
      • 14:00 - 15:00: Реєстрація та вітальна кава
      • 15:00 - 16:30: Офіційна частина, виступи викладачів
      • 16:30 - 19:00: Неформальне спілкування, фуршет
      
      Для участі необхідно зареєструватися за посиланням до 10 серпня.
      
      Чекаємо на зустріч з вами!
    `,
		image:
			'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
		category: 'Зустрічі',
		likes: 24,
		comments: 5,
		views: 127,
		liked: false,
		bookmarked: false,
	}

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

							<CardContent className="pt-6 px-6">
								<div className="flex items-center justify-between mb-4">
									<div className="flex items-center space-x-3">
										<Avatar>
											<AvatarImage
												src={publication.author.avatar}
												alt={publication.author.name}
											/>
											<AvatarFallback>
												{publication.author.name[0]}
											</AvatarFallback>
										</Avatar>
										<div>
											<div className="font-medium">
												{publication.author.name}
											</div>
											<div className="text-sm text-muted-foreground flex items-center">
												<span>{publication.date}</span>
											</div>
										</div>
									</div>

									<Badge
										variant="outline"
										className="bg-alumni-light-purple/10 text-alumni-purple border-alumni-light-purple"
									>
										{publication.category}
									</Badge>
								</div>

								<h1 className="text-2xl md:text-3xl font-bold mb-2">
									{publication.title}
								</h1>

								<div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground mb-6">
									<div className="flex items-center">
										<Calendar className="h-4 w-4 mr-1" />
										<span>{publication.date}</span>
									</div>
									<div className="flex items-center">
										<User className="h-4 w-4 mr-1" />
										<span>{publication.author.name}</span>
									</div>
								</div>

								<div className="prose max-w-none mb-6">
									{publication.content.split('\n').map((paragraph, index) => (
										<p key={index} className="mb-4">
											{paragraph}
										</p>
									))}
								</div>
							</CardContent>

							<CardFooter className=" pb-4 px-6 flex justify-between">
								<div className="flex items-center space-x-4">
									<Button
										variant="ghost"
										size="sm"
										className={`flex items-center gap-1 ${
											publication.liked ? 'text-red-500' : ''
										}`}
									>
										<Heart
											className={`w-5 h-5 ${
												publication.liked ? 'fill-current' : ''
											}`}
										/>
										<span>{publication.likes}</span>
									</Button>
									<Button
										variant="ghost"
										size="sm"
										className="flex items-center gap-1"
									>
										<MessageSquare className="w-5 h-5" />
										<span>{publication.comments}</span>
									</Button>
								</div>
							</CardFooter>
						</Card>

						<div className="mt-8">
							<h2 className="text-xl font-bold mb-4">
								Коментарі ({publication.comments})
							</h2>
							<PublicationComments publicationId={publication.id} />
						</div>
					</div>

					<div className="lg:col-span-1">
						<div className="sticky top-20">
							<div className="bg-white rounded-lg shadow p-6 mb-6">
								<h2 className="text-xl font-bold mb-4">Про автора</h2>
								<div className="flex items-center space-x-4 mb-4">
									<Avatar className="h-16 w-16">
										<AvatarImage
											src={publication.author.avatar}
											alt={publication.author.name}
										/>
										<AvatarFallback className="text-xl">
											{publication.author.name[0]}
										</AvatarFallback>
									</Avatar>
									<div>
										<div className="font-bold text-lg">
											{publication.author.name}
										</div>
									</div>
								</div>
								<p className="text-muted-foreground">
									Організатор заходів алумні-спільноти університету. Випускниця
									2015 року, спеціальність "Маркетинг".
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
