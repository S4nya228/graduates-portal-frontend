import React from 'react'
import { Card, CardContent } from '../../components/Card'
import { Users, UserPlus, FileText, Flag, CalendarDays } from 'lucide-react'

const AdminStatsCards = () => {
	return (
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
							<p className="text-3xl font-bold">12</p>
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
							<p className="text-3xl font-bold">78</p>
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
							<p className="text-3xl font-bold">13</p>
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
