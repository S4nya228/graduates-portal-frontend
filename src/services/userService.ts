import axiosInstance from '../api/axiosInstance'
import { User } from '../types'

interface Service {
	current: () => Promise<User | undefined>
	cabinet: () => Promise<User | undefined>
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
}
