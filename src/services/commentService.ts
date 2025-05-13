import axiosInstance from '../api/axiosInstance'

export interface Comment {
	id: number
	content: string
	created_at: string
	parent_id: number | null
	root_id: number | null
	user_id: number
	user: {
		id: number
		name: string
		avatar: string | null
	}
	like_count?: number
	has_reaction: boolean
}

interface CommentPayload {
	content: string
}

const commentService = {
	async create(postId: number, data: CommentPayload): Promise<Comment> {
		try {
			const response = await axiosInstance.post<Comment>(
				`/post/${postId}/comment`,
				data
			)
			return response.data
		} catch (e: any) {
			console.error('Помилка при створенні коментаря:', e.response?.data)
			throw e
		}
	},

	async toggleLike(postId: number, commentId: number): Promise<void> {
		try {
			await axiosInstance.post(`/post/${postId}/comment/${commentId}/like`)
		} catch (e: any) {
			console.error('Помилка при лайкуванні коментаря:', e.response?.data)
			throw e
		}
	},
}

export default commentService
