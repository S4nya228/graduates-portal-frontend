import { configureStore, createAction } from '@reduxjs/toolkit'
import authSlice from './authSlice'
import postsSlice from './postsSlice'

export const resetAction = createAction('RESET')

const store = configureStore({
	reducer: {
		auth: authSlice,
		posts: postsSlice,
	},
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
