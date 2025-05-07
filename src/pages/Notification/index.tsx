import React, { useState } from 'react'
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardDescription,
} from '../../components/Card'
import Button from '../../components/ui/Button'
import { Avatar, AvatarImage, AvatarFallback } from '../../components/ui/Avatar'
import Badge from '../../components/ui/Badge'
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from '../../components/ui/Tabs'
import { Bell, UserPlus, MessageSquare, Calendar, Star } from 'lucide-react'

const notificationsData = [
	{
		id: '1',
		type: 'mention',
		read: false,
		title: 'Олександр згадав вас у коментарі',
		description: 'Ви маєте гарний досвід в цій сфері, можете підказати...',
		time: '2 години тому',
		user: {
			name: 'Олександр Ковальчук',
			avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
		},
	},
	{
		id: '2',
		type: 'event',
		read: false,
		title: 'Нагадування про подію',
		description: 'Зустріч випускників 2015 року завтра о 18:00',
		time: '5 годин тому',
		icon: Calendar,
	},
	{
		id: '3',
		type: 'friend',
		read: true,
		title: 'Запит на додавання до контактів',
		description: 'Марія Іваненко хоче додати вас до контактів',
		time: '1 день тому',
		user: {
			name: 'Марія Іваненко',
			avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
		},
	},
	{
		id: '4',
		type: 'message',
		read: true,
		title: 'Нове повідомлення',
		description:
			'Привіт! Як щодо зустрічі наступного тижня? Маю цікаву пропозицію...',
		time: '2 дні тому',
		user: {
			name: 'Іван Петренко',
			avatar: 'https://randomuser.me/api/portraits/men/44.jpg',
		},
	},
]

const Notifications = () => {
	const [notifications, setNotifications] = useState(notificationsData)
	const [activeTab, setActiveTab] = useState('all')

	const unreadCount = notifications.filter((notif) => !notif.read).length

	const filteredNotifications =
		activeTab === 'all'
			? notifications
			: activeTab === 'unread'
			? notifications.filter((notif) => !notif.read)
			: notifications.filter((notif) => notif.type === activeTab)

	const markAsRead = (id: string) => {
		setNotifications(
			notifications.map((notif) =>
				notif.id === id ? { ...notif, read: true } : notif
			)
		)
	}

	const markAllAsRead = () => {
		setNotifications(notifications.map((notif) => ({ ...notif, read: true })))
	}

	const getIcon = (type: string) => {
		switch (type) {
			case 'mention':
				return <MessageSquare className="h-5 w-5" />
			case 'event':
				return <Calendar className="h-5 w-5" />
			case 'friend':
				return <UserPlus className="h-5 w-5" />
			case 'message':
				return <MessageSquare className="h-5 w-5" />
			default:
				return <Bell className="h-5 w-5" />
		}
	}

	return (
		<div className="container mx-auto py-8 px-4">
			<div className="flex justify-between items-center mb-6">
				<h1 className="text-3xl font-bold">Сповіщення</h1>
				<Button
					variant="outline"
					onClick={markAllAsRead}
					disabled={unreadCount === 0}
				>
					Позначити всі як прочитані
				</Button>
			</div>

			<Tabs defaultValue="all" onValueChange={setActiveTab}>
				<div className="flex justify-between items-center mb-4">
					<TabsList>
						<TabsTrigger value="all" className="cursor-pointer">
							Всі
							<Badge variant="secondary" className="ml-2">
								{notifications.length}
							</Badge>
						</TabsTrigger>
						<TabsTrigger value="unread" className="cursor-pointer">
							Непрочитані
							<Badge variant="secondary" className="ml-2">
								{unreadCount}
							</Badge>
						</TabsTrigger>
						<TabsTrigger value="event" className="cursor-pointer">
							Події
						</TabsTrigger>
					</TabsList>
				</div>

				<TabsContent value={activeTab} className="mt-0">
					<Card>
						<CardContent className="p-0">
							{filteredNotifications.length > 0 ? (
								<div className="divide-y divide-[#e2e8f0]">
									{filteredNotifications.map((notification) => (
										<div
											key={notification.id}
											className={`p-4 flex items-start gap-4 hover:bg-[#f1f5f9]/50 transition-colors ${
												!notification.read ? 'bg-[#f1f5f9]/20' : ''
											}`}
											onClick={() => markAsRead(notification.id)}
										>
											{notification.user ? (
												<Avatar>
													<AvatarImage
														src={notification.user.avatar}
														alt={notification.user.name}
													/>
													<AvatarFallback>
														{notification.user.name.charAt(0)}
													</AvatarFallback>
												</Avatar>
											) : (
												<div className="h-10 w-10 rounded-full bg-[#6d54cf]/10 flex items-center justify-center">
													{getIcon(notification.type)}
												</div>
											)}

											<div className="flex-1">
												<div className="flex justify-between items-start">
													<h3 className="font-medium">{notification.title}</h3>
													<div className="flex items-center gap-2">
														<span className="text-sm text-[#64748b]">
															{notification.time}
														</span>
														{!notification.read && (
															<div className="h-2 w-2 rounded-full bg-[#6d54cf]"></div>
														)}
													</div>
												</div>
												<p className="text-[#64748b]">
													{notification.description}
												</p>
											</div>
										</div>
									))}
								</div>
							) : (
								<div className="p-8 text-center">
									<div className="mx-auto h-12 w-12 rounded-full bg-red-500/50 flex items-center justify-center mb-3">
										<Bell className="h-6 w-6 text-[#64748b]" />
									</div>
									<h3 className="font-medium text-lg mb-1">Немає сповіщень</h3>
									<p className="text-[#64748b]">
										У вас немає сповіщень у цій категорії
									</p>
								</div>
							)}
						</CardContent>
					</Card>
				</TabsContent>
			</Tabs>
		</div>
	)
}

export default Notifications
