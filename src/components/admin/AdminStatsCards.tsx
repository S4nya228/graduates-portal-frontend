import React, { useEffect, useState } from 'react'
import { Card, CardContent } from '../../components/Card'
import { Users, FileText, Flag, CalendarDays } from 'lucide-react'
import statisticService from '../../services/statisticService'

interface StatisticResponse {
	user_count: number
	post_count: number
	event_count: number
	support_count: number
}
const AdminStatsCards = () => {
	const [statistics, setStatistics] = useState<StatisticResponse | null>(null)
	const [loading, setLoading] = useState<boolean>(true)

	const fetchStatistics = async () => {
		try {
			const response = await statisticService.fetchStatisticAdmin()

			setStatistics(response)
		} catch (e) {
			console.error('Помилка при отриманні статистики:', e)
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		fetchStatistics()
	}, [])

	if (loading || !statistics) {
		return (
			<div className="flex items-center justify-center h-64">
				<div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent" />
			</div>
		)
	}

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
			<Card>
				<CardContent className="p-6">
					<div className="flex items-center justify-between">
						<div>
							<p className="text-sm text-[hsl(215.4,16.3%,46.9%)]">
								Всього користувачів
							</p>
							<p className="text-3xl font-bold">{statistics.user_count}</p>
						</div>
						<div className="h-12 w-12 rounded-full bg-[#3b82f6]/20 flex items-center justify-center">
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
								Публікації
							</p>
							<p className="text-3xl font-bold">{statistics.post_count}</p>
						</div>
						<div className="h-12 w-12 rounded-full bg-[#6366f1]/20 flex items-center justify-center">
							<FileText className="h-6 w-6 text-alumni-indigo" />
						</div>
					</div>
				</CardContent>
			</Card>

			<Card>
				<CardContent className="p-6">
					<div className="flex items-center justify-between">
						<div>
							<p className="text-sm text-[hsl(215.4,16.3%,46.9%)]">Скарги</p>
							<p className="text-3xl font-bold">{statistics.support_count}</p>
						</div>
						<div className="h-12 w-12 rounded-full bg-red-500/20 flex items-center justify-center">
							<Flag className="h-6 w-6 text-red-500" />
						</div>
					</div>
				</CardContent>
			</Card>

			<Card>
				<CardContent className="p-6">
					<div className="flex items-center justify-between">
						<div>
							<p className="text-sm text-[hsl(215.4,16.3%,46.9%)]">Події</p>
							<p className="text-3xl font-bold">{statistics.event_count}</p>
						</div>
						<div className="h-12 w-12 rounded-full bg-yellow-500/15 flex items-center justify-center">
							<CalendarDays className="h-6 w-6 text-yellow-500" />
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	)
}

export default AdminStatsCards
