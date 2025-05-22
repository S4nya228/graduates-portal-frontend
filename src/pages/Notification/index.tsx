import { useEffect, useState } from 'react'
import { Card, CardContent } from '../../components/Card'
import Button from '../../components/ui/Button'
import Badge from '../../components/ui/Badge'
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from '../../components/ui/Tabs'
import { Bell, UserPlus, MessageSquare, Calendar } from 'lucide-react'
import {
	getNotifications,
	Notification,
} from '../../services/notificationService'

const Notifications = () => {
	const [activeTab, setActiveTab] = useState('all')
	const [notifications, setNotifications] = useState<Notification[]>([])

	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await getNotifications()
				setNotifications(data)
			} catch (error) {
				console.error('Помилка завантаження сповіщень:', error)
			}
		}
		fetchData()
	}, [])

	const unreadCount = notifications.filter((n) => !n.read_at).length

	const getIcon = (type: string) => {
		switch (type) {
			case 'mention':
			case 'message':
				return <MessageSquare className="h-5 w-5" />
			case 'event':
				return <Calendar className="h-5 w-5" />
			case 'friend':
				return <UserPlus className="h-5 w-5" />
			default:
				return <Bell className="h-5 w-5" />
		}
	}

	const filteredNotifications =
		activeTab === 'unread'
			? notifications.filter((n) => !n.read_at)
			: notifications

	return (
		<div className="container mx-auto py-8 px-4">
			<div className="flex justify-between items-center mb-6">
				<h1 className="text-3xl font-bold">Сповіщення</h1>
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
												!notification.read_at ? 'bg-[#f1f5f9]/20' : ''
											}`}
										>
											<div className="h-10 w-10 rounded-full bg-[#6d54cf]/10 flex items-center justify-center">
												{getIcon(notification.type)}
											</div>
											<div className="flex-1">
												<div className="flex justify-between items-start">
													<h3 className="font-medium">{notification.title}</h3>
													<div className="flex items-center gap-2">
														<span className="text-sm text-[#64748b]">
															Зараз
														</span>
														{!notification.read_at && (
															<div className="h-2 w-2 rounded-full bg-[#6d54cf]"></div>
														)}
													</div>
												</div>
												<p className="text-[#64748b]">{notification.message}</p>
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
