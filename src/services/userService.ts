import axiosInstance from '../api/axiosInstance'
import { User } from '../types'

interface Service {
	current: () => Promise<User | undefined>
	cabinet: () => Promise<User | undefined>
	updateCabinet: (data: Partial<User> | FormData) => Promise<User | undefined>
	getAll: () => Promise<User[]>
	create: (data: Partial<User> | FormData) => Promise<User | undefined>
	update: (
		id: number,
		data: Partial<User> | FormData
	) => Promise<User | undefined>
}

export default <Service>{
	async current() {
		try {
			const response = await axiosInstance.get<User>('/user')
			return response.data
		} catch (e: any) {
			console.log(e?.response?.data)
		}
	},

	async cabinet() {
		try {
			const response = await axiosInstance.get<User>('/user/cabinet')
			return response.data
		} catch (e: any) {
			console.log(e?.response?.data)
		}
	},

	async updateCabinet(data: Partial<User> | FormData) {
		try {
			const isFormData = data instanceof FormData
			const response = await axiosInstance.post<User>('/user/cabinet', data, {
				headers: {
					'Content-Type': isFormData
						? 'multipart/form-data'
						: 'application/json',
				},
			})
			return response.data
		} catch (e: any) {
			console.log(e?.response?.data)
		}
	},
	async getAll(): Promise<User[]> {
		try {
			const response = await axiosInstance.get<User[]>('/admin/user')
			return response.data
		} catch (e: any) {
			console.log(e?.response?.data)
			return []
		}
	},
	async create(data: Partial<User> | FormData) {
		try {
			const isFormData = data instanceof FormData
			const response = await axiosInstance.post<User>('/admin/user', data, {
				headers: {
					'Content-Type': isFormData
						? 'multipart/form-data'
						: 'application/json',
				},
			})
			return response.data
		} catch (e: any) {
			console.log(e?.response?.data)
		}
	},
	async update(id: number, payload: any): Promise<User | undefined> {
		try {
			const response = await axiosInstance.put<User>(
				`/admin/user/${id}`,
				payload
			)
			return response.data
		} catch (e: any) {
			console.log(e?.response?.data)
			return undefined
		}
	},
}
