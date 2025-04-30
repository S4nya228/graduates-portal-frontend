import React, { useState } from 'react'
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from '../../components/ui/Tabs'
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '../../components/Card'
import Button from '../../components/ui/Button'
import Input from '../../components/ui/Input'
import Badge from '../../components/ui/Badge'
import {
	Users,
	FileText,
	MessageSquare,
	Search,
	Edit,
	Trash2,
	CheckCircle,
	XCircle,
	UserPlus,
	Flag,
} from 'lucide-react'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '../../components/ui/Table'

const AdminPanel = () => {
	const [searchQuery, setSearchQuery] = useState('')

	const users = [
		{
			id: '1',
			name: 'Олексій Ковальчук',
			email: 'oleksii.kovalchuk@example.com',
			graduationYear: 2019,
			specialization: 'Програмна інженерія',
			status: 'active',
			registrationDate: '10.05.2023',
		},
		{
			id: '2',
			name: 'Марія Петренко',
			email: 'maria.petrenko@example.com',
			graduationYear: 2018,
			specialization: "Комп'ютерні науки",
			status: 'pending',
			registrationDate: '15.05.2023',
		},
		{
			id: '3',
			name: 'Іван Мельник',
			email: 'ivan.melnyk@example.com',
			graduationYear: 2020,
			specialization: 'Кібербезпека',
			status: 'active',
			registrationDate: '05.06.2023',
		},
		{
			id: '4',
			name: 'Софія Коваленко',
			email: 'sofia.kovalenko@example.com',
			graduationYear: 2017,
			specialization: 'Програмна інженерія',
			status: 'active',
			registrationDate: '22.06.2023',
		},
		{
			id: '5',
			name: 'Максим Шевченко',
			email: 'maxim.shevchenko@example.com',
			graduationYear: 2021,
			specialization: 'Штучний інтелект',
			status: 'inactive',
			registrationDate: '30.06.2023',
		},
	]

	const posts = [
		{
			id: '1',
			title: 'Зустріч випускників 2018 року',
			author: 'Анна Коваленко',
			date: '02.07.2023',
			status: 'published',
			comments: 5,
			likes: 24,
		},
		{
			id: '2',
			title: 'Вакансії для випускників',
			author: 'Олег Петренко',
			date: '03.07.2023',
			status: 'published',
			comments: 8,
			likes: 15,
		},
		{
			id: '3',
			title: 'Досвід роботи в Google',
			author: 'Марія Іваненко',
			date: '01.07.2023',
			status: 'published',
			comments: 14,
			likes: 32,
		},
		{
			id: '4',
			title: 'Конфіденційний контент',
			author: 'Іван Мельник',
			date: '05.07.2023',
			status: 'flagged',
			comments: 3,
			likes: 7,
		},
	]

	const reports = [
		{
			id: '1',
			type: 'post',
			targetId: '4',
			reporter: 'Максим Шевченко',
			reason: 'Спам/Реклама',
			date: '05.07.2023',
			status: 'pending',
		},
		{
			id: '2',
			type: 'comment',
			targetId: '7',
			reporter: 'Софія Коваленко',
			reason: 'Образливий контент',
			date: '04.07.2023',
			status: 'pending',
		},
		{
			id: '3',
			type: 'user',
			targetId: '12',
			reporter: 'Олексій Ковальчук',
			reason: 'Фейковий акаунт',
			date: '03.07.2023',
			status: 'resolved',
		},
	]

	const renderStatusBadge = (status: string) => {
		switch (status) {
			case 'active':
				return <Badge className="bg-green-500">Активний</Badge>
			case 'pending':
				return <Badge className="bg-yellow-500">Очікує підтвердження</Badge>
			case 'inactive':
				return <Badge className="bg-gray-500">Неактивний</Badge>
			case 'published':
				return <Badge className="bg-green-500">Опубліковано</Badge>
			case 'draft':
				return <Badge className="bg-gray-500">Чернетка</Badge>
			case 'flagged':
				return <Badge className="bg-red-500">Позначено</Badge>
			case 'resolved':
				return <Badge className="bg-green-500">Вирішено</Badge>
			default:
				return <Badge>{status}</Badge>
		}
	}

	return (
		<div className="min-h-screen bg-alumni-light-gray">
			<div className="bg-alumni-dark text-white py-12 px-4">
				<div className="container mx-auto">
					<h1 className="text-3xl font-bold mb-4">Панель адміністратора</h1>
					<p>
						Управління користувачами, контентом та налаштуваннями порталу
						випускників
					</p>
				</div>
			</div>

			<div className="container mx-auto px-4 py-8">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
					<Card>
						<CardContent className="p-6">
							<div className="flex items-center justify-between">
								<div>
									<p className="text-sm text-[hsl(215.4,16.3%,46.9%)]">
										Всього користувачів
									</p>
									<p className="text-3xl font-bold">245</p>
								</div>
								<div className="h-12 w-12 rounded-full bg-alumni-blue/20 flex items-center justify-center">
									<Users className="h-6 w-6 text-alumni-blue" />
								</div>
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardContent className="p-6">
							<div className="flex items-center justify-between">
								<div>
									<p className="text-sm text-[hsl(215.4,16.3%,46.9%)]">
										Нові користувачі
									</p>
									<p className="text-3xl font-bold">12</p>
								</div>
								<div className="h-12 w-12 rounded-full bg-alumni-purple/20 flex items-center justify-center">
									<UserPlus className="h-6 w-6 text-alumni-purple" />
								</div>
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardContent className="p-6">
							<div className="flex items-center justify-between">
								<div>
									<p className="text-sm text-[hsl(215.4,16.3%,46.9%)]">
										Публікації
									</p>
									<p className="text-3xl font-bold">78</p>
								</div>
								<div className="h-12 w-12 rounded-full bg-alumni-indigo/20 flex items-center justify-center">
									<FileText className="h-6 w-6 text-alumni-indigo" />
								</div>
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardContent className="p-6">
							<div className="flex items-center justify-between">
								<div>
									<p className="text-sm text-[hsl(215.4,16.3%,46.9%)]">
										Скарги
									</p>
									<p className="text-3xl font-bold">3</p>
								</div>
								<div className="h-12 w-12 rounded-full bg-red-500/20 flex items-center justify-center">
									<Flag className="h-6 w-6 text-red-500" />
								</div>
							</div>
						</CardContent>
					</Card>
				</div>

				<Tabs defaultValue="users" className="space-y-4">
					<TabsList className="grid grid-cols-1 md:grid-cols-3 gap-2 cursor-pointer">
						<TabsTrigger className="cursor-pointer" value="users">
							Користувачі
						</TabsTrigger>
						<TabsTrigger className="cursor-pointer" value="content">
							Контент
						</TabsTrigger>
						<TabsTrigger className="cursor-pointer" value="reports">
							Скарги
						</TabsTrigger>
					</TabsList>

					<TabsContent value="users" className="max-md:pt-20">
						<Card>
							<CardHeader>
								<CardTitle>Управління користувачами</CardTitle>
								<CardDescription>
									Перегляд, редагування та управління акаунтами користувачів
									порталу
								</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="flex items-center justify-between mb-6">
									<div className="relative w-full max-w-sm">
										<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[hsl(215.4,16.3%,46.9%)]" />
										<Input
											placeholder="Пошук користувачів..."
											className="pl-10"
											value={searchQuery}
											onChange={(e) => setSearchQuery(e.target.value)}
										/>
									</div>

									<Button className="bg-alumni-purple hover:bg-[#8B5CF6]/90">
										<UserPlus className="mr-2 h-4 w-4" />
										Додати користувача
									</Button>
								</div>

								<div className="rounded-md">
									<Table>
										<TableHeader>
											<TableRow>
												<TableHead>Ім'я</TableHead>
												<TableHead>Email</TableHead>
												<TableHead>Рік випуску</TableHead>
												<TableHead>Статус</TableHead>
												<TableHead>Дії</TableHead>
											</TableRow>
										</TableHeader>
										<TableBody>
											{users.map((user) => (
												<TableRow key={user.id}>
													<TableCell className="font-medium">
														{user.name}
													</TableCell>
													<TableCell>{user.email}</TableCell>
													<TableCell>{user.graduationYear}</TableCell>
													<TableCell>
														{renderStatusBadge(user.status)}
													</TableCell>
													<TableCell>
														<div className="flex space-x-2">
															<Button variant="ghost" size="sm">
																<Edit className="h-4 w-4" />
															</Button>
															{user.status === 'pending' && (
																<Button
																	variant="ghost"
																	size="sm"
																	className="text-green-500"
																>
																	<CheckCircle className="h-4 w-4" />
																</Button>
															)}
															<Button
																variant="ghost"
																size="sm"
																className="text-red-500"
															>
																<Trash2 className="h-4 w-4" />
															</Button>
														</div>
													</TableCell>
												</TableRow>
											))}
										</TableBody>
									</Table>
								</div>
							</CardContent>
						</Card>
					</TabsContent>

					<TabsContent value="content" className="max-md:pt-20">
						<Card>
							<CardHeader>
								<CardTitle>Управління контентом</CardTitle>
								<CardDescription>
									Перегляд та модерація публікацій, коментарів та іншого
									контенту
								</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="flex items-center justify-between mb-6">
									<div className="relative w-full max-w-sm">
										<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[hsl(215.4,16.3%,46.9%)]" />
										<Input
											placeholder="Пошук публікацій..."
											className="pl-10"
										/>
									</div>
								</div>

								<div className="rounded-md">
									<Table>
										<TableHeader>
											<TableRow>
												<TableHead>Заголовок</TableHead>
												<TableHead>Автор</TableHead>
												<TableHead>Дата</TableHead>
												<TableHead>Статус</TableHead>
												<TableHead>Взаємодії</TableHead>
												<TableHead>Дії</TableHead>
											</TableRow>
										</TableHeader>
										<TableBody>
											{posts.map((post) => (
												<TableRow key={post.id}>
													<TableCell className="font-medium">
														{post.title}
													</TableCell>
													<TableCell>{post.author}</TableCell>
													<TableCell>{post.date}</TableCell>
													<TableCell>
														{renderStatusBadge(post.status)}
													</TableCell>
													<TableCell>
														<div className="flex items-center space-x-2">
															<span className="flex items-center text-[hsl(215.4,16.3%,46.9%)]">
																<MessageSquare className="h-4 w-4 mr-1" />{' '}
																{post.comments}
															</span>
															<span className="flex items-center text-[hsl(215.4,16.3%,46.9%)]">
																<CheckCircle className="h-4 w-4 mr-1" />{' '}
																{post.likes}
															</span>
														</div>
													</TableCell>
													<TableCell>
														<div className="flex space-x-2">
															<Button variant="ghost" size="sm">
																<Edit className="h-4 w-4" />
															</Button>
															<Button
																variant="ghost"
																size="sm"
																className="text-red-500"
															>
																<Trash2 className="h-4 w-4" />
															</Button>
														</div>
													</TableCell>
												</TableRow>
											))}
										</TableBody>
									</Table>
								</div>
							</CardContent>
						</Card>
					</TabsContent>

					<TabsContent value="reports" className="max-md:pt-20">
						<Card>
							<CardHeader>
								<CardTitle>Скарги та звіти</CardTitle>
								<CardDescription>
									Розгляд скарг від користувачів на контент чи інших
									користувачів
								</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="rounded-md">
									<Table>
										<TableHeader>
											<TableRow>
												<TableHead>Тип</TableHead>
												<TableHead>Скаржник</TableHead>
												<TableHead>Причина</TableHead>
												<TableHead>Дата</TableHead>
												<TableHead>Статус</TableHead>
												<TableHead>Дії</TableHead>
											</TableRow>
										</TableHeader>
										<TableBody>
											{reports.map((report) => (
												<TableRow key={report.id}>
													<TableCell className="font-medium capitalize">
														{report.type === 'post'
															? 'Публікація'
															: report.type === 'comment'
															? 'Коментар'
															: 'Користувач'}
													</TableCell>
													<TableCell>{report.reporter}</TableCell>
													<TableCell>{report.reason}</TableCell>
													<TableCell>{report.date}</TableCell>
													<TableCell>
														{renderStatusBadge(report.status)}
													</TableCell>
													<TableCell>
														<div className="flex space-x-2">
															<Button variant="ghost" size="sm">
																<Edit className="h-4 w-4" />
															</Button>
															{report.status === 'pending' && (
																<>
																	<Button
																		variant="ghost"
																		size="sm"
																		className="text-green-500"
																	>
																		<CheckCircle className="h-4 w-4" />
																	</Button>
																	<Button
																		variant="ghost"
																		size="sm"
																		className="text-red-500"
																	>
																		<XCircle className="h-4 w-4" />
																	</Button>
																</>
															)}
														</div>
													</TableCell>
												</TableRow>
											))}
										</TableBody>
									</Table>
								</div>
							</CardContent>
						</Card>
					</TabsContent>
				</Tabs>
			</div>
		</div>
	)
}

export default AdminPanel
