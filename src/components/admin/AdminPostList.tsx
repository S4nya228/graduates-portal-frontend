import React, { useState } from 'react'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '../../components/ui/Table'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '../Card'
import { CheckCircle, Edit, MessageSquare, Search, Trash2 } from 'lucide-react'
import Input from '../ui/Input'
import Button from '../ui/Button'
import Badge from '../ui/Badge'

const AdminPostList = () => {
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
		<Card>
			<CardHeader>
				<CardTitle>Управління контентом</CardTitle>
				<CardDescription>
					Перегляд та модерація публікацій, коментарів та іншого контенту
				</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="flex items-center justify-between mb-6">
					<div className="relative w-full max-w-sm">
						<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[hsl(215.4,16.3%,46.9%)]" />
						<Input placeholder="Пошук публікацій..." className="pl-10" />
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
									<TableCell className="font-medium">{post.title}</TableCell>
									<TableCell>{post.author}</TableCell>
									<TableCell>{post.date}</TableCell>
									<TableCell>{renderStatusBadge(post.status)}</TableCell>
									<TableCell>
										<div className="flex items-center space-x-2">
											<span className="flex items-center text-[hsl(215.4,16.3%,46.9%)]">
												<MessageSquare className="h-4 w-4 mr-1" />{' '}
												{post.comments}
											</span>
											<span className="flex items-center text-[hsl(215.4,16.3%,46.9%)]">
												<CheckCircle className="h-4 w-4 mr-1" /> {post.likes}
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
	)
}

export default AdminPostList
