import axiosInstance from '../api/axiosInstance'

interface Post {
	id: number
	title: string
	content: string
	image: string | null
	created_at: string
	like_count: number
	comment_count: number
	user_name: string
	user_avatar: string | null
	has_reaction: boolean
	reaction_type: 'LIKE' | 'DISLIKE' | null
}

interface PostService {
	like: (postId: number) => Promise<void>
	getById: (id: string) => Promise<Post[]>
	getAll: () => Promise<Post[]>
}

const postService: PostService = {
	async like(postId) {
		try {
			await axiosInstance.post(`/post/${postId}/like`)
		} catch (e: any) {
			console.error('Помилка при лайку поста:', e?.response?.data)
		}
	},

	async getById(id) {
		try {
			const response = await axiosInstance.get(`/post/${id}`)
			return response.data
		} catch (e: any) {
			console.error('Помилка при отриманні поста:', e?.response?.data)
			throw e
		}
	},
	async getAll() {
		try {
			const response = await axiosInstance.get('/post')
			return response.data
		} catch (e: any) {
			console.error('Помилка при отриманні постів:', e?.response?.data)
			throw e
		}
	},
}

export default postService
