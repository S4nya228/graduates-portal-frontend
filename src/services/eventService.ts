import axiosInstance from '../api/axiosInstance'

export interface Event {
	id: number
	user_id: number
	title: string
	description: string
	start_event_date: string
	end_event_date: string
	star_event_time: string
	end_event_time: string
	location: string
	status: string
	created_at: string
	updated_at: string
	participants: number
	is_registered: boolean
}

export interface CreateEventDto {
	title: string
	description: string
	start_event_date: string
	end_event_date: string
	star_event_time: string
	end_event_time: string
	location: string
	status: string
}

interface EventService {
	getAll: () => Promise<Event[]>
	register: (eventId: number) => Promise<void>
	unregister: (eventId: number) => Promise<void>
	create: (data: CreateEventDto) => Promise<Event>
	delete: (eventId: number) => Promise<void>
	update: (eventId: number, data: Partial<CreateEventDto>) => Promise<Event>
}

const eventService: EventService = {
	async getAll() {
		try {
			const response = await axiosInstance.get('/event')
			return response.data
		} catch (e: any) {
			console.error('Помилка при завантаженні івентів:', e?.response?.data)
			throw e
		}
	},

	async register(eventId) {
		try {
			await axiosInstance.post(`/event/register/${eventId}`)
		} catch (e: any) {
			console.error('Помилка при реєстрації на івент:', e?.response?.data)
			throw e
		}
	},

	async unregister(eventId) {
		try {
			await axiosInstance.post(`/event/unregister/${eventId}`)
		} catch (e: any) {
			console.error(
				'Помилка при відміні реєстрації на івент:',
				e?.response?.data
			)
			throw e
		}
	},

	async create(data) {
		try {
			const response = await axiosInstance.post('/event', data)
			return response.data
		} catch (e: any) {
			console.error('Помилка при створенні івенту:', e?.response?.data)
			throw e
		}
	},
	async delete(eventId) {
		try {
			await axiosInstance.delete(`/event/${eventId}`)
		} catch (e: any) {
			console.error('Помилка при видаленні івенту:', e?.response?.data)
			throw e
		}
	},
	async update(eventId, data) {
		try {
			const response = await axiosInstance.put(`/event/${eventId}`, data)
			return response.data
		} catch (e: any) {
			console.error('Помилка при оновленні івенту:', e?.response?.data)
			throw e
		}
	},
}

export default eventService
