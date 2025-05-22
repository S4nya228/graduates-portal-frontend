import axiosInstance from '../api/axiosInstance'

export interface Notification {
	id: number
	user_id: number
	type: string
	title: string
	message: string
	url: string
	read_at: string | null
}

export const getNotifications = async () => {
	const response = await axiosInstance.get<{ data: Notification[] }>(
		'/notification'
	)
	return response.data.data
}
