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
import EditProfileModal from '../../components/EditProfileModal'
import NewsCard from '../../components/NewsCard'
import { Link } from 'react-router-dom'
import { useParams, useLocation } from 'react-router-dom'

const Profile = () => {
	const [profileData, setProfileData] = useState<any>(null)
	const [isEditOpen, setIsEditOpen] = useState(false)
	const [loading, setLoading] = useState<boolean>(true)
	const { id } = useParams()
	const isMyProfile = !id

	const fetchUserData = async () => {
		try {
			const profile = await userService.cabinet()
			setProfileData(profile)
		} catch (e) {
			console.error('Помилка при отриманні даних профілю:', e)
		} finally {
			setLoading(false)
		}
	}

	const fetchOtherUserData = async (id: number) => {
		try {
			const profile = await userService.getCabinetById(id)
			setProfileData(profile)
		} catch (e) {
			console.error('Помилка при отриманні даних профілю:', e)
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		if (isMyProfile) {
			fetchUserData()
		} else {
			fetchOtherUserData(Number(id))
		}
	}, [id])

	if (loading) {
		return (
			<div className="flex items-center justify-center h-64">
				<div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent" />
			</div>
		)
	}

	const graduationDegreesMap: Record<string, string> = {
		A: 'Немає',
		B: 'Бакалавр',
		C: 'Магістр',
		D: 'Доктор наук',
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
									</div>
									{isMyProfile && (
										<div className="flex gap-2">
											<Button
												className="bg-alumni-purple"
												onClick={() => setIsEditOpen(true)}
											>
												<Edit className="mr-2 h-4 w-4" />
												Редагувати профіль
											</Button>
										</div>
									)}
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
											Випускник {profileData.graduated_at} року,{' '}
											{profileData.specialty}
										</span>
									</div>
								</div>

								<div className="mt-4 flex gap-3">
									{profileData.social_links?.map(
										(
											item: { platform: string; link: string },
											index: number
										) => {
											if (!item.link) return null

											const platform = item.platform

											let Icon
											switch (platform) {
												case 'linkedin':
													Icon = Linkedin
													break
												case 'github':
													Icon = Github
													break
												case 'twitter':
													Icon = Twitter
													break
												default:
													return null
											}

											return (
												<a
													key={index}
													href={item.link}
													target="_blank"
													rel="noopener noreferrer"
													className="text-alumni-gray hover:text-[#3b82f6] transition-colors"
												>
													<Icon className="h-5 w-5" />
												</a>
											)
										}
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
								<p className="text-gray-600">
									{profileData.about || 'Інформація про вас не вказана'}
								</p>
								<div className="mt-6">
									<h3 className="font-medium mb-3">Навички</h3>
									<div className="flex flex-wrap gap-2">
										{profileData.skills &&
										Array.isArray(profileData.skills) &&
										profileData.skills.length > 0 ? (
											profileData.skills.map((skill: any) => (
												<Badge key={skill.id} variant="secondary">
													{skill.name}
												</Badge>
											))
										) : (
											<p>Навички не вказані</p>
										)}
									</div>
								</div>

								<div className="mt-6">
									<h3 className="font-medium mb-3">Проєкти</h3>
									{profileData.projects &&
									Array.isArray(profileData.projects) &&
									profileData.projects.length > 0 ? (
										profileData.projects.map((project: any, index: number) => (
											<div key={index} className="mb-4 last:mb-0">
												<h4 className="font-medium">{project.title}</h4>
												<p className="text-gray-600">{project.description}</p>
											</div>
										))
									) : (
										<p>Проєкти не вказані</p>
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
															{exp.start_experience
																? new Date(exp.start_experience).getFullYear()
																: '??'}{' '}
															-{' '}
															{exp.end_experience
																? new Date(exp.end_experience).getFullYear()
																: '??'}
														</span>
													</div>

													<div className="flex items-center text-alumni-gray mb-2">
														<Building className="h-4 w-4 mr-2" />
														<span>{exp.company}</span>
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
									{profileData.graduation &&
									Array.isArray(profileData.graduation) &&
									profileData.graduation.length > 0 ? (
										profileData.graduation.map((edu: any, index: number) => (
											<div key={index} className="relative pl-8 pb-8">
												{index !== profileData.graduation.length - 1 && (
													<div className="absolute top-0 left-3 h-full w-px bg-gray-200"></div>
												)}
												<div className="absolute top-0 left-0 h-6 w-6 rounded-full bg-alumni-purple flex items-center justify-center">
													<GraduationCap className="h-3 w-3 text-white" />
												</div>

												<div>
													<div className="flex flex-col md:flex-row md:items-center md:justify-between gap-1 mb-2">
														<h3 className="font-medium">
															{graduationDegreesMap[edu.degree] ?? 'Не вказано'}
														</h3>
														<span className="text-sm text-alumni-gray">
															{edu.start_graduation
																? new Date(edu.start_graduation).getFullYear()
																: '??'}{' '}
															-{' '}
															{edu.end_graduation
																? new Date(edu.end_graduation).getFullYear()
																: '??'}
														</span>
													</div>

													<div className="flex items-center text-alumni-gray mb-2">
														<Building className="h-4 w-4 mr-2" />
														<span>
															{edu.university ??
																edu.faculty ??
																'Навчальний заклад не вказано'}
														</span>
													</div>

													<p className="text-gray-600">
														{edu.specialty ?? 'Спеціальність не вказано'}
													</p>
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

								{profileData.posts.length === 0 ? (
									<p className="text-center text-gray-500">
										У вас ще немає публікацій.
									</p>
								) : (
									profileData.posts.map((post: any) => (
										<Link to={`/publication/${post.id}`} key={post.id}>
											<NewsCard post={post} fetchUserData={fetchUserData} />
										</Link>
									))
								)}
							</CardContent>
						</Card>
					</TabsContent>
				</Tabs>
			</div>
			{isEditOpen && (
				<EditProfileModal
					isOpen={isEditOpen}
					closeModal={() => setIsEditOpen(false)}
					initialData={profileData}
					refreshUserData={() => {
						userService.cabinet().then((updated) => setProfileData(updated))
					}}
				/>
			)}
		</div>
	)
}

export default Profile
