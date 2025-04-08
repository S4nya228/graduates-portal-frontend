import axios from 'axios'
import store from '../store'

const axiosInstance = axios.create({
	baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`,
	headers: {
		Accept: 'application/json',
	},
})

axiosInstance.interceptors.request.use(
	(config: any) => {
		const auth = store.getState().auth
		const token = auth.token

		if (token) {
			config.headers.Authorization = `Bearer ${token}`
		}
		return config
	},
	(error: any) => {
		return Promise.reject(error)
	}
)

export default axiosInstance
