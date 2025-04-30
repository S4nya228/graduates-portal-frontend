import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import postService from '../services/postService'

interface PostState {
	likedPosts: Record<number, boolean> // Статус лайку для кожного поста
}

const initialState: PostState = {
	likedPosts: {},
}

// Асинхронний екшн для отримання статусу лайку
export const fetchLikeStatus = createAsyncThunk(
	'posts/fetchLikeStatus',
	async (postId: number) => {
		const response = await postService.getLikeStatus(postId)
		return { postId, liked: response.data.liked }
	}
)

// Асинхронний екшн для ставлення/зняття лайку
export const toggleLike = createAsyncThunk(
	'posts/toggleLike',
	async ({
		postId,
		currentStatus,
	}: {
		postId: number
		currentStatus: boolean
	}) => {
		const response = await postService.toggleLike(postId, currentStatus)
		return { postId, liked: response.data.liked }
	}
)

const postSlice = createSlice({
	name: 'posts',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchLikeStatus.fulfilled, (state, action) => {
				state.likedPosts[action.payload.postId] = action.payload.liked
			})
			.addCase(toggleLike.fulfilled, (state, action) => {
				state.likedPosts[action.payload.postId] = action.payload.liked
			})
	},
})

export default postSlice.reducer
