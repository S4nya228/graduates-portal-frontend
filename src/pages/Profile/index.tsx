import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/Tabs'
import Button from '../../components/Button'
import { Card, CardContent } from '../../components/Card'
import { Avatar, AvatarFallback, AvatarImage } from '../../components/Avatar'
import Badge from '../../components/Badge'
import NewsCard from '../../components/NewsCard'
import {
	Edit,
	Mail,
	MapPin,
	Briefcase,
	Building,
	GraduationCap,
	MessageSquare,
	Github,
	Linkedin,
	Twitter,
} from 'lucide-react'

const Profile = () => {
	const profileData = {
		id: '1',
		name: 'Олексій Ковальчук',
		avatar: 'https://randomuser.me/api/portraits/men/44.jpg',
		graduationYear: 2019,
		specialization: 'Програмна інженерія',
		currentPosition: 'Senior Frontend Developer',
		company: 'GlobalTech Solutions',
		location: 'Київ, Україна',
		email: 'oleksii.kovalchuk@example.com',
		phone: '+380 50 123 4567',
		about:
			'Розробник з 5-річним досвідом у створенні веб-додатків. Спеціалізуюсь на React, TypeScript та Node.js. Постійно вивчаю нові технології та підходи до розробки.',
		skills: [
			'JavaScript',
			'TypeScript',
			'React',
			'Node.js',
			'GraphQL',
			'Docker',
			'AWS',
			'CI/CD',
		],
		education: [
			{
				institution: 'Національний університет "Київська політехніка"',
				degree: "Магістр комп'ютерних наук",
				field: 'Програмна інженерія',
				startDate: '2017',
				endDate: '2019',
			},
			{
				institution: 'Національний університет "Київська політехніка"',
				degree: "Бакалавр комп'ютерних наук",
				field: 'Програмна інженерія',
				startDate: '2013',
				endDate: '2017',
			},
		],
		experience: [
			{
				position: 'Senior Frontend Developer',
				company: 'GlobalTech Solutions',
				location: 'Київ, Україна',
				startDate: 'Березень 2022',
				endDate: 'Теперішній час',
				description:
					'Розробка корпоративних веб-додатків з використанням React, TypeScript та GraphQL.',
			},
			{
				position: 'Frontend Developer',
				company: 'InnoSoft',
				location: 'Київ, Україна',
				startDate: 'Липень 2019',
				endDate: 'Лютий 2022',
				description:
					'Підтримка та розробка користувацьких інтерфейсів для фінтех-платформи.',
			},
		],
		projects: [
			{
				name: 'E-commerce платформа',
				description:
					'Розробка фронтенду для масштабованої e-commerce платформи з мікросервісною архітектурою.',
			},
			{
				name: 'CRM система',
				description:
					'Створення інтерфейсу для CRM системи з інтеграцією аналітики та автоматизацією процесів.',
			},
		],
		socialLinks: {
			linkedin: 'https://linkedin.com/',
			github: 'https://github.com/',
			twitter: 'https://twitter.com/',
		},
	}

	const userPosts = [
		{
			id: '1',
			author: {
				name: profileData.name,
				avatar: profileData.avatar,
			},
			date: '3 дні тому',
			content:
				'Завершив роботу над новим проектом з використанням React та TypeScript. Якщо хтось шукає розробника для схожих проектів - пишіть в особисті повідомлення.',
			likes: 12,
			comments: 3,
		},
		{
			id: '2',
			author: {
				name: profileData.name,
				avatar: profileData.avatar,
			},
			date: '2 тижні тому',
			title: 'Відвідав ІТ конференцію',
			content:
				'Вчора був на React Conference. Багато цікавого про нові можливості та перспективи розвитку фреймворку. Раджу переглянути записи доповідей!',
			image:
				'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
			likes: 24,
			comments: 5,
		},
	]

	return (
		<div className="min-h-screen bg-alumni-light-gray pb-12">
			<div className="bg-alumni-purple h-48 relative"></div>

			<div className="container mx-auto px-4 -mt-20">
				<Card className="mb-6">
					<CardContent className="p-6">
						<div className="flex flex-col md:flex-row gap-6">
							<div className="flex-shrink-0">
								<Avatar className="w-32 h-32 border-4 border-white">
									<AvatarImage
										src={profileData.avatar}
										alt={profileData.name}
									/>
									<AvatarFallback>{profileData.name[0]}</AvatarFallback>
								</Avatar>
							</div>

							<div className="flex-grow pt-20 max-md:pt-0">
								<div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
									<div>
										<h1 className="text-2xl font-bold">{profileData.name}</h1>
										<p className="text-alumni-gray">
											{profileData.currentPosition} at {profileData.company}
										</p>
									</div>

									<div className="flex gap-2">
										<Button
											variant="outline"
											className="flex items-center hover:bg-[#8b5cf6]/90"
										>
											<MessageSquare className="mr-2 h-4 w-4" />
											Написати
										</Button>
										<Button className="bg-alumni-purple">
											<Edit className="mr-2 h-4 w-4" />
											Редагувати профіль
										</Button>
									</div>
								</div>

								<div className="mt-4 flex flex-col gap-2">
									<div className="flex items-center text-alumni-gray">
										<MapPin className="h-4 w-4 mr-2" />
										<span>{profileData.location}</span>
									</div>

									<div className="flex items-center text-alumni-gray">
										<Mail className="h-4 w-4 mr-2" />
										<a
											href={`mailto:${profileData.email}`}
											className="text-alumni-blue hover:underline"
										>
											{profileData.email}
										</a>
									</div>

									<div className="flex items-center text-alumni-gray">
										<GraduationCap className="h-4 w-4 mr-2" />
										<span>
											Випускник {profileData.graduationYear} року,{' '}
											{profileData.specialization}
										</span>
									</div>
								</div>

								<div className="mt-4 flex gap-3">
									{profileData.socialLinks.linkedin && (
										<a
											href={profileData.socialLinks.linkedin}
											target="_blank"
											rel="noopener noreferrer"
											className="text-alumni-gray hover:text-[#3b82f6] transition-colors"
										>
											<Linkedin className="h-5 w-5" />
										</a>
									)}

									{profileData.socialLinks.github && (
										<a
											href={profileData.socialLinks.github}
											target="_blank"
											rel="noopener noreferrer"
											className="text-alumni-gray hover:text-[#3b82f6] transition-colors"
										>
											<Github className="h-5 w-5" />
										</a>
									)}

									{profileData.socialLinks.twitter && (
										<a
											href={profileData.socialLinks.twitter}
											target="_blank"
											rel="noopener noreferrer"
											className="text-alumni-gray hover:text-[#3b82f6] transition-colors"
										>
											<Twitter className="h-5 w-5" />
										</a>
									)}
								</div>
							</div>
						</div>
					</CardContent>
				</Card>

				<Tabs defaultValue="about" className="space-y-4 ">
					<TabsList className="grid grid-cols-2 md:grid-cols-4 gap-2">
						<TabsTrigger className="cursor-pointer" value="about">
							Про мене
						</TabsTrigger>
						<TabsTrigger className="cursor-pointer" value="experience">
							Досвід
						</TabsTrigger>
						<TabsTrigger className="cursor-pointer" value="education">
							Освіта
						</TabsTrigger>
						<TabsTrigger className="cursor-pointer" value="posts">
							Публікації
						</TabsTrigger>
					</TabsList>

					<TabsContent value="about" className="space-y-4">
						<Card>
							<CardContent className="p-6">
								<h2 className="text-xl font-semibold mb-3">Про мене</h2>
								<p className="text-gray-600">{profileData.about}</p>

								<div className="mt-6">
									<h3 className="font-medium mb-3">Навички</h3>
									<div className="flex flex-wrap gap-2">
										{profileData.skills.map((skill, index) => (
											<Badge key={index} variant="secondary">
												{skill}
											</Badge>
										))}
									</div>
								</div>

								<div className="mt-6">
									<h3 className="font-medium mb-3">Проекти</h3>
									{profileData.projects.map((project, index) => (
										<div key={index} className="mb-4 last:mb-0">
											<h4 className="font-medium">{project.name}</h4>
											<p className="text-gray-600">{project.description}</p>
										</div>
									))}
								</div>
							</CardContent>
						</Card>
					</TabsContent>

					<TabsContent value="experience" className="space-y-4">
						<Card>
							<CardContent className="p-6">
								<h2 className="text-xl font-semibold mb-6">Досвід роботи</h2>

								<div className="space-y-8">
									{profileData.experience.map((exp, index) => (
										<div key={index} className="relative pl-8 pb-8">
											{index !== profileData.experience.length - 1 && (
												<div className="absolute top-0 left-3 h-full w-px bg-gray-200"></div>
											)}
											<div className="absolute top-0 left-0 h-6 w-6 rounded-full bg-alumni-blue flex items-center justify-center">
												<Briefcase className="h-3 w-3 text-white" />
											</div>

											<div>
												<div className="flex flex-col md:flex-row md:items-center md:justify-between gap-1 mb-2">
													<h3 className="font-medium">{exp.position}</h3>
													<span className="text-sm text-alumni-gray">
														{exp.startDate} - {exp.endDate}
													</span>
												</div>

												<div className="flex items-center text-alumni-gray mb-2">
													<Building className="h-4 w-4 mr-2" />
													<span>
														{exp.company}, {exp.location}
													</span>
												</div>

												<p className="text-gray-600">{exp.description}</p>
											</div>
										</div>
									))}
								</div>
							</CardContent>
						</Card>
					</TabsContent>

					<TabsContent value="education" className="space-y-4">
						<Card>
							<CardContent className="p-6">
								<h2 className="text-xl font-semibold mb-6">Освіта</h2>

								<div className="space-y-8">
									{profileData.education.map((edu, index) => (
										<div key={index} className="relative pl-8 pb-8">
											{index !== profileData.education.length - 1 && (
												<div className="absolute top-0 left-3 h-full w-px bg-gray-200"></div>
											)}
											<div className="absolute top-0 left-0 h-6 w-6 rounded-full bg-alumni-purple flex items-center justify-center">
												<GraduationCap className="h-3 w-3 text-white" />
											</div>

											<div>
												<div className="flex flex-col md:flex-row md:items-center md:justify-between gap-1 mb-2">
													<h3 className="font-medium">{edu.degree}</h3>
													<span className="text-sm text-alumni-gray">
														{edu.startDate} - {edu.endDate}
													</span>
												</div>

												<div className="flex items-center text-alumni-gray mb-2">
													<Building className="h-4 w-4 mr-2" />
													<span>{edu.institution}</span>
												</div>

												<p className="text-gray-600">{edu.field}</p>
											</div>
										</div>
									))}
								</div>
							</CardContent>
						</Card>
					</TabsContent>

					<TabsContent value="posts" className="space-y-4">
						<Card>
							<CardContent className="p-6">
								<h2 className="text-xl font-semibold mb-4">Мої публікації</h2>

								{userPosts.map((post) => (
									<NewsCard key={post.id} {...post} />
								))}
							</CardContent>
						</Card>
					</TabsContent>
				</Tabs>
			</div>
		</div>
	)
}

export default Profile
