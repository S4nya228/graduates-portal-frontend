import axiosInstance from '../api/axiosInstance'

export const sendSupportRequest = async (data: {
	title: string
	appeal: string
}) => {
	try {
		const response = await axiosInstance.post('/support', data)
		return response.data
	} catch (error) {
		throw new Error('Помилка надсилання звернення')
	}
}

export const fetchSupportRequests = async () => {
	try {
		const response = await axiosInstance.get('/support')
		return response.data
	} catch (error) {
		throw new Error('Помилка отримання скарг')
	}
}
