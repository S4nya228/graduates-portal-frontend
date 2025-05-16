import axiosInstance from '../api/axiosInstance'
import { SupportRequest } from '../types'

export const sendSupportRequest = async (data: {
	title: string
	appeal: string
}): Promise<SupportRequest> => {
	const response = await axiosInstance.post('/support', data)
	return response.data
}

export const fetchSupportRequests = async (): Promise<SupportRequest[]> => {
	const response = await axiosInstance.get('/support')
	return response.data
}

export const fetchSupportRequestById = async (
	id: number | string
): Promise<SupportRequest> => {
	const response = await axiosInstance.get(`/support/${id}`)
	return response.data
}

export const updateSupportRequest = async (
	id: number,
	data: {
		reply: string
		status: 'A' | 'B' | 'C' | 'D' | 'F'
	}
): Promise<SupportRequest> => {
	const response = await axiosInstance.put(`/support/reply/${id}`, data)
	return response.data
}
