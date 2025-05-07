import React from 'react'
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from '../../components/ui/Tabs'
import AdminUserList from '../../components/admin/AdminUserList'
import AdminPostList from './AdminPostList'
import AdminReportList from './AdminReportsList'
import AdminEventList from './AdminEventList'

const AdminTabs = () => {
	return (
		<Tabs defaultValue="users" className="space-y-4">
			<TabsList className="grid grid-cols-1 md:grid-cols-4 gap-2 cursor-pointer">
				<TabsTrigger className="cursor-pointer" value="users">
					Користувачі
				</TabsTrigger>
				<TabsTrigger className="cursor-pointer" value="content">
					Контент
				</TabsTrigger>
				<TabsTrigger className="cursor-pointer" value="reports">
					Скарги
				</TabsTrigger>
				<TabsTrigger className="cursor-pointer" value="events">
					Події
				</TabsTrigger>
			</TabsList>
			<TabsContent value="users" className="max-md:pt-20">
				<AdminUserList />
			</TabsContent>
			<TabsContent value="content" className="max-md:pt-20">
				<AdminPostList />
			</TabsContent>
			<TabsContent value="reports" className="max-md:pt-20">
				<AdminReportList />
			</TabsContent>
			<TabsContent value="events" className="max-md:pt-20">
				<AdminEventList />
			</TabsContent>
		</Tabs>
	)
}

export default AdminTabs
