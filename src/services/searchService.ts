import axiosInstance from '../api/axiosInstance'

export interface SearchParams {
	search?: string
	graduation_start?: string
	graduation_end?: string
	speciality?: string
	city?: string
	country?: string
}

export const searchUsers = async (params: SearchParams) => {
	const response = await axiosInstance.get('/search', { params })
	return response.data
}
