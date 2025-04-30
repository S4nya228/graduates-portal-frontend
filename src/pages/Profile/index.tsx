import React, { useEffect, useState } from 'react'
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from '../../components/ui/Tabs'
import Button from '../../components/ui/Button'
import { Card, CardContent } from '../../components/Card'
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/Avatar'
import Badge from '../../components/ui/Badge'
import {
	Edit,
	Mail,
	MapPin,
	Briefcase,
	Building,
	GraduationCap,
	Github,
	Linkedin,
	Twitter,
} from 'lucide-react'
import userService from '../../services/userService'

const Profile = () => {
	const [profileData, setProfileData] = useState<any>(null)

	useEffect(() => {
		const fetchUserData = async () => {
			try {
				const profile = await userService.current()
				setProfileData(profile)
			} catch (e) {
				console.error('Помилка при отриманні даних профілю:', e)
			}
		}

		fetchUserData()
	}, [])

	if (!profileData) {
		return <div>Завантаження...</div>
	}

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
											{profileData.currentPosition} в {profileData.company}
										</p>
									</div>

									<div className="flex gap-2">
										<Button className="bg-alumni-purple">
											<Edit className="mr-2 h-4 w-4" />
											Редагувати профіль
										</Button>
									</div>
								</div>

								<div className="mt-4 flex flex-col gap-2">
									<div className="flex items-center text-alumni-gray">
										<MapPin className="h-4 w-4 mr-2" />
										<span>
											{profileData.city && profileData.country
												? `${profileData.city}, ${profileData.country}`
												: 'Місце не вказано'}
										</span>
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
									{profileData.socialLinks && (
										<a
											href={profileData.socialLinks}
											target="_blank"
											rel="noopener noreferrer"
											className="text-alumni-gray hover:text-[#3b82f6] transition-colors"
										>
											<Linkedin className="h-5 w-5" />
										</a>
									)}

									{profileData.socialLinks && (
										<a
											href={profileData.socialLinks}
											target="_blank"
											rel="noopener noreferrer"
											className="text-alumni-gray hover:text-[#3b82f6] transition-colors"
										>
											<Github className="h-5 w-5" />
										</a>
									)}

									{profileData.socialLinks && (
										<a
											href={profileData.socialLinks}
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
										{profileData.skills &&
										Array.isArray(profileData.skills) &&
										profileData.skills.length > 0 ? (
											profileData.skills.map((skill: string, index: number) => (
												<Badge key={index} variant="secondary">
													{skill}
												</Badge>
											))
										) : (
											<p>Навички не вказані</p>
										)}
									</div>
								</div>

								<div className="mt-6">
									<h3 className="font-medium mb-3">Проекти</h3>
									{profileData.projects &&
									Array.isArray(profileData.projects) &&
									profileData.projects.length > 0 ? (
										profileData.projects.map((project: any, index: number) => (
											<div key={index} className="mb-4 last:mb-0">
												<h4 className="font-medium">{project.name}</h4>
												<p className="text-gray-600">{project.description}</p>
											</div>
										))
									) : (
										<p>Проекти не вказані</p>
									)}
								</div>
							</CardContent>
						</Card>
					</TabsContent>

					<TabsContent value="experience" className="space-y-4">
						<Card>
							<CardContent className="p-6">
								<h2 className="text-xl font-semibold mb-6">Досвід роботи</h2>

								<div className="space-y-8">
									{profileData.experience &&
									Array.isArray(profileData.experience) &&
									profileData.experience.length > 0 ? (
										profileData.experience.map((exp: any, index: number) => (
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
										))
									) : (
										<p>Досвід не вказаний</p>
									)}
								</div>
							</CardContent>
						</Card>
					</TabsContent>

					<TabsContent value="education" className="space-y-4">
						<Card>
							<CardContent className="p-6">
								<h2 className="text-xl font-semibold mb-6">Освіта</h2>

								<div className="space-y-8">
									{profileData.education &&
									Array.isArray(profileData.education) &&
									profileData.education.length > 0 ? (
										profileData.education.map((edu: any, index: number) => (
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
										))
									) : (
										<p>Освіта не вказана</p>
									)}
								</div>
							</CardContent>
						</Card>
					</TabsContent>

					<TabsContent value="posts" className="space-y-4">
						<Card>
							<CardContent className="p-6">
								<h2 className="text-xl font-semibold mb-4">Мої публікації</h2>

								{/* {userPosts.map((post: any) => (
									<NewsCard key={post.id} {...post} />
								))} */}
							</CardContent>
						</Card>
					</TabsContent>
				</Tabs>
			</div>
		</div>
	)
}

export default Profile
