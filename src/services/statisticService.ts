import axiosInstance from '../api/axiosInstance'

const statisticService = {
	fetchStatisticAdmin: async () => {
		try {
			const response = await axiosInstance.get('/admin/statistic')
			return response.data
		} catch (error) {
			throw new Error('Помилка отримання статистики')
		}
	},
}

export default statisticService
